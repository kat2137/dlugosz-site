// ...existing code...
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using C2 = UnityEngine.Plugins.SieConfigurableControllerUnity;

// Remove duplicate enum and abstract type declarations here (use the project's shared definitions)

public class Full_Game : MonoBehaviour
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
    // ...existing code...

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

    public State CurrentState = State.None;
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

        
    }
    void Update()
    {
        // Update code here
    }
}