var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var imageResize = require('gulp-image-resize');
var imagemin = require('gulp-imagemin');
var inlinesource = require('gulp-inline-source');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');


gulp.task('deploy', function(){
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

// Optimization for index.html

// Usage: Delete everything in ./dist and run 'gulp optimize-index'
gulp.task('optimize-index', ['index-pizzeria', 'index-images', 'index-html']);

gulp.task('index-pizzeria', function(){
	return gulp.src('./source/views/images/pizzeria.jpg')
    	.pipe(imageResize({ 
      		width: 100,
      		height: 60,
      		crop: true,
      		upscale: false,
      		imageMagick: true
    	}))
    	.pipe(imagemin({ optimizationLevel: 7, progressive: true }))
      .pipe(rename({ suffix: '-100' }))
    	.pipe(gulp.dest('./dist/views/images'));
});

gulp.task('index-images', function(){
	return gulp.src('./source/img/**/*')
    	.pipe(imagemin({ optimizationLevel: 7, progressive: true }))
    	.pipe(gulp.dest('./dist/img'));
});

gulp.task('index-inline', function (){
    return gulp.src('./source/index.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('./source'));
});

gulp.task('index-html', ['index-inline'], function(){
	return gulp.src('./source/index.html')
    	.pipe(htmlmin({
    		collapseWhitespace: true,
    		removeComments: true,
    		minifyJS: true,
    		minifyCSS: true
    	}))
    	.pipe(gulp.dest('dist'))
});


// Optimization for pizza.html

gulp.task('pizzeria-images', function(){
  return gulp.src('./source/views/images/**/*')
      .pipe(imagemin({ optimizationLevel: 7, progressive: true }))
      .pipe(gulp.dest('./dist/views/images'));
});
