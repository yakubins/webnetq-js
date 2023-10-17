const fs = require('fs');

class WebModuleConfigPlugin {
  constructor(options) {
    this.validateOptions(options);

    this.options = options;
  }

  validateOptions(options) {
    if (!options || !options.outputPath) {
      const msg = `Please specify an outputPath.`;
      throw new Error(msg);
    }
  }

  apply(compiler) {
    const { outputPath, fileName = 'config.json' } = this.options;

    compiler.hooks.done.tap('Web Module Config', stats => {
      const assetsManifest = [];
      const { assets } = stats.compilation;

      Object.keys(assets).map(name => {
        let size = assets[name]['_cachedSize'] / 1000;

        if (!isNaN(size)) {
          size = Math.round(size) + ' KB';
          assetsManifest.push({ name, size });
        }
      });

      try {
        let filePath = outputPath + '/' + fileName;

        fs.writeFileSync(filePath, JSON.stringify(assetsManifest, null, 4));

        console.log('Manifest generated');
      } catch (error) {
        console.log(error.message);
      }
    });
  }
}

module.exports = WebModuleConfigPlugin;
