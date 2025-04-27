Для работы сервера создайте .env, в поле MONGO_URL пропишите ссылку на кластер.
Скрипт npm run start запустит сервер.


Для создания обращения отправьте POST запрос на http://localhost:6543/ticket


{
    "title":"new ticket",
    "text":"text for ticket"
}

ДЛЯ ДАЛЬНЕЙШИХ ОПЕРАЦИЙ С ОБРАЩЕНИЯМИ ПЕРЕДАВАЙТЕ "action" В BODY!

Для взятия обращение в работу отправьте PUT запрос на http://localhost:6543/ticket

{
   "id":"680e92cd19fe0a1c399723be",
   "action":"take"
}

Для получения обращений в конкретную дату отправьте GET запрос с QUERY на http://localhost:6543/tickets/by-date?date=2025-04-27

Для получения по диапазону дат, GET запрос выглядит так http://localhost:6543/tickets/by-range?startDate=2025-04-27&endDate=2025-04-28