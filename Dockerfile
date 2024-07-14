FROM oven/bun:latest

EXPOSE 3000

WORKDIR /WorkShare
COPY ./ /WorkShare/

RUN bun install

CMD [ "bun", "run", "dev"]