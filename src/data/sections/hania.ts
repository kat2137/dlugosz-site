import type { Section } from '../types';

/**
 * Approved project copy, ported verbatim from the design prototype.
 * Do not paraphrase — see the design handoff.
 */
export const sections: Section[] = [
  {
    title: 'Robot training',
    meta: 'Imitation \u00b7 kinematics \u00b7 sim',
    lede: 'Rather than programming a stitch, the hand is taught one. Reference footage of hand-sewing is lifted into 21 landmarks a frame, those landmarks become joint angles through the same link tree the arm is built on, and the angles are retargeted onto a hand whose fingers are not the proportions of the one in the video.',
    groups: [
      {
        label: 'Imitation with WiLoR',
        tag: 'footage \u2192 landmarks \u2192 angles',
        text: 'Footage runs through WiLoR, which returns 21 hand landmarks per frame in a fixed order \u2014 wrist at index 0, then thumb through pinky in fours, each fingertip last. The per-frame JSON is globbed into a single NumPy array shaped [n_frames, 21, 3] and plotted with matplotlib, one coloured polyline per finger, so a clip can be read as a sequence of poses rather than a wall of numbers. Angles come out of the landmarks as vectors: each bone is the vector between two joints, and the flexion angle is the arccos of the normalised dot product between adjacent bones \u2014 taken in the wrist frame for MCP, and in the MCP frame for PIP and tip.',
        plates: [
          { id: 'train-wilor-plot', src: 'train-wilor-plot.png', alt: 'Matplotlib 3D plot of hand keypoints, one coloured polyline per finger', caption: 'WiLoR landmarks plotted per frame, matplotlib' },
          { peek: { repo: 'robotic-craftsman', path: 'main_motion/grasp_test2.py', lines: 20 },
            caption: 'grasp_test2.py \u2014 the grasp rig the captured poses are driven through' },
        ],
      },
      {
        label: 'Calibrating motors',
        tag: 'on the hardware',
        text: 'Calibration runs on the arm itself rather than in simulation. The finger servos are addressed as PWM channels through a PCA9685 over I\u00b2C at 60 Hz, between 1000 and 2000 \u00b5s; the wrist runs on Feetech STS3215 bus servos over a single half-duplex serial line at 1 Mbaud, addressed by ID. A sweep script walks every channel across its range, waits for each position to settle, and writes step, channel, commanded position, settle time and measured angle to CSV \u2014 tied to the video by a clap on frame one, so the log and the footage share a timebase. Travel limits are then written into the bus servos\u2019 own EPROM: 2000\u20134095 counts for wrist rotate, 2200\u20133000 for wrist tilt, so a bad command cannot drive a joint past its stop.',
        plates: [
          { src: 'train-calibration-rig.jpg', alt: 'The arm on the bench, servos and loom exposed during calibration',
            caption: 'Calibration runs on the arm itself, not in simulation' },
          { peek: { repo: 'robotic-craftsman', path: 'main_motion/calib/data/position_log.csv', lines: 18 },
            caption: 'position_log.csv \u2014 step, channel, commanded position, settle time, measured angle' },
        ],
      },
      {
        label: 'Kinematics and pose estimation',
        tag: 'forward \u00b7 inverse \u00b7 palm frame',
        text: 'The arm is described as a link tree: each link carries a parent, a rotation axis, an offset from that parent and, where a joint is tendon-driven rather than motor-driven, the driver it follows and the ratio it follows it at. Forward kinematics composes Rodrigues rotations down the tree to place any joint in space; the inverse solve runs the other way, from a fingertip target back to the angles that reach it. Wrist tilt and roll are the part WiLoR cannot give \u2014 it reports the wrist only in relation to the finger joints, so it carries no bend or rotation. They are recovered instead by building a palm frame from the landmarks: the wrist-to-middle-MCP vector as one axis, the index-to-pinky MCP vector as the second, their cross product as the palm normal, re-orthogonalised, then read off as tilt and roll. Motion logic follows Jazar, \u201cTheory of Applied Robotics: Kinematics, Dynamics and Control\u201d; object orientation in frame is estimated by PCA on the contour axes.',
        plates: [
          { src: 'train-kinematics.jpg', alt: 'The arm in Fusion with a rotation axis drawn on every joint and the wrist arc measured',
            caption: 'Every joint carries an axis and an offset from its parent' },
          { peek: { repo: 'robotic-craftsman', path: 'main_motion/f_kinematics.py', lines: 20 },
            caption: 'f_kinematics.py \u2014 the link tree, and Rodrigues down it' },
          { peek: { repo: 'robotic-craftsman', path: 'main_motion/i_kinematics.py', lines: 20 },
            caption: 'i_kinematics.py \u2014 fingertip target back to joint angles' },
        ],
      },
      {
        label: 'Simulation',
        tag: 'fusion 360 \u2192 mujoco',
        text: 'Every link is animated in Fusion 360 and exported as meshes, then assembled into a MuJoCo model \u2014 palm.xml for the hand alone, palm_with_frame.xml for the hand on the arm frame \u2014 through the Fusion-to-MuJoCo export. In simulation the joints get physics: actuator ranges, the coupling between a driven joint and its driver, and contact, so a grasp can be run against a needle before it is run against a real one. The driver script maps raw servo counts onto simulated joint angles (2048 open, 3100 closed, a ratio-1.0 joint reaching about 1.5 rad at full curl), which means a pose can be sent to the sim and the bench in the same units.',
        plates: [
          { clip: 'sim-grasp.mp4', alt: 'The hand closing in MuJoCo, joints and contacts simulated',
            caption: 'The hand under physics in MuJoCo, driven from the same units as the bench' },
          { peek: { repo: 'robotic-craftsman', path: 'main_motion/mjc_demo.py', lines: 20 },
            caption: 'mjc_demo.py \u2014 links mapped onto MuJoCo bodies, joints and actuators' },
        ],
      },
      {
        label: 'Retargeting',
        tag: 'video hand \u2192 robot hand',
        text: 'The robot\u2019s fingers are not the proportions of the hand in the footage, so angles cannot simply be copied across. The arm was measured by logging the position of every finger through its range and comparing that log against real video, drawn over frame by frame in matplotlib, until each segment\u2019s share of the finger was known: for the index, roughly 0.35 MCP, 0.46 PIP, 0.15 DIP; for the thumb, 0.44 and 0.56; with the bus servos turning about 2.6 degrees per 100 \u00b5s. Those ratios are stored and applied as a scaling layer, and the grasp itself is matched on vector distance from the fingertip rather than on joint angle \u2014 so what transfers from the footage is the shape of the grasp, not the geometry of the hand that made it.',
        plates: [
          { peek: { repo: 'robotic-craftsman', path: 'main_motion/ratios.json', lines: 14 },
            caption: 'ratios.json \u2014 each segment\u2019s share of its finger, measured off the arm' },
          { peek: { repo: 'robotic-craftsman', path: 'main_motion/retargeting.py', lines: 20 },
            caption: 'retargeting.py \u2014 the scaling layer, and grasp matched on fingertip distance' },
        ],
      },
      {
        label: 'Vision',
        tag: 'in progress',
        text: 'Not finished. The camera is being brought up to answer one question the arm cannot answer from its own joint angles: where it actually is in relation to the frame. A YOLO26 detector with depth estimation gives the arm\u2019s position in the scene, and a second, smaller model \u2014 fine-tuned on Edge Impulse specifically to find a needle \u2014 locates the needle itself. Camera bring-up, checkerboard calibration and live capture are already in the repository; the models are not yet in the loop.',
        plates: [],
      },
    ],
    body1: 'Training targets the pose rather than the outcome. A stitch is a rhythm: the approach angle only makes sense after the pull before it, so the hand is scored on whether it passes through the same intermediate poses a practised hand does, not on whether a seam held at the end.',
    body2: 'Errors are read as diagnostics. A consistent offset points at the link model, a growing one at cable stretch, and a pose the hand cannot reach at all points back at the ratios. Process knowledge for the pipeline was researched with AI assistance; the code is written by hand.',
    takeaway: 'Grip pressure and the pause before a knot never survive video capture. That gap is the argument of the project, not a bug in it.',
    notes: ['WiLoR \u00b7 YOLO', 'MuJoCo \u00b7 Fusion 360', 'NumPy \u00b7 OpenCV \u00b7 matplotlib', 'Rodrigues \u00b7 Jazar'],
  },
  {
    title: 'Electronics',
    meta: 'Actuators \u00b7 board \u00b7 sensors',
    lede: 'Seventeen driven axes on two different buses, a single-board computer doing the vision, and a loom that has to survive being opened every time a joint is re-laced.',
    groups: [
      {
        label: 'Actuators',
        tag: 'two buses',
        text: 'The fingers run on PWM hobby servos wired to a PCA9685 breakout, which the board addresses over I\u00b2C \u2014 sixteen channels from two wires, at 60 Hz with pulses between 1000 and 2000 \u00b5s. The wrist runs on Feetech STS3215 bus servos instead, which take position, speed and acceleration as commands and report their own position back. Those do not use I\u00b2C: they are daisy-chained on a single half-duplex TTL serial line at 1 Mbaud, one wire carrying both directions, with each servo answering on its own ID \u2014 so the wrist can be asked where it is, which the PWM fingers cannot be. First prototypes drove everything from the PCA board; the wrist moved to the bus servos once position feedback became the thing that mattered.',
        plates: [
          { src: 'elec-servo-bed.jpg', alt: 'MG90S micro servos stacked in the forearm bed, horns facing out',
            caption: 'MG90S micro servos in the forearm bed, driven as PCA9685 channels' },
          { id: 'elec-servo-wrist', placeholder: 'STS3215 bus servos at the wrist' },
        ],
      },
      {
        label: 'Board',
        tag: 'jetson orin nano',
        text: 'Everything runs on a Jetson Orin Nano under Linux, chosen because the vision models have to run on the arm rather than on a laptop over the network. The first infrastructure was built on an Arduino Uno Q, which drove the servos well enough but could not carry inference alongside them, so it was retired rather than worked around.',
        plates: [
          { id: 'elec-board', placeholder: 'Jetson Orin Nano in the arm base' },
        ],
      },
      {
        label: 'Sensors',
        tag: 'camera \u00b7 time-of-flight',
        text: 'A camera on the Linux board carries two jobs: a needle detector, custom fine-tuned on Edge Impulse for this one object, and YOLO26 with depth estimation to place the arm within the frame. A time-of-flight sensor sits alongside it for the close work \u2014 needle range at the fingertip, and the feedback that tells the hand it has the needle rather than inferring it from cable tension.',
        plates: [
          { id: 'elec-camera', placeholder: 'Camera mount and field of view' },
          { id: 'elec-tof', placeholder: 'Time-of-flight sensor at the fingertip' },
        ],
      },
    ],
    body1: 'Two buses is a deliberate split rather than an accident of parts: the fingers need many cheap channels and the wrist needs to be able to answer questions about itself. Keeping them separate means a finger can be re-laced without touching the joint that carries the load.',
    body2: 'Serviceability set the rest of the layout. The servo bed sits behind the wrist so its mass stays off the fingers, connectors sit outside the shell where a hand can reach them, and nothing that has to be re-soldered lives inside a finger.',
    takeaway: 'One connector, one bus per job, no soldering inside a finger \u2014 the electronics were designed around how often the hand gets taken apart.',
    notes: ['PCA9685 \u00b7 I\u00b2C', 'Feetech STS3215 \u00b7 serial', 'Jetson Orin Nano', 'Edge Impulse \u00b7 YOLO26'],
  },
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
