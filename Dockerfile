FROM node:14.17.6

COPY . .

RUN npm install

RUN apt-get update && apt-get install -y libnss3.so libnssutil3.so libsmime3.so libnspr4.so libatk-bridge-2.0.so.0 libdrm.so.2 libxkbcommon.so.0 libgbm.so.1 libasound.so.2 libatspi.so.0

CMD ["node", "app"]