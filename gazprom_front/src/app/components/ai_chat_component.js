"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import account from '../../../public/account.svg';
import panel from '../../../public/panel.svg';
import avatar from '../../../public/avatar.svg';
import statistic from '../../../public/statistic.svg';
import Authentication from './authentication';
import ProfilePopup from './profile';
import Settings from './settings_component';
import config from '../config';


function AIChatComponent({props}) {
  const [newChat, setNewChat] = useState(true);
  const textareaRef = useRef(null);
  const [authentication, setAuthentication] = useState(false);
  const [themeId, setThemeId] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [settingsOn, setSettingsOn] = useState(false);




  const idChecker = async (e) => {
    setNewChat(false);
    setThemeId(e);
    console.log(newChat);
    // if (newChat) {
    //     const response = await fetch(config.User);
    //     const userInfo = await response.json();
        
    // }
}

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

//   const [emailPopupOpen, setEmailPopupOpen] = useState(true); // New state for email popup
//   const [email, setEmail] = useState('');
    // const handleEmailSubmit = () => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (emailRegex.test(email)) {

    //         fetch('/Account/register', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 email: email
    //             })
    //         })
    //             .then(response => {
    //                 if (response.ok) {
    //                     // //Handle successful response
    //                 } else {
    //                     throw new Error('Failed to register');
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //             });
          
    //         setEmailPopupOpen(false);
    //     } else {
    //       alert('Please enter a valid email address');
    //     }
    //   };

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = async () => {
        if (inputValue.trim() !== '') {
            const newMessage = {
                id: messages.length + 1,
                text: inputValue.replace(/\n/g, '<br />'),
            };
            setMessages([...messages, newMessage]);
            setInputValue('');
            setNewChat(false);

            const colorInputs = document.querySelectorAll('.color-button');
            const allowedColors = Array.from(colorInputs).map(button => {
                const rgbValues = button.value.split(',').map(Number);
                return rgbValues;
            });
    

            // const [imageUrls, setImageUrls] = useState([]);

            const widthInput = document.querySelector('.editable-field');
            const heightInput = document.querySelectorAll('.editable-field')[1];
            const widthValue = parseInt(widthInput.value, 10);
            const heightValue = parseInt(heightInput.value, 10);
            console.log(newMessage);

            // try {
            //     const response = await fetch(config.ImageAgrigation, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({
            //             templateName: 'my-template',
            //             text: newMessage.text,
            //             imageText: '',
            //             allowedColors: allowedColors,
            //             resolution: {
            //                 width: 512,
            //                 height: 512,
            //             },
            //             position: {
            //                 position: 'resize',
            //             },
            //             fontName: '',
            //             background: '',
            //             checkColours: false,
            //         }),
            //     });
            //     if (response.ok) {
            //         const data = await response.json();
            //         const imageUrl = data.url;
                
            //         setImageUrls(prevUrls => [...prevUrls, imageUrl]);
            //     } else {
            //         console.error('Failed to send message');
            //     }
            //     console.log(data);
            // } catch (error) {
            //     console.error('Error sending message:', error);
            // }
        }
    };
    
    const handleImageClick = () => {
        setIsOpen(!isOpen);
    };
    
    const handleSettingsClick = () => {
        setSettingsOn(!settingsOn);
    };

return (
    <div className='flex flex-1'>
        {/* {emailPopupOpen && (
  <div className='fixed z-10 inset-0 overflow-y-auto flex items-center justify-center'>
    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
    <div className="inline-block align-bottom bg-white py-5 px-2 rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className='border-2 rounded-sm' />
      </label>
      <div className='flex justify-center mt-5'>
        <button onClick={handleEmailSubmit} className='border-2 rounded-md p-2 bg-slate-100'>Submit</button>
      </div>
    </div>
  </div>
)} */}
        <div className='flex-1 relative flex flex-col h-screen'>
            <div className='flex-1 overflow-auto p-7'>
                <Image src={account} alt="account" width={50} className='top-4 right-10 absolute' onClick={handleImageClick}/>
                {newChat ? (
                    <div className='flex flex-col items-center justify-center h-full font-light'>
                        <h2 className='text-4xl mb-10 '>Начат новый чат</h2>
                        <p className='text-xl'>Введите свой первый запрос!</p>
                        <p className='text-xl'>Вот примеры:</p>
                        <div className='flex gap-10 mt-6'>
                            <button className='bg-custom-gray text-black rounded-3xl w-60 pl-5 pr-4 pt-5 pb-7 text-lg h-40 border-2 hover:bg-gray-200' onClick={() => idChecker(1)}>
                                <div className='flex items-center mb-5'>
                                    <Image src={panel} alt="Panel" className='mr-4' />
                                    <h3>Конфколлы</h3>
                                </div>
                                <p className='font-extralight'>Создай заставку для конференции в zoom</p>
                            </button>
                            <button className='bg-custom-gray text-black rounded-3xl w-60 pl-5 pr-4 pt-5 pb-7 text-lg h-40 border-2 hover:bg-gray-200' onClick={() => idChecker(2)}>
                                <div className='flex items-center mb-5'>
                                    <Image src={statistic} alt="Panel" className='mr-4' />
                                    <h3>Презентации</h3>
                                </div>
                                <p className='font-extralight'>Фото для презентации “Итоги 2023”</p>
                            </button>
                            <button className='bg-custom-gray text-black rounded-3xl w-60 pl-5 pr-4 pt-5 pb-7 text-lg h-40 border-2 hover:bg-gray-200' onClick={() => idChecker(3)}>
                                <div className='flex items-center mb-5'>
                                    <Image src={avatar} alt="Panel" className='mr-4' />
                                    <h3>Аватары</h3>
                                </div>
                                <p className='font-extralight'>Сделай аватарку для корпоративной почты</p>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-4 pt-20'>
        {messages.map((message) => (
            <div key={message.id} className='flex items-end justify-end mx-20'>
                <div className='bg-blue-500 text-white rounded-lg p-2'>
                    <p className='text-sm break-words max-w-prose whitespace-pre-wrap' dangerouslySetInnerHTML={{ __html: message.text }}></p>
                </div>
            </div>
        ))}
        {/* {imageUrls.map((url, index) => (
            <Image key={index} src={url} alt={`Message ${index}`} />
        ))} */}
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
                    <button className='bg-custom-gray text-black rounded-lg text-xl w-12 h-12 ml-6' onClick={handleSettingsClick}>☰</button>
                </div>
            </div>
            <div className='absolute' style={{ display: isOpen ? 'block' : 'none' }}>
                {authentication === false ? <Authentication onClose={handleImageClick}/> : <ProfilePopup onClose={handleImageClick} />}
            </div>
        </div>
        {settingsOn ? <Settings props={{data: props.data, setData: props.setData}} /> : null}
        
    </div>
);
}

export default AIChatComponent;