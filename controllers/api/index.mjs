import http2 from "node:http2";

/**
 * module description
 * @module ApiController
 */
/** DefaultController description */
export default class ApiController {
    /**
     * ApiController constructor
     *  @param {http2.IncomingHttpHeaders} headers - headers object
     *  @param {http2.ServerHttp2Stream} stream - stream object
     */
    constructor(headers, stream) {
        this.headers = headers;
        this.stream = stream;
    }

    /**
     * Generates Todo data object and sends it to the client.
     * @return {void}
     */
    async getTodos() {
        try {
            const content = JSON.stringify(TODOS);
            this.stream.respond({
                "content-type": "application/json; charset=utf-8",
                "content-length": Buffer.byteLength(content),
                ":status": 200,
            });
            this.stream.end(content);
        } catch (error) {
            this.renderError();
        }
    }

    /**
     * Renders default error and sends it to the client.
     * @return {void}
     */
    renderError() {
        this.stream.respond({
            "content-type": "text/plain; charset=utf-8",
            ":status": 500,
        });
        this.stream.end("Internal Server Error!");
    }
}

/**
 * Array of todo objects.
 * @constant {{id: Number, title: String, completed: Boolean}[]} TODOS
 */
const TODOS = [
    { id: 1, title: "Use Node.js without frameworks", completed: true },
    { id: 2, title: "Implement testing", completed: false },
    { id: 3, title: "Implement dependency injection", completed: false },
];
