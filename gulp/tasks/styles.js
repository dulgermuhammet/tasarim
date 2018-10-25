const gulp = require('gulp'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      cssvars = require('postcss-simple-vars'),
      nested = require('postcss-nested'),
      cssImport = require('postcss-import'),
      mixins = require('postcss-mixins'),
      hexrgba = require('postcss-hexrgba'),
      pxtorem = require('postcss-pxtorem'),
      cssDeclarationSorter = require('css-declaration-sorter');

gulp.task('styles', function() {
   
  var processors = [
    mixins,
    cssImport,
    cssvars,
    nested,
    hexrgba,
    autoprefixer({
      browsers: 'last 1 version'
    }),
    pxtorem({
      replace: false,
      propList: ['*']
    }),
    cssDeclarationSorter({order: 'smacss'})
  ];
  return gulp.src('./app/assets/styles/style.css')
    .pipe(postcss(processors))
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
});
