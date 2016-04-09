var gulp = require('gulp'),
sass = require('gulp-ruby-sass'),//编译Sass
autoprefixer = require('gulp-autoprefixer'),//加兼容后缀 比如背景透明样式可以将单一版本样式转换为多个浏览器版本的样式
minifycss = require('gulp-minify-css'),//压缩CSS
//jshint = require('gulp-jshint'),//js代码校验
uglify = require('gulp-uglify'),//压缩js代码
rename = require('gulp-rename'),//把处理好的文件存放到指定的位置之前,我们可以先去重新命名一下它
clean = require('gulp-clean'),//项目完成可以删除一些多余的文件
concat = require('gulp-concat'),//合并js文件
notify = require('gulp-notify'),//更动通知
cache = require('gulp-cache'),//图片缓存，只有图片替换了才压缩
livereload = require('gulp-livereload'),//自动刷新页面
react = require('gulp-react'),
rev = require('gulp-rev'),//添加MD5后缀
replace = require('gulp-replace'),
usemin = require('gulp-usemin');//通过注释来合并文件并写入新路径

gulp.task('apphtml',function(){
return gulp.src(['App.html'])
.pipe(usemin({css:[minifycss()]}))
.pipe(gulp.dest('build'))//输出到文件夹
.pipe(notify({ message: 'Css 合并完成' }));
});

// 脚本
gulp.task('scripts', function() {
return gulp.src('views/*.js')
.pipe(gulp.dest('build/views'))
.pipe(rename({ suffix: '.min' }))
.pipe(uglify())
.pipe(rev())//添加MD5后缀
.pipe(gulp.dest('build/views'))
.pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('models', function() {
return gulp.src('models/*.js')
.pipe(uglify())
.pipe(gulp.dest('build/models'))
.pipe(notify({ message: 'models task complete' }));
});

gulp.task('router', function() {
return gulp.src('router/*.js')
.pipe(uglify())
.pipe(gulp.dest('build/router'))
.pipe(notify({ message: 'router task complete' }));
});

gulp.task('ui', function() {
return gulp.src('ui/*.js')
.pipe(uglify())
.pipe(gulp.dest('build/ui'))
.pipe(notify({ message: 'ui task complete' }));
});

gulp.task('component',function(){
return gulp.src([
'component/UcComponent.jsx'
,'component/RankComponent.jsx'
,'component/IndexComponent.jsx'
,'component/HeaderComponent.jsx'
,'component/DetailComponent.jsx'
,'component/CategoryComponent.jsx'
,'component/ButtonListComponent.jsx'
,'component/BookListComponent.jsx'
,'component/BookItemComponent.jsx'
])
.pipe(react())
.pipe(gulp.dest('build/component'))
.pipe(notify({ message: 'component task complete' }));
});

gulp.task('clean', function() {
return gulp.src(['build'], {read: false})
.pipe(clean());
});

gulp.task('default', ['clean'], function() {
gulp.start(['scripts','apphtml','component','models','router','ui']);
});




