FROM node:16 AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN GENERATE_SOURCEMAP=false npm run build

FROM nginx:1.19.2

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]