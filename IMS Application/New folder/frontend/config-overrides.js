const { override } = require("customize-cra");

module.exports = {
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      
      // Override allowedHosts to allow external access (e.g., via tunnel or container)
      config.allowedHosts = 'all';
      
      return config;
    };
  },
};
