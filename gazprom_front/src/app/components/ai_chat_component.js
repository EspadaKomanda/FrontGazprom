"use client";

import account from '../../../public/account.svg';
import Image from 'next/image';
import { useState } from 'react';


const AIChatComponent = () => {

    const [newChat, setNewChat] = useState(true);

    const handleNewChat = () => {
    

        setNewChat(false);
    }

    return ( 
        <div className='flex-1 relative flex flex-col h-screen'>
            <div className='flex-1 overflow-auto'>
                <Image src={account} alt="account" width={50} className='top-4 right-10 absolute' />
                {newChat ? (
                    <div className='flex flex-col items-center justify-center h-full'>
                        <h2 className='text-4xl mb-10'>Начат новый чат</h2>
                        <p className='text-xl'>Введите свой первый запрос!</p>
                        <p className='text-xl'>Вот примеры:</p>
                        <div className='flex gap-10 mt-4'>
                            <div className='bg-custom-gray text-black mt-4 rounded-lg w-56 pl-5 pr-4 pt-5 pb-7 text-lg h-40'>
                                <h3 className='mb-8'>Конфколлы</h3>
                                <p>Создай заставку для конференции в zoom</p>
                            </div>
                            <div className='bg-custom-gray text-black mt-4 rounded-lg w-56 pl-5 pr-4 pt-5 pb-7 text-lg h-40'>
                                <h3 className='mb-8'>Презентации</h3>
                                <p>Фото для презентации “Итоги 2023”</p>
                            </div>
                            <div className='bg-custom-gray text-black mt-4 rounded-lg w-56 pl-5 pr-4 pt-5 pb-7 text-lg h-40'>
                                <h3 className='mb-8'>Аватары</h3>
                                <p>Сделай аватарку для корпоративной почты</p>
                            </div>
                        </div>
                    </div>
                ) :(
                    <p>aaaaaaa</p>
                )} 
            </div>
            <div className='h-36 bg-gray-200'>
                <div className='flex justify-center items-center h-full'>
                    <input type='text' placeholder='Type your message here' className='w-3/4 h-2/3 rounded-lg px-4' />
                    <button className='bg-blue-500 text-white px-4 py-2 h-2/3 w-1/12 rounded-lg'>Send</button>
                </div>
            </div>
        </div>
        );
}

export default AIChatComponent;