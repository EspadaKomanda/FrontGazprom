"use client";

import React, { useState, useRef, useEffect } from 'react';
import ColorChoose from './color_choose_component';

const Settings = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const [colorChooseCount, setColorChooseCount] = useState(1);
    const colorChooseComponents = Array.from({ length: colorChooseCount }, (_, index) => (
        <ColorChoose key={index} />
    ));

    const handleClick = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    const handleAddColorChoose = () => {
        if (colorChooseCount < 4) {
            setColorChooseCount(colorChooseCount + 1);
        }
    };

    const handleRemoveColorChoose = () => {
        if (colorChooseCount > 1) {
            setColorChooseCount(colorChooseCount - 1);
        }
    };

    return (
        <div className="bg-gray-200 w-1/5 max-w-80 h-screen overflow-y-auto scrollbar-hide font-light border-l-2 border-l-gray-400">
            <h2 className="text-base text-center p-8">Дополнительные настройки</h2>
            <div className="flex flex-col pb-0">
                <button className={`text-left p-3 ${activeIndex === 1 ? 'bg-blue-500 text-white mb-px' : 'mb-4 bg-white text-blue-500'}`} onClick={() => handleClick(1)}> &gt; Масштаб</button>
                {activeIndex === 1 && (
                    <div className=' bg-blue-500 text-white px-3 py-5'>
                        <p >Ширина: <input type="number" defaultValue="516" className='editable-field bg-blue-500 w-12 mb-2'/>px</p>
                        <p >Высота: <input type="number" defaultValue="516" className='editable-field bg-blue-500 w-12 mb-4'/>px</p>
                        <p>Расположение:</p>
                    </div>
                )}
                <button className={`text-left p-3 ${activeIndex === 2 ? 'bg-blue-500 text-white mb-px' : 'bg-white text-blue-500'}`} onClick={() => handleClick(2)}> &gt; Цвета</button>
                {activeIndex === 2 && (
                    <div className=' bg-blue-500 text-white px-3 py-5'>
                        <p className='mb-3 text-lg'>Настройки цветов</p>
                        <from>
                            <span>Использовать свои цвета<input type='checkbox' className='ml-2 editable-field'/></span>
                            <span>Прозрачный фон<input type='checkbox' className='ml-2 editable-field'/></span>
                        </from>
                        <div className='flex space-x-1 mt-3'>
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


export default Settings;
