# Используем официальный образ Node.js
FROM node:20-alpine3.21

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем остальные файлы проекта
COPY . .

# Открываем порт 3000
EXPOSE 3000

# Запускаем сервер разработки
CMD ["npm", "run", "dev"]
