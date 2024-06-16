"use client";

import React, { useState, useRef, useEffect } from 'react';

const ColorChoose = () => {
    const [selectedColor, setSelectedColor] = useState('#ffffff');
    const colorPicker = useRef(null);
    const colorDisplay = useRef(null);

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
        if (colorDisplay.current) {
            colorDisplay.current.style.backgroundColor = event.target.value;
        }
    };

    return (<>
    
    <input type="color" id="colorPicker" ref={colorPicker} value={selectedColor} onChange={handleColorChange} style={{display: 'none'}}></input>
    <button onClick={() => colorPicker.current.click()} style={{backgroundColor: selectedColor}} className='p-5 rounded-md color-button'></button>
    <div id="colorDisplay" ref={colorDisplay}></div>
    
    </>
    )
}

export default ColorChoose;