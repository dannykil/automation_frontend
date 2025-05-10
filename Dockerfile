# ARG REACT_APP_HOST
# ENV REACT_APP_HOST=$REACT_APP_HOST
# ARG REACT_APP_HOST
# ENV REACT_APP_HOST=$REACT_APP_HOST

# 리액트로 개발한 프론트엔드를 도커로 빌드하기 위한 Dockerfile이야.
# 정상적으로 이미지 만들어서 컨테이너까지 올라갔는데 localhost:80으로 접속하면 ERR_CONNECTION_RESET 라는 에러메시지만 뜨고 있어.
# 혹시 어디가 잘못된거야?
FROM node:18-alpine as builder
ENV REACT_APP_HOST=0.0.0.0
ENV REACT_APP_BACKEND_HOST=https://automation-dev-213242029674.us-central1.run.app
# ENV REACT_APP_BACKEND_HOST=http://localhost:5000
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# FROM nginx
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# COPY ./nginx.conf /etc/nginx/nginx.conf
# COPY conf/nginx.conf /etc/nginx/conf.d/default.conf


# Cloud Build로 빌드하고 있는데 아래의 에러메시지가 발생하고 있어.
# Step 11/13 : COPY default.conf /etc/nginx/conf.d/default.conf
# COPY failed: file not found in build context or excluded by .dockerignore: stat default.conf: file does not exist

# 
# docker build -t automation_frontend .
# docker run -d -p 80:80 automation_frontend
# docker exec -it a3e541cd552b /bin/sh