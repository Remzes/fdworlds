let gulp = require('gulp');
let less = require('gulp-less');
let babel = require('gulp-babel');

gulp.task('less', function(){
  return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./src/css'))
});

gulp.task('babeljs', function(){
  return gulp.src('./src/js/main.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest("./src/babelified_js"))
})