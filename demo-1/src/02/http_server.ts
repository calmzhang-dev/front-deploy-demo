import http, { IncomingMessage, ServerResponse } from "node:http";
import fs from "fs";

/**
 *  将index.html 用fs引入
 *  1. pnpm i -s  @types/node
 *  2. cd ./03 执行 ts-node .\http_server.ts
 */

const html = fs.readFileSync('./index.html')

const server = http.createServer((option?: IncomingMessage, res?: ServerResponse) =>
  res?.end(html)
);

server.listen(3000, () => {
  console.log("Listening 3000");
});
