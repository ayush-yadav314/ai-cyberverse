// screenshot: set to a path like '/projects/browser-agent.webp' after you
// add a REAL screenshot to the public/projects folder. Leave null until then.
// icon: a short name from src/components/projectIcons.js

export const featuredProjects = [
  {
    id: 'browser',
    index: '01',
    icon: 'bot',
    year: '2026',
    title: 'Autonomous Browser Agent',
    tagline: 'Plain-English goals in, browser actions out.',
    color: '#22d3ee',
    screenshot: null,
    github: 'https://github.com/ayush-yadav314/autonomous-browser-agent',
    demo: null,
    problem:
      'Browser automation scripts are usually written for one website and break when the page changes. This project explores an agent that reads the page and decides what to do from a goal written in plain English.',
    approach:
      'A locally hosted Phi-3 Mini model, run through Ollama, chooses each next action. Playwright carries it out in a real browser. A simplification step shrinks the page into a short numbered list so a small model can decide reliably.',
    features: [
      'Accepts plain-English goals and navigates real websites step by step',
      'Runs on a local LLM through Ollama: no paid APIs',
      'Webpage simplification: 150+ DOM elements reduced to a concise numbered list',
      'Code-level, URL-based goal check that does not rely on the LLM judging itself',
      'Streamlit interface for real-time demonstration',
    ],
    stack: ['Python', 'Ollama', 'Playwright', 'Streamlit'],
    flow: [
      {
        label: 'Your goal',
        kind: 'user',
        desc: 'You type a goal in plain English, such as what to search for or which page to reach.',
      },
      {
        label: 'Read page',
        kind: 'tool',
        desc: 'Playwright opens a real browser and reads the current page.',
      },
      {
        label: 'Simplify DOM',
        kind: 'code',
        desc: 'A simplification step cuts the page from 150+ elements down to a short numbered list, so a small model can choose reliably.',
      },
      {
        label: 'Decide action',
        kind: 'ai',
        desc: 'A locally hosted Phi-3 Mini model, run through Ollama, picks the next action from the numbered list.',
      },
      {
        label: 'Act',
        kind: 'tool',
        desc: 'Playwright performs the chosen action, such as typing or clicking.',
      },
      {
        label: 'Check goal',
        kind: 'code',
        desc: 'A deterministic, code-level check looks at the URL to decide whether the goal is reached, instead of trusting the LLM to judge itself.',
      },
    ],
    flowNote:
      'Simplified view. The agent repeats these steps until the goal check passes.',
    details: [
      {
        q: 'Why simplify the page?',
        a: 'A raw page can have 150+ elements. Handing all of them to a small 3.8B-parameter model makes its decisions unreliable, so the page is reduced to a concise numbered representation first.',
      },
      {
        q: 'Why check the goal in code?',
        a: "Asking the LLM whether it has finished is unreliable. A deterministic URL-based check is independent of the model's self-evaluation, so completion is more trustworthy.",
      },
      {
        q: 'Where was it tested?',
        a: 'On DuckDuckGo, Wikipedia and Amazon.in, with no site-specific logic.',
      },
    ],
    limitations: [
      'Validated on three sites only. Other sites are untested.',
      'A small local model may limit how complex a task it can handle reliably.',
      'Runs locally, so it needs Ollama and the model installed.',
    ],
  },
  {
    id: 'finance',
    index: '02',
    icon: 'trending',
    year: '2025 – 2026',
    title: 'Multi-Agent Financial Research Assistant',
    tagline: 'Market data, sentiment and charts in one agent workflow.',
    color: '#8b5cf6',
    screenshot: null,
    github: 'https://github.com/ayush-yadav314/financial-agent-ai',
    demo: 'https://financial-agent-ai-a.streamlit.app/',
    demoNote:
      'Hosted on Streamlit Community Cloud. If the app has been idle, the first load can take a few seconds.',
    disclaimer:
      'AI-generated analysis is for learning and research only. It is not financial advice.',
    problem:
      'Researching a stock means jumping between price data, charts and news. This project brings those steps into one workflow run by a multi-agent system.',
    approach:
      'LangGraph orchestrates the agents. Live market data comes from yfinance, while sentiment and the written interpretation come from Gemini 2.5 Flash. Results appear in a Streamlit dashboard.',
    features: [
      'Live market data through yfinance',
      'Interactive Plotly candlestick charts',
      'Financial metric cards and sentiment indicators',
      'Streaming responses',
      'Deployed on Streamlit Community Cloud',
    ],
    stack: ['Python', 'LangGraph', 'Gemini 2.5 Flash', 'yfinance', 'Plotly', 'Streamlit'],
    flow: [
      {
        label: 'Your question',
        kind: 'user',
        desc: 'You enter a stock ticker and what you want to know about it.',
      },
      {
        label: 'LangGraph',
        kind: 'code',
        desc: 'LangGraph orchestrates the agents and decides how the research steps connect. This is a simplified view of the workflow.',
      },
      {
        label: 'Market data',
        kind: 'data',
        desc: 'Live prices and metrics come from yfinance. This is data from a source, not AI output.',
      },
      {
        label: 'Sentiment + analysis',
        kind: 'ai',
        desc: 'Gemini 2.5 Flash turns the data into sentiment and a written interpretation. This part is AI-generated and can be wrong.',
      },
      {
        label: 'Dashboard',
        kind: 'ui',
        desc: 'Streamlit shows Plotly candlestick charts, metric cards, sentiment indicators and streamed responses.',
      },
    ],
    flowNote: 'Simplified view of the real workflow.',
    details: [
      {
        q: 'Data versus AI output',
        a: 'Prices, charts and metrics come from market data (yfinance). Sentiment and the written analysis are generated by an LLM, so they are interpretations, not facts.',
      },
      {
        q: 'Production issues I solved',
        a: 'After deploying on Streamlit Community Cloud I had to fix ticker validation, rate limits from external data sources, and LaTeX/Markdown rendering conflicts.',
      },
    ],
    limitations: [
      'AI-generated analysis can be wrong and is not financial advice.',
      'Depends on external data sources, which can rate-limit requests.',
      'The free hosting puts the app to sleep when idle, so the first load can be slow.',
    ],
  },
  {
    id: 'platelog',
    index: '03',
    icon: 'dumbbell',
    year: 'Full-stack',
    title: 'PlateLog',
    tagline: 'Log sets fast, watch your progress, get AI coaching.',
    color: '#a3e635',
    screenshot: null,
    github: 'https://github.com/ayush-yadav314/platelog',
    demo: 'https://platelog-alpha.vercel.app/',
    demoNote:
      'The backend runs on a free tier and sleeps when idle, so the first request can take up to a minute.',
    disclaimer:
      'The AI coach is generated by an LLM. Treat its suggestions as ideas, not professional fitness or medical advice.',
    problem:
      'Tracking workouts in notes or spreadsheets is slow, and progress is hard to see over time. PlateLog is a full-stack app built to make logging sets quick and to turn the history into charts and suggestions for the next session.',
    approach:
      'A React frontend talks to a FastAPI backend with JWT authentication. Data lives in PostgreSQL in production and SQLite locally. An LLM coach, through the Groq API, suggests targets for the next session from the recent workout log.',
    features: [
      'Accounts with JWT authentication and argon2 password hashing',
      'Fast logging: 41 starter exercises, custom exercises, and prefilled last weight and reps',
      'Personal records computed from full history, with badges and a confetti burst',
      'Progress charts: weekly volume, top weight over time, muscle-group balance',
      'AI coach with rate limits per user and across all users',
      'Responsive layout, dark mode, and animations that respect reduced motion',
    ],
    stack: ['React', 'Vite', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Recharts', 'JWT', 'Groq API'],
    flow: [
      {
        label: 'Log a workout',
        kind: 'user',
        desc: 'You add exercises and sets in the React app, which prefills your last weight and reps.',
      },
      {
        label: 'FastAPI',
        kind: 'code',
        desc: "The API checks your JWT and only touches your own data. Asking for another user's workout returns 404, so ids cannot be probed.",
      },
      {
        label: 'PostgreSQL',
        kind: 'data',
        desc: 'Workouts are stored in PostgreSQL (Neon) in production and SQLite locally. Personal records are computed from this history each time, not stored.',
      },
      {
        label: 'Charts',
        kind: 'ui',
        desc: 'Recharts shows weekly volume, top weight per exercise over time, and muscle-group balance.',
      },
      {
        label: 'AI coach',
        kind: 'ai',
        desc: 'An LLM through the Groq API suggests targets for your next session. Only your workout log is sent, notes are treated as data and not instructions, and requests are rate limited.',
      },
    ],
    flowNote:
      'Simplified view. The charts and the coach both read from the stored workout history.',
    details: [
      {
        q: 'Per-user data isolation',
        a: 'Every workout and exercise query is filtered by the logged-in user id, and a workout can only reference exercises that user owns.',
      },
      {
        q: 'Why personal records are computed, not stored',
        a: 'They are derived from history each time, so deleting or back-dating a workout always keeps them correct.',
      },
      {
        q: 'LLM safety and cost control',
        a: 'The coach sees only the workout log, notes are treated as data and not instructions, and daily limits per user and across all users protect the free quota.',
      },
      {
        q: 'What is planned next',
        a: 'Natural-language logging, a tool-using coach agent, a rest timer, and database migrations with Alembic.',
      },
    ],
    limitations: [
      'Free-tier hosting means cold starts after inactivity.',
      'Workouts can be deleted but not yet edited.',
      'No automated tests or CI yet.',
    ],
  },
  {
    id: 'cyberverse',
    index: '04',
    icon: 'sparkles',
    year: 'This site',
    title: 'AI CYBERVERSE',
    tagline: 'My futuristic React developer portfolio.',
    color: '#ec4899',
    screenshot: null,
    github: 'https://github.com/ayush-yadav314/ai-cyberverse',
    demo: 'https://ai-cyberverse.vercel.app/',
    problem:
      'A portfolio can list skills without proving them. This one is built to show them: interactive diagrams, project write-ups that include limitations, and skills labelled as hands-on or still learning.',
    approach:
      'Built with React and Vite, plain CSS design tokens, and Motion for React for animation. The neural orb is drawn on a Canvas, the agent loop and skills map are SVG, and all content lives in data files so it is easy to update.',
    features: [
      'Canvas neural orb that reacts to the pointer and pauses when off-screen',
      'Interactive agent loop: Perceive, Reason, Plan, Use Tools, Act, Observe, Iterate',
      'Skills constellation with hands-on and learning labels',
      'Project showcases with architecture flows and limitations',
      'Keyboard navigation, a mobile menu and reduced-motion support',
      'Contact section with a form that stays disabled until it is connected to a service',
    ],
    stack: ['React', 'Vite', 'Motion', 'Canvas', 'SVG', 'CSS'],
    flow: [
      {
        label: 'Data files',
        kind: 'data',
        desc: 'Projects, skills, the timeline and agent stages live in plain JavaScript data files, so content changes never touch layout code.',
      },
      {
        label: 'React sections',
        kind: 'code',
        desc: 'Each section (Hero, About, Agent Loop, Projects, Skills, Contact) is a React component that reads that data.',
      },
      {
        label: 'Canvas + SVG',
        kind: 'ui',
        desc: 'The neural orb is drawn on a Canvas. The agent loop and the skills map are SVG, driven by React state.',
      },
      {
        label: 'Motion layer',
        kind: 'tool',
        desc: 'Motion for React handles scroll reveals, tilt, magnetic buttons and the navbar indicator, and follows reduced-motion settings.',
      },
      {
        label: 'Visitor',
        kind: 'user',
        desc: 'You can hover, click or tab through the diagrams, and everything stays usable without a mouse.',
      },
    ],
    flowNote:
      'The animations are illustrative. This site is not a live AI system.',
    details: [
      {
        q: 'Why no 3D library?',
        a: 'A Canvas particle sphere gives the 3D feel without the weight of Three.js, which keeps the page light.',
      },
      {
        q: 'Why keep content in data files?',
        a: 'It separates design from content, so adding a project means adding one object.',
      },
    ],
    limitations: [
      'The agent loop and the terminal are illustrative, not a live AI system.',
      'The contact form is not connected to a service yet.',
    ],
  },
]
