## Инструкция:

### Лаба 1
+ Регаемся на яндекс клауд
+ Создаём облачную функцую, заливаем туда код из index.py
  + В переменную folder_id вставляем значение отсюда:
![image](https://github.com/IvanChernomorov/clouds/assets/90576997/530060ec-0065-4dd7-915c-536ef1bfed5f)
  + В переменную IAM_TOKEN вставляем IAM токен:
    + Сначала получаем  OAuth-токен по ссылке https://oauth.yandex.ru/authorize?response_type=token&client_id=1a6990aa636648e9b2ef855fa7bec2fb
    + В PowerShell вставляем скрипт => получаем IAM токен

$yandexPassportOauthToken = "<OAuth-токен>"
$Body = @{ yandexPassportOauthToken = "$yandexPassportOauthToken" } | ConvertTo-Json -Compress
Invoke-RestMethod -Method 'POST' -Uri 'https://iam.api.cloud.yandex.net/iam/v1/tokens' -Body $Body -ContentType 'Application/json' | Select-Object -ExpandProperty iamToken

