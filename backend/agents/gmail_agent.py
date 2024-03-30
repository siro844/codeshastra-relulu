from langchain.agents.agent_toolkits import GmailToolkit

toolkit = GmailToolkit() 

import os
os.environ['OPENAI_API_KEY'] = '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'

from langchain import OpenAI
from langchain.agents import initialize_agent, AgentType

llm = OpenAI(temperature=0)

agent = initialize_agent(
    tools=toolkit.get_tools(),
    llm=llm,
    agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION,
)

print(agent.run("Send a email to srinathreddy239@gmail.com saying Hello! and send emailafter 5 minute. Do not stop script execution"))

