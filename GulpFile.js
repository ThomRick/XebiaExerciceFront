var gulp = require("gulp");
// var util = require("gulp-util");
var tsc = require("gulp-typescript");
var mocha = require("gulp-mocha");
var browserify = require("gulp-browserify");

gulp.task("compile", function() {
    return gulp.src("src/**/*.ts")
    .pipe(tsc({
        "allowJs": true,
        "diagnostics": true,
        "listFiles": true,
        "pretty": true,
        "removeComments": true,
        "target": "es5"
    }))
    .pipe(gulp.dest("target/local"));
});

gulp.task("test", [ "compile" ], function() {
    return gulp.src("target/local/test/**/*.js")
    .pipe(mocha());
});

gulp.task("deploy-statics", [ "test" ], function() {
    return gulp.src([ 
        "src/main/**",
        "!src/main/app/**"
    ])
    .pipe(gulp.dest("target/build"));
});

gulp.task("install", [ "deploy-statics" ], function() {
    return gulp.src([ 
        "target/local/main/app/**/*.js"
    ])
    .pipe(browserify({
        insertGlobals: false
    }))
    .pipe(gulp.dest("target/build/app"));
});

gulp.task("default", function() {
    gulp.watch("src/**", [ "install" ]);
});