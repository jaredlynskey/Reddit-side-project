import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { useInView } from "react-intersection-observer";
import { getHotPosts } from './../../API/reddit'
import PostItem from './PostItem';

export default function PostList() {
    
    const [loading, setLoading] = useState(true)
    const [hot_posts, setHotPosts] = useState([])
    const [after_id, setAfterId] = useState(null)

  const monitorListPosition = (inView, entry) => {
    if (loading) {
      console.info('Already loading hot posts...')
    }
    else if (!inView) {
      console.info('End of list is not in view...')
    }
    else {
      console.info('Getting more posts...')
      fetchPosts(after_id).catch(console.error);
    }
  }

    const { ref, inView, entry } = useInView({
      /* Optional options */
      threshold: 0,
      onChange: monitorListPosition,
    });

    const fetchPosts = async (after_id) => {
      setLoading(true)
      const {posts, after} = await getHotPosts(after_id)
      let new_posts = hot_posts.concat(posts)
      setHotPosts([...new_posts])
      setAfterId(after)
      setLoading(false)
    }

    useEffect(() => {
          fetchPosts(after_id).catch(console.error);
      }, [])

    const toggleBookmark = (list_index, is_bookmarked) => {
        let current_host_posts = hot_posts
        current_host_posts[list_index]['bookmarked'] = is_bookmarked
        setHotPosts([...current_host_posts])
        const bookmarked_list =  current_host_posts.filter(post => post['bookmarked'])
                                                    .map(post => { return post['id'] } )
        const json_string = JSON.stringify(bookmarked_list)
        localStorage.setItem('bookmarked', json_string)
    }

  return (
    <div>
        { 
        hot_posts.map((
            {
                id,
                title, 
                created_utc, 
                selftext, 
                thumbnail, 
                num_comments, 
                ups,
                bookmarked
            }, list_index) => {
                  return (
                  <PostItem
                    list_index={list_index}
                    key={id}
                    id={id}
                    bookmarked={bookmarked} 
                    title={title}
                    created_utc={created_utc}
                    selftext={selftext} 
                    thumbnail={thumbnail} 
                    num_comments={num_comments} 
                    ups={ups} 
                    toggleBookmark={toggleBookmark}
                  />
                )}
        )}
      <div fullWidth ref={ref} style={{height: 1}} >
        {loading ? 'Getting reddit hot posts...' : ''}
      </div>
    </div>
  );
}