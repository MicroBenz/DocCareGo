FROM meanjs/mean

# install mongodb
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu precise/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
RUN apt-get update
RUN apt-get install -y mongodb-org
RUN mkdir -p /data/db

#install webpack
RUN npm install -g webpack

# Create app directory
RUN mkdir -p /usr/src/doccarego
WORKDIR /usr/src/doccarego
COPY . /usr/src/doccarego

# Install app dependencies
RUN npm install
RUN webpack --config webpack.prod.js --progress -p

#add commands
RUN echo 'mongod & npm start' > commands.sh

EXPOSE 22345

CMD ["sh","commands.sh"]