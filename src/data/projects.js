// screenshot: set to a path like '/projects/browser-agent.webp' after you
// add a REAL screenshot to the public/projects folder. Leave null until then.

export const featuredProjects = [
  {
    id: 'browser',
    index: '01',
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
]