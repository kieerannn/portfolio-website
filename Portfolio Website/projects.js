/*
 * ────────────────────────────────────────────────────────────
 *  YOUR CONTENT — edit this file to update the site.
 * ────────────────────────────────────────────────────────────
 *  PROJECTS
 *  title       Project name
 *  category    Used for the filter buttons (e.g. "Web", "Design", "Mobile")
 *  year        Shown on the card
 *  summary     One-liner on the card
 *  description Longer text shown when the card is clicked
 *  points      Optional bullet points shown when the card is clicked
 *  tags        Tech / tools used
 *  image       Path to an image (e.g. "images/my-project.jpg"), or leave ""
 *              to get a generated cover
 *  gallery     Optional screenshots shown in the popup: [{ src, caption }]
 *  live        Link to the live project (optional)
 *  code        Link to the source code (optional)
 *  featured    true = card spans two columns on large screens
 */
const PROJECTS = [
  {
    title: "Personal Finance Tracker",
    category: "Web",
    year: 2026,
    summary: "Full-stack app for portfolio tracking, live market data and AI-generated insights.",
    description:
      "A self-taught, end-to-end web application that brings portfolio tracking, live market data and AI-generated insights together in one place. Built as a personal project from June to August 2026.",
    points: [
      "Secure multi-user authentication with one-way password hashing, so credentials are never stored in plaintext and each user can only see their own portfolio",
      "Live markets dashboard with real-time prices, daily % change, P/E ratios and 52-week highs/lows, plus an AI-generated outlook summarising recent news and price action for any ticker",
      "Portfolio module tracking holdings, average cost and live profit & loss",
      "Python (Flask) and SQLite backend integrating the Yahoo Finance API, with fallback logic for Singapore Exchange (.SI) tickers",
    ],
    tags: ["Python", "Flask", "SQLite", "Yahoo Finance API", "AI"],
    image: "images/finance-markets.jpg",
    gallery: [
      { src: "images/finance-markets.jpg", caption: "Live markets dashboard with price history" },
      { src: "images/finance-stats-ai.jpg", caption: "Key statistics, returns and AI market summary" },
      { src: "images/finance-portfolio.jpg", caption: "Portfolio tracking with live P&L (values hidden)" },
      { src: "images/finance-sign-in.jpg", caption: "Secure multi-user sign in" },
    ],
    live: "",
    code: "",
    featured: true,
  },
];

/*
 *  EXPERIENCE — grouped into sections. Each item:
 *  role, org, dates, points (bullet list)
 */
const EXPERIENCE = [
  {
    group: "Work",
    items: [
      {
        role: "Research Consultant",
        org: "WorldQuant",
        dates: "Oct 2026 – Present",
        points: [
          "Producing high-quality predictive signals for financial strategies focused on exploiting market inefficiencies",
        ],
      },
      {
        role: "Share Registrar Assistant",
        org: "Boardroom Corporate & Advisory Services Pte Ltd",
        dates: "Feb 2025 – May 2025",
        points: [
          "Coordinated meeting preparations across proxy processing, CDP listing uploads and client liaison through peak AGM / EGM season",
          "Processed hundreds of disclosures, dividends and tax-related documents for local, US and Hong Kong clients across multiple jurisdictions",
          "Managed thousands of cheque printing and processing runs for listed companies including OCBC and UOB under tight deadlines",
          "Collaborated in cross-team meetings on registration and logistics for large-scale shareholder events",
        ],
      },
      {
        role: "Pilot Trainee",
        org: "Republic of Singapore Air Force",
        dates: "Jun 2023 – Sep 2023",
        points: [
          "Delivered biweekly presentations to instructors and fellow cadets",
          "Completed daily training sessions while undergoing medical assessment for advancement to the next pilot training phase",
        ],
      },
    ],
  },
  {
    group: "Education",
    items: [
      {
        role: "Bachelor of Information Engineering and Media",
        org: "Nanyang Technological University",
        dates: "Aug 2025 – May 2029 (expected)",
        points: ["Hackathon: Beyond Binary × AWS & Squarepoint Capital 2025 — Participant"],
      },
    ],
  },
  {
    group: "Leadership & Activities",
    items: [
      {
        role: "Analyst",
        org: "NTU Interactive Investment Club",
        dates: "Sep 2025 – May 2026",
        points: [
          "Learning trading strategies, macroeconomic concepts, financial instruments and valuations",
          "Engaged with hundreds of peers and guest speakers at club events",
        ],
      },
      {
        role: "Music Director",
        org: "Yishun Innova Junior College Musician Club",
        dates: "Jan 2022 – Dec 2022",
        points: [
          "Advised every band's musicality alongside the President",
          "Programme Head of LISTEN '22 — planned the programme flow of a 300-person concert with teammates",
        ],
      },
    ],
  },
];

/* Skills shown in the About section */
const SKILLS = [
  "Python", "Java", "C", "SQL", "Flask", "SQLite", "Tableau",
  "Excel", "Access", "PowerPoint", "Word", "English", "Mandarin",
];

/* Certifications shown in the About section */
const CERTS = [
  "Google Data Analytics",
  "Bloomberg Spreadsheet Analysis & Finance Fundamentals",
  "JPMorgan Chase — Investment Banking Job Simulation",
  "HSBC — Global Banking and Markets Job Simulation",
  "ABRSM Piano (Grade 5)",
];

/*
 *  GALLERY — photos for the swipeable carousel.
 *  Add a file to the images/ folder and list it here.
 */
const PHOTOS = [
  { src: "images/zaanse-schans.jpg", caption: "Netherlands" },
  { src: "images/amsterdam-canal.jpg", caption: "Netherlands" },
  { src: "images/central-park.jpg", caption: "United States" },
  { src: "images/madison-ave.jpg", caption: "United States" },
];
