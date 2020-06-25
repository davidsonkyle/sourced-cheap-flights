var gulp = require("gulp"),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require("gulp-sass"),
    concat = require('gulp-concat'),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    notify = require('gulp-notify'),
    gutil = require('gulp-util'),
    addsrc = require('gulp-add-src');

var paths = {
    styles: {
        src: "sass/**/*.scss",
        dest: "dist/css/"
    }
};

function style() {
    return gulp
        .src(['sass/main.scss'])
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .on('error', function (err) {
            notify().write(err);
            this.emit('end');
        })
        .pipe(rename({
            basename: "main",
        }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(notify({ message: 'Styles compiled successfully.' }));
}

function script() {

    return gulp.src('js/main.js')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(concat('main.js'))
        .pipe(rename({ suffix: '.min' }))
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('dist/js/'))
        .pipe(notify({ message: 'JS compiled successfully.' }));
}

function watch() {
    gulp.watch(paths.styles.src, style);
    gulp.watch("js/**/*.js", script);

}

exports.watch = watch;
exports.style = style;
exports.script = script;

var build = gulp.parallel(style, script, watch);

gulp.task('default', build);