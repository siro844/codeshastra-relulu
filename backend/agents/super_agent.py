from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv
from langchain.agents import AgentType, initialize_agent,load_tools
load_dotenv()
os.environ["OPENAI_API_KEY"]=os.getenv("OPENAI_API_KEY")
llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo")
from langchain.output_parsers import ResponseSchema
from langchain.output_parsers import StructuredOutputParser

from langchain_core.prompts import ChatPromptTemplate
def super_agent_function():
    prompt_template = """
        You have to decide what category does the input belong to from the the follwing options:
        1. GitHub
        2. RealtimeInfo regarding sports,news or any other topic
        3. Script Execution
        4. Calendar Events
        5. Gmail
        Only answer with the category name this is extremely important.
        The following is the input:
        {input}.
        """

    prompt = ChatPromptTemplate.from_template(template=prompt_template)
    messages=prompt.format_messages(
                input=input,
            )
    return llm.invoke(messages).content

