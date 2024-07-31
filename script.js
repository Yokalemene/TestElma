const axios = require('axios');

// URL API и токен
const url = 'https://zdkhiu5mp5dwa.elma365.ru/pub/v1/app/test_sreda/test_task/list';
const token = '6b2a6b4c-51c4-4beb-94b8-250d12d023b1';

// Заголовки с авторизацией
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};

// Тело запроса (payload)
const payload = {
  fileHash: '0190983f-d7be-7895-bc40-5f403f0bc287',
  format: 'xlsx',
  withEventHandlers: false
};

// Отправка POST-запроса
axios.post(url, payload, { headers })
  .then(response => {
    // Вывод полного ответа для отладки
    console.log('Полный ответ:', response.data);

    // Извлечение данных из ответа
    const data = response.data;
    
    // Проверка наличия массива результатов и его обработка
    if (data.result && data.result.result && Array.isArray(data.result.result)) {
      data.result.result.forEach((item, index) => {
        // Вывод каждого объекта
        console.log(`Объект ${index}:`, item);
        // Проверка и вывод поля __name
        if (item.__name) {
          console.log(`Значение поля __name: ${item.__name}`);
        } else {
          console.log(`Элемент ${index} не содержит поле __name.`);
        }
      });
    } else {
      console.log('Ожидаемая структура данных не найдена.');
    }
  })
  .catch(error => {
    // Обработка ошибок и вывод сообщения
    console.error('Ошибка при выполнении запроса:', error);
  });
