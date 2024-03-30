from langchain.agents import Agent,initialize_agent
from langchain.llms import OpenAI
from weather_api_tool import get_weather  # Import the tool

import os
OPENAI_API_KEY = os.getenv("OPEN_AI_API_KEY")

llm = OpenAI(temperature=0.9, openai_api_key=OPENAI_API_KEY)  # Load LLM model with desired temperature
agent = initialize_agent(llm=llm, tools=[get_weather])  # Create agent with the LLM and tool

def get_weather():
    return agent.run("Mumbai")
