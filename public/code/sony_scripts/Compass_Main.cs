using UnityEngine;
using static UnityEngine.Plugins.SieConfigurableControllerUnity;
using C2 = UnityEngine.Plugins.SieConfigurableControllerUnity;

public class Stage4CompassNavigation : MonoBehaviour
{
    private C2.ControllerData sicData;

    // Constants to match your original script
    private const C2.Led AllLEDs = C2.Led.LED0 | C2.Led.LED1 | C2.Led.LED2 | C2.Led.LED3 |
                                   C2.Led.LED4 | C2.Led.LED5 | C2.Led.LED6 | C2.Led.LED7;
    private const C2.Led RCross = C2.Led.LED1 | C2.Led.LED2 | C2.Led.LED5 | C2.Led.LED6;
    private const C2.Led LCross = C2.Led.LED0 | C2.Led.LED3 | C2.Led.LED4 | C2.Led.LED7;

    public void Execute()
    {
        if (C2.SieC2GetControllerData(out sicData) != C2.Result.SIE_C2_OK)
            return;

        Debug.Log("Stage4: Compass navigation");

        float turnData = sicData.turnTableA.tableAngle;

        if ((turnData > 0 && turnData < 23) || (turnData >= 337 && turnData <= 360))
        {
            ControllerLightUtils.SetCubeLights(C2.Led.LED0 | C2.Led.LED1, Colour.GREEN, C2.Cube.TurnTableA);
            ControllerLightUtils.SetCubeLights(AllLEDs, Colour.GREEN, C2.Cube.SpeakerA);
        }
        else if (turnData >= 23 && turnData < 46)
        {
            ControllerLightUtils.SetCubeLights(RCross, Colour.GREEN, C2.Cube.TurnTableA);
            ControllerLightUtils.SetCubeLights(C2.Led.LED4, Colour.GREEN, C2.Cube.SpeakerA);
            ControllerLightUtils.SetCubeLights(C2.Led.LED0, Colour.GREEN, C2.Cube.VibratorA);
        }
        else if (turnData >= 46 && turnData < 113)
        {
            ControllerLightUtils.SetCubeLights(C2.Led.LED1 | C2.Led.LED3, Colour.GREEN, C2.Cube.TurnTableA);
            ControllerLightUtils.SetCubeLights(AllLEDs, Colour.GREEN, C2.Cube.VibratorA);
        }
        else if (turnData >= 113 && turnData < 157)
        {
            ControllerLightUtils.SetCubeLights(LCross, Colour.GREEN, C2.Cube.TurnTableA);
            ControllerLightUtils.SetCubeLights(C2.Led.LED2, Colour.GREEN, C2.Cube.VibratorA);
            ControllerLightUtils.SetCubeLights(C2.Led.LED1, Colour.GREEN, C2.Cube.ShapesButton);
        }
        else if (turnData >= 157 && turnData < 202)
        {
            ControllerLightUtils.SetCubeLights(C2.Led.LED2 | C2.Led.LED3, Colour.GREEN, C2.Cube.TurnTableA);
            ControllerLightUtils.SetCubeLights(AllLEDs, Colour.GREEN, C2.Cube.ShapesButton);
        }
        else if (turnData >= 202 && turnData < 248)
        {
            ControllerLightUtils.SetCubeLights(RCross, Colour.GREEN, C2.Cube.TurnTableA);
            ControllerLightUtils.SetCubeLights(C2.Led.LED0, Colour.GREEN, C2.Cube.ShapesButton);
            ControllerLightUtils.SetCubeLights(C2.Led.LED3, Colour.GREEN, C2.Cube.TriggerButtonA);
        }
        else if (turnData >= 248 && turnData < 292)
        {
            ControllerLightUtils.SetCubeLights(C2.Led.LED2 | C2.Led.LED3, Colour.GREEN, C2.Cube.TurnTableA);
            ControllerLightUtils.SetCubeLights(AllLEDs, Colour.GREEN, C2.Cube.TriggerButtonA);
        }
        else if (turnData >= 292 && turnData < 337)
        {
            ControllerLightUtils.SetCubeLights(RCross, Colour.GREEN, C2.Cube.TurnTableA);
            ControllerLightUtils.SetCubeLights(C2.Led.LED1, Colour.GREEN, C2.Cube.TriggerButtonA);
            ControllerLightUtils.SetCubeLights(C2.Led.LED3, Colour.GREEN, C2.Cube.SpeakerA);
        }
    }
}
