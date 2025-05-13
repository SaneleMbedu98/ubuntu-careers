FROM node:18-alpine
WORKDIR /app
RUN npm install -g http-server
COPY public/ ./public/
EXPOSE 3000
CMD ["http-server", "public", "-p", "3000"]