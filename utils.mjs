/**
 * CORS headers.
 * @constant {{access-control-allow-origin: String, access-control-allow-methods: String, access-control-max-age: Number}[]} CORS_HEADERS
 */
export const CORS_HEADERS = {
    "access-control-allow-origin": "*" /* @dev Not for production only for the dev env */,
    "access-control-allow-methods": "OPTIONS, DELETE, PUT, POST, GET",
    "access-control-max-age": 2592000, // 30 days
};
