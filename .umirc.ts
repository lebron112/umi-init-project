import { defineConfig } from 'umi';
import themeConfig from './src/theme/theme';
import layoutRoutes from './src/router';

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
});
