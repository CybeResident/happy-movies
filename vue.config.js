module.exports = {
  transpileDependencies: true,

  productionSourceMap: false,

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

  css: {
    loaderOptions: {
      css: {
        esModule: false,
      },
      postcss: {
        postcssOptions: {
          plugins: [
            [
              'postcss-preset-env',
            ],
          ]
        }
      },
      sass: {
        sassOptions: {
          // 不允许传入其他的字符集
          charset: false,
          indentWidth: 2,
          style: 'expanded',
        }
      }
    }
  },

  devServer: {
    host: '127.0.0.1',
    open: {
      app: {
        name: 'chrome',
        // arguments: ['--incognito'],
      }
    }
  },
}
