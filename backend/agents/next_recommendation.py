from langchain.llms import OpenAI
import os
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
load_dotenv()

OPENAI_API_KEY = os.getenv("OPEN_AI_API_KEY")

model=OpenAI(model_name="gpt-3.5-turbo-instruct")

prompt_template = """
Give 3-4 similar recommended searches based on this search:

{our_text}

"""
prompt = ChatPromptTemplate.from_template(template=prompt_template)
    

def get_next_recommendation(our_text):
    messages=prompt.format_messages(
        our_text= our_text
    )
    return model.invoke(messages)



    