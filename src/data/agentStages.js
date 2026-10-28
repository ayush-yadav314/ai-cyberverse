export const agentStages = [
  {
    id: 'perceive',
    label: 'PERCEIVE',
    title: 'Perceive',
    color: '#22d3ee',
    summary: 'The agent takes in information from its world.',
    detail:
      "Input can be a user's goal, the text of a web page, or fresh data from an API. If the input is poor, every later stage suffers.",
    example: "A request arrives: 'find the latest price of a stock'.",
  },
  {
    id: 'reason',
    label: 'REASON',
    title: 'Reason',
    color: '#3b82f6',
    summary: 'The language model works out what the input means.',
    detail:
      'The LLM interprets the goal, looks at context and memory, and decides what matters. This is where an agent starts to differ from a fixed script.',
    example: "Realizing 'latest price' needs live data, not a guess.",
  },
  {
    id: 'plan',
    label: 'PLAN',
    title: 'Plan',
    color: '#8b5cf6',
    summary: 'Break a big goal into smaller steps.',
    detail:
      'The agent decides the order of actions and which tool each step needs. Frameworks like LangGraph let you describe this flow as a graph of steps.',
    example: 'Plan: fetch data, check the news, then write a summary.',
  },
  {
    id: 'tools',
    label: 'USE TOOLS',
    title: 'Use Tools',
    color: '#ec4899',
    summary: "Call outside tools for things the model can't do alone.",
    detail:
      'Tool calling lets an agent search the web, drive a browser or read a data library. The model chooses the tool and its inputs, then normal code runs it.',
    example: 'A browser (Playwright) or a market-data library (yfinance).',
  },
  {
    id: 'act',
    label: 'ACT',
    title: 'Act',
    color: '#fb923c',
    summary: 'Carry out the step in the real world.',
    detail:
      'The chosen action actually happens: a click, a request, a written answer. Good agents limit which actions are allowed.',
    example: 'Opening a page, or writing the summary.',
  },
  {
    id: 'observe',
    label: 'OBSERVE',
    title: 'Observe',
    color: '#a3e635',
    summary: 'Look at what happened.',
    detail:
      'The agent reads the result of its action (page content, an error, returned data) and checks it against the goal. This feedback is what makes agents adaptive.',
    example: 'The page loaded, but the data I wanted is missing.',
  },
  {
    id: 'iterate',
    label: 'ITERATE',
    title: 'Iterate',
    color: '#22d3ee',
    summary: 'Decide: done, or go around again.',
    detail:
      "If the goal isn't met, the agent updates its plan and loops back. A stop condition and a step limit keep the loop from running forever.",
    example: 'Try another source, or finish and report the result.',
  },
]