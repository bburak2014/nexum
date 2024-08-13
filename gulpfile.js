const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const connect = require('gulp-connect');

// LESS'i CSS'e dönüştür
gulp.task('styles', () => {
  return gulp.src('./src/less/**/*.less')
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(gulp.dest('./src/dist/css'))
    .pipe(connect.reload());
});

// JS dosyalarını birleştir ve küçült
gulp.task('scripts', () => {
  return gulp.src('./src/js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./src/dist/js'))
    .pipe(connect.reload());
});


// HTML dosyalarını izleyin ve sunucu başlatın
gulp.task('html', () => {
  return gulp.src('./src/**/*.html')
    .pipe(connect.reload());
});

// Canlı Yenileme ve İzleme
gulp.task('watch', () => {
  gulp.watch('./src/less/**/*.less', gulp.series('styles'));
  gulp.watch('./src/js/**/*.js', gulp.series('scripts'));
  gulp.watch('./src/**/*.html', gulp.series('html'));
});

// Sunucuyu başlat
gulp.task('connect', () => {
  connect.server({
    root: 'src',
    livereload: true,
  });
});

gulp.task('default', gulp.parallel('styles', 'scripts', 'connect', 'watch'));
