const { override, addDevServerEntrypoints } = require("customize-cra");

module.exports = {
    devServer: override(
    addDevServerEntrypoints(),
    (config) => {
      config.allowedHosts = "all";
      return config;
    }
  ),
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      
      // Override allowedHosts to allow external access (e.g., via tunnel or container)
      // This ensures the dev server receives a valid allowedHosts configuration.
      config.allowedHosts = 'all';
      
      return config;
    };
  },
};
