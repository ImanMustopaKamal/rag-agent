FROM node:20-alpine

WORKDIR /app

# Install dependencies termasuk devDependencies untuk build
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]