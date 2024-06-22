"use client";

import React, { useState, useRef, useEffect } from 'react';

const ColorChoose = ({ props }) => {
    
    const colorPicker = useRef(null);
    const colorDisplay = useRef(null);

    const handleColorChange = (event) => {
        console.log(props.selectedColor)
        props.setSelectedColor(event.target.value);
        if (colorDisplay.current) {
            colorDisplay.current.style.backgroundColor = event.target.value;
        }
    };

    return (<>
    
    <input type="color" id="colorPicker" ref={colorPicker} value={props.selectedColor} onChange={handleColorChange} style={{display: 'none'}}></input>
    <button onClick={() => colorPicker.current.click()} style={{ backgroundColor: props.selectedColor }} className='p-5 rounded-md color-button'></button>
    <div id="colorDisplay" ref={colorDisplay}></div>
    
    </>
    )
}

export default ColorChoose;