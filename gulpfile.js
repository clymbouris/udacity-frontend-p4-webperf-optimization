var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

var imageResize = require('gulp-image-resize');
var imagemin = require('gulp-imagemin');

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

// Optimization for index.html

gulp.task('optimize-images', ['pizzeria', 'img']);

gulp.task('pizzeria', function(){
	return gulp.src('./src/views/images/pizzeria.jpg')
    	.pipe(imageResize({ 
      		width: 100,
      		height: 60,
      		crop: true,
      		upscale: false,
      		imageMagick: true
    	}))
    	.pipe(imagemin({ optimizationLevel: 7, progressive: true }))
    	.pipe(gulp.dest('./dist/views/images'));
});

gulp.task('img', function(){
	return gulp.src('./src/img/**/*')
    	.pipe(imagemin({ optimizationLevel: 7, progressive: true }))
    	.pipe(gulp.dest('./dist/img'));
});