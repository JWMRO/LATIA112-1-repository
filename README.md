# 學習分析工具實務應用

課名：學習分析工具實務應用 LATIA112-1

授課教師：廖執善 老師

姓名：黃博智

系級：音樂系115

# 目錄

- [課程筆記區](#課程筆記區)
- [作業連結區](#作業)
  - [作業一](#作業一)
  - [作業二](#作業二)
  - [作業三](#作業三)
  - [作業四](#作業四)
- [專題連結區](#專題連結區)

# 課程筆記區


# 作業


# 作業一
https://colab.research.google.com/drive/1dVFYG9UKX7ibu7qlIQCaVoOwj7f3wjTW

# 作業二(爬蟲)
BeautifulSoup https://github.com/JWMRO/work2-2/blob/main/%E4%BD%9C%E6%A5%AD3
selenium https://github.com/JWMRO/work2-2/blob/main/selenium%20homework
scrapy https://github.com/JWMRO/work2-2/blob/main/%E4%BD%9C%E6%A5%AD4
# 作業三(line robot)
[Uploimport sys
import configparser

# Azure Text Analytics
from azure.core.credentials import AzureKeyCredential
from azure.ai.textanalytics import TextAnalyticsClient

from flask import Flask, request, abort
from linebot.v3 import (
    WebhookHandler
)
from linebot.v3.exceptions import (
    InvalidSignatureError
)
from linebot.v3.webhooks import (
    MessageEvent,
    TextMessageContent,
)
from linebot.v3.messaging import (
    Configuration,
    ApiClient,
    MessagingApi,
    ReplyMessageRequest,
    TextMessage
)

#Config Parser
config = configparser.ConfigParser()
config.read('config.ini')

#Config Azure Analytics
credential = AzureKeyCredential(config['AzureLanguage']['API_KEY'])

app = Flask(__name__)

channel_access_token = config['Line']['CHANNEL_ACCESS_TOKEN']
channel_secret = config['Line']['CHANNEL_SECRET']
if channel_secret is None:
    print('Specify LINE_CHANNEL_SECRET as environment variable.')
    sys.exit(1)
if channel_access_token is None:
    print('Specify LINE_CHANNEL_ACCESS_TOKEN as environment variable.')
    sys.exit(1)

handler = WebhookHandler(channel_secret)

configuration = Configuration(
    access_token=channel_access_token
)

@app.route("/callback", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']
    # get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    # parse webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)
    return 'OK'

@handler.add(MessageEvent, message=TextMessageContent)
def message_text(event):
    sentiment_result = azure_sentiment(event.message.text)
    with ApiClient(configuration) as api_client:
        line_bot_api = MessagingApi(api_client)
        line_bot_api.reply_message_with_http_info(
            ReplyMessageRequest(
                reply_token=event.reply_token,
                messages=[TextMessage(text=sentiment_result)]
            )
        )

def azure_sentiment(user_input):
    text_analytics_client = TextAnalyticsClient(
        endpoint=config['AzureLanguage']['END_POINT'], 
        credential=credential)
    documents = [user_input]
    response = text_analytics_client.analyze_sentiment(
        documents, 
        show_opinion_mining=True)
    print(response)
    docs = [doc for doc in response if not doc.is_error]
    for idx, doc in enumerate(docs):
        print(f"Document text : {documents[idx]}")
        print(f"Overall sentiment : {doc.sentiment}")
    return docs[0].sentiment

if __name__ == "__main__":
    app.run()ading app.py…]()


# 專題連結區




<!---
JWMRO/JWMRO is a ✨ special ✨ repository because its `README.md` (this file) appears on your GitHub profile.
You can click the Preview link to take a look at your changes.
--->
