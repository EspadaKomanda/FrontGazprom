"use client";
import Cookies from 'js-cookie';
import config from '../app/config';


export default function Authentication({ onClose }) {
  const handleAuthentication = async () => {
    const username = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;
    if (username && password) {
      try {
        const authResponse = await fetch(config.Auth, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        });
        if (!authResponse.ok) throw new Error('Failed to authenticate');
        const { accessToken } = await authResponse.json();
        localStorage.setItem('accessToken', accessToken);
        Cookies.set("username", username, { expires: new Date(new Date().getTime() + (50 * 24 * 60 * 60 * 1000)) });

        const userResponse = await fetch(config.User + `?username=${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Access ${accessToken}`
          },
        });
        if (!userResponse.ok) throw new Error('Failed to take info');
        const userData = await userResponse.json();
        console.log(userData);
        const userId = userData.id;
        Cookies.set("userId", userId, { expires: new Date(new Date().getTime() + (50 * 24 * 60 * 60 * 1000)) });

        const dialogsResponse = await fetch(config.getDialogsByOwnerId + `?OwnerId=${userId}&Accessor=0`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Access ${accessToken}`
          }
        });
        if (!dialogsResponse.ok) throw new Error('Failed to take info about Templates');
        const DialogsList = await dialogsResponse.json();
        console.log(DialogsList);
        localStorage.setItem('dialogs', JSON.stringify(DialogsList));

        // Dispatch custom event after dialogs are updated
        const event = new CustomEvent('dialogsUpdated');
        window.dispatchEvent(event);

        onClose(); // Close the authentication modal/dialog
      } catch (error) {
        console.error(error);
        // Here, you can add logic to display the error message
      }
    } else {
      alert('Please enter a username and password');
    }
  };

  return (
    <div className="flex items-center justify-center">
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Авторизация
                </h2>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                  type="text"
                  placeholder="Логин/Почта"
                />
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                  type="password"
                  placeholder="Пароль"
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={() => {
                    handleAuthentication();
                  }}
                >
                  Войти
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
