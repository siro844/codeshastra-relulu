from langchain_community.tools import YouTubeSearchTool
from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv
from langchain.agents import AgentType, initialize_agent,load_tools
load_dotenv()
from langchain_community.tools.google_finance import GoogleFinanceQueryRun
from langchain_community.utilities.google_finance import GoogleFinanceAPIWrapper
os.environ["SERPAPI_API_KEY"] = "af5ce4a05b46dd2be9269279239d840d8c9b69b6a1cfabc5bcb59f87ed289684"
tool = GoogleFinanceQueryRun(api_wrapper=GoogleFinanceAPIWrapper())
os.environ["OPENAI_API_KEY"]=os.getenv("OPENAI_API_KEY")
tool = YouTubeSearchTool()
llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo")
tools = load_tools(["serpapi"], llm=llm)
tools.append(tool)

def realtime_agent_function(query):
    realtime_agent = initialize_agent(
        tools,
        llm,
        agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION,
        verbose=True,
        steps=5,
    )
    return realtime_agent.run(query)

