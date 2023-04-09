FROM node:19-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY *.json ./
COPY *.ts ./
COPY src/ ./src
COPY public/ ./public

RUN npm ci

COPY . ./

EXPOSE 5173
CMD ["npm", "run", "dev"]
