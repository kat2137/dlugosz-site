import type { Section } from '../types';

/**
 * Approved project copy, ported verbatim from the design prototype.
 * Do not paraphrase — see the design handoff.
 */
export const sections: Section[] = [
  {
    title: 'Mechanism',
    meta: 'Pan and tilt',
    lede: 'A pan-and-tilt mechanism borrowed from camera rigs rather than from puppetry: one motor for vertical travel, one for horizontal, with the eyeballs carried on a yoke between them.',
    groups: [
      {
        label: 'Travel and linkage',
        tag: 'two axes',
        text: 'Ranges were worked out from how far a human eye actually travels before the head starts to turn, then the joints were constrained to match — an eye that over-rotates reads as a machine, not a gaze. Inside each hemisphere a linkage arm converts servo rotation into eyeball travel and sets the hard limit of the range.',
        plates: [
          { id: 'sv-mech-yoke', src: 'sviatovid-yoke-linkage.jpg', alt: 'CAD view of the eyeball yoke: MG90S servo between two transparent domes with the linkage arms', caption: 'Eyeball yoke and linkage arms, as modelled' },
        ],
      },
    ],
    body1: 'Two axes were enough because the object is worn: a head that pans and tilts covers every face that comes into the camera\u2019s field without needing a third degree of freedom.',
    body2: 'Both eyeballs are driven from a single motor on the horizontal axis, which is what made that arm the most loaded part in the assembly.',
    takeaway: 'The mechanism was designed against human eye travel rather than servo range \u2014 the constraint is what makes the movement read as looking.',
    notes: ['Fusion 360', '2 axes', 'MG90S servos', 'Yoke linkage'],
  },
  {
    title: 'Packaging and serviceability',
    meta: 'Housing',
    lede: 'Everything lives in the head: two motors, a camera, a Raspberry Pi, a battery and the driver board, inside a housing 150.74 mm tall and just over 51 mm deep.',
    groups: [
      {
        label: 'Inside the head',
        tag: '150.74 × 51.12 mm',
        text: 'A sealed prototype is a dead prototype the first time a servo fails, so nothing is glued shut: the camera bed mounts on magnets, the motor shelf lifts out as a unit, and the battery charges through a USB-C port let into the shell rather than by opening it up.',
        plates: [],
      },
      {
        label: 'Shell and leather',
        tag: 'CAD → hand-formed',
        text: 'Around the mechanism sits a printed shell, and over the shell, leather. The face is designed in CAD and then formed by hand — every crease in the finished bag is a panel seam in the model, so the digital and the hand-made halves have to agree before anything is cut.',
        plates: [
          { id: 'sv-shell-panels', src: 'sviatovid-bag-in-park-wide.jpg', alt: 'The finished leather face bag resting against a railing in a park', caption: '' },
        ],
      },
    ],
    body1: 'The depth was the binding constraint. At 51 mm there is no room for a part that is merely convenient, which is why the camera bed and motor shelf share mounting features.',
    body2: 'Vegan leather over the printed shell keeps the object wearable and soft against the body without changing the panel geometry.',
    takeaway: 'Serviceability was designed in from the start: magnets, a lift-out shelf and an external charge port, so a failure costs minutes rather than a rebuild.',
    notes: ['Magnet-mounted camera bed', 'Lift-out motor shelf', 'USB-C through the shell', 'Vegan leather'],
  },
  {
    title: 'Vision and electronics',
    meta: 'Pi · PCA9685',
    lede: 'Deliberately unexciting electronics: a Raspberry Pi 4 running the vision, a PCA9685 driver taking I²C from the Pi, and two MG90S servos on its channels.',
    groups: [
      {
        label: 'Face tracking',
        tag: 'recognition loop',
        text: 'The camera finds a face, the tracker holds it between frames, and the error between the face centre and the frame centre is what drives the two axes — so the eyes chase a person rather than replaying a path. Losing the face parks the eyes instead of hunting, which reads as attention rather than malfunction.',
        plates: [],
      },
      {
        label: 'Control chain',
        tag: 'separated supplies',
        text: 'Putting the servos behind a dedicated driver rather than straight onto the Pi means the motors draw from their own supply, so a stall cannot brown out the board doing the tracking. The Pi handles vision, the PCA9685 handles current, and the two never share a rail.',
        plates: [
          { id: 'sv-elec-wiring', src: 'sviatovid-wiring.jpg', alt: 'Wiring diagram: Raspberry Pi to PCA9685 driver to the two servos, with separated supplies', caption: 'Control chain, Pi to PCA9685 to servos' },
        ],
      },
    ],
    body1: 'Vision runs entirely on the object. Nothing is streamed off it, which matters for a piece about being watched.',
    body2: 'Servo current never reaches the Pi, so the failure mode of a jammed axis is a stalled eye rather than a crashed tracker.',
    takeaway: 'The interesting engineering is in the separation: vision on one board, current on another, so the thing that thinks cannot be knocked over by the thing that moves.',
    notes: ['Raspberry Pi 4', 'PCA9685', 'Facial recognition', 'On-device, nothing streamed'],
  },
  {
    title: 'What broke',
    meta: 'Failure · fix',
    lede: 'The horizontal axis drives both eyeballs from a single motor, and the first arm designed for it deformed under that load.',
    groups: [
      {
        label: 'Deformation and triangulation',
        tag: 'printed part',
        text: 'The original arm was curved and angled so it could clear the camera bed inside a head only 51 mm deep. Driving two eyes through one linkage was more than the printed material would hold along a curve: the arm flexed instead of transmitting motion, costing travel at the end of the range and putting the two eyes out of agreement with each other. The fix was triangulation rather than a heavier part — a second arm at 45° tying the centre of the mechanism to the end-effector, which converts the bending load into tension along a straight member.',
        plates: [],
      },
    ],
    body1: 'The curve stayed, because the packaging still needed it. The reinforcement is what let it stay — the geometry was a requirement, not a preference.',
    body2: 'Both eyes now reach the end of travel together, which is the only version of the effect that works: two eyes that disagree stop reading as a gaze.',
    takeaway: 'The fix was a load path, not a thicker part: triangulate, and the material only has to resist tension.',
    notes: ['45° tie arm', 'Bending → tension', 'Full travel restored'],
  },
];
