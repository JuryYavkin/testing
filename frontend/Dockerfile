FROM node:20-alpine
WORKDIR /app
COPY package.json vite.config.ts ./
COPY index.html ./
COPY src ./src
RUN npm install && npm run build
CMD ["npx", "vite", "preview", "--host"]
