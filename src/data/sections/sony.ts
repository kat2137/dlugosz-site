import type { Section } from '../types';

/**
 * Approved project copy, ported verbatim from the design prototype.
 * Do not paraphrase — see the design handoff.
 */
export const sections: Section[] = [
  {
    title: 'The Unity demo',
    meta: 'Unity · C#',
    lede: 'A physical location rebuilt as an explorable 3D environment, seeded with educational assets \u2014 plants, artefacts, buildings \u2014 with the controller driving the command layer beside it.',
    groups: [
      {
        label: 'World and avatar',
        tag: 'surveyed site',
        text: 'The location was surveyed and rebuilt as terrain, then seeded with planting, buildings, waypoint markers and animals. The avatar is moved by the turntable module rather than a thumbstick, which is what makes the movement reachable for someone who cannot use a standard pad.',
        plates: [
          { id: 'sy-map', src: 'sony-unity-map.jpg', alt: 'The surveyed location rebuilt as an explorable 3D terrain, seeded with buildings, planting, waypoint markers and animals', caption: 'The surveyed site, rebuilt in Unity' },
          { id: 'sy-avatar', src: 'sony-avatar-3.png', alt: 'The player avatar, a low-polygon figure in a blue hooded raincoat, jeans and walking boots', caption: 'The avatar, moved by the turntable module' },
        ],
      },
      {
        label: 'Companion app',
        tag: 'second screen',
        text: 'The companion app carries what the controller cannot: the map, the quest state and the messages that Emergency escalates to. The controller stays a signalling device; the phone holds the detail.',
        plates: [
        ],
      },
    ],
    body1: 'The demo was animated fully and the modes programmed in C#, then run on the Sony controller as an interactive demonstration at the SIE Challenge final presentation.',
    body2: 'The plot was developed collectively as a group project; the 3D map assets are by Haiyu. The interaction design, the command layer and the demo build are mine.',
    takeaway: 'The demo had to work in a room with people in it, so the layer that got built is the one that could be tested live.',
  },
  {
    title: 'Hardware interaction',
    meta: 'Interaction design',
    lede: 'Six modes came out of the signal system, each triggered differently and each signalling through light because it cannot signal through position.',
    groups: [
      {
        label: 'Modes and triggers',
        tag: 'break · emergency · torch · social · sound · compass',
        text: 'Break turns every module white to ask the group for a pause. Emergency flashes red and escalates to a message if it is not cleared. Torch is triggered by sunset in the detected timezone rather than by a button. Social flashes the initialisation sequence and then points players toward each other. Sound gives the D-pad song and volume control, on a two-minute lockout. Compass is the default \u2014 green for the right direction, red for the wrong one.',
        modes: true,
        plates: [],
      },
    ],
    body1: 'Two of the six are not player-initiated at all: Torch reads the timezone and Emergency escalates on a timer, so the controller acts when a person might not.',
    body2: 'Each mode is a script in the repo \u2014 the mode list and the file list are the same list.',
    takeaway: 'Triggers were chosen so the group, the daylight and the timer can all start a mode, not just a button press.',
  },
  {
    title: 'What I would change',
    meta: 'Honest list',
    lede: 'The demo shows the interactive layer \u2014 how commands are issued and how the controller signals which function sits where. It is not a playable build.',
    groups: [
      {
        label: 'Four stubbed decisions',
        tag: 'marked as bypasses',
        text: 'Game selection, the randomised generation of location artefacts, the scoring comparison, and the translation of another player\u2019s coordinates into a direction on the LEDs were all specified and then stubbed to reach the presentation \u2014 each marked as a bypass on the state machine.',
        plates: [],
      },
    ],
    body1: 'With more time the two halves would be one thing: the Unity demo playable end to end through the controller, so the configurable layout is tested by someone actually playing rather than demonstrated alongside a video.',
    body2: 'That is the version that answers the question the project is really asking \u2014 whether a controller with no fixed layout stays legible under pressure. A walkthrough cannot answer that.',
    takeaway: 'The honest limit: a narrative walkthrough proves the signalling reads, not that it holds up mid-game.',
  },
];
