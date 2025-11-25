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

const testimonials = [
  {
    text: "The frontend path is a game-changer. I went from zero CSS knowledge to building responsive, accessible UIs. The projects are exactly what hiring managers look for.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Amara Nwachukwu",
    role: "Frontend Developer",
  },
  {
    text: "Finally, a backend course that makes sense. Learning Node.js and database design here felt so intuitive. I'm now confident in building scalable APIs.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "David Okon",
    role: "Backend Engineer",
  },
  {
    text: "C-Tech Learn bridged the gap for me. The fullstack curriculum is intense but incredibly rewarding. I landed my first remote gig thanks to the portfolio reviews.",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    name: "Zainab Bello",
    role: "Fullstack Developer",
  },
  {
    text: "The mentorship and community support are unmatched. Whenever I got stuck on a React bug, there was someone to help. It feels like a real tech family.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Tunde Adebayo",
    role: "React Developer",
  },
  {
    text: "I love the practical approach. Instead of just watching videos, I was writing Python code from day one. The data science track is world-class.",
    image: "https://randomuser.me/api/portraits/women/89.jpg",
    name: "Chioma Eze",
    role: "Data Analyst",
  },
  {
    text: "As a designer transitioning to code, the UI/UX to Frontend path was perfect. It taught me how to bring my Figma designs to life with Tailwind CSS.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "Emmanuel Okafor",
    role: "UX Engineer",
  },
  {
    text: "The offline capabilities saved me. I could study on my commute without worrying about data. Truly built for the Nigerian reality.",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    name: "Ibrahim Musa",
    role: "Mobile Developer",
  },
  {
    text: "From HTML basics to deploying complex apps on Vercel, the journey was seamless. The best investment I've made in my career.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Grace Oladipo",
    role: "Web Developer",
  },
  {
    text: "The focus on best practices and clean code sets this apart. I didn't just learn to code; I learned to think like a senior engineer.",
    image: "https://randomuser.me/api/portraits/men/78.jpg",
    name: "Kelechi Ibe",
    role: "Software Engineer",
  },
];

const communityLinks = [
  {
    name: "Whatsapp",
    id: "whatsapp",
    title: "Join our tech community",
    description: "Share your thoughts, ideas, and projects with the community.",
    action: "Join our WhatsApp community",
    href: "#",
    icon: "/whatsapp.svg",
    glow: "bg-[#25D366]", // WhatsApp Green
    shadow: "shadow-[#25D366]/20",
  },
  {
    name: "Discord",
    id: "discord",
    title: "Join our server",
    description: "Share your thoughts, ideas, and projects with the community.",
    action: "Join our Discord server",
    href: "#",
    icon: "/discord.svg",
    glow: "bg-[#5865F2]", // Discord Blue
    shadow: "shadow-[#5865F2]/20",
  },
  {
    name: "Slack",
    id: "slack",
    title: "Join our workspace",
    description: "Professional networking, job board access, and industry collaboration.",
    action: "Join our Slack",
    href: "#",
    icon: "/slack.svg",
    glow: "bg-[#E01E5A]", // Slack Pink/Red
    shadow: "shadow-[#E01E5A]/20",
  },
];

export { stats, keyPoints, steps, testimonials, communityLinks };
