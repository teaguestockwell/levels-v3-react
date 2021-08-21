FROM node:16 AS builder

WORKDIR /app

COPY . .

RUN GENERATE_SOURCEMAP=false npx react-scripts build

# Stage 2
FROM nginx:1.19.2

COPY /app/build /usr/share/nginx/html

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]