'use strict'

const Farm = require('./farm')

let farms = [] // keep record of farms so we can end() them if required


function farm (path) {
  // if (typeof options == 'object') {
    // methods = path
    // path = options
    // options = {}
  // }
    const options = {}
  let f   = new Farm(options, path)
    , api = f.setup()

  farms.push({ farm: f, api: api })

  // return the public API
  return api
}


function end (api, callback) {
  for (let i = 0; i < farms.length; i++)
    if (farms[i] && farms[i].api === api)
      return farms[i].farm.end(callback)
  process.nextTick(callback.bind(null, new Error('Worker farm not found!')))
}


module.exports     = farm
module.exports.end = end
