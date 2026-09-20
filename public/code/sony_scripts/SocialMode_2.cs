// ...existing code...
using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using C2 = UnityEngine.Plugins.SieConfigurableControllerUnity;


public class SocialMode_2 : MonoBehaviour
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

    // public cube fields so you can wire them in inspector or assign from Main_Gameplay
    public C2.Cube cube0, cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9, cube10, cube11;

    private Dictionary<string, Colour> stage4Colours = new();
    private SimpleTimer stage4Timer;
    private Dictionary<C2.Cube, CubeLightState> _cubeLightCache = new();

    private const C2.Led AllLEDs = C2.Led.LED0 | C2.Led.LED1 | C2.Led.LED2 | C2.Led.LED3 |
                                   C2.Led.LED4 | C2.Led.LED5 | C2.Led.LED6 | C2.Led.LED7;
    private const C2.Led RCross = C2.Led.LED1 | C2.Led.LED2 | C2.Led.LED5 | C2.Led.LED6;
    private const C2.Led LCross = C2.Led.LED0 | C2.Led.LED3 | C2.Led.LED4 | C2.Led.LED7;

    private struct CubeLightState : IEquatable<CubeLightState>
    {
        public C2.Led leds;
        public uint red, green, blue;
        public bool Equals(CubeLightState other) =>
            leds == other.leds && red == other.red && green == other.green && blue == other.blue;
        public override int GetHashCode() => HashCode.Combine(leds, red, green, blue);
    }

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

    // call this from Update() or externally
    public void RunSocialMode()
    {
        Debug.Log("Social mode - cycling colours");

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
    }

    private Colour GetNextColour(Colour current)
    {
        var values = (Colour[])Enum.GetValues(typeof(Colour));
        int index = Array.IndexOf(values, current);
        return values[(index + 1) % values.Length];
    }

    private void SetCubeLights(C2.Led leds, Colour colour, params C2.Cube[] cubes)
    {
        var (r, g, b) = ColourValues[colour];
        var lights = new C2.LedParam { led = leds, red = r, green = g, blue = b };

        foreach (var cube in cubes)
        {
            if (_cubeLightCache.TryGetValue(cube, out var prev) &&
                prev.Equals(new CubeLightState { leds = leds, red = r, green = g, blue = b }))
                continue;

            C2.SieC2SetLED(cube, in lights);
            _cubeLightCache[cube] = new CubeLightState { leds = leds, red = r, green = g, blue = b };
        }
    }

    private void Update()
    {
        RunSocialMode();
    }
}
