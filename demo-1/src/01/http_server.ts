import http, { IncomingMessage, ServerResponse } from "node:http";

/**
 * 引入下载node类型提示包
 *  pnpm i -s  @types/node
 */
const html: string = `<!DOCTYPE html>
 <html lang="en">
 <head>
   <meta charset="UTF-8">
   <title></title>
 </head>
 <body>
   hello, shanyue. 
 </body>
 </html>`;

const server = http.createServer((option?: IncomingMessage, res?: ServerResponse) =>
  res?.end(html)
);

server.listen(3000, () => {
  console.log("Listening 3000");
});
