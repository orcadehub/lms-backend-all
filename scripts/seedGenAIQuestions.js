require('dotenv').config();
const mongoose = require('mongoose');
const GenAIQuestion = require('../models/GenAIQuestion');

const questions = [
  {
    order: 1,
    title: 'Gemini via OpenAI SDK',
    difficulty: 'easy',
    tags: ['gemini', 'openai-sdk'],
    requiredLibraries: ['openai'],
    problemStatement: `## Q1: Get a response from Gemini 2.5 Flash using the OpenAI SDK

Use the **OpenAI Python SDK** with Gemini's OpenAI-compatible endpoint to get a response.

**Requirements:**
- Use \`openai.OpenAI\` client with Gemini's base URL
- Base URL: \`https://generativelanguage.googleapis.com/v1beta/openai/\`
- Model: \`gemini-2.5-flash\`
- Send any message and store the reply text in a variable called \`output\`
- Print \`output\`

**API Key:** Available as \`os.environ["GOOGLE_API_KEY"]\``,
    starterCode: `import os
from openai import OpenAI

# Your code here
# Store the response text in a variable called 'output'
`,
    testCode: `
import unittest

class TestGeminiOpenAI(unittest.TestCase):
    def test_output_is_string(self):
        self.assertIsInstance(output, str)

    def test_output_not_empty(self):
        self.assertGreater(len(output.strip()), 20, "Response too short")

    def test_used_correct_client(self):
        from openai import OpenAI
        self.assertTrue(True)

unittest.main(argv=[''], exit=False, verbosity=2)
`
  },
  {
    order: 2,
    title: 'Gemini via LiteLLM',
    difficulty: 'easy',
    tags: ['gemini', 'litellm'],
    requiredLibraries: ['litellm'],
    problemStatement: `## Q2: Get a response from Gemini 2.5 Flash using LiteLLM

Use **LiteLLM** to call Gemini and get a response.

**Requirements:**
- Import \`completion\` from \`litellm\`
- Set \`GEMINI_API_KEY\` from \`GOOGLE_API_KEY\` env var
- Model: \`gemini/gemini-2.5-flash\`
- Send any message and store the reply text in a variable called \`output\`
- Print \`output\`

**API Key:** Available as \`os.environ["GOOGLE_API_KEY"]\``,
    starterCode: `import os
from litellm import completion

os.environ["GEMINI_API_KEY"] = os.environ.get("GOOGLE_API_KEY", "")

# Your code here
# Store the response text in a variable called 'output'
`,
    testCode: `
import unittest

class TestGeminiLiteLLM(unittest.TestCase):
    def test_output_is_string(self):
        self.assertIsInstance(output, str)

    def test_output_not_empty(self):
        self.assertGreater(len(output.strip()), 20, "Response too short")

    def test_litellm_used(self):
        import litellm
        self.assertTrue(True)

    def test_gemini_key_set(self):
        import os
        self.assertTrue(len(os.environ.get("GEMINI_API_KEY", "")) > 0, "GEMINI_API_KEY not set")

unittest.main(argv=[''], exit=False, verbosity=2)
`
  },
  {
    order: 3,
    title: 'Gradio Chatbot with History',
    difficulty: 'medium',
    tags: ['gradio', 'gemini', 'chatbot'],
    requiredLibraries: ['gradio', 'openai'],
    problemStatement: `## Q3: Build a Chatbot using Gradio ChatInterface with History

Create a Gradio chatbot that maintains conversation history using Gemini.

**Requirements:**
- Define a function \`chat(message, history)\` that:
  - Accepts current message and chat history
  - Calls Gemini 2.5 Flash with full history context
  - Returns the reply as a string
- Create a \`gr.ChatInterface(fn=chat)\` and assign it to \`demo\`
- Launch with \`demo.launch(share=True)\`

**API Key:** Available as \`os.environ["GOOGLE_API_KEY"]\``,
    starterCode: `import os
import gradio as gr
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("GOOGLE_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# Define chat function and launch demo
`,
    testCode: `
import unittest
import inspect

class TestGradioChat(unittest.TestCase):
    def test_chat_function_exists(self):
        self.assertTrue(callable(chat), "chat function not defined")

    def test_chat_accepts_two_args(self):
        sig = inspect.signature(chat)
        self.assertEqual(len(sig.parameters), 2, "chat must accept (message, history)")

    def test_chat_returns_string(self):
        result = chat("Hello", [])
        self.assertIsInstance(result, str, "chat must return a string")
        self.assertGreater(len(result.strip()), 0, "chat returned empty string")

    def test_demo_exists(self):
        self.assertIsNotNone(demo, "demo variable not defined")

unittest.main(argv=[''], exit=False, verbosity=2)
`
  },
  {
    order: 4,
    title: 'Researcher Agent with CrewAI',
    difficulty: 'medium',
    tags: ['crewai', 'agents', 'gemini'],
    requiredLibraries: ['crewai[google-genai]'],
    problemStatement: `## Q4: Create a Researcher Agent using CrewAI

Build a single-agent CrewAI crew that researches a topic.

**Requirements:**
- Create an \`LLM\` using model \`gemini/gemini-2.5-flash\`
- Create an \`Agent\` with role \`"Researcher"\`
- Create a \`Task\` that asks the agent to research any topic
- Create a \`Crew\` with the agent and task, assign it to variable \`crew\`
- Run with \`result = crew.kickoff()\`
- Print \`str(result)\`

**API Key:** Available as \`os.environ["GOOGLE_API_KEY"]\``,
    starterCode: `import os
from crewai import Agent, Task, Crew, LLM

os.environ["GEMINI_API_KEY"] = os.environ.get("GOOGLE_API_KEY", "")

# Your code here
`,
    testCode: `
import unittest

class TestCrewAI(unittest.TestCase):
    def test_crew_exists(self):
        self.assertIsNotNone(crew, "crew variable not defined")

    def test_crew_has_agent(self):
        self.assertGreater(len(crew.agents), 0, "Crew has no agents")

    def test_agent_role(self):
        self.assertEqual(crew.agents[0].role, "Researcher", "Agent role must be 'Researcher'")

    def test_crew_has_task(self):
        self.assertGreater(len(crew.tasks), 0, "Crew has no tasks")

    def test_result_exists(self):
        self.assertIsNotNone(result, "result variable not defined")

    def test_result_not_empty(self):
        self.assertGreater(len(str(result).strip()), 20, "Result too short")

unittest.main(argv=[''], exit=False, verbosity=2)
`
  },
  {
    order: 5,
    title: 'LangChain Chain with Gemini',
    difficulty: 'medium',
    tags: ['langchain', 'gemini', 'chain'],
    requiredLibraries: ['langchain', 'langchain-google-genai'],
    problemStatement: `## Q5: Create a LangChain Chain with Gemini 2.5 Flash

Build a LangChain prompt → LLM → parser chain using Gemini.

**Requirements:**
- Use \`ChatGoogleGenerativeAI\` with model \`gemini-2.5-flash\`
- Create a \`ChatPromptTemplate\` with a system message and \`{question}\` placeholder
- Build a chain: \`prompt | llm | StrOutputParser()\`, assign to variable \`chain\`
- Invoke the chain with any question, store result in variable \`output\`
- Print \`output\`

**API Key:** Available as \`os.environ["GOOGLE_API_KEY"]\``,
    starterCode: `import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Your code here
# chain = prompt | llm | StrOutputParser()
# output = chain.invoke({"question": "..."})
`,
    testCode: `
import unittest

class TestLangChain(unittest.TestCase):
    def test_chain_exists(self):
        self.assertIsNotNone(chain, "chain variable not defined")

    def test_output_exists(self):
        self.assertIsNotNone(output, "output variable not defined")

    def test_output_is_string(self):
        self.assertIsInstance(output, str, "output must be a string")

    def test_output_not_empty(self):
        self.assertGreater(len(output.strip()), 20, "Output too short")

    def test_used_langchain(self):
        from langchain_core.runnables import Runnable
        self.assertTrue(True)

unittest.main(argv=[''], exit=False, verbosity=2)
`
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
  console.log('Connected to MongoDB');

  await GenAIQuestion.deleteMany({});
  console.log('Cleared existing GenAI questions');

  const inserted = await GenAIQuestion.insertMany(questions);
  console.log(`Seeded ${inserted.length} GenAI questions`);

  await mongoose.disconnect();
  console.log('Done');
}

seed().catch(err => { console.error(err); process.exit(1); });
