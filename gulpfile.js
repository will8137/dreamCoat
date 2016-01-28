var webpack = require('webpack');
var gulp = require('gulp');
var gutil = require('gulp-util');
var flatten = require('gulp-flatten');
var concat = require('gulp-concat');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var webpackConfig = require('./webpack.config.js');
var webserver = require('gulp-webserver');
var async = require('async');
var fse = require('fs-extra');
var path = require('path');
var rename = require('gulp-rename');

 
gulp.task('server', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('default', function(callback) {

    webpackBuild(null, function() {
        gulp.watch([
            'src/**/*.js', 
            'src/**/*.jsx',
        ], ["wepback:build"]);
        gulp.watch([
            'src/less/**/*.less',
        ], ["less:build"]);
    });

});

gulp.task('wepback:build', function(callback) {

    webpackBuild(null, function() {
        callback();
    });

});

gulp.task('less:build', function(callback) {

  lessBuild( function() {
    gutil.log("Less", ': Built');
    callback();
  });

});

function webpackBuild(options, callback) {
    // Setup sourcemapping
    webpackConfig.devtool = 'source-map';

    webpack(webpackConfig, function(err, stats) {
       gutil.log("Webpack", stats.toString({colors: true}));
       gutil.log('Build Task:webpackBuild done');
       callback();
    });
}

function lessBuild(callback) {
    gulp.src(['src/less/**/*.less'])
      .pipe(less())
      .pipe(cssmin())
      .pipe(rename("style.css"))
      .pipe(gulp.dest('dist/css'));

    callback();
} 