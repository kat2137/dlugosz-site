using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using static UnityEngine.Plugins.SieConfigurableControllerUnity;
using C2 = UnityEngine.Plugins.SieConfigurableControllerUnity;

public class Stage3SocialMode : MonoBehaviour
{
    private Dictionary<string, Colour> cubeColours = new();

    public void Execute()
    {
        Debug.Log("Stage3: Social mode - cycling colours");

        if (cubeColours.Count == 0)
        {
            cubeColours["cube4"] = Colour.RED;
            cubeColours["cube11"] = Colour.ORANGE;
            cubeColours["cube1"] = Colour.GREEN;
            cubeColours["cube0"] = Colour.INDIGO;
            cubeColours["cube3"] = Colour.VIOLET;
        }

        foreach (var key in cubeColours.Keys.ToList())
            cubeColours[key] = ControllerLightUtils.NextColour(cubeColours[key]);

        ControllerLightUtils.SetCubeLights(C2.Led.ALL, cubeColours["cube4"], C2.Cube.TurnTableA);
        ControllerLightUtils.SetCubeLights(C2.Led.ALL, cubeColours["cube11"], C2.Cube.ShapesButton);
        ControllerLightUtils.SetCubeLights(C2.Led.ALL, cubeColours["cube1"], C2.Cube.VibratorA);
        ControllerLightUtils.SetCubeLights(C2.Led.ALL, cubeColours["cube0"], C2.Cube.SpeakerA);
        ControllerLightUtils.SetCubeLights(C2.Led.ALL, cubeColours["cube3"], C2.Cube.TriggerButtonA);
    }
}
