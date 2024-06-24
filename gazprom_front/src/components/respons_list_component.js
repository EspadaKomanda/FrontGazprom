'use client';
import { useState, useEffect } from "react";
import Image from 'next/image';
import Pen from '../../public/pen.svg';

const ResponsList = () => {
    const [dialogs, setDialogs] = useState([]);

    useEffect(() => {
        const loadDialogs = () => {
            const storedDialogs = localStorage.getItem('dialogs');
            if (storedDialogs) {
                const parsedDialogs = JSON.parse(storedDialogs);
                setDialogs(parsedDialogs);
            }
        };
    
        loadDialogs();
        const handleDialogsUpdate = () => {
            loadDialogs();
        };

        window.addEventListener('dialogsUpdated', handleDialogsUpdate);

        return () => {
            window.removeEventListener('dialogsUpdated', handleDialogsUpdate);
        };
    }, []);

    return (
        <>
            <div>
                <ul>
                    {dialogs.map((dialog, index) => (
                        <li key={index} className="text-sm mb-3">
                            <span className="editable-field">
                                {dialog.name} {/* Предполагается, что у диалога есть свойство name */}
                            </span>
                            <Image src={Pen} alt="pencil" className="inline-block ml-2" onClick={() => {/* Обработчик клика */}} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ResponsList;