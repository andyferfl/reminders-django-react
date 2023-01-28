FROM node

WORKDIR /usr/src/app/frontend

COPY package*.json ./

RUN npm install

COPY . ./

CMD ["npm", "start"]