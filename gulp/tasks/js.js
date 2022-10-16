// Core
import gulp from "gulp";
import webpack from "webpack-stream";

// Other
import { path } from "../config/path.js";
import { plugins } from "../config/plugins.js";
import { isDevelopment } from "../config/utils.js";

export const js = () => {
  return gulp
    .src(path.src.js, { sourcemaps: isDevelopment })
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: "JS",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(
      webpack({
        mode: isDevelopment ? "development" : "production",
        output: {
          filename: "app.min.js",
        },
      })
    )
    .pipe(gulp.dest(path.build.js))
    .pipe(plugins.browserSync.stream());
};
