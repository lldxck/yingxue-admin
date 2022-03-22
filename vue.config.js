const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        components: "@/components",
        constants: "@/constants",
        router: "@/router",
        services: "@/services",
        store: "@/store",
        utils: "@/utils",
        views: "@/views",
      },
    },
  },
});
