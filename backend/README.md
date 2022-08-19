
## About this Project
The purpose of this application is retrieve 'hot' posts from Reddit and serve them to a frontend that has infinite scroll.

## How to run this project
1. Install Anaconda from https://www.anaconda.com/ or any other python environment with version 3.9
2. Create virtual environment `conda create -n picky python==3.9`
3. Run pip install `pip install -r requirements.txt`
4. Create .env file under the `/app` directory.
5. Run `uvicorn app.main:app --host 0.0.0.0`

.env required environment variables
```
CLIENT_ID=
SECRET=
REDDIT_USERNAME=
REDDIT_PASSWORD=
```

## API Endpoints provided by this app

### Retrieve hot posts from Reddit

#### Request
`GET` /hot

[Optional] Get the 25 posts after the current position
`?after=?`

#### Response 
`200 Response`
```

{
    posts: [],
    after: ''
    message: 'OK'
}
```

A post object found inside the post list can contain the following
```
{
    'id' : 'w1jdjf'
    'title': 'Picky',
    'created_utc': 1660608678.0,
    'selftext': 'I was surfing the web for a great site selling cosmetics and I found this...',
    'thumbnail': 'https://www.image.com',
    'num_comments: 0,
    'ups': 0,
    'bookmarked' : false
}
```


`500 Error`
```
{
    message: <Error cause>
}
```

### Docker 
Has not been implemented yet

References:
1. https://towardsdatascience.com/how-to-use-the-reddit-api-in-python-5e05ddfd1e5c