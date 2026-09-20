import type { Section } from '../types';

/**
 * Approved project copy, ported verbatim from the design prototype.
 * Do not paraphrase — see the design handoff.
 */
export const sections: Section[] = [
  {
    title: 'Arm design',
    meta: 'CAD · mechanism',
    lede: 'The brief was a hand that could hold a needle and pull a stitch. Everything below follows from that: joints that bend without a pin, fingertips that grip thread, and a wrist and elbow taken from human anatomy rather than from a robot arm.',
    groups: [
      {
        label: 'Finger joints',
        tag: 'rolling contact',
        text: 'Every finger joint is a rolling-contact joint: two curved surfaces roll against each other instead of turning on a pin, cross-pleated together with nylon thread so the thread both holds the surfaces in contact and returns the joint. It gives a smooth arc with almost no friction, no pin to shear, and a joint that can be re-laced by hand in minutes — printed in PETG and laced on the bench.',
        plates: [
          { id: 'arm-cad', caption: 'Rolling-contact joint, CAD section', placeholder: 'CAD of the rolling contact joint' },
          { id: 'arm-tests', caption: 'Cross-pleated nylon lacing', placeholder: 'Close-up of the nylon cross-lacing' },
        ],
      },
      {
        label: 'Fingertips',
        tag: 'grip · needle',
        text: 'The fingertip is the only part that touches the needle, so it carries both the grip and the sensing. A printed frame is fitted first, then the frame and its sensor are cast together into a silicone tip — soft enough to seat a needle without letting it roll, and stiff enough to survive a full session.',
        plates: [
          
          { id: 'arm-tip-grip', caption: 'Needle seated in the tip groove', placeholder: 'Fingertip holding the needle' },
          { id: 'arm-tip-cad', caption: 'Casting the frame and sensor into silicone fingertip', placeholder: 'Casting the silicone fingertip' },
        ],
      },
      {
        label: 'Wrist and elbow',
        tag: 'after human anatomy',
        text: 'The wrist and elbow are modelled on the human joints rather than on servo geometry: a two-axis wrist that flexes and deviates about offset centres, and an elbow whose tendon insertion points sit where the biceps and triceps attach, so the pull angle changes through the arc the way an arm\u2019s does. It makes the reach less mechanical and the sewing posture reachable at all.',
        plates: [
          { id: 'arm-wrist-ref', caption: 'Anatomical reference, wrist and elbow', placeholder: 'Anatomy reference / inspiration' },
          
          { id: 'arm-elbow', caption: 'Bearing-based revolute wrist joint, CAD', placeholder: 'Wrist joint CAD' },
        ],
      },
    ],
    body1: 'Six joint systems were modelled and printed as test fingers — pin hinges, a compliant living hinge, a cross-tendon four-bar, a ball socket, a pulley return and the rolling-contact joint that was carried through. Each was judged on travel under load, drift after a hundred cycles, and whether it could be repaired without cutting the part open.',
    body2: 'The production hand has seventeen driven axes in three tendon families, routed through channels moulded into the forearm so the cable path is serviceable from outside. The shell prints in two halves around those channels. Modelled in Fusion 360, printed in PETG with TPU fingertip pads.',
    takeaway: 'The only gripper dexterous enough to complete a variety of actions with different sets of tools is a human hand. Tested in a study comparing beginners and professionals in sewing, the fingers proved to move more with increased experience, while shoulders or the object held were moving less and less.',
    notes: ['Fusion 360', 'Rolling-contact joints', '17 joints', 'PETG · TPU · nylon'],
  },
  {
    title: 'Electronics',
    meta: 'Drive · control',
    lede: 'Seventeen driven axes, one control board, and a loom that has to survive being opened every time a joint is re-laced.',
    groups: [
      {
        label: 'Drive and control',
        tag: 'servo bed',
        text: 'Servos sit in a bed behind the wrist so their mass stays off the fingers, each driven from a single control board with a shared bus for position feedback. Tendon groups are addressed as channels rather than individual joints, which keeps the control surface small enough to drive from predicted poses.',
        plates: [
        ],
      },
    ],
    body1: 'Keeping the electronics behind the wrist was a serviceability decision as much as a mass one: the hand is opened often, and nothing that has to be re-soldered lives inside a finger.',
    body2: 'Position feedback on a shared bus means a joint that drifts is identified from the log rather than by eye.',
    takeaway: 'One connector, one bus, no soldering inside a finger — the electronics were designed around how often the hand gets taken apart.',
    notes: ['Custom control board', 'Shared feedback bus', 'Single break-out connector'],
  },
  {
    title: 'Robot training',
    meta: 'Machine learning',
    lede: 'Rather than programming a stitch, the hand learns one: reference footage of sewing is turned into pose sequences, and a small recurrent model predicts where the needle goes next.',
    groups: [
      {
        label: 'Capture',
        tag: 'footage → poses',
        text: 'Footage is sampled every fourth frame, hand landmarks lifted with OpenCV, and the needle tip tracked as a fourth point. That gives a sequence rather than a single target — a stitch is a rhythm, and the approach angle only makes sense after the pull before it.',
        plates: [
          { id: 'train-cap-still', src: 'train-wilor-plot.png', alt: 'Matplotlib 3D plot of hand keypoints, one coloured polyline per finger', caption: 'WiLoR plotting of the hand using matplotlib, single frame' },
        ],
      },
      {
        label: 'Motion',
        tag: 'pose → cable travel',
        text: 'Predicted poses are handed to the tendon solver, which converts joint angles into millimetres of cable travel per group and drives the servos. Motion is tuned on the arc rather than the endpoint: the hand is scored on whether it passes through the same intermediate poses a practised hand does.',
        plates: [
        ],
      },
      {
        label: 'Model',
        tag: 'torch · gru',
        text: 'A two-layer GRU over joint angles plus needle position, trained to predict the next pose. Scoring on pose error rather than a finished seam shows where the hand diverges frame by frame, instead of only whether the stitch held.',
        plates: [],
      },
    ],
    body1: 'Training targets the pose, not the outcome. The tendon solver then turns each predicted pose into cable travel per group, which is what the servos actually receive.',
    body2: 'Errors are read as diagnostics rather than failures: a consistent offset points at the joint model, a growing one at cable stretch.',
    takeaway: 'Grip pressure and the pause before a knot never survive video capture. That gap is the argument of the project, not a bug in it.',
    notes: ['PyTorch · GRU', 'OpenCV', 'Pose sequences', 'Tendon solver'],
  },
  {
    title: 'Artist interviews',
    meta: 'Research',
    lede: 'The build is paired with conversations with people who sew by hand for a living — the part of the knowledge that no dataset was going to supply.',
    groups: [
      {
        label: 'Conversations',
        tag: 'field research',
        text: 'The questions were deliberately narrow: what were you taught explicitly, what did you only learn by feel, and what would you refuse to write down. The answers were consistent about tension — every maker judged thread tension by hand, and none could name a number for it.',
        plates: [
          { id: 'int-portrait', src: 'int-weaver.png', alt: 'A traditional weaver working at a warp-weighted hand loom', caption: 'Traditional weaver' },
          { id: 'int-hands', src: 'int-handsewing.png', alt: 'Two hands sewing a black panel by hand, filmed from above as reference footage', caption: 'Handsewing captured for robot training' },
        ],
      },
    ],
    body1: 'Those conversations set the machine\u2019s brief. They decided which failures were interesting enough to keep in the documentation.',
    body2: 'They are also the reason the project is framed as a question about capture rather than a claim about automation.',
    takeaway: 'Interviews turned the project from an engineering exercise into an argument: the hand is built to demonstrate what a recording of a skill leaves out.',
    notes: ['Interviews', 'Field notes', 'Craft knowledge', 'Ethics of capture'],
  },
  {
    title: 'Limits and next revision',
    meta: 'Honest list',
    lede: 'What the hand cannot do yet, written down deliberately — each limit is the brief for the next version.',
    groups: [
      {
        label: 'Known limits',
        tag: 'v1',
        text: 'No force feedback at the fingertip, so pressure is inferred from cable tension rather than felt; a wrist envelope narrower than a human one; a stitch rate far below a practised hand; and nylon lacing that relaxes over a long session and has to be re-tensioned.',
        plates: [],
      },
    ],
    body1: 'The next revision adds a strain gauge behind each fingertip pad, closed-loop tension so the hand re-zeros itself between runs, and a stiffer lacing pattern at the base joints.',
    body2: 'Each limit points at the next build rather than closing the piece.',
    takeaway: 'The interesting failures are the ones the interviews predicted: everything that depended on feel rather than geometry.',
    notes: ['No force sensing', 'Narrow envelope', 'Lacing relaxation', 'V2 planned'],
  },
];
