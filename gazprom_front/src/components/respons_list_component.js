"use client";
import { useState, useEffect } from "react";
import Image from 'next/image';
import Pen from '../../public/pen.svg';
import config from '../app/config';
import Cookies from "js-cookie";

const ResponsList = () => {
    const [dialogs, setDialogs] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [tempName, setTempName] = useState(""); // Новое состояние для временного имени

    const handleAdd = () => {
        fetch(config.createDialog, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Access ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                ownerId: userId,
                accessor: 0,
                name: 'новый диалог' // Используем tempName как имя нового диалога
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Предполагаем, что API возвращает добавленный диалог
            } else {
                throw new Error('Failed to add the dialog');
            }
        })
        .then(newDialog => {
            const updatedDialogs = [newDialog, ...dialogs]; // Добавляем новый диалог в состояние
            setDialogs(updatedDialogs);
            localStorage.setItem('dialogs', JSON.stringify(updatedDialogs)); // Обновляем локальное хранилище
        })
        .catch(error => {
            console.error(error);
        });
    };

    const userId = Cookies.get('userId');
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
        setEditingIndex(null); // Сброс индекса редактирования для выхода из режима редактирования
        setTempName(""); // Сброс временного имени
    };
    
    const handleDelete = () => {
        const dialogId = dialogs[editingIndex].id;
        fetch(config.deleteDialog, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Access ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                ownerId: userId,
                accessor: 0,
                id: dialogId
            })
        })
        .then(response => {
            if (response.ok) {
                // Удаление диалога из состояния после подтверждения удаления
                const updatedDialogs = dialogs.filter(dialog => dialog.id !== dialogId);
                setDialogs(updatedDialogs);
                localStorage.setItem('dialogs', JSON.stringify(updatedDialogs));
            } else {
                throw new Error('Failed to delete the dialog');
            }
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <>
            <div>
            <button onClick={handleAdd} className="add-btn px-2 mb-5 rounded-md border-gray-400  text-white bg-blue-500">Add Dialog</button>
                <ul>
                {dialogs.map((dialog, index) => (
                    <li key={dialog.id} className="text-sm mb-3">
                        {editingIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={tempName}
                                    onChange={(e) => handleChange(e.target.value)}
                                    className="editable-field-input max-w-44 bg-indigo-100"
                                />
                                <button onClick={() => handleSave('save')} className="save-btn mr-2">Save</button>
                                <button onClick={() => handleDelete()} className="delete-btn">Delete</button>
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