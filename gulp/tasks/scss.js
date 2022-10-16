// Core
import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import webpCss from "gulp-webpcss";
import autoPrefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

// Other
import { path } from "../config/path.js";
import { plugins } from "../config/plugins.js";
import { isDevelopment, isProduction } from "../config/utils.js";

const sass = gulpSass(dartSass);

export const scss = () => {
  return gulp
    .src(path.src.scss, { sourcemaps: isDevelopment })
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: "SCSS",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(plugins.replace(/@images\//g, "../images/"))
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(plugins.if(isProduction, groupCssMediaQueries()))
    .pipe(
      plugins.if(
        isProduction,
        webpCss({
          webpClass: ".webp",
          noWebpClass: ".no-webp",
        })
      )
    )
    .pipe(
      plugins.if(
        isProduction,
        autoPrefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: true,
        })
      )
    )
    .pipe(gulp.dest(path.build.css))
    .pipe(plugins.if(isProduction, cleanCss()))
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(gulp.dest(path.build.css))
    .pipe(plugins.browserSync.stream());
};
