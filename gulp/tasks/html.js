// Core
import gulp from "gulp";
import fileInclude from "gulp-file-include";
import webpHtmlNoSvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";

// Other
import { plugins } from "../config/plugins.js";
import { path } from "../config/path.js";
import { isProduction } from "../config/utils.js";

export const html = () => {
  return gulp
    .src(path.src.html)
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: "HTML",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(fileInclude())
    .pipe(plugins.replace(/@images\//g, "images/"))
    .pipe(plugins.if(isProduction, webpHtmlNoSvg()))
    .pipe(
      plugins.if(
        isProduction,
        versionNumber({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/version.json",
          },
        })
      )
    )
    .pipe(gulp.dest(path.build.html))
    .pipe(plugins.browserSync.stream());
};
