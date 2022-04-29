FROM node:14-alpine AS Dependency-Builder
COPY package.json .
RUN ["npm", "install"]

FROM node:14-alpine AS Builder
COPY . .
COPY --from=Dependency-Builder node_modules node_modules
RUN ["npm", "run", "tsc"]

FROM node:14-alpine
COPY --from=Builder build build
COPY --from=Builder package.json package.json
COPY --from=Builder text.json text.json
RUN ["npm", "install", "--production"]
RUN ["npx", "pm2", "start", "build/index.js", "-i", "max", "--name", "zhkapi"]

ENTRYPOINT ["tail", "-f", "/dev/null"]
