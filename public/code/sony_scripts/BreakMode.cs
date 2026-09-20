using UnityEngine;
using static UnityEngine.Plugins.SieConfigurableControllerUnity;
using C2 = UnityEngine.Plugins.SieConfigurableControllerUnity;

public class Stage2BreakMode : MonoBehaviour
{
    public void Execute()
    {
        Debug.Log("Stage2: Break mode - All lights white");
        ControllerLightUtils.SetCubeLights(
            C2.Led.ALL, Colour.YELLOW,
            C2.Cube.SpeakerA, C2.Cube.VibratorA, C2.Cube.AnalogStickA, C2.Cube.TriggerButtonA,
            C2.Cube.TurnTableA, C2.Cube.SpeakerB, C2.Cube.VibratorB, C2.Cube.AnalogStickB,
            C2.Cube.TriggerButtonB, C2.Cube.TurnTableB, C2.Cube.DPad, C2.Cube.ShapesButton
        );
    }
}
