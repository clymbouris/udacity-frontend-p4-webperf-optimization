# Udacity Project 4: Website Optimization
Part of the Front-End Web Developer nanodegree from Udacity. The project utilizes concepts learned from [Website Performance Optimization](https://www.udacity.com/course/viewer#!/c-ud884-nd) and [Browser Rendering Optimization](https://www.udacity.com/course/viewer#!/c-ud860-nd).


##Usage

Generated ./dist folder is hosted @ http://d3moid.github.io/frontend-webperf/

##Optimizations
###Portfolio page

1. Resize pizzeria.jpg using <a href="https://www.npmjs.com/package/gulp-image-resize">gulp-image-resize</a>.
2. Optimize images using <a href="https://www.npmjs.com/package/gulp-imagemin">gulp-imagemin</a> (ImageMagick).
3. Remove print.css from CRP by adding media="print".
4. Inline style.css to index.html using <a href="https://www.npmjs.com/package/gulp-inline-source">gulp-inline-source</a>.
5. Remove scripts from CRP by adding them to the bottom of index.html and running them async.
6. Inline perfmatters.js using <a href="https://www.npmjs.com/package/gulp-inline-source">gulp-inline-source</a>.
7. Minify HTML/CSS/JS in index.html using <a href="https://github.com/jonschlinkert/gulp-htmlmin">gulp-htmlmin</a> (remove comments and whitespace).
8. Replace 'Open Sans' font with sans serif.

###Pizzeria page

1. Replace querySelectAll with more specific selectors like getElemetById and getElementByClassName. (https://github.com/jquery/standards/issues/4)
2. Cache/calculate randomPizzaContainer, dx, newwidth, pizzasDiv, items and part of phase outside of loops.
3. Render just 20 pizzas on screen instead of 200 (only 20 are visible at any time).
4. Calculate loop lengths only once (minor improvement).

##Gulp plugins

1. Image Optimizations: gulp-image-resize, gulp-imagemin
2. JavaScript Optimizations: gulp-uglify
3. CSS optimizations: gulp-minify-css
4. HTML optimizations: gulp-htmlmin, gulp-inline-source
5. Other: gulp-gh-pages (to deploy just ./dist folder), gulp-rename (for renaming with suffix), gulp-jshint (to lint JS code)

##Preview
![PageSpeed Insights Score](http://snag.gy/ijLge.jpg)
