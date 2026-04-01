FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install 2>/dev/null || true
COPY . .

FROM python:3.11-slim
WORKDIR /app
COPY --from=build /app .
RUN pip install --no-cache-dir fastapi uvicorn python-multipart
COPY . .

EXPOSE 8000
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]