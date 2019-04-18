import * as xml2js from 'xml2js'

export class Xml2Json {
  static parseBuffer (buffer: Buffer) {
    return new Promise((resolve, reject) => {
      new xml2js.Parser().parseString(buffer, (err: Error, result: object) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}
