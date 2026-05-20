# Internet Shop Fullstack Application

Полнофункциональное веб-приложение интернет-магазина, разработанное с использованием React и Express.js.

## Используемые технологии

### Frontend
- React
- Axios
- CSS

### Backend
- Node.js
- Express.js
- Swagger UI
- CORS

---

# Возможности приложения

## Работа с товарами
- Получение списка товаров
- Добавление товара
- Редактирование товара
- Удаление товара

## API документация
Swagger UI доступен по адресу:

```bash
http://localhost:3000/api-docs
Запуск проекта
1. Клонирование репозитория
git clone https://github.com/losunad/frontend-backend-shop1.git
Запуск backend

Перейти в папку backend:

cd backend

Установить зависимости:

npm install

Запустить сервер:

node app.js

Backend запускается на:

http://localhost:3000
Запуск frontend

Перейти в папку frontend:

cd frontend

Установить зависимости:

npm install

Запустить React-приложение:

npm start

Frontend запускается на:

http://localhost:3001
API endpoints
Получить список товаров
GET /products
Получить товар по ID
GET /products/:id
Создать товар
POST /products
Обновить товар
PATCH /products/:id
Удалить товар
DELETE /products/:id