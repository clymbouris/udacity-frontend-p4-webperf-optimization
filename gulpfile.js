var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var imageResize = require('gulp-image-resize');
var imagemin = require('gulp-imagemin');
var inlinesource = require('gulp-inline-source');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var jshint = require('gulp-jshint');


gulp.task('deploy', function(){
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

// Usage to build ./dist from scrach. Delete ./dist and run gulp optimize

gulp.task('optimize', ['optimize-index', 'optimize-pizzas']);

// Optimization for index.html

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

// Usage: Delete everything in ./dist/views and run 'gulp optimize-pizzas'
gulp.task('optimize-pizzas', ['pizzeria-js', 'pizzeria-html', 'pizzeria-css', 'pizzeria-images']);

gulp.task('pizzeria-resize', function(){
	return gulp.src('./source/views/images/pizzeria.jpg')
    	.pipe(imageResize({ 
      		width: 360,
      		height: 270,
      		crop: true,
      		upscale: false,
      		imageMagick: true
    	}))
    	.pipe(gulp.dest('./source/views/images'));
});

gulp.task('pizzeria-images', ['pizzeria-resize'], function(){
  return gulp.src('./source/views/images/*')
      .pipe(imagemin({ optimizationLevel: 7, progressive: true }))
      .pipe(gulp.dest('./dist/views/images'));
});

// JavaScript minification
// JavaScript linter
gulp.task('jslint', function(){
	return gulp.src('./source/views/js/**/*')
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(jshint.reporter('fail'));
});
// only run if linter has no errors
gulp.task('pizzeria-js', ['jslint'], function(){
	return gulp.src('./source/views/js/**/*')
	.pipe(uglify())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('./dist/views/js'));
});

// HTML minification
gulp.task('pizzeria-html', function(){
	return gulp.src('./source/views/pizza.html')
    	.pipe(htmlmin({
    		collapseWhitespace: true,
    		removeComments: true
    	}))
    	.pipe(gulp.dest('dist/views'))
});

// CSS minification
gulp.task('pizzeria-css', function(){
	return gulp.src('./source/views/css/**/*')
    	.pipe(rename({ suffix: '.min'}))
    	.pipe(minifyCSS())
    	.pipe(gulp.dest('./dist/views/css'));
})