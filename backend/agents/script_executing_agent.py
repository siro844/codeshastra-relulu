from langchain import hub
from langchain.agents import AgentExecutor
from langchain_experimental.tools import PythonREPLTool
import os
from langchain.agents import create_openai_functions_agent
from langchain_openai import ChatOpenAI

tools = [PythonREPLTool()]


from dotenv import load_dotenv
load_dotenv()
OPENAI_API_KEY = os.getenv("OPEN_AI_API_KEY")

instructions = """You are an agent designed to write and execute python code to answer questions.
You have access to a python REPL, which you can use to execute python code.
If you get an error, debug your code and try again.
Only use the output of your code to answer the question. 
You might know the answer without running any code, but you should still run the code to get the answer.
If it does not seem like you can write code to answer the question, just return "I don't know" as the answer.
"""
base_prompt = hub.pull("langchain-ai/openai-functions-template")
prompt = base_prompt.partial(instructions=instructions)

agent = create_openai_functions_agent(ChatOpenAI(temperature=0, openai_api_key= OPENAI_API_KEY), tools, prompt)

agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

def execute_script(input):
    agent_executor.invoke({f"input": {input}})