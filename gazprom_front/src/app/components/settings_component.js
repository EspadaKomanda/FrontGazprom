"use client";

import React, { useState } from 'react';

const Settings = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    return (
        <div className="bg-gray-200 w-1/5 max-w-80 h-screen overflow-y-auto scrollbar-hide font-light border-2 border-l-gray-400">
            <h2 className="text-base text-center p-8">Дополнительные настройки</h2>
            <div className="flex flex-col space-y-4 mt-12">
                <div className='bg-white p-3 text-blue-500'>
                    <button onClick={() => handleClick(1)}>Масштаб</button>
                    {activeIndex === 1 && (
                        <div>
                            <p>Ширина: <input type="number" defaultValue="2000" /> px</p>
                            <p>Высота: <input type="number" defaultValue="1000" /> px</p>
                        </div>
                    )}
                </div>
                <div className='bg-white p-3 text-blue-500'>
                    <button onClick={() => handleClick(3)}>Цвета</button>
                    {activeIndex === 2 && (
                        <div>
                            {/* Содержимое блока "Цвета" */}
                            <p>Настройки цветов</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;
