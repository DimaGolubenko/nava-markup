// Core
import gulp from "gulp";
import vinylFTP from "vinyl-ftp";
import util from "gulp-util";

// Other
import { configFTP } from "../config/ftp.js";
import { path } from "../config/path.js";
import { plugins } from "../config/plugins.js";

export const ftp = () => {
  configFTP.log = util.log;
  const ftpConnect = vinylFTP.create(configFTP);
  return gulp.src(`${path.buildFolder}/**/*`, {}).pipe(
    plugins
      .plumber(
        plugins.notify.onError({
          title: "FTP",
          message: "Error <%= error.message %>",
        })
      )
      .pipe(ftpConnect.dest(`${path.ftp}/${path.rootFolder}`))
  );
};
