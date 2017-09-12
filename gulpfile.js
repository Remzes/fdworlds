let gulp = require('gulp');
let less = require('gulp-less');
let babel = require('gulp-babel');
let livereload = require('gulp-livereload');
let browserSync = require('browser-sync').create();
let autoprefixer = require('gulp-autoprefixer');
let cssnano = require('gulp-cssnano');
let winify = require('gulp-winify');
let jsmin = require('gulp-jsmin');
let cleancss = require('gulp-clean-css');
let htmlnano = require('gulp-htmlnano');
let imagemin = require('gulp-imagemin');
let options = {
    removeComments: false
};

gulp.task('serve', ['less'], function(){
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

gulp.task('css_build', function(){
    return gulp.src('./src/css/main.css')
        .pipe(autoprefixer())
        .pipe(cleancss({compatibility: 'ie9'}))
        .pipe(cssnano())
        .pipe(gulp.dest('./build/css'))
});

gulp.task('babeljs', function () {
    return gulp.src('./src/js/main.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest("./src/babelified_js"))
        .pipe(browserSync.stream())
});

gulp.task('js_build', function(){
   return gulp.src('./src/babelified_js/*')
       .pipe(gulp.dest('./build/js'))
});

gulp.task('fonts_build', function(){
   gulp.src('./src/fonts/*/*')
       .pipe(gulp.dest('./build/fonts'));
});

gulp.task('img_build', function(){
    return gulp.src('./src/img/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({plugins: [{removeViewBox: true}]})
        ]))
        .pipe(gulp.dest('./build/img'));
});

gulp.task('build', ['css_build', 'js_build', 'fonts_build', 'img_build'], function() {
   return gulp.src('./src/index.html')
       .pipe(gulp.dest('./build'));
});

gulp.task('default', ['serve']);