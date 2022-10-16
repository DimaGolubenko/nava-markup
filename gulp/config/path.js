import * as nodePath from "path";

const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = "./dist";
const srcFolder = "./src";

export const path = {
  build: {
    html: `${buildFolder}/`,
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/images/`,
    css: `${buildFolder}/css/`,
    fonts: `${buildFolder}/fonts/`,
  },
  src: {
    html: `${srcFolder}/*.html`,
    js: `${srcFolder}/js/app.js`,
    svg: `${srcFolder}/images/**/*.{svg}`,
    scss: `${srcFolder}/scss/styles.scss`,
    fonts: `${srcFolder}/fonts/**/*.*`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    fonts: `${srcFolder}/fonts/**/*.*`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
  },
  clean: buildFolder,
  buildFolder,
  srcFolder,
  rootFolder,
  ftp: `markup`,
};
