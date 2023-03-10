from flask import Blueprint, request
from flask_login import login_required, current_user
import requests


news_routes = Blueprint('news', __name__)

@news_routes.route('')
def get_news():
    url = "https://ny-times-news-titles-and-urls.p.rapidapi.com/news"

    headers = {
	"X-RapidAPI-Key": "0b56f2c0f7mshbe70549ea744009p186443jsna73336b1371b",
	"X-RapidAPI-Host": "ny-times-news-titles-and-urls.p.rapidapi.com"
    }
    response = requests.request("GET", url, headers=headers)
    # print(response.text, 'huhhhhh')
    return response.text
