## YouTube_API

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run bild
$ npm start

```

## Configure .env file
You should create the Postgres db and configure the .env file with that date.
```bash
POSTGRES_USER='some user'

POSTGRES_PASSWORD='some password'

POSTGRES_DB='some db name'

POSTGRES_PORT='some port'

YOUR_SERVICE_ACCOUNT_EMAIL='email'

YOUR_PRIVATE_KEY='YOUR_PRIVATE_KEY'
```

## Example of Russian propaganda account on YouTube
```bash
    https://www.youtube.com/@ZabTV/videos
```

# Examples of requests
#### Add account to the DB
### POST
```bash
http://localhost:3000/accounts/createAccount
```
### Example
```bash
# If you know only the URL of the channel you can use it.
    {
        "link": "https://www.youtube.com/@ZabTV"
    }

# In another case, you can use channelId.
    {
      "channelId": "channelId"  
    }
```
### Example of result
```bash
# Used link
    {
        "channelId": null,
        "link": "https://www.youtube.com/@ZabTV",
        "sourceId": 14,
        "title": null,
        "subscribers": null,
        "id": 20
    }
```

#### Update account
### POST
```bash
http://localhost:3000/accounts/updateAccount/{accountId}
```
### Example
```bash
http://localhost:3000/accounts/updateAccount/20
```

### Example of result
```bash
    {
        "id": 20,
        "sourceId": 14,
        "channelId": "UCTibZDy4EAhWCfNTHanilvA",
        "title": "ZABTV",
        "link": "https://www.youtube.com/@ZabTV",
        "subscribers": 140000
    }
    
``` 
### Get list of all accounts
### GET
```bash
http://localhost:3000/accounts/allAccounts
``` 
### Example of result
```bash
    {
        "id": 20,
        "sourceId": 14,
        "channelId": "UCTibZDy4EAhWCfNTHanilvA",
        "title": "ZABTV",
        "link": "https://www.youtube.com/@ZabTV",
        "subscribers": 140000
    }
```

### Get all posts
### GET
```bash
http://localhost:3000/posts
``` 
### Example of result
```bash
    {
    "data": [
        {
            "account": {
                "id": 20,
                "sourceId": 14,
                "channelId": "UCTibZDy4EAhWCfNTHanilvA",
                "title": "ZABTV",
                "link": "https://www.youtube.com/@ZabTV",
                "subscribers": 140000
            },
            "title": "АКТУАЛЬНО - Что с сити-менеджером?",
            "description": "Экс-сити-менеджер Читы Александр Сапожников не изменил информацию о месте работы после увольнения из городской ...",
            "publishedAt": "2023-05-02T03:36:45Z",
            "link": "https://www.youtube.com/watch?v=cGt7z5hkXUY",
            "accountId": 20,
            "text": null,
            "videoId": null,
            "id": 1584
        },
        {
            "account": {
                "id": 20,
                "sourceId": 14,
                "channelId": "UCTibZDy4EAhWCfNTHanilvA",
                "title": "ZABTV",
                "link": "https://www.youtube.com/@ZabTV",
                "subscribers": 140000
            },
            "title": "АКТУАЛЬНО - Опять Неверов",
            "description": "Школьный стадион на перекрестке улиц Таежной и Нечаева в Чите снесут, до конца года построят детский сад на 270 ...",
            "publishedAt": "2023-05-04T03:29:38Z",
            "link": "https://www.youtube.com/watch?v=VhzKiltbjmM",
            "accountId": 20,
            "text": null,
            "videoId": null,
            "id": 1585
        },
        {
            "account": {
                "id": 20,
                "sourceId": 14,
                "channelId": "UCTibZDy4EAhWCfNTHanilvA",
                "title": "ZABTV",
                "link": "https://www.youtube.com/@ZabTV",
                "subscribers": 140000
            },
            "title": "Обоснованы ли упорные слухи об отставке главы региона",
            "description": "Каждую весну, начиная с 2019 года, по Забайкалью бродят упорные слухи об отставке Александра Осипова. Насколько они ...",
            "publishedAt": "2023-05-03T06:35:01Z",
            "link": "https://www.youtube.com/watch?v=N00ISIn4Uus",
            "accountId": 20,
            "text": null,
            "videoId": null,
            "id": 1586
        },
        {
            "account": {
                "id": 20,
                "sourceId": 14,
                "channelId": "UCTibZDy4EAhWCfNTHanilvA",
                "title": "ZABTV",
                "link": "https://www.youtube.com/@ZabTV",
                "subscribers": 140000
            },
            "title": "АКТУАЛЬНО - &quot;Убитый&quot; сквер",
            "description": "Отделение Народного фронта в Забайкальском крае раскритиковало благоустройство сквера «Солнечный» в Чите ...",
            "publishedAt": "2023-05-03T02:50:32Z",
            "link": "https://www.youtube.com/watch?v=I-w7l8VRsCw",
            "accountId": 20,
            "text": null,
            "videoId": null,
            "id": 1587
        }
      ]
    }
```