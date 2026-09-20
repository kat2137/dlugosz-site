using System.Collections;
using UnityEngine;
using static UnityEngine.Plugins.SieConfigurableControllerUnity;
using C2 = UnityEngine.Plugins.SieConfigurableControllerUnity;

public class Stage1CompassSetup : MonoBehaviour
{
    public void Execute()
    {
        Debug.Log("Stage1: Compass setup (with 5-second light sequence)");
        StartCoroutine(RunStage());
    }

    private IEnumerator RunStage()
    {
        // Clear all lights first
        ControllerLightUtils.ClearCubeLights(
            C2.Cube.TurnTableA,
            C2.Cube.ShapesButton,
            C2.Cube.SpeakerA,
            C2.Cube.VibratorA,
            C2.Cube.TriggerButtonA
        );

        // === Pair 1 ===
        ControllerLightUtils.SetCubeLights(C2.Led.LED2 | C2.Led.LED3 | C2.Led.LED6 | C2.Led.LED7, Colour.YELLOW, C2.Cube.TurnTableA);
        ControllerLightUtils.SetCubeLights(
            C2.Led.LED0 | C2.Led.LED1 | C2.Led.LED4 | C2.Led.LED5,
            Colour.YELLOW,
            C2.Cube.ShapesButton
        );
        yield return new WaitForSeconds(5f);

        // === Pair 2 ===
        ControllerLightUtils.SetCubeLights(C2.Led.LED2 | C2.Led.LED3 | C2.Led.LED6 | C2.Led.LED7, Colour.YELLOW, C2.Cube.SpeakerA);
        ControllerLightUtils.SetCubeLights(C2.Led.LED0 | C2.Led.LED1 | C2.Led.LED4 | C2.Led.LED5, Colour.YELLOW, C2.Cube.TurnTableA);
        yield return new WaitForSeconds(5f);

        // === Pair 3 ===
        ControllerLightUtils.SetCubeLights(C2.Led.LED0 | C2.Led.LED2 | C2.Led.LED4 | C2.Led.LED6, Colour.YELLOW, C2.Cube.VibratorA);
        ControllerLightUtils.SetCubeLights(C2.Led.LED1 | C2.Led.LED3 | C2.Led.LED5 | C2.Led.LED7, Colour.YELLOW, C2.Cube.TurnTableA);
        yield return new WaitForSeconds(5f);

        // === Pair 4 ===
        ControllerLightUtils.SetCubeLights(C2.Led.LED1 | C2.Led.LED3 | C2.Led.LED5 | C2.Led.LED7, Colour.YELLOW, C2.Cube.TriggerButtonA);
        ControllerLightUtils.SetCubeLights(C2.Led.LED0 | C2.Led.LED2 | C2.Led.LED4 | C2.Led.LED6, Colour.YELLOW, C2.Cube.TurnTableA);
        yield return new WaitForSeconds(5f);

        Debug.Log("Stage1: Compass setup complete.");
    }
}
