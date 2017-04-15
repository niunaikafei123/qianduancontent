var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    wrap = require('gulp-wrap'),
    runSequence = require('run-sequence');

var paths = {
	index: [
		'src/index.html'
	],
    img: [
        'src/img/*'
    ],
    css: [
        'src/css/*'
    ],
    js: [
        'src/js/**/*.js'
    ],
    tpl: [
        'src/tpl/**/*'
    ],
    fonts: [
        'src/fonts/*'
    ],
    lib: {
        js: [
            'bower_components/angular/angular.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/echarts/build/dist/echarts-all.js',
            'bower_components/angular-echarts/dist/angular-echarts.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular-bootstrap/ui-bootstrap.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/ngstorage/ngStorage.js',
            'bower_components/ng-file-upload/ng-file-upload-all.js',
            'bower_components/angular-i18n/angular-locale_zh-cn.js'
        ],
        css: []
    }
};

var distPaths = './dist';

function htmllintReporter(filepath, issues) {
    if (issues.length > 0) {
        issues.forEach(function (issue) {
            gutil.log(gutil.colors.cyan('[gulp-htmllint] ') + gutil.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + gutil.colors.red('(' + issue.code + ') ' + issue.msg));
        });
        process.exitCode = 1;
    }
}

gulp.task('clean', function() {
	return require('del')([
		distPaths
	]);
});

gulp.task('lintjs',function() {
    return gulp.src(paths.js)
        .pipe(wrap('(function () {<%= contents %>})();'))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('cplib', function() {
    return gulp.src(paths.lib.js)
        .pipe(gulp.dest(distPaths + '/lib'));
});

gulp.task('cpfonts', function() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(distPaths + '/fonts'));
});

gulp.task('cpindex', function() {
	return gulp.src(paths.index)
		.pipe(gulp.dest(distPaths));
});

gulp.task('cpimg', function() {
    return gulp.src(paths.img)
        .pipe(gulp.dest(distPaths + '/img'));
});

gulp.task('cpcss',function() {
    return gulp.src(paths.css)
        .pipe(concat('app.css'))
        .pipe(gulp.dest(distPaths + '/css'));
});

gulp.task('cpjs',function() {
    return gulp.src(paths.js)
        .pipe(concat('app.js'))
        .pipe(wrap('(function () {\n<%= contents %>})();'))
        .pipe(gulp.dest(distPaths + '/js'));
});

gulp.task('cptpl',function() {
    return gulp.src(paths.tpl)
        .pipe(gulp.dest(distPaths + '/tpl'));
});

gulp.task('connect', function (){
    connect.server({
        root: 'dist', 
        port: 1986,
        livereload: true
    });    
});

gulp.task('reload', function () {
    gulp.src(distPaths + '/*.html')
        .pipe(connect.reload());
});

gulp.task('watch',function() {
    gulp.watch(paths.index, function() {
        runSequence('cpindex','reload');
    });

    gulp.watch(paths.css, function() {
        runSequence('cpcss','reload');
    })

    gulp.watch(paths.js, function() {
        runSequence('lintjs','cpjs','reload');
    });

    gulp.watch(paths.tpl, function() {
        runSequence('cptpl','reload');
    });

    gulp.watch(paths.img, function() {
        runSequence('cpimg','reload');
    });
});

gulp.task('develop',function(done) {
	runSequence(['clean','lintjs'],['cpindex','cplib','cpfonts','cpimg','cpcss','cpjs','cptpl'],'connect','watch',done);
});

gulp.task('build',function(done) {
	runSequence(['clean','lintjs'],['cpindex','cplib','cpfonts','cpimg','cpcss','cpjs','cptpl'], done);
});

gulp.task('default',['develop']);