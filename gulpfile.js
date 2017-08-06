let gulp = require('gulp');
let less = require('gulp-less');
let babel = require('gulp-babel');
let livereload = require('gulp-livereload');
let browserSync = require('browser-sync').create();

gulp.task('serve', ['less', 'babeljs'], function(){
   browserSync.init({
       server: '.'
   });

   gulp.watch('./src/less/*.less', ['less']);
   gulp.watch('./src/js/*.js', ['babeljs']);
   gulp.watch('./src/index.html').on('change', browserSync.reload);
});

gulp.task('less', function () {
    return gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream())
});

gulp.task('babeljs', function () {
    return gulp.src('./src/js/main.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest("./src/babelified_js"))
        .pipe(browserSync.stream())
});

gulp.task('default', ['serve']);