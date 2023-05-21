FROM node:16.14.0 as build

WORKDIR /app

COPY . .

# Add expect:
# expect is a program that allows you to run a command, similar to bash
RUN apt update && apt -y install expect

# environment variables needed for the script to run.
# Should not be in Dockerfile.
ARG NPM_USER
ARG NPM_PASS
ARG NPM_EMAIL
ARG NPM_SCOPE
ARG NPM_REGISTRY

# configure registry
RUN npm config set '@folcode:registry' https://node.bit.dev/
RUN npm config set @bit:registry https://node.bit.dev/

# run the script to login to bit
RUN ./bin/npm.sh

# install dependencies
RUN npm i --force

# transpile code
RUN npm run-script build

#EXPOSE 3000

# run the app
# CMD tail -f /dev/null
CMD [ "npm", "run", "start" ]

# Probably not needed: Clean up
#RUN apt-get clean && \
#    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
#    rm /var/log/lastlog /var/log/faillog


#FROM nginx:stable

#COPY --from=build /app/translations /usr/share/nginx/html

#COPY nginx/conf.d/app.conf /etc/nginx/conf.d/default.conf

#EXPOSE 80