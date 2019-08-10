'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let clean = require('gulp-clean');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('clear', function () {
    return gulp.src('./css', {read: false, allowEmpty : true})
        .pipe(clean());
});


gulp.task('sass',
    function() {
    return gulp.src('sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))

        });




gulp.task('reload',
    function () {
        return Promise.resolve(browserSync.reload());
    }
    );

// watch Sass files for changes, run the Sass preprocessor with the 'sass' task and reload
gulp.task('serve', gulp.series('sass', function() {
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });

    gulp.watch('./*.html',gulp.series(['reload']));
    gulp.watch('./sass/*.sass', gulp.series(['sass','reload']));
}));

gulp.task('default', gulp.series(['clear' ,'sass']));

// //START -- подключаем BrowserSync
// gulp.task('browser-sync', function() {
//     browserSync({
//         server: {
//             baseDir: '.'
//         }
//     });
// });
//
// gulp.task('watch', gulp.series(['browser-sync', 'sass'],
//     function() {
//         gulp.watch('./*.html', ()=>{
//             console.log('HTML');
//             return gulp.series('browser-sync')});
//         gulp.watch('./sass/**/*.sass', gulp.series('sass'))
//     })
// );