'use strict'

let selectors  = require( './selectors.js' )
let characters = require( './characters.js')
let processors = require( './processors.js')
let validation = require( './validation.js')


let config = {

  defaults: {
    alphabeticSelectors: false,
    experimental: false,
    minifyIds: false
  },

  init( options ) {
    options = applyOptions(options)

    selectors .init(options);
    characters.init(options);
    processors.init(options);
    validation.init(options);

  }

}


function applyOptions( options ) {

  return Object.assign( {}, config.defaults, options )

}


module.exports = config