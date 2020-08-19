import { defineConfig } from 'umi';
import themeConfig from './src/theme/theme';
import layoutRoutes from './src/router';

const extractCssLoaderOptions = {
  hmr: true,
  publicPath: '../'
};
export default defineConfig({
  hash: true,
  theme: themeConfig,
  nodeModulesTransform: {
    type: 'none',
  },
  define: {
    'process.env.BUILD_ENV': process.env.NODE_ENV === 'development' ? 'dev' : null,
  },
  title: (process.env.NODE_ENV === 'development' ? 'dev---' : '') + '北保',
  routes: layoutRoutes.routes,
  devServer: {
    port: 10086,
    proxy: {
      '/api': {
        target: 'http://47.110.145.5:8082',
        changeOrigin: true,
        // pathRewrite: { '^/api/supervise/': '/' },
      },
    }
  },
  cssModulesTypescriptLoader: {},
  // ssr: { mode: 'stream', },
    chainWebpack: (conf: any) => {
    conf.output.store.set('filename', 'js/[name].js');
    conf.output.store.set('chunkFilename', 'js/[name].[contenthash:8].async.js');
    conf.plugins.store.get('extract-css').set('args', [
      {
        filename: 'css/[name].css',
        chunkFilename: 'css/[name].[hash].css',
        ignoreOrder: true
      }
    ]);
    conf.module.rule('images').uses.store.get('url-loader').set('options', {
      limit: 10000,
      name: '[name].[hash].[ext]',
      outputPath: './img/',
      esModule: false,
    });
    conf.module.rule('less').oneOfs.store.get('css').uses.store
      .get('extract-css-loader').set('options', extractCssLoaderOptions);
    conf.module.rule('less').oneOfs.store.get('css-modules').uses.store
      .get('extract-css-loader').set('options', extractCssLoaderOptions);

    conf.module.rule('css').oneOfs.store.get('css').uses.store
      .get('extract-css-loader').set('options', extractCssLoaderOptions);
      conf.module.rule('css').oneOfs.store.get('css-modules').uses.store
      .get('extract-css-loader').set('options', extractCssLoaderOptions);
    return conf;
  },
});
