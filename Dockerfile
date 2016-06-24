FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

#log files
RUN mkdir /var/log/server_log && chmod 777 /var/log/server_log && cd /var/log/server_log && touch output.log && chmod 777 output.log

EXPOSE 8080
CMD [ "npm", "start" ]