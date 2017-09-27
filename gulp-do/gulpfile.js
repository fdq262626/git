var gulp=require("gulp");
var less=require("gulp-less");
var cssmin=require("gulp-cssmin");
var concat=require("gulp-concat");
var uglify=require("gulp-uglify");
var clean=require("gulp-clean");
var browserSync=require("browser-sync").create();





gulp.task("html",function(){
	gulp.src("*.html")
	.pipe(gulp.dest("dist/"))
	.pipe(browserSync.stream());

});


gulp.task("less",function(){
	gulp.src("src/less/*.less")
	.pipe(less())//编译
	// .pipe(cssnano())//压缩
	.pipe(cssmin())
	.pipe(gulp.dest("dist/css"))
	.pipe(browserSync.stream());
});

gulp.task("js",function(){
	gulp.src("src/js/*.js")
	.pipe(concat("all.js"))//合并
	// .pipe(uglify())//压缩混淆
	.pipe(gulp.dest("dist/js"))
	.pipe(browserSync.stream());

});

gulp.task("clean",function(){
	gulp.src("dist")
	.pipe(clean())
	.pipe(browserSync.stream());

});

gulp.task("dist",["less","js","html"])

gulp.task("watch",function(){
	//监视src目录下所有的html文件，当发生变化时自动执行html任务
	gulp.watch("*.html",["html"]);
	gulp.watch("src/less/*.less",["less"]);
	gulp.watch("src/js/*.js",["js"]);

});


gulp.task("default",["html","js","less","watch"],function(){
	browserSync.init({
		server:{
			baseDir:"dist"
		},
		port:2017
	});
});











