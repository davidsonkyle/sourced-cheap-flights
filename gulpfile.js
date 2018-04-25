var gulp = require('gulp');  
var sass = require('gulp-sass');  

gulp.task('sass', function () {  
    gulp.src('sass/main.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass',], function () {  
    gulp.watch("sass/**/*.scss", ['sass']);
});