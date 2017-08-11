'use strict'

const cheerio = require( 'cheerio')
const css  = require( 'css')
const acorn = require( 'acorn')
const walk = require( 'walk-ast')
const escodegen = require( 'escodegen')
 
let config = require( './config.js' )

let selectors              = require( './selectors.js')
  , createMinifiedSelector = selectors.createMinifiedSelector
  , getMinifiedSelector    = selectors.getMinifiedSelector
  , allowedSelectors       = selectors.allowedSelectors

let validation       = require( './validation.js')
  , isAllowedTagName = validation.isAllowedTagName
  , isValidPrefix    = validation.isValidPrefix



let processors = {

  processHTML( data, _charset ){

    let $ = cheerio.load( data)

    $('*').each( (i, $el) => {

      // Tags

      if ( isAllowedTagName($el.name) && allowedSelectors.tag) {

        $el.name = createMinifiedSelector( '', $el.name )

      }


      // Classes

      if ( $el.attribs.class && allowedSelectors.className) {

        $el.attribs.class.split(' ').forEach( ( className) => {

          createMinifiedSelector( '.', '.' +  className )

          $el.attribs.class = $el.attribs.class.replace( className, this.insertSelector( getMinifiedSelector('.' + className), className ) )

        })
      }

      // Ids

      if ( $el.attribs.id && allowedSelectors.id) {

        $el.attribs.id.split(' ').forEach( (id) => {

          createMinifiedSelector( '#', id )

          $el.attribs.id = $el.attribs.id.replace(id, this.insertSelector( getMinifiedSelector(id), id ) )

        })
      }


      // Embedded Stylesheets

      if ( $el.type === 'style' ) {

        $( $el ).html( this.processCSS( $($el).html() ) )

      }


    })

    data = $.html( {decodeEntities: false} )

    return data
  },

  processCSS( data ){

    let styles = css.parse( data )
    let rules  = styles.stylesheet.rules

    processCSSRules( rules )

    return css.stringify( styles )

  },

  processJS( data ){

    if ( config.experimental === false ) return data

    let ast = acorn.parse( data, {} )

    walk( ast, function( node ) {
      //console.log(node)
      //console.log(node.type, node.value)

      if ( node.type === 'Literal' ) node.value = 'HEY'

    })

  
    return escodegen.generate( ast )
  },

  init(config) {

    this.insertSelector = !!config.experimental ? 
      ( className) => className : 
      ( className, original) => original + ' ' + className.slice(1)
  }

}


function processCSSRules( rules) {

  let childRules = []

  for ( let rule of rules ) {

    if ( rule.rules ) {
      childRules = childRules.concat( rule.rules )
    }

    if ( rule.selectors )  iterateCSSSelectors( rule )
  }

  if ( childRules.length ) processCSSRules( childRules )

}

function iterateCSSSelectors( rule ) {

  let separatedSelectors, prefix, newSelector

  rule.selectors.forEach( ( selectors, i ) => {


    //if (selectors.indexOf(':not') !== -1) console.log(rule);

    separatedSelectors = selectors.split( /(?=[\.#\[\:\~\)])|\s+/gm ).slice()
    separatedSelectors.forEach( ( selector ) => {

      prefix = selector.match( /^\W/g ) || ['']
      prefix = prefix[0]


      if ( isValidPrefix( prefix ) ) {
        newSelector = createMinifiedSelector( prefix, selector )

        rule.selectors[i] = rule.selectors[i].replace( selector, newSelector )
      }

    })

  })
}


module.exports = processors
