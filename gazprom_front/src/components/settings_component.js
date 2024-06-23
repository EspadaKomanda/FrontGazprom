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
    const [colorChooseCount, setColorChooseCount] = useState(0);
    const colorChooseComponents = Array.from({ length: colorChooseCount }, (_, index) => (
        <ColorChoose key={index} props={{selectedColor: props.selectedColor, setSelectedColor: props.setSelectedColor, index: index}}/>
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
        props.setSelectedColor([...props.selectedColor, '#ffffff']);
    };

    const handleRemoveColorChoose = () => {
        setColorChooseCount(colorChooseCount - 1);
        props.setSelectedColor(props.selectedColor.slice(0, -1));
    };

    const [selectedImage, setSelectedImage] = React.useState(null);
    const handleImageClick = (index) => {
        if (selectedImage === index) {
          setSelectedImage(null);
        } else {
          setSelectedImage(index);
        }
        props.setLastClicked(index);
    };

    const handleUseCustomColorsChange = (e) => {
        props.setUseCustomColors(e.target.checked);
    };

    const handleTransparentBackgroundChange = (e) => {
        props.setTransparentBackground(e.target.checked);
    };

    return (
        <div className="bg-gray-200 w-1/5 max-w-80 h-screen overflow-y-auto scrollbar-hide font-light border-l-2 border-l-gray-400">
            <h2 className="text-base text-center p-8">Дополнительные настройки</h2>
            <div className="flex flex-col pb-0">
                <button className={`text-left p-3 ${activeIndex === 'scale' ? 'bg-blue-500 text-white mb-px' : 'mb-4 bg-white text-blue-500'}`} onClick={() => handleClick('scale')}> &gt; Масштаб</button>
                {activeIndex === 'scale' && (
                    <div className=' bg-blue-500 text-white px-3 py-5'>
                        <p >Ширина: <input type="number" value={props.imageWidth} onChange={(e) => props.setImageWidth(e.target.value)} className='editable-field bg-blue-500 w-14 mb-2' min="128" max="4096" step="128" />px</p>
                        <p >Высота: <input type="number" value={props.imageHeight} onChange={(e) => props.setImageHeight(e.target.value)} className='editable-field bg-blue-500 w-14 mb-4' min="128" max="4096" step="128" />px</p>
                        <p>Расположение:</p>
                        <div className='flex flex-1 gap-1'>
                            <button onClick={() => handleImageClick('center_bottom')}>
                                <Image src={cb} alt="Panel" className={`mr-4 ${selectedImage === 'center_bottom' ? 'invert' : ''}`} />
                            </button>
                            <button onClick={() => handleImageClick('center_center')}>
                                <Image src={cc} alt="Panel" className={`mr-4 ${selectedImage === 'center_center' ? 'invert' : ''}`} />
                            </button>
                            <button onClick={() => handleImageClick('left_center')}>
                                <Image src={cl} alt="Panel" className={`mr-4 ${selectedImage === 'left_center' ? 'invert' : ''}`} />
                            </button>
                            <button onClick={() => handleImageClick('right_center')}>
                                <Image src={cr} alt="Panel" className={`mr-4 ${selectedImage === 'right_center' ? 'invert' : ''}`} />
                            </button>
                            <button onClick={() => handleImageClick('center_top')}>
                                <Image src={ct} alt="Panel" className={`mr-4 ${selectedImage === 'center_top' ? 'invert' : ''}`} />
                            </button>
                            <button onClick={() => handleImageClick('left_bottom')}>
                                <Image src={lb} alt="Panel" className={`mr-4 ${selectedImage === 'left_bottom' ? 'invert' : ''}`} />
                            </button>
                            <button onClick={() => handleImageClick('left_top')}>
                                <Image src={lt} alt="Panel" className={`mr-4 ${selectedImage === 'left_top' ? 'invert' : ''}`} />
                            </button>
                            <button onClick={() => handleImageClick('right_bottom')}>
                                <Image src={rb} alt="Panel" className={`mr-4 ${selectedImage === 'right_bottom' ? 'invert' : ''}`} />
                            </button>
                            <button onClick={() => handleImageClick('right_top')}>
                                <Image src={rt} alt="Panel" className={`mr-4 ${selectedImage === 'right_top' ? 'invert' : ''}`} />
                            </button>
                        </div>
                    </div>
                )}
                <button className={`text-left p-3 ${activeIndex === 'colors' ? 'bg-blue-500 text-white mb-px' : 'bg-white text-blue-500'}`} onClick={() => handleClick('colors')}> &gt; Цвета</button>
                {activeIndex === 'colors' && (
                    <div className=' bg-blue-500 text-white px-3 py-5'>
                        <p className='mb-3 text-lg'>Настройки цветов</p>
                        <p>Прозрачный фон<input type='checkbox' className='ml-2 editable-field' checked={props.transparentBackground} onChange={handleTransparentBackgroundChange} /></p>
                        <ColorChoose props={{selectedColor: props.individualColor, setSelectedColor: props.setIndividualColor, index: 0}}/>
                        <p>Использовать свои цвета<input type='checkbox' className='ml-2 editable-field' checked={props.useCustomColors} onChange={handleUseCustomColorsChange} /></p>
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
