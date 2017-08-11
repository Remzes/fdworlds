Winify
===================
Minify your CSS up to 30% smaller than other minifiers alone.

This plugin reads the classes in your CSS selectors and converts them to one-character long minified names. These new class names and ids are then added to your HTML files, along with the original classes.

More improvements are coming, including CSS property minification, tag minification and jQuery selector support.

This project is still in early stages so make sure to test before making production builds with it.


##How it works:  

The selectors in your CSS get minified. Each class (and optionally, id) are reduced to one unique UTF-8 character, which is added as a separate class to the original element in your HTML. None of the original HTML is replaced, so there are no side effects.


### Example:
This CSS:
```
.billing-address__input.selected {...}
```
Is minified to this:
```
.¢.♥ {...}
```

And your HTML goes from this:
```
<div class="billing-address__input selected">...</div>
```
To this:
```
<div class="billing-address__input ¢ selected ♥">...</div>
```

##Install:

To install, type `npm install --save gulp-winify`


Example Gulpfile:

```
var gulp = require('gulp');
var winify = require('gulp-winify');
var cssnano = require('gulp-cssnano');

gulp.task('default', function(){
  return gulp.src( ['./src/*.css', './src/*.html'] )
    .pipe( winify() )
    .pipe( cssnano() )
    .pipe( gulp.dest('./dist') ); 
});
```

Winify can also be called in separate gulp tasks with no issues:
```
gulp.task('html', function(){
  return gulp.src( './src/*.html' )
  	.pipe( winify() )
    .pipe( gulp.dest('./dist') ); 
});

gulp.task('css', function(){
  return gulp.src( './src/*.css' )
  	.pipe( winify() )
    .pipe( gulp.dest('./dist') ); 
});
```

###Options:
An options object can be passed into your gulpfile's call to winify(). Options will usually be for enabling features in development, or features that might be too aggressive for some projects.

`experimental: true`: Turn on experimental features currently in development. (Default: false) 
`alphabeticSelectors: true`: Start minified class characters at alphabetic letters [A-z]. (Default: false)
`minifyIds: true`: Minify ids. (Currently will add a second id until class/id replacement is developed. Two ids on one element isn't valid in HTML and will cause browser issues until then). (Default: false)

Example gulpfile call:  
`.pipe( winify({ experimental: true }) )`



##Future Plans: 

### JavaScript Support
Add the option to minify jQuery selectors and JavaScript DOM manipulation

### Property minification
Create a new class for style properties that are used multiple times. CSS properties are repeated often, and in large projects this can cut file size even more than minifying selectors can.


```
.billing-address__input.selected {
	background-color: #9238E6;
}
...
.login__form .selected {
	background-color: #9238E6;
}
```
Will turn into
```
.√ {
	background-color: #9238E6;
}
```

### Possible features:

#### HTML Replacement
Add the option to replace classes and ids in the html instead of adding new ones. This requires JavaScript to be parsed and selectors to be replaced along with the CSS and HTML

#### Tag minification:
Using JavaScript's document.registerElement to let custom minified tags replace normal tags for browsers that support it.

#### Grunt or purely Node.js plugins


##Contributing:  
Feel free to fork and make a pull request, any help is welcome
 

##License  
MIT © Adam Chamberland