import config from '../config';


export default function Authentication({ onClose }) {


  // const handleAuthentication = () => {

  //   const username = document.querySelector('input[type="text"]').value;
  //   const password = document.querySelector('input[type="password"]').value;

  //   if (username && password) {

  //     fetch(config.Auth, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         username: username,
  //         password: password
  //       })
  //     })
  //       .then(response => {
  //         if (response.ok) {

  //         } else {
  //           throw new Error('Failed to authenticate');
  //         }
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   } else {
  //     alert('Please enter a username and password');
  //   }
  //   console.log('username: ', username, 'password: ', password);
  // };

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
                    onClose();
                  }}
                >
                  Войти
                </button>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
