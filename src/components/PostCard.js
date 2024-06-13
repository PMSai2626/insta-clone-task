// src/components/PostCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, Box } from '@mui/material';
import CommentSection from './CommentSection';
import axios from 'axios';

const PostCard = ({ post }) => {
  const handleLike = async () => {
    await axios.post('http://localhost:5000/like', { id: post.id });
  };

  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={`http://localhost:5000/uploads/${post.photo}`}
        alt="Post image"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleLike}>
          Like {post.likes}
        </Button>
      </CardActions>
      <Box sx={{ px: 2, pb: 2 }}>
        <CommentSection postId={post.id} comments={post.comments} />
      </Box>
    </Card>
  );
};

export default PostCard;
