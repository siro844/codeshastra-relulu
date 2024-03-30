import datetime
import os.path
from langchain_community.llms import OpenAI
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from langchain_community.tools import YouTubeSearchTool
from langchain_openai import ChatOpenAI
from langchain.agents import Tool
from langchain.prompts import PromptTemplate
import os
from dotenv import load_dotenv
from langchain.agents import AgentType, initialize_agent,load_tools
load_dotenv()
os.environ["OPENAI_API_KEY"]=os.getenv("OPENAI_API_KEY")
# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/calendar"]
llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo")

def get_credentials():
    creds = None
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)
        with open("token.json", "w") as token:
            token.write(creds.to_json())
    return creds

def get_events(creds):
    try:
        service = build("calendar", "v3", credentials=creds)
        now = datetime.datetime.utcnow().isoformat() + "Z"
        events_result = (
            service.events()
            .list(
                calendarId="primary",
                timeMin=now,
                maxResults=10,
                singleEvents=True,
                orderBy="startTime",
            )
            .execute()
        )
        events = events_result.get("items", [])
        if not events:
            print("No upcoming events found.")
        else:
            # for event in events:
            #     start = event["start"].get("dateTime", event["start"].get("date"))
            #     print(start, event["summary"])
            return events
    except HttpError as error:
        print(f"An error occurred: {error}")

def add_event(creds, duration=2, description=""):
    if  isinstance(creds, str):
        creds = get_credentials()
    start = datetime.datetime.utcnow()
    end = start + datetime.timedelta(hours=int(duration))
    start_formatted = start.isoformat() + 'Z'
    end_formatted = end.isoformat() + 'Z'

    event = {
        'summary': description,
        'start': {
            'dateTime': start_formatted,
            'timeZone': 'Asia/Kolkata',
        },
        'end': {
            'dateTime': end_formatted,
            'timeZone': 'Asia/Kolkata',
        },
    }

    service = build('calendar', 'v3', credentials=creds)
    event = service.events().insert(calendarId='primary', body=event).execute()
    print('Event created: %s' % (event.get('htmlLink')))


creds = get_credentials()

add_eventTool=Tool(
    name="add_event",
    description="Add an event to your Google Calendar, with a duration and description as arguments. you can get these from the user",
    func=add_event,
    args=["duration", "description"],
    creds=creds,
)
get_eventsTool=Tool(
    name="get_events",
    description="Get upcoming events from your Google Calendar",
    func=get_events,
    creds=creds,
)



def extract_duration(text):
    feauture_extraction_llm=OpenAI(model_name="gpt-3.5-turbo-instruct")
    our_prompt = """
    
    {query}
    You are a capable AI, who is able to accuractely extract duration and description from the user input.
    """ 
    prompt =PromptTemplate(
    input_variables=["query"],
    template=our_prompt,
    )
    final_prompt=prompt.format(query=text)
    feautures =feauture_extraction_llm(final_prompt)
    return feautures

duration_extraction_tool=Tool(
    name="duration_extraction",
    func=extract_duration,
    description="""
    Extracts the duration and description from the user input. Output should be passed to the add_event tool.Duration should be in numbers (eg 2 for 2 hrs) and description should be a string.
    """,
    input_variables=["query"],
    output_variables=["duration","description"],
)


def calendar_agent_function(query):
    calendar_tools = [add_eventTool, get_eventsTool,duration_extraction_tool]
    calendar_agent=initialize_agent(
        agent='zero-shot-react-description',
        tools=calendar_tools,
        verbose=True,
        name="calendar_agent",
        max_iterations=5,
        llm=llm
    )
    return calendar_agent.run(query)
# print(calendar_agent_function("Create a studying event for 40 mins"))