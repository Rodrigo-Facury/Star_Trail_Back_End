FROM node:18 as build

# Create app directory
WORKDIR /usr/src/app

COPY .env ./

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# If you are building your code for production

RUN npm ci --only=production

# Bundle app source
COPY . .

# Production environment
FROM nginx:1.16.0-alpine as production
COPY --from=build /usr/src/app /usr/share/nginx/api
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3001
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]