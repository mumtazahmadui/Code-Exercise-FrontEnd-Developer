"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps');

gulp.task("concatScripts", function(){
    gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'js/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.js'
    ])
    .pipe(concat("app.js"))
    .pipe(gulp.dest("js"))
});

gulp.task("minifyScripts", function (){
    gulp.src("js/app.js")
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('js'));
})

gulp.task("compileSass", function(){
    gulp.src("scss/application.scss")
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('css'));
})

gulp.task("watchSass", function(){
    gulp.watch('scss/**/*.scss', ['compileSass']);
})

gulp.task("build", ['concatScripts', 'minifyScripts', 'compileSass']);

gulp.task("default", ["build"], function (){
    require('./server.js')
    console.log("This is the default task!!!!");
});