import React from 'react';
import Head from 'next/head'; // Изменено здесь
import SideBare from './components/sidebar';
import AIChatComponent from './components/ai_chat_component';
import Settings from './components/settings_component';

export default function Home() {
  return (
    <>
      <main className='flex flex-1'>
        <SideBare />
        <AIChatComponent/>
      </main>  
    </>
  ); 
}