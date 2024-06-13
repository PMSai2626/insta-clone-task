// src/components/CommentSection.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const CommentSection = ({ postId, comments }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;
    await axios.post('http://localhost:5000/comment', { id: postId, comment: newComment });
    setNewComment('');
  };

  return (
    <Box>
      <List>
        {comments.map((comment, index) => (
          <ListItem key={index} disablePadding>
            <ListItemText primary={comment} />
          </ListItem>
        ))}
      </List>
      <TextField
        fullWidth
        label="Add a comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleCommentSubmit();
          }
        }}
        sx={{ mt: 1 }}
      />
      <Button variant="contained" color="primary" onClick={handleCommentSubmit} sx={{ mt: 1 }}>
        Comment
      </Button>
    </Box>
  );
};

export default CommentSection;
