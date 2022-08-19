import axios from "axios";

const api = axios.create({
    baseURL: `http://${window.location.hostname}:8000`
    
  });

axios.defaults.headers.common.Accept = 'application/json'; 

export async function getHotPosts(after) {
    const resp = await api.get(`/hot`, { params: {'after': after} } )
    const { data } = resp
    let { posts } = data
    const bookmarked = JSON.parse(localStorage.getItem('bookmarked'))
    posts = posts.map(post => { return {...post, bookmarked: bookmarked.indexOf(post['id']) != -1 ? true : false}} )
    data['posts'] = posts
    return data
  }