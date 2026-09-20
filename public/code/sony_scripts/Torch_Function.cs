using UnityEngine;
using static UnityEngine.Plugins.SieConfigurableControllerUnity;
using C2 = UnityEngine.Plugins.SieConfigurableControllerUnity;

public class Stage7TorchFunction : MonoBehaviour
{
    private C2.ControllerData data;

    public void Execute()
    {
        if (C2.SieC2GetControllerData(out data) != C2.Result.SIE_C2_OK) return;

        bool triggerUp = data.TriggerButtonB.trigger1;
        bool triggerDown = data.TriggerButtonB.trigger;

        if (triggerUp)
        {
            Debug.Log("Torch on");
            ControllerLightUtils.SetCubeLights(C2.Led.ALL, Colour.YELLOW, C2.Cube.VibratorB, C2.Cube.TriggerButtonB);
        }
        else if (triggerDown)
        {
            Debug.Log("Torch off");
            ControllerLightUtils.ClearCubeLights(C2.Cube.VibratorB, C2.Cube.TriggerButtonB);
        }
    }
}
