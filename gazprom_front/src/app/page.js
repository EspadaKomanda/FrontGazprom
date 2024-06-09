import React from 'react';
import Head from 'next/head'; // Изменено здесь
import SideBare from './components/sidebar';

export default function Home() {
  return (
    <>
      <Head> {/* Изменено здесь */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </Head>
      <main className='flex flex-1'>
        <SideBare />
      </main>  
    </>
  ); 
}