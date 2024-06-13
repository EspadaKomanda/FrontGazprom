"use client";

import { useState, useRef, useEffect } from "react";
import Image from 'next/image';
import Pen from '../../../public/pen.svg';
import React from 'react';
import { data } from './temp_json';

const ResponsList = () => {
    const [isEditing, setIsEditing] = useState([false, false, false, false]); // Состояние для каждого элемента li
    const refs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]); // Создаем ref для каждого элемента li

    const handleClick = (index) => {
        const newIsEditing = [...isEditing];
        newIsEditing[index] = true;
        setIsEditing(newIsEditing);
    }

    const handleBlur = (index) => {
        const newIsEditing = [...isEditing];
        newIsEditing[index] = false;
        setIsEditing(newIsEditing);
    }

    useEffect(() => {
        isEditing.forEach((edit, index) => {
            if (edit) {
                const node = refs.current[index].current;
                node.focus();
                if (typeof window.getSelection != "undefined"
                        && typeof document.createRange != "undefined") {
                    const range = document.createRange();
                    range.selectNodeContents(node);
                    range.collapse(false);
                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (typeof document.body.createTextRange != "undefined") {
                    const textRange = document.body.createTextRange();
                    textRange.moveToElementText(node);
                    textRange.collapse(false);
                    textRange.select();
                }
            }
        });
    }, [isEditing]);

    return (
        <>
            <div>
                <h3 className="text-lg mb-4 font-extralight">{data.title}</h3>
                <ul>
                    {data.items.map((item, index) => ( 
                        <li className="text-sm mb-3" key={index}>
                            <span 
                            className="editable-field"
                            ref={refs.current[index]}
                            contentEditable={isEditing[index]} 
                            suppressContentEditableWarning={true} 
                            onBlur={() => handleBlur(index)}
                            onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
                            >
                                {item}
                            </span>
                            <Image src={Pen} alt="pencil" className="inline-block ml-2" onClick={() => handleClick(index)} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ResponsList;