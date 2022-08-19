from typing import Union

from fastapi import Body, FastAPI, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.api import RedditAPI

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api = RedditAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/hot")
def hot_items(before: str = None, after: str = None):
    result = api.get_hot_posts(before=before, after=after)
    json_result = jsonable_encoder(result)
    status_code = status.HTTP_200_OK if result['ok'] else status.HTTP_500_INTERNAL_SERVER_ERROR
    return JSONResponse(status_code=status_code, content=json_result)