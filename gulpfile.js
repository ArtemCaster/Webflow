const { src, dest, watch, parallel, series} = require('gulp');

const scss          = require('gulp-sass')(require('sass'));
const concat        = require('gulp-concat');
const autoprefixer  = require('gulp-autoprefixer');
const uglify        = require('gulp-uglify');
const imagemin      = require('gulp-imagemin');
const del           = require('del');
const browserSync   = require('browser-sync').create();
const fileInclude   = require('gulp-file-include');

//includ HTML
function htmlInclude () {
  return src(['app/html/*.html'])
  .pipe(fileInclude({
    prefix: '@',
    basepath: '@file'
  }))
  .pipe(dest('app'));
}

//конвертируем и сжимаем файлы из папки scss в папку css
function styles () {
  return src('app/scss/style.scss')
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

//компиляция скриптов js
function scripts () {
  return src([
    'node_modules/jquery/dist/jquery.js',  //jqery
    'node_modules/slick-carousel/slick/slick.js', //slick carusel
    'node_modules/mixitup/dist/mixitup.js', //mixitap carusel
    'app/js/main.js'
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js'))
  .pipe(browserSync.stream())
}

//сжатие изображений
function images () {
  return src('app/images/**/*.*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
	    imagemin.mozjpeg({quality: 75, progressive: true}),
	    imagemin.optipng({optimizationLevel: 5}),
	    imagemin.svgo({
		    plugins: [
			    {removeViewBox: true},
		    	{cleanupIDs: false}
		]
	})
    ]))
    .pipe(dest('dist/images'))
}

//сервер
function browsersync() {
  browserSync.init({
    server: {
        baseDir: "app/"
    },
    notify: false
  });
}

//слежение за проектом
function watching () {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/**/*.html']).on('change', browserSync.reload);
  watch(['app/html/**/*.html'], htmlInclude);
}

function cleanDist () {
  return del('dist')
}

function build () {
  return src([
    'app/*.html',
    'app/css/style.min.css',
    'app/js/main.min.js',
  ], {base: 'app'})
  .pipe(dest('dist'))
}


exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.htmlInclude = htmlInclude;


exports.build = series(cleanDist, images, build);
exports.default = parallel(htmlInclude, styles, scripts, browsersync, watching);
