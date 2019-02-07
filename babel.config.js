module.exports = {
  "presets": [
    [
      "@babel/preset-env", {
        "targets": {
          "browsers": ["defaults"]
          // "browsers": ["last 2 versions", "safari >= 7"]
        },
        "modules": false
      }
    ]
  ]
}
