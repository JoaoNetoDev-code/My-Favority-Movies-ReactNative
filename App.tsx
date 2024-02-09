import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routes from './src/routes';
import { MovieProvider } from './src/Context/MoviesContext';

export default function App() {
  return (
    <>
      <MovieProvider>
        <Routes/>
        <StatusBar style="light" translucent backgroundColor="#242a32" />
      </MovieProvider>
    </>
  );
}
