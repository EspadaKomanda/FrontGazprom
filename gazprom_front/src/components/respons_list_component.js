'use client';
import { useState, useEffect } from "react";
import Image from 'next/image';
import Pen from '../../public/pen.svg';

const ResponsList = () => {
    const [dialogs, setDialogs] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [tempName, setTempName] = useState(""); // Новое состояние для временного имени

    // fetch(config.deleteDialog + `?OwnerId=4&Accessor=0` , {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Access ${localStorage.getItem('accessToken')}`
    //     }
    // })
    // .then(async response => { // Добавляем async
    //   if (response.ok) {
    //     const DialogsList = await response.json(); // Добавляем await
    //     console.log(DialogsList);
    //     localStorage.setItem('dialogs', JSON.stringify(DialogsList));
    //     // Создание и отправка кастомного события
    //     const event = new CustomEvent('dialogsUpdated');
    //     window.dispatchEvent(event);
    //   } else {
    //     throw new Error('Failed to take info about Templates');
    //   }
    // })
    // .catch(error => {
    //     console.error(error);
    // });

    useEffect(() => {
        const loadDialogs = () => {
            const storedDialogs = localStorage.getItem('dialogs');
            if (storedDialogs) {
                setDialogs(JSON.parse(storedDialogs));
            }
        };

        loadDialogs();
        window.addEventListener('dialogsUpdated', loadDialogs);

        return () => {
            window.removeEventListener('dialogsUpdated', loadDialogs);
        };
    }, []);

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setTempName(dialogs[index].name); // Инициализация временного имени текущим именем диалога
    };

    const handleChange = (newName) => {
        setTempName(newName); // Обновление временного имени без сохранения
    };

    const handleSave = () => {
        const updatedDialogs = [...dialogs];
        updatedDialogs[editingIndex].name = tempName;
        setDialogs(updatedDialogs);
        localStorage.setItem('dialogs', JSON.stringify(updatedDialogs));
        setEditingIndex(null);
        setTempName(""); // Сброс временного имени
    };

    return (
        <>
            <div>
                <ul>
                    {dialogs.map((dialog, index) => (
                        <li key={index} className="text-sm mb-3">
                            {editingIndex === index ? (
                                <>
                                    <input
                                        type="text"
                                        value={tempName}
                                        onChange={(e) => handleChange(e.target.value)}
                                        className="editable-field-input max-w-44 bg-indigo-100"
                                    />
                                    <button onClick={handleSave} className="save-btn mr-2">Save</button>
                                    <button onClick={handleSave} className="save-btn">Delete</button>
                                </>
                            ) : (
                                <span className="editable-field">
                                    {dialog.name}
                                </span>
                            )}
                            <Image src={Pen} alt="pencil" className="inline-block ml-2" onClick={() => handleEditClick(index)} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ResponsList;