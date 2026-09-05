# My App

Веб-приложение для создания коллекций и элементов внутри них. Проект состоит
из React-фронта, Express API, MySQL и Firebase Authentication.

## Требования

- Node.js 18 или новее
- npm
- Docker и Docker Compose
- доступ к проекту Firebase для авторизации

## Запуск локально

Все команды выполняются из корня проекта.

### 1. Установить зависимости

```bash
npm install
```

### 2. Создать файл окружения

Создайте в корне проекта файл `.env` со следующими значениями:

```dotenv
DATABASE_MYSQL=my_app
USERNAME_MYSQL=my_app
PASSWORD_MYSQL=my_app_password
HOST_MYSQL=127.0.0.1
PORT_MYSQL=3307

BASE_URL=http://localhost:3000
REACT_APP_BASE_URL=http://localhost:5000
API_PORT=5000
```

Переменные Firebase добавьте туда же, если они требуются серверной части:

```dotenv
FIREBASE_APP_ID=
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_MEASUREMENT_ID=
```

Не добавляйте `.env` в Git и не публикуйте значения Firebase.

### 3. Запустить MySQL

В первом терминале выполните:

```bash
npm run db:up
```

Команда запускает контейнер `my-app-db`. MySQL будет доступен на
`127.0.0.1:3307`.

### 4. Запустить API

Во втором терминале выполните:

```bash
npm run server:dev
```

API и Socket.IO запустятся на `http://localhost:5000`. Сервер автоматически
подключится к базе и синхронизирует модели Sequelize.

### 5. Запустить фронтенд

В третьем терминале выполните:

```bash
npm start
```

Откройте приложение в браузере: <http://localhost:3000>.

Фронтенд обращается к API по адресу из `REACT_APP_BASE_URL`.

## Миграции и начальные данные

После запуска базы миграции можно применить командой:

```bash
npm run migrate:run
```

Для загрузки начальных данных выполните:

```bash
npm run seeders:run
```

## Остановка

Остановить и удалить контейнер базы данных можно командой:

```bash
npm run db:down
```

Данные MySQL сохраняются в Docker volume `mysql_data` и не удаляются при
остановке контейнера.

## Основные команды

| Команда                  | Назначение                                 |
| ------------------------ | ------------------------------------------ |
| `npm start`              | Запуск React-фронтенда в режиме разработки |
| `npm run server:dev`     | Запуск API с автоматическим перезапуском   |
| `npm run server`         | Запуск API без Nodemon                     |
| `npm run build`          | Сборка фронтенда для production            |
| `npm test`               | Запуск тестов React                        |
| `npm run db:up`          | Запуск MySQL                               |
## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
