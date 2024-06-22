"use client";

import React from 'react';
import Head from 'next/head'; // Изменено здесь
import SideBare from '@/components/sidebar';
import AIChatComponent from '@/components/ai_chat_component';
import Settings from '@/components/settings_component';
import {Toaster} from "sonner";

export default function Home() {

  const [data, setData] = React.useState({});

  return (
    <>
      <main className='flex flex-1'>
        <SideBare props={{data: data, setData: setData}}/>
        <AIChatComponent props={{data: data, setData: setData}}/>
      </main>  
    </>
  ); 
}