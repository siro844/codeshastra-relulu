from langchain.agents import Agent,initialize_agent
from langchain.llms import OpenAI
from weather_api_tool import get_weather  # Import the tool

import os
os.environ["OPENAI_API_KEY"]="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"
llm = OpenAI(temperature=0.9)  # Load LLM model with desired temperature
agent = initialize_agent(llm=llm, tools=[get_weather])  # Create agent with the LLM and tool
