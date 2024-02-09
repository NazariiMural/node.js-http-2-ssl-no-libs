import http2 from "node:http2";
import fs from "node:fs";

import { apiPathRouter, defaultPathRouter, notFoundPathRouter } from "./router.mjs";
import { CORS_HEADERS } from "./utils.mjs";

const server = http2.createSecureServer({
    key: fs.readFileSync("security/localhost+2-key.pem"),
    cert: fs.readFileSync("security/localhost+2.pem"),
});

const getRouterObj = {
    "/": defaultPathRouter,
    "/api/todos": apiPathRouter,
};

/**
 * @param {http2.ServerHttp2Stream} stream
 * @param {http2.IncomingHttpHeaders} headers
 */
const requestListener = (stream, headers) => {
    const method = headers[":method"];
    const url = headers[":path"];
    if (url in getRouterObj && method === "GET") {
        getRouterObj[url](headers, stream);
    } else {
        notFoundPathRouter(headers, stream);
    }
};

server.on("stream", (stream, headers) => {
    // Add CORS headers to ALL responses
    if (process.env.CORS) {
        stream.respond = stream.respond.bind(stream, CORS_HEADERS);
    }
    requestListener(stream, headers);
});

server.on("error", (err) => console.error(err));

server.listen(process.env.PORT, process.env.HOST, () => {
    console.log(
        `Server is listening on: https://${process.env.HOST}:${process.env.PORT}`
    );
});
