import type { Section } from '../types';

/**
 * Approved project copy, ported verbatim from the design prototype.
 * Do not paraphrase — see the design handoff.
 */
export const sections: Section[] = [
  {
    title: 'The problem',
    meta: 'Research',
    lede: 'Breast tissue is a mix of adipose, fibrous and glandular material whose elastic moduli differ by three orders of magnitude, suspended from the chest wall by ligaments that can only take a few percent strain before damage accumulates.',
    groups: [
      {
        label: 'Anatomy and load',
        tag: 'why static fails',
        text: 'Inadequate support is as damaging as excessive tension \u2014 ligament strain occurs both from overstretching and from insufficient support, and the optimal level changes across the cycle and through the day with tissue stiffness, volume and activity. A garment with one fixed compression is wrong for most of the month by definition.',
        plates: [],
        wides: [
          { src: 'pn-strain-hormonal.jpg', alt: 'Chart of ligament strain across a 28-day hormonal cycle against the long-term pain threshold', caption: 'Hormonal — strain across a 28-day cycle against the failure threshold' },
          { src: 'pn-strain-daily.jpg', alt: 'Chart of average strain through a 9-to-5 working day with activity peaks', caption: 'Daily — average strain through a 9–5 day, with activity peaks' },
          { src: 'pn-strain-dynamic.jpg', alt: 'Chart of cyclic strain over thirty seconds of running against follicular, mid-cycle and pre-menstrual thresholds', caption: 'Dynamic — thirty seconds of running against three cycle states' },
        ],
      },
      {
        label: 'Fabric, measured',
        tag: 'tensile testing',
        text: 'Candidate fabrics were chosen by measurement rather than feel: bonded lycra came in at 44,600 N/m along the selvedge, polyester neoprene at 7,300, a biodegradable polyamide at 5,800. With no rig available, samples were loaded over a fixed span and extension read against a rule \u2014 selvedge and weft separately, because a bra loads the two directions differently.',
        chart: true,
        plates: [],
      },
    ],
    body1: 'The stiffest fabric is not the most supportive garment \u2014 it is the one that dictates a single fixed compression, permanently.',
    body2: 'Choosing the softest measured fabric and putting adjustable structure inside it is the opposite approach, and the one the rest of the project follows.',
    takeaway: 'Four wearers were studied in depth, and all of them described the same mismatch: two sets of bras, or accepting pain for part of every month.',
    notes: ['4 users studied', '3 fabrics tested', '5,800 N/m chosen', '100% biodegradable polyamide'],
  },
  {
    title: 'Design',
    meta: 'Garment · UI',
    lede: 'The garment side of the problem: the channel field has to push where the ligaments need support, and the tubing has to reach it without crossing a fold.',
    groups: [
      {
        label: 'Garment',
        tag: 'pattern · fit',
        text: 'On the garment side the channel field has to sit where the load is \u2014 across the pectoral fascia and under the bust \u2014 without the seams fighting the pattern or the tube crossing a fold. The bra is cut so the silicone panel is bonded into a flat area and the luer lock exits at the side seam.',
        plates: [
          { id: 'pn-pressure-map', src: 'pn-pressure-map.png', alt: 'Bra pattern overlaid with arrows showing how pressure should be distributed to support the ligaments: lifting vectors up the cup, lateral vectors along the underband and back', caption: 'How the pressure has to be distributed to support the ligaments', size: 'small' },
          { id: 'pn-bra-design', src: 'pn-garment-annotated.jpg', alt: 'Annotated technical flat: a removable two-channel chest panel, a side channel to reduce side bounce, an encapsulating cup channel, a pronounced back channel, a secondary underbust channel for high impact, and a triangular pattern to let the fabric stretch', caption: 'Every channel and what it controls', size: 'large' },
        ],
      },
      {
        label: 'Interface',
        tag: 'three modes · mDNS',
        text: 'The garment is adjusted from a phone on the same network \u2014 no account, no cloud. One screen raises or releases pressure directly; a calendar screen maps pressure against cycle day, so the mode that matches today against the same day last cycle has something to read from.',
        plates: [],
        pairs: [
          { src: 'pn-ui-home.jpg', alt: 'Annotated home page: an adjustment hub showing pressure and cycle day, with input day, manual and auto adjust controls and a cycle-phase loading bar', caption: 'Home page — pressure and cycle day, manual or auto adjustment' },
          { src: 'pn-ui-calendar.jpg', alt: 'Monthly calendar with a pressure reading in hPa on each day, colour-coded for menstrual, ovulation and luteal phases', caption: 'Pressure calendar — hPa per day, coded by cycle phase' },
        ],
      },
    ],
    body1: 'Channel placement is decided by the load map, then checked against the pattern: a channel is only useful where it can push, and the tube has to reach it without crossing a seam or a fold.',
    body2: 'Control lives outside the garment for the same reason: a pump, a valve and a battery are serviceable objects, and nothing that needs replacing should be sealed inside something worn against skin.',
    takeaway: 'The garment carries the mechanism and the phone carries the decision \u2014 nothing the wearer adjusts requires touching the hardware.',
    notes: ['Pressure mapped to ligaments', 'Side-seam exit', 'mDNS, no account'],
  },
  {
    title: 'Channels and casting',
    meta: 'Silicone · Fusion 360',
    lede: 'Air instead of elastic: sealed silicone channels between two fabric layers, inflated and vented to change the compression of the surface \u2014 the principle of a McKibben muscle, flattened into a textile.',
    groups: [
      {
        label: 'Channel geometry',
        tag: 'space-filling curve',
        text: 'The channel field is a space-filling curve, so one inlet reaches a large area without a manifold of separate tubes to leak at every junction. Layout changes by use case: channels across the pectoral fascia and under the bust absorb cycle volume change; side and front pads take up partial volume differences with an inflatable underwire stabilising the base; a removable panel adds chest-wall stability and a side channel reduces lateral bounce during activity.',
        plates: [
          { id: 'pn-channels', src: 'pn-channel-stack.jpg', alt: 'Exploded diagram of the channel build-up: external fabric, silicone base layer on fabric, the empty channel field and its luer lock inlet', caption: 'The build-up: fabric, silicone base, channel field, one luer lock inlet', tall: true },
        ],
      },
      {
        label: 'Casting and bonding',
        tag: 'PlatSil Gel 25',
        text: 'Channels are cast in PlatSil Gel 25 \u2014 skin-safe and food-grade \u2014 against a mould modelled in Fusion 360, bonded to a fabric base and fed through a luer lock. The whole garment is designed to come apart at end of life: the fabric is 100% biodegradable polyamide and the silicone separates from it for reuse.',
        plates: [
          { id: 'pn-fabrication', src: 'pn-peano-moulds.jpg', alt: 'Three channel-pattern moulds compared: a simple linear tunnel model, a wavy linear distribution, and a Peano space-filling curve redirected to cover a bigger surface', caption: 'Different Peano curve pattern moulds', tall: true },
        ],
      },
    ],
    body1: 'Casting rather than welding keeps the channel wall thickness under control, which is what sets the pressure the field can hold before it balloons.',
    body2: 'A single inlet also means a single failure point to test, instead of one per junction.',
    takeaway: 'Geometry does the work a manifold would otherwise do \u2014 fewer joints, fewer leaks, one tube to the garment.',
    notes: ['PlatSil Gel 25', 'Skin-safe · food-grade', 'Luer lock inlet', 'Separable at end of life'],
  },
  {
    title: 'Control and electronics',
    meta: 'ESP32 · MPRLS',
    lede: 'A pump, a solenoid valve and an MPRLS pressure sensor reading continuously, so the garment notices lost rigidity rather than waiting for the wearer to.',
    groups: [
      {
        label: 'Circuit',
        tag: 'EasyEDA',
        text: 'The pump and valve are inductive loads, so both sit behind logic-level MOSFETs with flyback diodes across the load. Actuator and logic rails are split and decoupled separately off a shared 6 V supply, so pump inrush cannot brown out the ESP32. The sensor sits on I\u00b2C.',
        plates: [],
        pairs: [
          { src: 'pneumabra-schematic-easyeda.jpg', alt: 'Circuit schematic showing the ESP32, MOSFET drivers with flyback diodes, split supply rails and an I2C sensor header', caption: 'Schematic — split rails, flyback diodes on both actuators' },
          { src: 'pn-pcb.png', alt: 'Round PCB layout with the NodeMCU ESP32-WROOM-32 module at centre, valve and pump 6 V drivers, decoupling caps and GND header', caption: 'The board as laid out — valve and pump drivers either side of the ESP32' },
        ],
      },
    ],
    body1: 'Closed-loop pressure is what makes the garment honest: it reports the support it is actually delivering, not the one it was last told to.',
    body2: 'Keeping discovery on mDNS avoids an account and a server for a device that only ever needs to be reached from across the room.',
    takeaway: 'Continuous sensing turns an adjustable garment into a garment that holds its adjustment \u2014 the difference between a setting and a guarantee.',
    notes: ['NodeMCU ESP32', 'MPRLS over I²C', 'MOSFET + flyback', 'mDNS, no cloud'],
  },
  {
    title: 'What broke',
    meta: 'Failure · fix',
    lede: 'Repeated testing on the same sample is what destroyed it: re-piping into a channel field without sealing the old entrance tears the silicone.',
    groups: [
      {
        label: 'Torn inlets from re-piping',
        tag: 'sample failure',
        text: 'Every test meant piping air back into a sample that had already been inflated and vented. With the previous entrance left open, pressure concentrates at the inlet rather than distributing through the field, and the silicone breaks there \u2014 so the failure was a consequence of how the sample was being tested, not of the channel geometry. Sealing the entrance between runs fixes it, but the seals ordered were too large for the mould that had been made, so the sealed version was never tested at pressure.',
        plates: [],
      },
    ],
    body1: 'Channel creep measured 2 mm over ten hours, which the continuous pressure sensing compensates for \u2014 the controller tops the field back up rather than waiting for the wearer to notice.',
    body2: 'The next sample needs a mould dimensioned around the seals rather than seals sourced to fit a finished mould \u2014 the ordering mistake, not a material one.',
    takeaway: 'The failure belonged to the test rig, not the design: an unsealed inlet concentrates pressure exactly where the silicone is weakest.',
    notes: ['Torn inlet', 'Seals mis-sized', '2 mm creep / 10 hrs', 'Re-mould around the seal'],
  },
];
