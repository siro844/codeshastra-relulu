from langchain_openai import ChatOpenAI
from langchain_community.agent_toolkits.github.toolkit import GitHubToolkit
from langchain_community.utilities.github import GitHubAPIWrapper
import os
from dotenv import load_dotenv
load_dotenv()
# llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo")
with open("github.pem", "r") as file:
    pem_contents = file.read()

# os.environ["GITHUB_APP_PRIVATE_KEY"] = pem_contents
# os.environ["GITHUB_APP_ID"] = "865914"
# os.environ["GITHUB_BRANCH"] = "main"
# os.environ["GITHUB_BASE_BRANCH"] = "main"
os.environ["OPENAI_API_KEY"]=os.getenv("OPENAI_API_KEY")

github = GitHubAPIWrapper(
    github_repository="siro844/Spam-email-classifier",
    # github_branch="main",
    # github_base_branch="main",
    github_app_id="865914",
    github_app_private_key=pem_contents
    )
toolkit = GitHubToolkit.from_github_api_wrapper(github)
tools = toolkit.get_tools()

llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo")
github = GitHubAPIWrapper()
toolkit = GitHubToolkit.from_github_api_wrapper(github)
tools = toolkit.get_tools()

# STRUCTURED_CHAT includes args_schema for each tool, helps tool args parsing errors.
agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
)
print("Available tools:")
for tool in tools:
    print("\t" + tool.name)
agent.run(
    "Merge all the branches into main branch."
)