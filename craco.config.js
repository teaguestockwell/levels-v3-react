const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': '#08D290',
              '@border-radius-base': '10px'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};