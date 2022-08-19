import * as React from 'react';
import Container from '@mui/material/Container';
import PostList from './features/reddit/PostList'
import { Typography } from '@mui/material';

export default function App() {
  return (
    <Container maxWidth="sm">
        <Typography variant='h3'>Reddit Hot Posts</Typography>
        <PostList />
    </Container>
  );
}
