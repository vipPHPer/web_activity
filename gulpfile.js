'use strict';

var gulp = require('gulp');
var combiner = require('stream-combiner2');
var path = require('path');
var gutil = require('gulp-util');
var changed = require('gulp-changed');
var tap = require('gulp-tap');
var htmlhint = require('gulp-htmlhint');
var sass = require('gulp-sass-china');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var jscs = require('gulp-jscs');
var livereload = require('gulp-livereload');
var include = require('gulp-include');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var csssimple = require('postcss-csssimple');
var staticHash = require('gulp-static-hash');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); //png图片压缩插件

var dir = {
  dest: 'views/',
  destCss: 'public/css/',
  destJs: 'public/js/',
  destImg: 'public/img/',
  srcSass: 'common/scss/',
  srcJs: 'common/js/',
  srcImg: 'common/img/'
};

// 后编译配置
var postcssProcessors = [
  autoprefixer({
    browsers: ['chrome >= 35', 'ie >= 6', 'ff >= 30', 'safari >= 5'],
    cascade: false
  }),
  csssimple()
];

/**
 * 事件处理相关
 */
var ERROR_LEVELS = ['error', 'warning', 'hint'];
var ACTION_TYPES = {
  compile: '编译',
  uglify: '压缩',
  concat: '合并',
  update: '更新'
};

function isFatal(level) {
  return ERROR_LEVELS.indexOf(level) <= ERROR_LEVELS.indexOf('error');
}

function handleError(level, error) {
  // gulp-jscs 会自己抛错
  if (error.plugin !== 'gulp-jscs') {
    gutil.log(gutil.colors.red(error.plugin + ' 错误：\n'),
      gutil.colors.magenta(path.basename(error.fileName) + ':' + error.lineNumber), '=>', error.message);
  }

  if (isFatal(level)) {
    console.log('\u0007');
    process.exit(1);
  } else if (level === 'warning') {
    console.log('\u0007');
  }
}

function onError(error) {
  handleError.call(this, 'error', error);
}

function onWarning(error) {
  handleError.call(this, 'warning', error);
}

function handleComplete(type, file) {
  gutil.log(ACTION_TYPES[type], gutil.colors.magenta(path.basename(file.path)), '=>', gutil.colors.green('Compiled successfully;'));
}

/**
 * gulp task 相关
 */

// Sass 主文件：
// style.scss -> style.min.css
gulp.task("sass:main", function() {
  var combined = combiner.obj([
    gulp.src([dir.srcSass + '**/*.scss']),
    changed(dir.destCss, { extension: '.min.css' }),
    sass({ outputStyle: 'compressed' }),
    postcss(postcssProcessors),
    rename({ suffix: '.min' }),
    gulp.dest(dir.destCss),
    livereload(),
    tap(function(file) {
      handleComplete('compile', file);
    })
  ]);
  combined.on('error', onWarning);
  return combined;
});

// Uglify 主要文件：
// script.js -> script.min.js
gulp.task('uglify:main', function() {
  var combined = combiner.obj([
    gulp.src([dir.srcJs + '**/*.js', '!' + dir.srcJs + '**/*.min.js', '!' + dir.srcJs + '**/_*.js', '!' + dir.srcJs + '**/_**/*.js']),
    changed(dir.destJs, { extension: '.min.js' }),
    jshint(),
    jshint.reporter('default'),
    jscs(),
    include(),
    uglify(),
    rename({ suffix: '.min' }),
    gulp.dest(dir.destJs),
    livereload(),
    tap(function(file) {
      handleComplete('uglify', file);
    })
  ]);
  combined.on('error', onWarning);
  return combined;
});

// Uglify 部分文件：
// _partA.js _partB.js _partC.js -> scripts.min.js
// 注：concat 基于文件名字母顺序来合并
gulp.task('uglify:part', function() {
  var combined = combiner.obj([
    gulp.src([dir.srcJs + '**/_**/*.js', '!' + dir.srcJs + '**/*.min.js']),
    changed(dir.destJs, { extension: '.min.js' }),
    jshint(),
    jshint.reporter('default'),
    jscs(),
    uglify(),
    concat('scripts.min.js'),
    gulp.dest(dir.destJs),
    livereload(),
    tap(function(file) {
      handleComplete('uglify', file);
    })
  ]);
  combined.on('error', onWarning);
  return combined;
});

// 更新html文件中静态资源版本号
gulp.task('staticHash', function() {
  var combined = combiner.obj([
    gulp.src([dir.dest + '**/*.html']),
    staticHash({
      asset: 'static'
    }),
    gulp.dest(dir.dest),
    tap(function(file) {
      handleComplete('update', file);
    })
  ]);
  combined.on('error', onWarning);
  return combined;
});

// Refresh：刷新页面文件
gulp.task('refresh', function() {
  var combined = combiner.obj([
    gulp.src([dir.dest + '**/*.html']),
    htmlhint(),
    htmlhint.reporter(),
    livereload()
  ]);
  combined.on('error', onWarning);
  return combined;
});

// 默认任务
gulp.task('default', function() {
  livereload.listen();

  gulp.watch([dir.srcSass + '**/*.scss'], ['sass:main', 'staticHash']);

  gulp.watch([dir.srcJs + '**/*.js', '!' + dir.srcJs + '**/*.min.js', '!' + dir.srcJs + '**/_.*.js'], ['uglify:main', 'staticHash']);

  gulp.watch([dir.srcJs + '**/_**/*.js', '!' + dir.srcJs + '**/*.min.js'], ['uglify:part', 'staticHash']);

  gulp.watch([dir.dest + '**/*.html'], ['refresh']);
});

// 全部重新发布任务
gulp.task('publish', ['sass:main', 'uglify:main', 'uglify:part', 'staticHash', 'refresh']);