FROM node:latest

WORKDIR /user/scr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]


