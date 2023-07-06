FROM node:18-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm install --omit=dev --ignore-scripts
COPY src ./

CMD ["npm", "run", "start"]
