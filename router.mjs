import http2 from "node:http2";

import ApiController from "./controllers/api/index.mjs";
import DefaultController from "./controllers/default/index.mjs";

/**
 * @param {http2.IncomingHttpHeaders} headers
 * @param {http2.ServerHttp2Stream} stream
 */
export const apiPathRouter = (headers, stream) => {
    const apiController = new ApiController(headers, stream);
    apiController.getTodos();
};

/**
 * @param {http2.IncomingHttpHeaders} headers
 * @param {http2.ServerHttp2Stream} stream
 */
export const defaultPathRouter = (headers, stream) => {
    const defaultController = new DefaultController(headers, stream);
    defaultController.renderWelcomePage();
};

/**
 * @param {http2.IncomingHttpHeaders} headers
 * @param {http2.ServerHttp2Stream} stream
 */
export const notFoundPathRouter = (_, stream) => {
    stream.respond({
        "content-type": "text/plain; charset=utf-8",
        ":status": 404,
    });
    stream.end("Not found!");
};
