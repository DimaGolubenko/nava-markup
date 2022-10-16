export const isProduction = process.argv.includes("--build");
export const isDevelopment = !process.argv.includes("--build");
