"use client";

import React, { useState, useRef, useEffect } from 'react';
import ColorChoose from './color_choose_component';
import Image from 'next/image';
import cb from '../../public/cb.svg';
import cc from '../../public/cc.svg';
import cl from '../../public/cl.svg';
import cr from '../../public/cr.svg';
import ct from '../../public/ct.svg';
import lb from '../../public/lb.svg';
import lt from '../../public/lt.svg';
import rb from '../../public/rb.svg';
import rt from '../../public/rt.svg';

export default function Settings({props}) {
    const [activeIndex, setActiveIndex] = useState(null);
    const [colorChooseCount, setColorChooseCount] = useState(1);
    const colorChooseComponents = Array.from({ length: colorChooseCount }, (_, index) => (
        <ColorChoose key={index} props={{selectedColor: props.selectedColor, setSelectedColor: props.setSelectedColor}}/>
    ));

    const handleClick = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    const handleAddColorChoose = () => {
        setColorChooseCount(colorChooseCount + 1);
    };

    const handleRemoveColorChoose = () => {
        setColorChooseCount(colorChooseCount - 1);
    };


    
  const [lastClicked, setLastClicked] = useState(null);

    const handleImageClick = (index) => {
        if (selectedImage === index) {
          setSelectedImage(null);
        } else {
          setSelectedImage(index);
        }
        setLastClicked(index);
      };

    return (
        <div className="bg-gray-200 w-1/5 max-w-80 h-screen overflow-y-auto scrollbar-hide font-light border-l-2 border-l-gray-400">
            <h2 className="text-base text-center p-8">Дополнительные настройки</h2>
            <div className="flex flex-col pb-0">
                <button className={`text-left p-3 ${activeIndex === 1 ? 'bg-blue-500 text-white mb-px' : 'mb-4 bg-white text-blue-500'}`} onClick={() => handleClick(1)}> &gt; Масштаб</button>
                {activeIndex === 1 && (
                    <div className=' bg-blue-500 text-white px-3 py-5'>
                        <p >Ширина: <input type="number" defaultValue="512" className='editable-field bg-blue-500 w-12 mb-2' />px</p>
                        <p >Высота: <input type="number" defaultValue="512" className='editable-field bg-blue-500 w-12 mb-4' />px</p>
                        <p>Расположение:</p>
                        <div className='flex flex-1 gap-1'>
                            <button onClick={() => handleImageClick(1)}>
                                <Image src={cb} alt="Panel" className={`mr-4 ${selectedImage === 1 ? 'invert' : ''}`} />
                            </button>
                            <button onClick={() => handleImageClick(2)}>
                                <Image src={cc} alt="Panel" className={`mr-4 ${selectedImage === 2 ? 'invert' : ''}`} />
                            </button>
                            <button onClick={() => handleImageClick(3)}>
                                <Image src={cl} alt="Panel" className={`mr-4 ${selectedImage === 3 ? 'invert' : ''}`} />
                            </button>
                            <button onClick={() => handleImageClick(4)}>
                                <Image src={cr} alt="Panel" className={`mr-4 ${selectedImage === 4 ? 'invert' : ''}`} />
                            </button>
                            <button onClick={() => handleImageClick(5)}>
                                <Image src={ct} alt="Panel" className={`mr-4 ${selectedImage === 5 ? 'invert' : ''}`} />
                            </button>
                            <button onClick={() => handleImageClick(6)}>
                                <Image src={lb} alt="Panel" className={`mr-4 ${selectedImage === 6 ? 'invert' : ''}`} />
                            </button>
                            <button onClick={() => handleImageClick(7)}>
                                <Image src={lt} alt="Panel" className={`mr-4 ${selectedImage === 7 ? 'invert' : ''}`} />
                            </button>
                            <button onClick={() => handleImageClick(8)}>
                                <Image src={rb} alt="Panel" className={`mr-4 ${selectedImage === 8 ? 'invert' : ''}`} />
                            </button>
                            <button onClick={() => handleImageClick(9)}>
                                <Image src={rt} alt="Panel" className={`mr-4 ${selectedImage === 9 ? 'invert' : ''}`} />
                            </button>
                        </div>
                    </div>
                )}
                <button className={`text-left p-3 ${activeIndex === 2 ? 'bg-blue-500 text-white mb-px' : 'bg-white text-blue-500'}`} onClick={() => handleClick(2)}> &gt; Цвета</button>
                {activeIndex === 2 && (
                    <div className=' bg-blue-500 text-white px-3 py-5'>
                        <p className='mb-3 text-lg'>Настройки цветов</p>
                        <form>
                            <p>Использовать свои цвета<input type='checkbox' className='ml-2 editable-field' /></p>
                            <p>Прозрачный фон<input type='checkbox' className='ml-2 editable-field' /></p>
                        </form>
                        <div className='flex gap-3 mt-3 flex-wrap'>
                            {colorChooseComponents}
                        </div>
                        <div>
                            <button onClick={handleRemoveColorChoose} className='px-4 text-3xl'>-</button>
                            <button onClick={handleAddColorChoose} className='px-4 text-3xl'>+</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
