"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
     minifyCss = require('gulp-minify-css');

gulp.task("concatScripts", function(){
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'js/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.js'
    ])
    .pipe(concat("app.js"))
    .pipe(gulp.dest("js"))
});

gulp.task("minifyScripts", ["concatScripts"], function (){
    return gulp.src("js/app.js")
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('js'));
})

gulp.task("compileSass", function(){
    return gulp.src("scss/application.scss")
        .pipe(maps.init())
        //.pipe(sass())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('css'));
})

gulp.task("styles", function(){
    return gulp.src(["css/application.css"])
        .pipe(concat('style.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('css'));
})

gulp.task("watchSass", function(){
    gulp.watch('scss/**/*.scss', ['compileSass']);
})

gulp.task("clean", function(){
   // del('dist');
   del(['dist', 'css/application.css*', 'js/app*.js']);
})

gulp.task("build", ['minifyScripts', 'compileSass'], function(){
    return gulp.src(["css/application.css", "js/app.min.js", "index.html",
                "img/**", "fonts/**"],{base: './'})
        .pipe(gulp.dest('dist'));
});

// gulp.task("default", ["build"], function (){
//     require('./server.js')
//     console.log("This is the default task!!!!");
// });
gulp.task("default", ["clean"], function(){
    gulp.start('build');
    require('./server.js')
})