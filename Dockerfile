#FROM node:14.15.4
FROM registry.il2.dso.mil/platform-one/devops/pipeline-templates/base-image/harden-nodejs14:14.16.0 AS builder

ARG IS_LOCAL

WORKDIR /app

# temporary fix until P1 adds chown capabilities or makes /home/node owned by appuser
USER root
RUN node -e "const fs = require('fs');  fs.chown('/home/node/', 950, 950, (error) => {console.log(error)});"
USER 950

# COPY
COPY --chown=950:950 . .

# install dependencies
RUN npm i

RUN echo $IS_LOCAL

# if IS_LOCAL set NODE_ENV to development to use localhost api url
RUN if [ "${IS_LOCAL}" = "true" ]; then REACT_APP_API_BASE_URL=http://localhost:8080/fl-api/ npm run build ; else GENERATE_SOURCEMAP=false npm run build ; fi

# Stage 2
FROM registry.il2.dso.mil/platform-one/devops/pipeline-templates/base-image/harden-nginx-19:1.19.2

USER appuser

COPY --from=builder --chown=appuser:appuser /app/build /var/www

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]