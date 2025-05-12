# Этап сборки
FROM node:20-alpine3.21 AS builder

# Установка рабочей директории
WORKDIR /app

# Установка аргумента сборки для DATABASE_URL
#ARG DATABASE_URL
#ENV DATABASE_URL=${DATABASE_URL}
#ENV DATABASE_URL='postgresql://postgres:1234567890@database:5432/postgres?schema=public'

# Установка OpenSSL, Bash и curl
#RUN apk add --no-cache openssl bash curl

# Копирование файлов package.json и package-lock.json
COPY package.json yarn.lock ./
COPY prisma prisma
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn yarn --frozen-lockfile
RUN yarn run prisma:generate-docker

# Установка зависимостей
#RUN yarn install

# Копирование остальных файлов проекта
COPY . .
RUN yarn run build
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn yarn --prod --frozen-lockfile

# Генерация Prisma Client с нужными бинарными файлами для Linux
#RUN npx prisma generate

# Сборка приложения
#RUN npm run build

# Этап запуска
FROM node:20-alpine3.21

# Установка рабочей директории
WORKDIR /app

# Установка OpenSSL, Bash и curl
#RUN apk add --no-cache openssl bash curl

# Копирование необходимых файлов из этапа сборки
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Установка wait-for-it
#RUN curl -sSL https://github.com/vishnubob/wait-for-it/releases/download/v2.5.0/wait-for-it.sh -o /usr/local/bin/wait-for-it && \
#    chmod +x /usr/local/bin/wait-for-it

# Установка переменных окружения
ENV NODE_ENV=production

# Открытие порта
EXPOSE 3001
#ENTRYPOINT ["node", "dist/main.js"]

CMD sh -c "npx prisma migrate deploy && node dist/main.js"

# Команда запуска приложения, ожидаем доступность базы данных
#CMD ["/usr/local/bin/wait-for-it", "db:5432", "--", "npm", "run", "start:dev"]
