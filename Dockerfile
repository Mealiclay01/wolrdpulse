FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY bin ./bin
ENV WORLDPULSE_API_URL=https://wolrdpulse.app
CMD ["node", "bin/cli.mjs"]
