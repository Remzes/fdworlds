'use strict'

const through = require( 'through2' )
const gutil   = require( 'gulp-util' )

let config     = require( './lib/config.js' )
let processors = require( './lib/processors.js' )


const PLUGIN_NAME = 'gulp-winify'


function winify( options ) {

  config.init( options );

  return through.obj( function( file, enc, cb ) {

    let fileExtension = getExtension( file.history[0] )

    if ( file.isNull() || !fileExtension ) {
      return cb( null, file )
    }

    if ( file.isBuffer() ) {
      let fileString = file.contents.toString( 'utf-8' )
      file.contents = new Buffer( processFile( fileString, fileExtension ) )
    }

    else if ( file.isStream() ) {

      return this.emit("error", new PluginError(
        PLUGIN_NAME,  "Streams not yet supported"
      ));

    }

    cb( null, file )

  })

}


function getExtension( path ) {

  if      ( path.match(/\.(html|haml|htm|xhtml)$/im)     ) return 'HTML'
  else if ( path.match(/\.(scss|sass|less|pcss|css)$/im) ) return 'CSS'
  else if ( path.match(/\.(js|json|jsx|coffee|ts)$/im)   ) return 'JS'
}


function processFile( fileString, fileExtension ){

  fileString = !!fileString ? fileString.replace( /\s/, '' ) : fileString

  let output = processors[`process${fileExtension}`]( fileString, 'UTF-8', config )

  return output || fileString

}


module.exports = winify
