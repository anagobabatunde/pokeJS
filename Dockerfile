# ikf3.com for ETNA
# Usage:
# build with: docker build . -t containers.ikf3.com/etna/tic-djs2 and run with:  (See readme)
# Info:
# In case of hash mismatch on macOS host, disable scren time.

FROM node:12.2.0-alpine
LABEL authors="ikf3 <contact@ikf3.com>, Andy Anago <contact@anago.me>"

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@latest -g --silent

CMD ["npm", "start"]