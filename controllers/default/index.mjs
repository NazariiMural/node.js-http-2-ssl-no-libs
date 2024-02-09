import { readFile } from 'node:fs/promises'
import http2 from 'node:http2'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * module description
 * @module DefaultController
 */
/** DefaultController description */
export default class DefaultController {
  /**
   * DefaultController constructor
   *  @param {http2.IncomingHttpHeaders} headers - headers object
   *  @param {http2.ServerHttp2Stream} stream - stream object
   */
  constructor(headers, stream) {
    this.headers = headers
    this.stream = stream
  }
  /**
   * Reads html document.
   * @return {Promise<Buffer | null>} Buffer of the static HTML document.
   */
  async getStaticContent() {
    try {
      const filename = fileURLToPath(import.meta.url)
      const dirname = path.dirname(filename)
      const staticFilePath = path.resolve(dirname, 'static', 'index.html')

      const content = await readFile(staticFilePath)
      return content
    } catch (error) {
      // pass error to the log service
      console.log('getStaticContent =>', error)
      return null
    }
  }

  /**
   * Parses html page, and renders it to the stream object.
   * @return {void} The y value.
   */
  async renderWelcomePage() {
    const buff = await this.getStaticContent()
    if (!buff) return this.renderError()

    // const content = JSON.stringify('<h3>Hello, world!</h3>')
    this.stream.respond({
      'content-type': 'text/html; charset=utf-8',
      'content-length': Buffer.byteLength(buff),
      ':status': 200,
    })
    this.stream.end(buff)
  }

  /**
   * Renders default error and sends it to the client.
   * @return {void}
   */
  renderError() {
    this.stream.respond({
      'content-type': 'text/plain; charset=utf-8',
      ':status': 500,
    })
    this.stream.end('Internal Server Error!')
  }
}
