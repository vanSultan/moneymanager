FROM node
ARG PORT=8080
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE $PORT
ENTRYPOINT [ "npm" ]
