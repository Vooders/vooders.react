import * as decompress  from 'decompress'
import * as xml2js from 'xml2js'

const dir = '/home/vooders/BattleScribe/rosters/'
const filename = 'death-guard-1.4k-v2.rosz'

const parser = new xml2js.Parser()

async function convert () {
  try {
    const file = await decompress(`${dir}${filename}`)
    parser.parseString(file[0].data, (err: any, result: object) => {
      if (err) throw err
      console.log(JSON.stringify(result))
    })
  } catch(error) {
    console.log(error)
  }
}

convert()
