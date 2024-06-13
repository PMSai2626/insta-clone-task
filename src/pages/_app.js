import React, { useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import '../styles/globals.css';
import { io } from 'socket.io-client';

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
