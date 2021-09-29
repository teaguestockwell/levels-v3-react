FROM node:16 AS builder

WORKDIR /app

COPY . .

RUN GENERATE_SOURCEMAP=false npm run build

# Stage 2
FROM nginx:1.19.2

COPY /app/build /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]