"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del');

gulp.task("compileSass", function(){
    return gulp.src("scss/application.scss")
        .pipe(maps.init())
        //.pipe(sass())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('css'));
})

gulp.task("watchSass", function(){
    gulp.watch('scss/**/*.scss', ['compileSass']);
})

gulp.task("clean", function(){
   // del('dist');
   del(['dist', 'css/application.css*']);
})

gulp.task("build", [ 'compileSass'], function(){
    return gulp.src(["css/application.css", "index.html",
                "img/**", "fonts/**"],{base: './'})
        .pipe(gulp.dest('dist'));
});

gulp.task("default", ["clean"], function(){
    gulp.start('build');
    require('./server.js')
})