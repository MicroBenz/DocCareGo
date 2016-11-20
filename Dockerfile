FROM node

# Create app directory
RUN mkdir -p /usr/src/doccarego
WORKDIR /usr/src/doccarego
COPY . /usr/src/doccarego

# Install gulp-cli and bower
RUN npm install -g yarn
RUN npm install -g webpack

# Install app dependencies
RUN yarn
RUN webpack -p

EXPOSE 8888

CMD ["yarn", "start"]