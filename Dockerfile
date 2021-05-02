### NODE MODULES INSTALLER IMAGE ###
FROM node:lts-alpine as node-modules

WORKDIR /usr/locale/www

COPY package.json package-lock.json tsconfig.json ./

RUN npm install --verbose --production


### NODE APPLICATION BUILD ###

FROM node-modules as builder

RUN npm install --verbose

COPY public ./public
COPY src ./src

RUN npm run build

### NODE APPLICATION RUNNER ###

FROM nginx:1.19.10-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY ./nginx.config /etc/nginx/nginx.template
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
COPY --from=builder /usr/locale/www/build /usr/share/nginx/html


