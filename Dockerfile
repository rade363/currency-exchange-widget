FROM node:alpine AS web-build
WORKDIR /app
COPY ./package.json .
RUN npm install --legacy-peer-deps
COPY ./src ./src
COPY ./public ./public
COPY ./webpack ./webpack
COPY ./tsconfig.json ./tsconfig.json
COPY ./server.tsconfig.json ./server.tsconfig.json
COPY ./babel.config.js ./babel.config.js
COPY ./webpack.config.ts ./webpack.config.ts
ENV NODE_ENV=production
RUN npm run build

FROM node:alpine AS web-service
WORKDIR /app
COPY --from=web-build ./app/dist/assets ./dist/assets
COPY --from=web-build ./app/dist/bundle.js ./dist/bundle.js
COPY --from=web-build ./app/dist/server.js ./dist/server.js
COPY --from=web-build ./app/public/index.html ./public/index.html
COPY --from=web-build ./app/node_modules ./node_modules
COPY ./index.js ./index.js
EXPOSE 5000
CMD node index.js
