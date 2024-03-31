import requests

def get_translated_text(text: str) -> str:
  """Translates the input text into english language and gives the output"""

  url = "https://google-translate113.p.rapidapi.com/api/v1/translator/text"

  payload = {
	  "from": "auto",
	  "to": "hi",
	  "text": text
  }
  headers = {
	  "content-type": "application/x-www-form-urlencoded",
	  "X-RapidAPI-Key": "213e739d75msh60c95be7cf3b135p1c0988jsnf111eb40091f",
	  "X-RapidAPI-Host": "google-translate113.p.rapidapi.com"
  }

  response = requests.post(url, data=payload, headers=headers)
  print(response.json()['trans'])

# get_translated_text('the ipl score in kkr vs mi is 129/8 and mumbai is batting')
