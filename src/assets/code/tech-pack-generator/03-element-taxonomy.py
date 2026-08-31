# Second version. Every attribute is tagged with how it can be known:
#   vision    — visible in the drawing
#   inference — invisible, only knowable from construction

ELEMENTS = {
    "pocket": {
        "multiple": True,
        "detect": True,
        "attributes": {
            "type":        {"fill": "vision",    "terms": ["welt", "patch", "slide-in", "chest", "cargo", "jetted"]},
            "topstitched": {"fill": "vision",    "terms": ["yes", "no"]},
            "flap":        {"fill": "vision",    "terms": ["yes", "no"]},
            "fused":       {"fill": "inference", "terms": ["yes", "no"]},   # interfacing is invisible
        },
    },
    "hood": {
        "multiple": False,
        "detect": True,
        "attributes": {
            "drawstring": {"fill": "vision",    "terms": ["yes", "no"]},
            "lined":      {"fill": "inference", "terms": ["yes", "no"]},
        },
    },
    "neckline": {
        "multiple": False,
        "detect": True,
        "attributes": {
            "types":            {"fill": "vision",    "terms": ["scooped", "halter", "v-neckline", "crew", "cowl", "boat neck", "keyhole"]},
            "neckline facing":  {"fill": "inference", "terms": ["yes", "no"]},
            "facing finish":    {"fill": "inference", "terms": ["bagged out into lining", "overlocked", "pin hem", "binding"]},
        },
    },
}
