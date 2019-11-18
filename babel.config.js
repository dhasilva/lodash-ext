module.exports = {
  exclude: ['node_modules/**'],
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          ios: '9',
          ie: '11',
          chrome: '58'
        },

        useBuiltIns: 'usage',
        corejs: 3
      }
    ]
  ]
}
