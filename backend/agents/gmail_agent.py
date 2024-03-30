from langchain.agents.agent_toolkits import GmailToolkit

toolkit = GmailToolkit() 

import os
OPENAI_API_KEY = os.getenv("OPEN_AI_API_KEY")

from langchain import OpenAI
from langchain.agents import initialize_agent, AgentType

llm = OpenAI(temperature=0, openai_api_key=OPENAI_API_KEY)

agent = initialize_agent(
    tools=toolkit.get_tools(),
    llm=llm,
    agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION,
)

def send_mail(task):
    return agent.run(task)
