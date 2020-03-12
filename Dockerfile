FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000/tcp
ENTRYPOINT ["npm", "run", "start"]