'use client'

import { Provider } from 'react-redux';
import store from '../redux/store';
import React from "react";
import "@/styles/tailwind.css";
import "../styles/index.css";
import "../styles/font.css";

function RootLayout({ children }) {
  return (
    <Provider store={store}>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
    </Provider>
  );
}
export default RootLayout;
