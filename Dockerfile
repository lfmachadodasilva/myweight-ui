#############
## Install ##
#############
FROM node:14.4.0 as install
#FROM images.artifactory.dunnhumby.com/node:14.4.0 as install

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .
RUN ["yarn", "install"]

#################
## Copy Source ##
#################
FROM install as source
COPY . .

###########
## Build ##
###########
FROM source as build
RUN ["yarn", "run", "build"]

##########
## Test ##
##########
FROM source as test
VOLUME ["/app/coverage", "/app/logs"]
RUN ["yarn", "run", "test:coverage"]

#############
## Final ##
#############
FROM nginx:1.19 as final
#FROM images.artifactory.dunnhumby.com/nginx:1.19 as final

COPY ./util/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;' 