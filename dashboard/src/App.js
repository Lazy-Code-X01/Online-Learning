import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Router from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

export default function App() {
  const [screenTimeData, setScreenTime] = useState(0);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <ToastContainer />
      <Router />
    </ThemeProvider>
  );
}
