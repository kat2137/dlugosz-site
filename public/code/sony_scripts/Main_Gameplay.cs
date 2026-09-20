using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using C2 = UnityEngine.Plugins.SieConfigurableControllerUnity;

public enum Colour
{
    BLUE, GREEN, YELLOW, ORANGE, RED, INDIGO, VIOLET
}

public enum State
{
    None, Stage1, Stage2, Stage3, Stage4, Stage5, Stage6, Stage7
}
public abstract class ControllerAction
{
    public abstract IEnumerator Execute(cubes_group_c_playground controller);
}

public class cubes_group_c_playground : MonoBehaviour
{
    private static readonly Dictionary<Colour, (uint R, uint G, uint B)> ColourValues = new()
    {
        { Colour.BLUE,   (0,   0, 100) },
        { Colour.GREEN,  (0, 100,   0) },
        { Colour.YELLOW, (100,100,  0) },
        { Colour.ORANGE, (100,65,   0) },
        { Colour.RED,    (100, 0,   0) },
        { Colour.INDIGO, (29,  0,  51) },
        { Colour.VIOLET, (58,  0,  82) }
    };

    // C2 cubes
    private C2.ControllerData sicData;
    private C2.Cube cube0, cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9, cube10, cube11;
    private Cube[] cubeList = new Cube[12];

    private State currentState = State.Stage1;
    private State previousState = State.None;

    private Dictionary<C2.Cube, CubeLightState> _cubeLightCache = new();

    private float debounceDelay = 1f;
    private float lastInputTime;
    private bool WasQuitButtonPressed;

    private SimpleTimer stageTimer;
    private SimpleTimer stage4Timer;
    private Dictionary<string, Colour> stage4Colours = new();

    // === TIMER CLASS ===
    private class SimpleTimer
    {
        private float startTime;
        private float duration;
        private bool running;

        public SimpleTimer(float duration) { this.duration = duration; }

        public void Start() { startTime = Time.time; running = true; }

        public bool HasElapsed() => running && (Time.time - startTime >= duration);

        public void Reset() { running = false; }
    }

    // === LIGHT STATE STRUCT ===
    private struct CubeLightState : IEquatable<CubeLightState>
    {
        public C2.Led leds;
        public uint red, green, blue;

        public bool Equals(CubeLightState other) =>
            leds == other.leds && red == other.red && green == other.green && blue == other.blue;
        public override int GetHashCode() => HashCode.Combine(leds, red, green, blue);
    }
    private struct Cube
    {
        public C2.Cube cube;
        public bool connected;
    }

    private static Colour GetNextColour(Colour current)
    {
        var values = (Colour[])Enum.GetValues(typeof(Colour));
        int index = Array.IndexOf(values, current);
        return values[(index + 1) % values.Length];
    }
    
    private void SetCubeLights(C2.Led leds, Colour colour, params C2.Cube[] cubes)
    {
        var (r, g, b) = ColourValues[colour];
        var newState = new CubeLightState { leds = leds, red = r, green = g, blue = b };
        var lights = new C2.LedParam { led = leds, red = r, green = g, blue = b };

        foreach (var cube in cubes)
        {
            if (_cubeLightCache.TryGetValue(cube, out var prev) && prev.Equals(newState)) continue;
            C2.SieC2SetLED(cube, in lights);
            _cubeLightCache[cube] = newState;
        }
    }

    // overload to set by raw rgb values
    private void SetCubeLights(C2.Led leds, uint r, uint g, uint b, params C2.Cube[] cubes)
    {
        var newState = new CubeLightState { leds = leds, red = r, green = g, blue = b };
        var lights = new C2.LedParam { led = leds, red = r, green = g, blue = b };
        foreach (var cube in cubes)
        {
            if (_cubeLightCache.TryGetValue(cube, out var prev) && prev.Equals(newState)) continue;
            C2.SieC2SetLED(cube, in lights);
            _cubeLightCache[cube] = newState;
        }
    }

    private void ClearCubeLights(params C2.Cube[] cubes)
    {
        var lights = new C2.LedParam { led = AllLEDs, red = 0, green = 0, blue = 0 };
        foreach (var cube in cubes)
        {
            C2.SieC2SetLED(cube, in lights);
            _cubeLightCache[cube] = new CubeLightState { leds = AllLEDs, red = 0, green = 0, blue = 0 };
        }
    }

    private const C2.Led AllLEDs = C2.Led.LED0 | C2.Led.LED1 | C2.Led.LED2 | C2.Led.LED3 |
                                   C2.Led.LED4 | C2.Led.LED5 | C2.Led.LED6 | C2.Led.LED7;
    private const C2.Led RCross = C2.Led.LED1 | C2.Led.LED2 | C2.Led.LED5 | C2.Led.LED6;
    private const C2.Led LCross = C2.Led.LED0 | C2.Led.LED3 | C2.Led.LED4 | C2.Led.LED7;

    // === STATE LOGIC ===
    private void BuildTorch()
    {
        Debug.Log("Stage6: Torch initialisation");
        SetCubeLights(AllLEDs, Colour.YELLOW, cube6);
        SetCubeLights(C2.Led.LED0 | C2.Led.LED1 | C2.Led.LED6 | C2.Led.LED7, Colour.YELLOW, cube8);
        
    }
    private void Torch()
    {   
        Debug.Log("Torch function");
        bool triggerUp = sicData.TriggerButtonB.trigger1;
        // removed stray token and unused var
        if (triggerUp)
        {
            SetCubeLights(AllLEDs, Colour.YELLOW, cube6);
            SetCubeLights(AllLEDs, Colour.YELLOW, cube8);
        }
    }
    private void SoundSelection()
    {}
    private void HandleStateLogic()
    {
        switch (currentState)
        {
            case State.Stage1:
                stageTimer = new SimpleTimer(50f);
                stageTimer.Start();
                Debug.Log("Stage1: Compass setup");

                SetCubeLights(AllLEDs, Colour.YELLOW, cube4);
                SetCubeLights(C2.Led.LED0 | C2.Led.LED1 | C2.Led.LED6 | C2.Led.LED7, Colour.YELLOW, cube11);

                if (stageTimer.HasElapsed())
                {
                    ClearCubeLights(cube4, cube11);
                    SetCubeLights(C2.Led.LED1 | C2.Led.LED3 | C2.Led.LED5 | C2.Led.LED7, Colour.RED, cube1);
                    SetCubeLights(C2.Led.LED0 | C2.Led.LED2 | C2.Led.LED4 | C2.Led.LED6, Colour.ORANGE, cube0);
                    SetCubeLights(C2.Led.LED2 | C2.Led.LED3 | C2.Led.LED6 | C2.Led.LED7, Colour.GREEN, cube3);
                    stageTimer.Start();
                }
                break;

            case State.Stage2:
                stageTimer = new SimpleTimer(20f);
                stageTimer.Start();
                Debug.Log("Stage2: Break mode");

                SetCubeLights(AllLEDs, 100, 100, 100, cube0, cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9, cube10, cube11);

                if (stageTimer.HasElapsed())
                {
                    ClearCubeLights(cube0, cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9, cube10, cube11);
                    stageTimer.Start();
                }
                break;

            case State.Stage3:
                Debug.Log("Stage3: Social mode - cycling colours");

                if (stage4Timer == null)
                {
                    stage4Timer = new SimpleTimer(20f);
                    stage4Timer.Start();

                    stage4Colours["cube4_RCross"] = Colour.RED;
                    stage4Colours["cube4_Lower"] = Colour.ORANGE;
                    stage4Colours["cube4_Top"] = Colour.INDIGO;
                    stage4Colours["cube11_Top"] = Colour.RED;
                    stage4Colours["cube11_RCross"] = Colour.ORANGE;
                    stage4Colours["cube11_Lower"] = Colour.YELLOW;
                    stage4Colours["cube1_RCross"] = Colour.ORANGE;
                    stage4Colours["cube1_Top"] = Colour.RED;
                    stage4Colours["cube1_Lower"] = Colour.YELLOW;
                    stage4Colours["cube0_RCross"] = Colour.INDIGO;
                    stage4Colours["cube0_Top"] = Colour.RED;
                    stage4Colours["cube0_Lower"] = Colour.VIOLET;
                    stage4Colours["cube3_RCross"] = Colour.INDIGO;
                    stage4Colours["cube3_Top"] = Colour.RED;
                    stage4Colours["cube3_Lower"] = Colour.VIOLET;
                }

                if (stage4Timer.HasElapsed())
                {
                    foreach (var key in stage4Colours.Keys.ToList())
                        stage4Colours[key] = GetNextColour(stage4Colours[key]);

                    SetCubeLights(RCross, stage4Colours["cube4_RCross"], cube4);
                    SetCubeLights(C2.Led.LED4 | C2.Led.LED7, stage4Colours["cube4_Lower"], cube4);
                    SetCubeLights(C2.Led.LED0 | C2.Led.LED5, stage4Colours["cube4_Top"], cube4);

                    SetCubeLights(RCross, stage4Colours["cube11_RCross"], cube11);
                    SetCubeLights(C2.Led.LED0 | C2.Led.LED5, stage4Colours["cube11_Top"], cube11);
                    SetCubeLights(C2.Led.LED4 | C2.Led.LED7, stage4Colours["cube11_Lower"], cube11);

                    SetCubeLights(RCross, stage4Colours["cube1_RCross"], cube1);
                    SetCubeLights(C2.Led.LED0 | C2.Led.LED5, stage4Colours["cube1_Top"], cube1);
                    SetCubeLights(C2.Led.LED4 | C2.Led.LED7, stage4Colours["cube1_Lower"], cube1);

                    SetCubeLights(RCross, stage4Colours["cube0_RCross"], cube0);
                    SetCubeLights(C2.Led.LED4 | C2.Led.LED7, stage4Colours["cube0_Top"], cube0);
                    SetCubeLights(C2.Led.LED0 | C2.Led.LED5, stage4Colours["cube0_Lower"], cube0);

                    SetCubeLights(RCross, stage4Colours["cube3_RCross"], cube3);
                    SetCubeLights(C2.Led.LED4 | C2.Led.LED7, stage4Colours["cube3_Top"], cube3);
                    SetCubeLights(C2.Led.LED0 | C2.Led.LED5, stage4Colours["cube3_Lower"], cube3);

                    stage4Timer.Start();
                    Debug.Log("Advanced all colours.");
                }
                break;

            case State.Stage4:
                Debug.Log("Stage4: Compass navigation");
                float turnData = sicData.turnTableA.tableAngle;

                if ((turnData > 0 && turnData < 23) || (turnData >= 337 && turnData <= 360))
                {
                    SetCubeLights(C2.Led.LED0 | C2.Led.LED1, Colour.GREEN, cube4);
                    SetCubeLights(AllLEDs, Colour.GREEN, cube0);
                }
                else if (turnData >= 23 && turnData < 46)
                {
                    SetCubeLights(RCross, Colour.GREEN, cube4);
                    SetCubeLights(C2.Led.LED4, Colour.GREEN, cube0);
                    SetCubeLights(C2.Led.LED0, Colour.GREEN, cube1);
                }
                else if (turnData >= 46 && turnData < 113)
                {
                    SetCubeLights(C2.Led.LED1 | C2.Led.LED3, Colour.GREEN, cube4);
                    SetCubeLights(AllLEDs, Colour.GREEN, cube1);
                }
                else if (turnData >= 113 && turnData < 157)
                {
                    SetCubeLights(LCross, Colour.GREEN, cube4);
                    SetCubeLights(C2.Led.LED2, Colour.GREEN, cube1);
                    SetCubeLights(C2.Led.LED1, Colour.GREEN, cube11);
                }
                else if (turnData >= 157 && turnData < 202)
                {
                    SetCubeLights(C2.Led.LED2 | C2.Led.LED3, Colour.GREEN, cube4);
                    SetCubeLights(AllLEDs, Colour.GREEN, cube11);
                }
                else if (turnData >= 202 && turnData < 248)
                {
                    SetCubeLights(RCross, Colour.GREEN, cube4);
                    SetCubeLights(C2.Led.LED0, Colour.GREEN, cube11);
                    SetCubeLights(C2.Led.LED3, Colour.GREEN, cube3);
                }
                else if (turnData >= 248 && turnData < 292)
                {
                    SetCubeLights(C2.Led.LED2 | C2.Led.LED3, Colour.GREEN, cube4);
                    SetCubeLights(AllLEDs, Colour.GREEN, cube3);
                }
                else if (turnData >= 292 && turnData < 337)
                {
                    SetCubeLights(RCross, Colour.GREEN, cube4);
                    SetCubeLights(C2.Led.LED1, Colour.GREEN, cube3);
                    SetCubeLights(C2.Led.LED3, Colour.GREEN, cube0);
                }
                break;
            case State.Stage5:
                Debug.Log("Stage5: Emergency mode");
                if (stage4Timer == null)
                {
                    SetCubeLights(AllLEDs, Colour.RED, cube0, cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9, cube10, cube11);
                    stage4Timer = new SimpleTimer(20f);
                    stage4Timer.Start();
                }
                if (stage4Timer.HasElapsed())
                {
                    ClearCubeLights(cube0, cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9, cube10, cube11);
                    stageTimer.Start();
                }
                break;
            case State.Stage6:
                Debug.Log("Stage6: Game Mode");
                break;
        }
    }

    // === UNITY METHODS ===
    void Start()
    {
        cube0 = C2.Cube.SpeakerA;
        cube1 = C2.Cube.VibratorA;
        cube2 = C2.Cube.AnalogStickA;
        cube3 = C2.Cube.TriggerButtonA;
        cube4 = C2.Cube.TurnTableA;
        cube5 = C2.Cube.SpeakerB;
        cube6 = C2.Cube.VibratorB;
        cube7 = C2.Cube.AnalogStickB;
        cube8 = C2.Cube.TriggerButtonB;
        cube9 = C2.Cube.TurnTableB;
        cube10 = C2.Cube.DPad;
        cube11 = C2.Cube.ShapesButton;

        for (int i = 0; i < cubeList.Length; i++)
        {
            cubeList[i].cube = (C2.Cube)i;
            cubeList[i].connected = false; 
        }
        var startParam = new C2.ControllerStartParam { intervalMilliseconds = 100 };
        var result = C2.SieC2StartControllerData(startParam);
        Debug.Log($"Start Controller: {result}");

        currentState = State.Stage1;
        previousState = State.None;
        HandleStateLogic();
    }

    void Update()
    {
        if (C2.SieC2GetControllerData(out sicData) != C2.Result.SIE_C2_OK) return;
        
        if (currentState == State.Stage1)
        {
            Debug.Log("Compass created. Advancing to navigation...");
            currentState = State.Stage4;
        }
        if (sicData.buttons.square && Time.time - lastInputTime > debounceDelay)
        {
            currentState = State.Stage2;
            lastInputTime = Time.time;
        }
        else if (sicData.buttons.circle && Time.time - lastInputTime > debounceDelay)
        {
            currentState = State.Stage3;
            lastInputTime = Time.time;
        }
        else if (sicData.buttons.triangle && Time.time - lastInputTime > debounceDelay)
        {
            currentState = State.Stage5;
            lastInputTime = Time.time;
        }

        if (currentState != previousState)
        {
            lastInputTime = Time.time;
        }

        HandleStateLogic();
        previousState = currentState;
    }
}