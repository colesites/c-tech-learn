import { BookOpen, Terminal, Hammer, Users, Briefcase } from "lucide-react";

const stats = [
  { value: "7,500+", label: "active learners weekly" },
  { value: "180+", label: "practice labs & sandboxes" },
  { value: "30+", label: "communities across Nigeria" },
] as const;

const keyPoints = [
  {
    title: "Learn at your pace — online or offline",
    description:
      "Structured tracks, downloadable lesson kits, and progress sync mean you can keep learning even when the network pauses.",
  },
  {
    title: "Nigeria-first, global reach",
    description:
      "Every module reflects Nigerian realities and opportunities while mapping to global hiring standards so you can work from anywhere.",
  },
  {
    title: "Real projects, real practice",
    description:
      "Ship fintech dashboards, health tools, and community apps with review loops, interactive sandboxes, and partner briefs.",
  },
  {
    title: "Beginner-friendly → Job-ready",
    description:
      "We guide you from fundamentals to portfolio sprints, interview prep, and community job boards without the overwhelm.",
  },
] as const;

const steps = [
  {
    title: "Learn Clearly",
    description: "Simple, structured lessons written with beginners in mind.",
    icon: BookOpen,
    color: "bg-blue-500",
  },
  {
    title: "Practice Instantly",
    description:
      "Use our integrated online and offline code editors — type code and see results in real time.",
    icon: Terminal,
    color: "bg-green-500",
  },
  {
    title: "Build Projects",
    description:
      "Work on portfolio-ready tasks and mini-applications that challenge your skills.",
    icon: Hammer,
    color: "bg-purple-500",
  },
  {
    title: "Join the Community",
    description:
      "Meet other learners, ask questions, share progress, and grow together.",
    icon: Users,
    color: "bg-orange-500",
  },
  {
    title: "Become Job-Ready",
    description:
      "Gain practical experience that prepares you for internships, freelance gigs, and tech opportunities.",
    icon: Briefcase,
    color: "bg-red-500",
  },
];

export { stats, keyPoints, steps };
