"use client";

import React from 'react';
import Head from 'next/head'; // Изменено здесь
import SideBare from '@/components/sidebar';
import AIChatComponent from '@/components/ai_chat_component';
import {Toaster} from "sonner";

export default function Home() {

  const [selectedColor, setSelectedColor] = React.useState([]);
  const [lastClicked, setLastClicked] = React.useState(null);
  const [imageWidth, setImageWidth] = React.useState(512);
  const [imageHeight, setImageHeight] = React.useState(512);
  const [useCustomColors, setUseCustomColors] = React.useState(false);
  const [transparentBackground, setTransparentBackground] = React.useState(false);

  return (
    <>
      <main className='flex flex-1'>
        <SideBare />
        <AIChatComponent props={{selectedColor, setSelectedColor, lastClicked, setLastClicked, imageHeight, setImageHeight, imageWidth, setImageWidth, useCustomColors, setUseCustomColors, transparentBackground, setTransparentBackground }}/>
      </main>  
    </>
  ); 
}