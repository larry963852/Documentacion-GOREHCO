# syntax=docker/dockerfile:1

# Stage 1: Base image.
FROM node:lts AS base
## Disable colour output from npm to make logs easier to read.
ENV FORCE_COLOR=0
## Set the working directory to `/opt/docusaurus`.
WORKDIR /opt/docusaurus

# Stage 2a: Development mode.
FROM base AS dev
## Set the working directory to `/opt/docusaurus`.
WORKDIR /opt/docusaurus
## Expose the port that Docusaurus will run on.
EXPOSE 3001
## Run the development server.
CMD [ -d "node_modules" ] && npm run start -- --host 0.0.0.0 --port 3001 --poll 1000 || npm install && npm run start -- --host 0.0.0.0 --port 3001 --poll 1000

# Stage 2b: Production build mode.
FROM base AS prod
## Set the working directory to `/opt/docusaurus`.
WORKDIR /opt/docusaurus
## Copy over the source code.
COPY . /opt/docusaurus/
## Install dependencies with `--frozen-lockfile` to ensure reproducibility.
RUN npm ci
## Build the static site.
RUN npm run build

# Stage 3a: Serve with `docusaurus serve`.
FROM prod AS serve
## Expose the port that Docusaurus will run on.
EXPOSE 3001
## Run the production server.
CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0", "--port", "3001", "--no-open"]

# Stage 3b: Serve with Nginx.
FROM nginx:alpine AS nginx
## Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
## Copy the Docusaurus build output.
COPY --from=prod /opt/docusaurus/build /usr/share/nginx/html
## Expose port 80
EXPOSE 80
## Start nginx
CMD ["nginx", "-g", "daemon off;"]
