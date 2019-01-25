var gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	browserSync  = require('browser-sync').create(),
	plumber      = require('gulp-plumber'),
	sourcemaps   = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),  
	notify       = require('gulp-notify');


gulp.task('sass', function(){
	return gulp.src('./src/sass/main.scss')
			.pipe(plumber({
				errorHandler: notify.onError( function(err){
					return {
						title: 'Styles',
						message: err.message
					}
				})
			}))
			.pipe(sourcemaps.init())
			.pipe(sass())
			.pipe(autoprefixer({
				browsers: ['last 3 versions'],
				cascade: false
			}))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('./src/css'))
			.pipe(browserSync.stream());
});

gulp.task('server', function() {
	browserSync.init({
		server: {baseDir: './src/'}
	});
	gulp.watch('src/**/*.html').on('change', browserSync.reload);
	gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
	gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
	//gulp.watch('src/css/**/*.css').on('change', browserSync.reload);
});


gulp.task('default', gulp.series('server'));