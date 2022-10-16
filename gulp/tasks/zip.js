// Core
import gulp from "gulp";
import del from "del";
import zipPlugin from "gulp-zip";

// Other
import { path } from "../config/path.js";
import { plugins } from "../config/plugins.js";

export const zip = () => {
  del(`${path.rootFolder}.zip`);
  return gulp
    .src(`${path.buildFolder}/**/*`, {})
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: "ZIP",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(zipPlugin(`${path.rootFolder}.zip`))
    .pipe(gulp.dest("./"));
};
