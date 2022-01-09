FROM node:16-alpine

# Install dependencies only when needed
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat bash
WORKDIR /app
COPY ./app/package.json ./app/yarn.lock ./

# If you want to add some new ENVs for the project this is a great place to do it
# ENV NEXT_PUBLIC_...
# ENV ...

ENV NODE_ENV development
ENV PORT 3000

COPY ./compose/nextjs/entrypoint.sh /usr/local/bin/
# Rebuild the source code only when needed
COPY ./app .
ENTRYPOINT ["entrypoint.sh"]

CMD ["yarn", "dev"]
