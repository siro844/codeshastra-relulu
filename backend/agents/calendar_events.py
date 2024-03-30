import datetime as dt 
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES=["https://www.googleapis.com/auth/calendar"]

creds=None
if(os.path.exists("secrets.json")):
    creds=Credentials.from_authorized_user_file("secrets.json")
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow=InstalledAppFlow.from_client_secrets_file("secrets.json",SCOPES)
        creds=flow.run_local_server(port=0)
    with open("secrets.json","w") as token:
        token.write(creds.to_json())
    
try:
    service=build("calendar","v3",credentials=creds)

    now=dt.datetime.now().isoformat()+"Z"
    events_result=service.events().list(calendarId="primary",timeMin=now,maxResults=10,singleEvents=True,orderBy="startTime")
    events=events_result.get("items",[])
    if not events:
         print("No upcoming events found.")
    for event in events:
        start=event["start"].get("dateTime",event["start"].get("date"))
        print(start,event["summary"])

except HttpError as error:
    print(f"An error occurred: {error}")