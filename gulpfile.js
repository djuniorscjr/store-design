const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open'); 
const concat = require('gulp-concat');

const config = {
    port: 3000,
    url: 'http://localhost',
    paths: {
        html: './src/*.html',
        css: [
                'bower_components/bootstrap/dist/css/bootstrap.css',
                './src/css/*.css'
        ],
        js: 'bower_components/bootstrap/dist/js/bootstrap.min.js',
        font: 'bower_components/bootstrap/dist/fonts/*',
        dist: './dist'
    }
};

// Start a local development server

gulp.task('connect', () => {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.url,
        livereload: true
    });
});

gulp.task('open', ['connect'], () => {
    gulp.src('dist/index.html')
        .pipe(open({uri: config.url + ':' + config.port + '/'}));
});

gulp.task('html', () => {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('font', () => {
    gulp.src(config.paths.font)
        .pipe(gulp.dest(config.paths.dist + '/fonts'))
        .pipe(connect.reload());
});

gulp.task('css', () => {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('js', () => {
    gulp.src(config.paths.js)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/js'));
});

gulp.task('watch', () => {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.css, ['css']);
    gulp.watch(config.paths.js, ['js']);
});

gulp.task('default', ['html', 'font', 'css', 'js', 'open', 'watch']);