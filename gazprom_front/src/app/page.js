"use client";

import React from 'react';
import Head from 'next/head'; // Изменено здесь
import SideBare from '@/components/sidebar';
import AIChatComponent from '@/components/ai_chat_component';
import Settings from '@/components/settings_component';
import {Toaster} from "sonner";

export default function Home() {

  const [selectedColor, setSelectedColor] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState(null);

  return (
    <>
      <main className='flex flex-1'>
        <SideBare />
        <AIChatComponent props={{selectedColor, setSelectedColor, selectedImage, setSelectedImage }}/>
      </main>  
    </>
  ); 
}