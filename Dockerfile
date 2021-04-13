#FROM node:14.15.4
FROM registry.il2.dso.mil/platform-one/devops/pipeline-templates/base-image/harden-nodejs14:14.16.0 AS builder

ENV NODE_ENV production

WORKDIR /app

# # temporary fix until P1 adds chown capabilities or makes /home/node owned by appuser
# USER root
# RUN node -e "const fs = require('fs');  fs.chown('/home/node/', 950, 950, (error) => {console.log(error)});"
# USER 950

# # COPY without dev env
# COPY --chown=950:950 [^.env]* .

# RUN npm i -g serve

COPY . .

RUN npx react-scripts build

# syntax from copying files is: docker directory "/WORKDIR" runner directory "/APPDIR"

# COPY package*.json tsconfig*.json ./

# COPY src src
# COPY public public
# COPY node_modules node_modules
# COPY puckboard.yml puckboard.yml
# COPY .eslint* ./

# RUN npm install openapi-generator

# RUN npm run openapi
# RUN npm run sass

# INLINE_RUNTIME_CHUNK=false allows us to run inline scripts blocked by CSP.
# INLINE_RUNTIME_CHUNK=false
# RUN env
# RUN GENERATE_SOURCEMAP=false npm run build

# RUN pwd
# RUN ls -l

# Stage 2
FROM registry.il2.dso.mil/platform-one/devops/pipeline-templates/base-image/harden-nginx-19:1.19.2

USER appuser

COPY --from=builder --chown=appuser:appuser /build /var/www

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]
