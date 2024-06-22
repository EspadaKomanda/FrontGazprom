"use client";

import React, { useState, useRef, useEffect } from 'react';

const ColorChoose = ({ props }) => {
    
    const colorPicker = useRef(null);
    const colorDisplay = useRef(null);

    const handleColorChange = (event) => {
        console.log(props.selectedColor)
        changeState(event)
        if (colorDisplay.current) {
            colorDisplay.current.style.backgroundColor = event.target.value;
        }
    };

    function changeState(event) {
        const l = [...props.selectedColor];
        l[props.index] = event.target.value;
        props.setSelectedColor(l);
    }

    return (<>
    
    <input type="color" id="colorPicker" ref={colorPicker} value={props.selectedColor} onChange={handleColorChange} style={{display: 'none'}}></input>
    <button onClick={() => colorPicker.current.click()} style={{ backgroundColor: props.selectedColor[props.index] }} className='p-5 rounded-md color-button'></button>
    <div id="colorDisplay" ref={colorDisplay}></div>
    
    </>
    )
}

export default ColorChoose;