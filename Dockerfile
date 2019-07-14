FROM node

# Enviroment variables
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV DB_HOST=redis://db

# Create app directory
RUN mkdir -p /app

WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# Bundle app source
COPY . .

RUN npm cache clean --force
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Map image file outside the docker
RUN mkdir /home/public/
RUN ln -s /home/public/ /app/
# COPY public/ /home/public/

EXPOSE 3001
CMD [ "npm", "start" ]