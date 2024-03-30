from langchain import hub
from langchain.agents import AgentExecutor
from langchain_experimental.tools import PythonREPLTool
import os
from langchain.agents import create_openai_functions_agent
from langchain_openai import ChatOpenAI
from langchain.agents import AgentType, initialize_agent,load_tools
tools = [PythonREPLTool()]


from dotenv import load_dotenv
load_dotenv()
OPENAI_API_KEY = os.getenv("OPEN_AI_API_KEY")
llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo")

script_executing_agent = initialize_agent(
        tools,
        llm,
        agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION,
        verbose=True,
        steps=5,
)
# agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

def execute_script(input):
    script_executing_agent.invoke(input)
