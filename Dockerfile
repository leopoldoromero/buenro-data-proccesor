# Use the official Node.js LTS image as base
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY . .

RUN npm install -g @nestjs/cli && npm run build

EXPOSE 3000

ENTRYPOINT [ "npm" ]

CMD [ "run", "start:prod" ]
