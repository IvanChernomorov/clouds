import requests
import base64

def handler(event, context):
    inp = base64.b64decode(event['body']).decode('utf-8') 
    texts = inp.split(';') 
    IAM_TOKEN = 'ваш IAM токен'
    folder_id = 'ваша ссылка'
    target_language = 'ru'

    body = {
        "targetLanguageCode": target_language,
        "sourceLanguageCode": "en",
        "texts": texts,
        "folderId": folder_id,
    }  

    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer {0}".format(IAM_TOKEN)
    }

    response = requests.post('https://translate.api.cloud.yandex.net/translate/v2/translate',
        json = body,
        headers = headers
    )

    return {
        'statusCode': 200,
        'body': response.text,
    }
