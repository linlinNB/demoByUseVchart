import ComponentsPlugin from 'unplugin-vue-components/webpack'

/**
 * 作用: 按需加载nat-ui，自动注册组件resolver，不需要手动import
 * @returns {(function(*): ({name: *, from: string, sideEffects: string}|undefined))|*}
 * @constructor
 */
const NutUIResolver = () => {
  return (name) => {
    if (name.startsWith('Nut')) {
      const partialName = name.slice(3)
      return {
        name: partialName,
        from: '@nutui/nutui-taro',
        sideEffects: `@nutui/nutui-taro/dist/packages/${partialName.toLowerCase()}/style`,
      }
    }
  }
}

const config = {
  projectName: 'techInsuranceToolfrontend',
  date: '2024-2-23',
  // designWidth: 750,
  // deviceRatio: {
  //   640: 2.34 / 2,
  //   750: 1,
  //   828: 1.81 / 2
  // },
  // 配置 NutUI 375 尺寸
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-html'],
  miniCssExtractPluginOptions: {
    ignoreOrder: true,
  },
  // 配置全局 Scss 变量
  sass: {
    data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`,
  },
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'vue3',
  compiler: 'webpack5',
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    // addChunkPages(pages, pagesNames) {
    //   pages.set('compareProductModule/pages/compareInsurance/index', [config.isBuildPlugin ? 'plugin/myVChart' : 'myVChart'])
    // },
    optimizeMainPackage: {
      enable: true,
    },
    // commonChunks(commonChunks) {
    //   // commonChunks 的取值即为默认的公共文件名数组
    //   commonChunks.push(config.isBuildPlugin ? 'plugin/myVChart' : 'myVChart')
    //   return commonChunks
    // },
    webpackChain (chain) {
      const taroBaseReg = /@tarojs[\\/][a-z]+/;
      // 配置京东按需加载
      chain.plugin('unplugin-vue-components').use(
        ComponentsPlugin({
          resolvers: [NutUIResolver()],
        })
      )
      // 准备抽取vchart的配置文件
      chain.merge({
        optimization: {
          runtimeChunk: {
            name: config.isBuildPlugin ? 'plugin/runtime' : 'runtime'
          },
          splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
              common: {
                name: config.isBuildPlugin ? 'plugin/common' : 'common',
                minChunks: 2,
                priority: 1
              },
              // 抽取vchart部分
              myVChart: {
                name: config.isBuildPlugin ? 'plugin/myVChart' : 'myVChart',
                minChunks: 2,
                test: module => {
                  return /[\\/]@visactor[\\/]/.test(module.resource)
                },
                priority: 10
              },
              vendors: {
                name: config.isBuildPlugin ? 'plugin/vendors' : 'vendors',
                minChunks: 2,
                maxSize: 2000000,
                test: module => {
                  return /[\\/]node_modules[\\/]/.test(module.resource) && !/[\\/]@visactor[\\/]/.test(module.resource)
                },
                priority: 10
              },
              taro: {
                name: config.isBuildPlugin ? 'plugin/taro' : 'taro',
                test: module => {
                  return taroBaseReg.test(module.context)
                },
                priority: 100
              }
            }
          }
        }
      })
      chain.merge({
        module: {
          rule: {
            mjsScript: {
              test: /\.mjs$/,
              include: [/pinia/],
              use: {
                babelLoader: {
                  loader: require.resolve('babel-loader')
                }
              }
            },
          }
        }
      })
    },
    miniCssExtractPluginOptions: {
      ignoreOrder: true,
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
