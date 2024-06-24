import Cookies from 'js-cookie';
import config from '../app/config';


export default function Authentication({ onClose }) {


  const handleAuthentication = () => {
    const username = document.querySelector('input[type="text"]').value;
    
    const password = document.querySelector('input[type="password"]').value;
    if (username && password) {
      fetch(config.Auth, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            localStorage.setItem('accessToken', data.accessToken);
            Cookies.set("username", username, { expires: new Date(new Date().getTime() + (50 * 24 * 60 * 60 * 1000)) });
            onClose();

            fetch(config.User + `?username=${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Access ${localStorage.getItem('accessToken')}`
                },
            })
            .then(response => {
              if (response.ok) {
                response.json().then(data => {
                    console.log(data);
                    const userId = data.id;
                    Cookies.set("userId", userId, { expires: new Date(new Date().getTime() + (50 * 24 * 60 * 60 * 1000)) });
                })
              } else {
                  throw new Error('Failed to take info');
              }
            })
            .catch(error => {
                console.error(error);
            });

            fetch(config.getDialogsByOwnerId + `?OwnerId=4&Accessor=0` , {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Access ${localStorage.getItem('accessToken')}`
                }
            })
            .then(async response => { // Добавляем async
              if (response.ok) {
                const DialogsList = await response.json(); // Добавляем await
                console.log(DialogsList);
                localStorage.setItem('dialogs', JSON.stringify(DialogsList));
                // Создание и отправка кастомного события
                const event = new CustomEvent('dialogsUpdated');
                window.dispatchEvent(event);
              } else {
                throw new Error('Failed to take info about Templates');
              }
            })
            .catch(error => {
                console.error(error);
            });

          });
        } else {
          throw new Error('Failed to authenticate');
        }
      })
      .catch(error => {
        console.error(error);
        // Здесь можно добавить логику для отображения сообщения об ошибке
      });
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
