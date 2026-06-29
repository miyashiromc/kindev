# ============================================
# Stage 1: Base - shared Node.js environment
# ============================================
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .

# ============================================
# Stage 2: Development - Vite dev server (HMR)
# ============================================
FROM base AS dev
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ============================================
# Stage 3: Build - Generate production bundle
# ============================================
FROM base AS build
ENV NODE_ENV=production
RUN npm run build

# ============================================
# Stage 4: Production - Nginx serving static
# ============================================
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html

# SPA fallback: redirect all routes to index.html
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    # Cache static assets aggressively \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
