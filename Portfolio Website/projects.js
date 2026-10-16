/*
 * ────────────────────────────────────────────────────────────
 *  YOUR PROJECTS — edit this file to update the site.
 * ────────────────────────────────────────────────────────────
 *  title      Project name
 *  category   Used for the filter buttons (e.g. "Web", "Design", "Mobile")
 *  year       Shown on the card
 *  summary    One-liner on the card
 *  description Longer text shown when the card is clicked
 *  tags       Tech / tools used
 *  image      Path to an image (e.g. "images/my-project.jpg"), or leave ""
 *             to get a generated gradient cover
 *  live       Link to the live project (optional)
 *  code       Link to the source code (optional)
 *  featured   true = card spans two columns on large screens
 */
const PROJECTS = [
  {
    title: "Pulse Analytics",
    category: "Web",
    year: 2026,
    summary: "A real-time dashboard for tracking product metrics.",
    description:
      "Designed and built a responsive analytics dashboard with live-updating charts, saved views and team sharing. Focused on fast load times and an interface that stays readable with lots of data.",
    tags: ["React", "TypeScript", "D3", "Node.js"],
    image: "",
    live: "#",
    code: "#",
    featured: true,
  },
  {
    title: "Habitly",
    category: "Mobile",
    year: 2026,
    summary: "A minimalist habit tracker with streaks and reminders.",
    description:
      "An iOS app that helps people build habits through gentle reminders, streaks and weekly reflections. Built with offline-first sync so it works anywhere.",
    tags: ["Swift", "SwiftUI", "CloudKit"],
    image: "",
    live: "#",
    code: "",
  },
  {
    title: "Brand Refresh — Oakleaf Café",
    category: "Design",
    year: 2025,
    summary: "Identity, menu and signage for a local café.",
    description:
      "Led a full brand refresh including a new logotype, colour palette, printed menus and in-store signage. The result is warmer, more legible and consistent across every touchpoint.",
    tags: ["Figma", "Illustrator", "Branding"],
    image: "",
    live: "",
    code: "",
  },
  {
    title: "Recipe Finder",
    category: "Web",
    year: 2025,
    summary: "Search recipes by what's already in your fridge.",
    description:
      "A web app that takes the ingredients you have and suggests recipes, ranked by how few extra items you'd need. Includes dietary filters and a shopping list generator.",
    tags: ["JavaScript", "REST API", "CSS Grid"],
    image: "",
    live: "#",
    code: "#",
  },
  {
    title: "Pathfinder Visualiser",
    category: "Web",
    year: 2024,
    summary: "Interactive visualisation of graph search algorithms.",
    description:
      "Draw walls on a grid and watch Dijkstra, A* and BFS find their way through in real time. A fun way to understand how these algorithms differ.",
    tags: ["TypeScript", "Canvas", "Algorithms"],
    image: "",
    live: "#",
    code: "#",
  },
  {
    title: "Travel Journal UI Kit",
    category: "Design",
    year: 2024,
    summary: "A 60+ component UI kit for travel apps.",
    description:
      "A complete design system with components, type scale, colour tokens and example screens for a travel journaling app. Published for the community.",
    tags: ["Figma", "Design Systems", "Prototyping"],
    image: "",
    live: "#",
    code: "",
  },
];

/* Skills shown in the About section */
const SKILLS = [
  "HTML & CSS", "JavaScript", "TypeScript", "React", "Node.js",
  "Python", "Swift", "Figma", "Git", "UI/UX Design",
];
