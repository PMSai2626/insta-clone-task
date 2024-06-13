// src/pages/index.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Container, Grid, Box } from '@mui/material';
import Header from '../components/Header';
import UploadForm from '../components/UploadForm';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(response => setPosts(response.data));

    const socket = io('http://localhost:5000');

    socket.on('new-post', post => {
      setPosts(prevPosts => [post, ...prevPosts]);
    });

    socket.on('update-post', updatedPost => {
      setPosts(prevPosts => prevPosts.map(post => post.id === updatedPost.id ? updatedPost : post));
    });

    return () => socket.disconnect();
  }, []);

  return (
    <Box>
      <Header />
      <Container maxWidth="md" sx={{ mt: 3 }}>
        <UploadForm />
        <Grid container spacing={2} sx={{ mt: 3 }}>
          {posts.map(post => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
