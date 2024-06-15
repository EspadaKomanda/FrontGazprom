"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import account from '../../../public/account.svg';
import panel from '../../../public/panel.svg';
import avatar from '../../../public/avatar.svg';
import statistic from '../../../public/statistic.svg';
import Authentication from './authentication';
import ProfilePopup from './profile';

function AIChatComponent() {
  const [newChat, setNewChat] = useState(true);
  const textareaRef = useRef(null);
  const [authentication, setAuthentication] = useState(true);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

    const handleInput = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;

        if (e.target.scrollHeight >= 128) {
            e.target.style.overflow = 'auto';
        } else {
            e.target.style.overflow = 'hidden';
        }
    };
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
          const newMessage = {
            id: messages.length + 1,
            text: inputValue.replace(/\n/g, '<br />'),
          };
          setMessages([...messages, newMessage]);
          setInputValue('');
          setNewChat(false);
        }
      };

    const OpenPopUp = () => {
        if (authentication === 'false') {

        }
        else {
        }
    }

return (
    <div className='flex-1 relative flex flex-col h-screen'>
        <div className='flex-1 overflow-auto p-7'>
            <Image src={account} alt="account" width={50} className='top-4 right-10 absolute' onClick={OpenPopUp}/>
            {newChat ? (
                <div className='flex flex-col items-center justify-center h-full font-light'>
                    <h2 className='text-4xl mb-10 '>Начат новый чат</h2>
                    <p className='text-xl'>Введите свой первый запрос!</p>
                    <p className='text-xl'>Вот примеры:</p>
                    <div className='flex gap-10 mt-6'>
                        <div className='bg-custom-gray text-black rounded-3xl w-60 pl-5 pr-4 pt-5 pb-7 text-lg h-40 border-2'>
                            <div className='flex items-center mb-5'>
                                <Image src={panel} alt="Panel" className='mr-4' />
                                <h3>Конфколлы</h3>
                            </div>
                            <p className='font-extralight'>Создай заставку для конференции в zoom</p>
                        </div>
                        <div className='bg-custom-gray text-black rounded-3xl w-60 pl-5 pr-4 pt-5 pb-7 text-lg h-40 border-2'>
                            <div className='flex items-center mb-5'>
                                <Image src={statistic} alt="Panel" className='mr-4' />
                                <h3>Презентации</h3>
                            </div>
                            <p className='font-extralight'>Фото для презентации “Итоги 2023”</p>
                        </div>
                        <div className='bg-custom-gray text-black rounded-3xl w-60 pl-5 pr-4 pt-5 pb-7 text-lg h-40 border-2'>
                            <div className='flex items-center mb-5'>
                                <Image src={avatar} alt="Panel" className='mr-4' />
                                <h3>Аватары</h3>
                            </div>
                            <p className='font-extralight'>Сделай аватарку для корпоративной почты</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='flex flex-col gap-4 pt-20'>
                    { messages.map((message) => (
            <div key={message.id} className='flex items-end justify-end mx-20'>
              <div className='bg-blue-500 text-white rounded-lg p-2'>
                <p className='text-sm break-words max-w-prose whitespace-pre-wrap' dangerouslySetInnerHTML={{ __html: message.text }}></p>
              </div>
            </div>
          ))}
                </div>
            )}
        </div>
        <div className='h-36 bg-gray-200'>
            <div className='flex justify-center items-center h-full'>
                <textarea
                    ref={textareaRef}
                    onInput={handleInput}
                    placeholder='Type your message here'
                    className='w-3/4 min-h-16 px-4 resize-none rounded-lg editable-field p-1 max-h-32 mr-6'
                    style={{ overflow: 'hidden' }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                />
                <button
                    className='bg-blue-500 text-white px-4 py-2 h-2/3 w-1/12 rounded-lg  min-h-16'
                    style={{ height: 'auto' }}
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
         {authentication == false ? <Authentication /> : <ProfilePopup />}
    </div>
);
}

export default AIChatComponent;