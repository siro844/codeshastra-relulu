from langchain.llms import OpenAI
from langchain.tools import tool
import requests

@tool  # Define the tool using the @tool decorator
def get_weather(city: str) -> str:
  """Retrieves weather information for a given city using the API."""
  api_url = 'https://api.api-ninjas.com/v1/weather?city={}'.format(city)
  headers = {'X-Api-Key': 'Z0XXPyMRtCEPE3FPzRo7Iw==8W7jav3iAzERUVVq'}
  response = requests.get(api_url, headers=headers)

  if response.status_code == requests.codes.ok:
    return response.text
  else:
    return f"Error: {response.status_code} {response.text}"