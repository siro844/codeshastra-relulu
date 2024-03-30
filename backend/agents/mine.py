from langchain_openai import ChatOpenAI
from langchain_community.agent_toolkits.github.toolkit import GitHubToolkit
from langchain_community.utilities.github import GitHubAPIWrapper
from langchain.prompts import ChatPromptTemplate
import os
from dotenv import load_dotenv
from langchain.agents import AgentType, initialize_agent
from langchain.tools.render import format_tool_to_openai_function
from langchain.prompts import MessagesPlaceholder
from langchain.agents.format_scratchpad import format_to_openai_functions
from langchain.agents.output_parsers import OpenAIFunctionsAgentOutputParser
load_dotenv()
os.environ["OPENAI_API_KEY"]=os.getenv("OPENAI_API_KEY")

from langchain.schema.runnable import RunnablePassthrough
from langchain.agents import AgentExecutor
from langchain.memory import ConversationBufferMemory


# llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo")
with open("github.pem", "r") as file:
    pem_contents = file.read()

os.environ["GITHUB_APP_PRIVATE_KEY"] = pem_contents
os.environ["GITHUB_APP_ID"] = "865914"
os.environ["GITHUB_BRANCH"] = "main"
os.environ["GITHUB_BASE_BRANCH"] = "main"
github = GitHubAPIWrapper(github_repository="siro844/Spam-email-classifier",github_app_id="865914")
toolkit = GitHubToolkit.from_github_api_wrapper(github)
tools = toolkit.get_tools()

llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo")

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a  GitHub agent who can perform various github actions like creating and managing repos,creating pull requests issues, and solving issues"),
    MessagesPlaceholder(variable_name="chat_history"),
    ("user", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad")
])
chain = prompt | llm | OpenAIFunctionsAgentOutputParser()

agent_chain = RunnablePassthrough.assign(
    agent_scratchpad= lambda x: format_to_openai_functions(x["intermediate_steps"])
) | prompt | llm | OpenAIFunctionsAgentOutputParser()


memory = ConversationBufferMemory(return_messages=True,memory_key="chat_history")

agent_executor = AgentExecutor(agent=agent_chain, tools=tools, verbose=True, memory=memory)



agent_executor.invoke(
    {"input": "Write readme file for the project",}
)