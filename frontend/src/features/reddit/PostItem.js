import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

export default function PostItem(
    {
    list_index,  
    id,
    title,
    created_utc,
    selftext,
    thumbnail,
    num_comments,
    ups,
    bookmarked,
    toggleBookmark
    }) {
      return (
        <Card sx={{ display: 'flex', flexDirection: 'column', m: 2 }}>
        <Box sx={{ flex: 1 }}>
          <CardHeader
            title={title + id}
            subheader={created_utc}
          />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1}}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={thumbnail}
            alt={title}
            onError={e => {
              e.target.src = 'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc='
            }}
          />
          <CardContent
          sx={{ flex: '1 0 auto' }}
          >
            <Typography variant="body2" color="text.secondary">
              {selftext}
            </Typography>
          </CardContent>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <CardActions sx={{ flex: '1 0 auto' }}>
            <Button variant="text" startIcon={<ThumbUpAltOutlinedIcon />}>
                { ups }
            </Button>
            <Button variant="text" startIcon={<ChatBubbleOutlineOutlinedIcon />}>
                { num_comments }
            </Button>
            <IconButton onClick={() => toggleBookmark(list_index, !bookmarked)} size='small' aria-label="bookmark">
                {bookmarked ? <BookmarkOutlinedIcon /> : <BookmarkBorderOutlinedIcon />}
              </IconButton>
          </CardActions>
          </Box>
        </Card>
      );
}