# ARG REACT_APP_HOST
# ENV REACT_APP_HOST=$REACT_APP_HOST
# ARG REACT_APP_HOST
# ENV REACT_APP_HOST=$REACT_APP_HOST

FROM node:18-alpine as builder
ENV REACT_APP_HOST=0.0.0.0
ENV REACT_APP_BACKEND_HOST=https://automation-dev-213242029674.us-central1.run.app

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Cloud Build로 빌드하고 있는데 아래의 에러메시지가 발생하고 있어.
# Step 11/13 : COPY default.conf /etc/nginx/conf.d/default.conf
# COPY failed: file not found in build context or excluded by .dockerignore: stat default.conf: file does not exist