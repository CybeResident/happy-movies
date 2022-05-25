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
        'views': '@/views',
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
