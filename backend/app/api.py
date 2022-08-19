import requests
import logging

CLIENT_ID = 'uTfc54HMbJBU9HYec_52bA'
SECRET = 'ZfRCEGbpol6E2KJC1IkCQ3yZPYUYYw'
REDDIT_USERNAME = 'new_hot_test'
REDDIT_PASSWORD = 'Great!!123'

class RedditAPI:

    REDDIT_AUTH_BASEURL = 'https://www.reddit.com/'
    REDDIT_API_BASEURL = 'https://oauth.reddit.com/'
    REDDIT_AUTH_URL = REDDIT_AUTH_BASEURL + 'api/v1/access_token'
    REDDIT_HOT_POSTS_URL = REDDIT_API_BASEURL + 'hot'
    ALLOWED_POST_KEYS = ['id', 'title', 'created_utc', 'selftext', 'thumbnail', 'num_comments', 'ups']
    
    headers = {'User-Agent': 'Picky_test/0.0.1'}
    access_token = None
    

    def __init__(self) -> None:
        """
        When class is called get and set headers for requests
        """
        self.get_reddit_token()
        self.get_reddit_headers()
    
    def get_reddit_token(self):
        """
        Get API token from reddit with Basic Auth
        """
        auth = requests.auth.HTTPBasicAuth(CLIENT_ID, SECRET)
        data = {'grant_type': 'password', 'username': REDDIT_USERNAME, 'password': REDDIT_PASSWORD}
        response = requests.post(self.REDDIT_AUTH_URL , auth=auth, data=data, headers=self.headers)
        response_json = response.json()
        self.access_token = response_json.get('access_token')

    def get_reddit_headers(self):
        """
        Add auth headers to requests
        """
        self.headers = {**self.headers, **{'Authorization': f"bearer {self.access_token}"}}
    
    def get_hot_posts(self, before=None, after=None):
        results = {}
        try:
            response = requests.get(self.REDDIT_HOT_POSTS_URL, \
                                    params={'before': before, 'after': after}, \
                                    headers=self.headers)
            
            response_json = response.json()
            data = response_json.get('data')
            children = data.get('children')

            posts = []
            for raw_post in children:
                filtered_post = dict()
                raw_post = raw_post.get('data')
                for post_key in self.ALLOWED_POST_KEYS:
                    filtered_post[post_key] = raw_post.pop(post_key)
                filtered_post['bookmarked'] = False
                posts.append(filtered_post)
            
            results['posts'] = posts
            results['after'] = data.get('after')
            results['before'] = data.get('before')
            results['message'] = 'Retrieved hot posts successfully'
            results['ok'] = True
        except Exception as e:
            results['message'] = 'An error occured while getting hot posts'
            results['ok'] = False
        return results

if __name__ == "__main__":
    api = RedditAPI()
    response = api.get_hot_posts()