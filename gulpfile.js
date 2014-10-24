var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    minifyCSS = require('gulp-minify-css'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    stripDebug = require('gulp-strip-debug'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    changed = require('gulp-changed'),
    gzip = require('gulp-gzip'),
    browserSync = require('browser-sync'),
    cp = require('child_process'),
    runSequence = require('run-sequence');
    
var paths = {
  imagesSrc: ['_img/**/*'],
  imagesDest: 'img',
  sass: '_scss/style.scss',
  sassFiles: '_scss/**/*.scss',
  css: '_site/css/',
  scripts: ['js/*.js', '!js/slick-entities.js', '!js/jquery-1.11.1.js'],
  jekyll: ['**/*.html', '**/*.md', '!_site/**/*.html', '!node_modules/**/*'],
};

// Compile Our Sass
gulp.task('sass', function() {
  browserSync.notify('<span style="color: grey">Running:</span> Sass compiling');
  return gulp.src(paths.sass)
    .pipe(sass({
      sourcemap: false,
      bundleExec: true,
      compass: true,
      loadPath: [
        'bower_components/singularity/stylesheets',
        'bower_components/breakpoint-sass/stylesheets',
        'bower_components/compass-breakpoint/stylesheets',
        'bower_components/sass-toolkit/stylesheets',
      ]
    }))
    .pipe(prefix("last 2 versions", "> 1%"))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('images', function() {
  return gulp.src(paths.imagesSrc)
    // Only grab the images that have changed.
    .pipe(changed(paths.imagesDest))
    // Optimize all the images.
    .pipe(imagemin({optimizationLevel: 5}))
    // Put them in the images directory.
    .pipe(gulp.dest(paths.imagesDest));
});


// Our 'build' tasks for jekyll server.
gulp.task('jekyll-build', function (done) {
  return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
    .on('close', done);
});

// Lint Task
gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Our 'dev' tasks for jekyll server, note: it builds the files, but uses extra configuration.
gulp.task('jekyll-dev', function (done) {
  browserSync.notify('<span style="color: grey">Running:</span> $ jekyll build');
  return cp.spawn('bundle', ['exec', 'jekyll', 'build', '--config=_config.yml,_config.dev.yml'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('jekyll-rebuild', function() {
  return runSequence(['jekyll-dev'], function () {
      browserSync.reload();
  });
});

gulp.task('deploy', function(cb) {
  return runSequence(
    'build',
    'gh-pages',
    cb
  );
});

gulp.task('gh-pages', function () {
  gulp.src("./_site/**/*")
    .pipe(deploy({
      cacheDir: '.tmp'
    })).pipe(gulp.dest('/tmp/gh-pages'));
});


// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint', 'jekyll-rebuild']);
  gulp.watch(paths.sassFiles, ['sass']);
  gulp.watch(paths.imagesSrc, function() {
    runSequence(['images'], ['jekyll-dev'])
  });
  gulp.watch(paths.jekyll, ['jekyll-rebuild']);
});


//////////////////////////////
// BrowserSync Task
//////////////////////////////
gulp.task('browserSync', function () {
  browserSync.init([
    '_site/' + paths +  '/*.css',
    '_site/' + paths +  '/*.js',
    '_site/**/*.html',
  ], {
    server: {
      baseDir: '_site'
    },
    host: "localhost"
  });
});

// Build Task
gulp.task('build', function() {
  runSequence(['lint', 'sass',],
    'jekyll-build'
  );
});

gulp.task('default', ['build']);

gulp.task('server', function() {
  runSequence(['lint', 'images', 'sass'],
    'jekyll-dev',
    ['browserSync', 'watch']
  );
});

gulp.task('serve', ['server']);
