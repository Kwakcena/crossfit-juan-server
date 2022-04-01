FROM node:14.17.6

COPY . .

RUN npm install

CMD ["node", "app"]