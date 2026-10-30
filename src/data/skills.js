export const clusters = [
  { id: 'programming', title: 'PROGRAMMING', color: '#22d3ee', cx: 230, cy: 170 },
  { id: 'agentic', title: 'AGENTIC AI', color: '#8b5cf6', cx: 770, cy: 170 },
  { id: 'tools', title: 'TOOLS', color: '#ec4899', cx: 770, cy: 450 },
  { id: 'concepts', title: 'CONCEPTS', color: '#a3e635', cx: 230, cy: 450 },
]

export const projects = [
  {
    id: 'browser',
    name: 'Autonomous Browser Agent',
    short: 'Browser Agent',
    x: 500,
    y: 285,
    blurb:
      'Turns plain-English goals into browser actions, using a local LLM.',
  },
  {
    id: 'finance',
    name: 'Financial Research Assistant',
    short: 'Finance Assistant',
    x: 500,
    y: 355,
    blurb:
      'A multi-agent research workflow built on LangGraph and live market data.',
  },
]

// status: 'hands-on' or 'learning'. Edit these to match reality.
export const skills = [
  // Programming
  {
    id: 'python',
    name: 'Python',
    cluster: 'programming',
    status: 'hands-on',
    projects: ['browser', 'finance'],
    note: 'The main language behind both of my projects.',
  },
  {
    id: 'java',
    name: 'Java (DSA)',
    cluster: 'programming',
    status: 'learning',
    projects: [],
    note: 'Practising data structures and algorithms in Java.',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    cluster: 'programming',
    status: 'hands-on',
    projects: [],
    note: 'Used for the web side of this portfolio.',
  },
  {
    id: 'htmlcss',
    name: 'HTML & CSS',
    cluster: 'programming',
    status: 'hands-on',
    projects: [],
    note: 'Used to build and style this portfolio.',
  },
  {
    id: 'react',
    name: 'React',
    cluster: 'programming',
    status: 'hands-on',
    projects: [],
    note: 'Used to build PlateLog and this portfolio.',
  },

  // Agentic AI
  {
    id: 'langgraph',
    name: 'LangGraph',
    cluster: 'agentic',
    status: 'hands-on',
    projects: ['finance'],
    note: 'Orchestrates the agents in the financial research assistant.',
  },
  {
    id: 'ollama',
    name: 'Ollama',
    cluster: 'agentic',
    status: 'hands-on',
    projects: ['browser'],
    note: 'Runs a local Phi-3 Mini model for the browser agent.',
  },
  {
    id: 'gemini',
    name: 'Gemini API',
    cluster: 'agentic',
    status: 'hands-on',
    projects: ['finance'],
    note: 'Gemini 2.5 Flash is the LLM in the financial research assistant.',
  },
  {
    id: 'prompting',
    name: 'Prompt Engineering',
    cluster: 'agentic',
    status: 'hands-on',
    projects: [],
    note: 'Writing prompts that steer LLM-based agents.',
  },
  {
    id: 'llms',
    name: 'LLM applications',
    cluster: 'agentic',
    status: 'hands-on',
    projects: ['browser', 'finance'],
    note: 'Applications built on local and hosted models: the browser agent, the financial assistant and the AI coach in PlateLog.',
  },

  // Tools
  {
    id: 'playwright',
    name: 'Playwright',
    cluster: 'tools',
    status: 'hands-on',
    projects: ['browser'],
    note: 'Executes the browser actions chosen by the agent.',
  },
  {
    id: 'streamlit',
    name: 'Streamlit',
    cluster: 'tools',
    status: 'hands-on',
    projects: ['browser', 'finance'],
    note: 'The interface for both projects. The finance assistant is deployed on Streamlit Community Cloud.',
  },
  {
    id: 'plotly',
    name: 'Plotly',
    cluster: 'tools',
    status: 'hands-on',
    projects: ['finance'],
    note: 'Interactive candlestick charts in the financial assistant.',
  },
  {
    id: 'yfinance',
    name: 'yfinance',
    cluster: 'tools',
    status: 'hands-on',
    projects: ['finance'],
    note: 'Brings live market data into the financial assistant.',
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    cluster: 'tools',
    status: 'hands-on',
    projects: [],
    note: 'Powers the backend of PlateLog.',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    cluster: 'tools',
    status: 'hands-on',
    projects: [],
    note: 'Stores the data of PlateLog in production.',
  },

  // Concepts
  {
    id: 'multiagent',
    name: 'Multi-Agent Systems',
    cluster: 'concepts',
    status: 'hands-on',
    projects: ['finance'],
    note: 'Several agents sharing one workflow in the financial research assistant.',
  },
  {
    id: 'browserauto',
    name: 'Browser Automation',
    cluster: 'concepts',
    status: 'hands-on',
    projects: ['browser'],
    note: 'Letting an agent drive a real browser to finish tasks.',
  },
  {
    id: 'rest',
    name: 'REST APIs',
    cluster: 'concepts',
    status: 'hands-on',
    projects: [],
    note: 'Connecting apps to data and services over APIs.',
  },
  {
    id: 'rag',
    name: 'RAG',
    cluster: 'concepts',
    status: 'learning',
    projects: [],
    note: 'Exploring retrieval-augmented generation to ground LLMs in real data.',
  },
]