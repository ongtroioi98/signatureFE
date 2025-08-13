# Chọn Node image gọn nhẹ
FROM node:18-alpine AS deps
WORKDIR /app

# Copy package.json trước để tận dụng cache khi cài deps
COPY package*.json ./
RUN npm install --production

# Copy toàn bộ project
COPY . .

# Build app Next.js
RUN npm run build

# -------------------------------
# Stage chạy app (chỉ copy build)
# -------------------------------
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy node_modules và build output từ stage trước
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./
COPY --from=deps /app/.next ./.next
COPY --from=deps /app/public ./public
COPY --from=deps /app/next.config.js ./

# App chạy trên port 3000
EXPOSE 3000
CMD ["npm", "start"]