// An example configuration file.
exports.config = {
  // The address of a running selenium server. If this is specified,
  // seleniumServerJar and seleniumPort will be ignored.
  seleniumAddress: 'http://localhost:4444/wd/hub',
  
  //seleniumServerJar: 'test/selenium/selenium-server-standalone-2.33.0.jar',
  //seleniumArgs: '-Dwebdriver.chrome.driver=test/selenium/chromedriver.exe',

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:3000',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    // Spec folders are relative to the current working directly when
    // protractor is called. This can be folders or files.
    specFolders: ['test/e2e'],    
    isVerbose: false,
    showColors: true,
    includeStackTrace: false,
	junitreport: {
		report: true,
		savePath : 'test/out',
		useDotNotation: true,
		consolidate: true
	}
  }
};
