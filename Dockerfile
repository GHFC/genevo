# First stage to build the app
FROM node:12.19 AS builder
WORKDIR /usr/src/build
COPY . .
RUN npm ci && npm run build-front

# Second stage to setup the container
FROM node:12.19
WORKDIR /usr/src/genevo
COPY --from=builder /usr/src/build/src/ ./src/
COPY --from=builder /usr/src/build/dist/ ./dist/
COPY --from=builder /usr/src/build/package.json ./package.json
COPY --from=builder /usr/src/build/package-lock.json ./package-lock.json
ENV NODE_ENV="production" \
    GENEVO_APP_PORT="3000" \
    GENEVO_APP_HOST="localhost" \
    GENEVO_DB_NAME="genevo" \
    GENEVO_APP_FASTA_PATH="/usr/src/genevo/fasta-files"
RUN npm ci
EXPOSE 3000
CMD [ "npm", "start" ]
LABEL name="genevo" \
      version="1.0.0" \
      description="The website of the GenEvo project conducted at the Pasteur institute"
