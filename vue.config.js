module.exports = {
  transpileDependencies: true,

  configureWebpack: {
    resolve: {
      alias: {
        // 内置：'@': 'src'
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'router': '@/router',
        'store': '@/store',
        'views': '@/views',
        'api': '@/../public/api',
      }
    }
  },

  devServer: {
    host: 'localhost',
    open: {
      app: {
        name: 'chrome',
        // arguments: ['--incognito'],
      }
    }
  },
}
