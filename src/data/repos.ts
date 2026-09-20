import type { CodeRepo } from './types-code';

/**
 * Code-viewer file lists. The files themselves are vendored under
 * public/code/<repo>/ and fetched on demand — see CodeViewer.astro.
 */

export const roboticCraftsman: CodeRepo = {
  name: 'robotic-craftsman/',
  base: 'robotic-craftsman',
  stack: ['python 3', 'numpy · opencv', 'wilor · pca9685'],
  groups: [
  { dir: 'robotic-craftsman/', files: [
    ['README.md', 'project brief'],
    ['notes.md', 'build log'],
    ['angle_computation.py', 'pose \u2192 joint angles'],
    ['servo_translate_new.py', 'angles \u2192 servo pulses'],
    ['visualize_pose.py', 'skeleton plots'],
    ['visualize_pose_videos.py', 'per-clip plots'],
    ['glob_json.py', 'json \u2192 npz'],
    ['npz_scan_plot.py', 'dataset scan'],
    ['WiLoR_base.py', 'pipeline entry'],
    ['finger_calib.json', 'calibration'],
  ] },
  { dir: 'main_motion/', files: [
    ['main_motion/f_kinematics.py', 'link tree \u00b7 fkine'],
    ['main_motion/i_kinematics.py', 'inverse solve'],
    ['main_motion/arm_motion_sketch.py', 'arm sketch'],
    ['main_motion/grasping_tests.py', 'wrist-coupled grasp'],
    ['main_motion/grasp_test2.py', 'grasp rig v2'],
    ['main_motion/finger_calib.json', 'calibration'],
  ] },
  { dir: 'cam/', files: [
    ['cam/csi_cam_setup.py', 'csi capture'],
    ['cam/checkerboard_config.py', 'calibration board'],
    ['cam/proxy_cam_live_rec.py', 'live record'],
    ['cam/vid_to_motion.py', 'clip \u2192 motion'],
  ] },
  { dir: 'servo_motors_setup/', files: [
    ['servo_motors_setup/tuning_servos.py', 'pulse tuning'],
    ['servo_motors_setup/servo_test.py', 'channel test'],
  ] },
  { dir: 'st_motors_setup/', files: [
    ['st_motors_setup/tuning_st_servos.py', 'bus servo tuning'],
    ['st_motors_setup/ping_st_scan.py', 'bus scan'],
    ['st_motors_setup/wrist_call.py', 'wrist call'],
  ] },
  { dir: 'retired/', files: [
    ['retired/servo_translate.py', 'first translator'],
  ] },
],
};

export const googlyEyes: CodeRepo = {
  name: 'Googly_eyes_project/',
  base: 'Googly_eyes_project',
  stack: ['python 3', 'opencv · picamera2', 'adafruit servokit'],
  groups: [{ dir: 'Googly_eyes_project/', files: [
  ['README.md', 'project readme'],
  ['main.py', 'tracking loop'],
  ['camera.py', 'capture · detection'],
  ['motor_test.py', 'servo bring-up'],
] }],
};

export const pneumaBra: CodeRepo = {
  name: 'PneumaBra/',
  base: 'PneumaBra',
  stack: ['arduino c++', 'esp32 · mdns', 'mprls over i²c'],
  groups: [{ dir: 'PneumaBra/', files: [
  ['cycle-tracker.ino', 'modes · cycle match · web ui'],
  ['pump_test.ino', 'pump and valve bring-up'],
  ['mDNS_test.ino', 'local discovery'],
] }],
};

export const sonyScripts: CodeRepo = {
  name: 'sony_scripts/',
  base: 'sony_scripts',
  stack: ['unity · c#', 'monobehaviour', 'sie challenge 2025'],
  groups: [{ dir: 'sony_scripts/', files: [
  ['Main_Gameplay.cs', 'mode selection · main loop'],
  ['Compass_Main.cs', 'direction signalling'],
  ['Compass_Initialisation.cs', 'compass start-up'],
  ['SocialMode_2.cs', 'player-to-player pointing'],
  ['SocialMode_Initialisation.cs', 'social hand-shake'],
  ['Torch_Function.cs', 'sunset-triggered torch'],
  ['Torch_Initialisation.cs', 'timezone check'],
  ['BreakMode.cs', 'all modules white'],
  ['EmergencyMode.cs', 'red flash · escalation'],
  ['Full_Game.cs', 'treasure hunt quest'],
] }],
};
