/**
 * The CV, as she wrote it. The page is a view over this; the PDF in public/
 * is the same document to keep.
 */

export interface Post {
  period: string;
  role: string;
  where: string;
  detail: string;
}

export const summary =
  'Design engineer working across soft robotics, physical computing, smart textiles and computer vision. Background in technical garment design and B2B product development; completing an MA at UAL. I specialise in bridging the physical qualities of fabric with soft robotics, wearable technology and computer vision.';

export const experience: Post[] = [
  {
    period: '2025 — now',
    role: 'Technical Designer',
    where: 'B Fashion Studio',
    detail:
      'End-to-end technical design, product development and raw materials sourcing for independent clients. Leading day-to-day conversations with multiple B2B clients and suppliers. Built website and correspondence add-ins.',
  },
  {
    period: '2025',
    role: 'Atelier Assistant',
    where: 'Robert Wun',
    detail:
      'Pattern amendments and making of the 2026 Haute Couture collection, with the atelier team.',
  },
  {
    period: '2024',
    role: 'Design Consultant',
    where: 'CYA',
    detail:
      'Product development from pattern stage to large-scale manufacturing for a lingerie start-up, including a new sizing system, market research and materials sourcing.',
  },
  {
    period: '2024',
    role: 'Design and Production Intern',
    where: 'Galia Lahav',
    detail: 'Technical design, documentation and production supply-chain tracking for the RTW team.',
  },
];

export const education: Post[] = [
  {
    period: '2025 — Nov 2026',
    role: 'MA Design and Technology',
    where: 'University of the Arts London',
    detail: 'Ongoing.',
  },
  {
    period: '2022 — 2025',
    role: 'BA',
    where: 'London College of Fashion, University of the Arts London',
    detail: 'First Class Honours.',
  },
];

export const skills: { label: string; items: string }[] = [
  {
    label: 'Engineering and ML',
    items:
      'Python · forward and inverse kinematics · humanoid pose estimation · vision models · basic C++ and C#',
  },
  {
    label: 'Physical computing',
    items: 'Smart textiles · sensor integration · robotic prototyping · pneumatic systems',
  },
  {
    label: 'Design and fabrication',
    items: '3D modelling · simulation and rendering · 3D printing · silicone casting',
  },
  {
    label: 'Garment engineering',
    items: 'Digital and physical patterncutting · technical design · grading systems',
  },
  {
    label: 'Production and relations',
    items:
      'B2B communication and tracking · supplier sourcing · supplier relationship management',
  },
];

export const software: { label: string; items: string }[] = [
  {
    label: 'CAD',
    items: 'Adobe Creative Suite · Affinity · Fusion 360 · Blender · CLO 3D · Unity',
  },
  {
    label: 'Other',
    items: 'VS Code · Arduino IDE · EasyEDA · MuJoCo · NVIDIA Isaac Lab · Streamlit · Pydantic · LLM APIs',
  },
];

export const achievements: { year: string; what: string }[] = [
  { year: '2026', what: 'Robotic Craftsman featured in a Microsoft × UAL documentary' },
  { year: '2025', what: 'CFG Coding Python certificate' },
  { year: '2025/6', what: 'Monsoon Accessorize scholarship for circular design' },
  {
    year: '2025/6',
    what: 'The Leathersellers Foundation Power2Aspire — mentoring award, sustainable design practitioner',
  },
  { year: '2024', what: 'LCF × Marks & Spencer industry challenge — winner' },
  { year: '2023', what: 'NEOFUR France sustainable design competition — finalist' },
];

export const languages = 'Polish — native · English — C2, IELTS Academic · Russian — basic';
