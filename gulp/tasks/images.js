// Core
import gulp from "gulp";
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

// Other
import { path } from "../config/path.js";
import { plugins } from "../config/plugins.js";
import { isProduction } from "../config/utils.js";

export const images = () => {
  return gulp
    .src(path.src.images)
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: "IMAGES",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(plugins.newer(path.build.images))
    .pipe(plugins.if(isProduction, webp()))
    .pipe(plugins.if(isProduction, gulp.dest(path.build.images)))
    .pipe(plugins.if(isProduction, gulp.src(path.src.images)))
    .pipe(plugins.if(isProduction, plugins.newer(path.build.images)))
    .pipe(
      plugins.if(
        isProduction,
        imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interlaced: true,
          optimizationLevel: 3, // from 0 to 7
        })
      )
    )
    .pipe(gulp.dest(path.build.images))
    .pipe(gulp.src(path.src.svg))
    .pipe(gulp.dest(path.build.images))
    .pipe(plugins.browserSync.stream());
};
