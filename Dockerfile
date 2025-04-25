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
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]