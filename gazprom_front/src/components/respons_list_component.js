"use client";

import { useState, useRef, useEffect } from "react";
import Image from 'next/image';
import Pen from '../../public/pen.svg';
import React from 'react';
import config from '../app/config';
import Cookies from 'js-cookie';

const ResponsList = () => {


    return (
        <>
            <div>
                <ul>
                    <li className="text-sm mb-3" >
                        <span 
                        className="editable-field"
                        onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
                        >
                        </span>
                        <Image src={Pen} alt="pencil" className="inline-block ml-2" onClick={() => handleClick(index)} />
                    </li>
                </ul>
            </div>
        </>
    );
}

export default ResponsList;