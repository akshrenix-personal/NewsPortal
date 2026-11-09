# ---- build frontend ----
FROM node:20-alpine AS web
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install --no-audit --no-fund
COPY frontend/ ./
RUN npm run build

# ---- run backend (serves API + built frontend) ----
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY Backend/package*.json ./Backend/
RUN cd Backend && npm install --omit=dev --no-audit --no-fund
COPY Backend/ ./Backend/
COPY --from=web /app/frontend/dist ./frontend/dist
WORKDIR /app/Backend
EXPOSE 9000
CMD ["node", "index.js"]
