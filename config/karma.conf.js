basePath = '../';

files = [
  MOCHA,
  MOCHA_ADAPTER,
  'node_modules/chai/chai.js',
  'node_modules/sinon/lib/sinon.js',
  'node_modules/sinon/lib/sinon/assert.js',
  'node_modules/sinon/lib/sinon/collection.js',
  'node_modules/sinon/lib/sinon/match.js',
  'node_modules/sinon/lib/sinon/spy.js',
  'node_modules/sinon/lib/sinon/stub.js',
  'node_modules/sinon-chai/lib/sinon-chai.js',
  'node_modules/underscore/underscore.js',
  'content/shared/public/js/lib/angular/angular.js',
  'content/shared/public/angular-ui-bootstrap/ui-bootstrap-tpls-0.2.0.js',
  //'content/shared/public/js/lib/angular/angular-*.js',
  'test/lib/angular/angular-mocks.js',
  //'content/shared/public/js/lib/*.js',
  'content/mobile/public/js/app.js',
  'content/mobile/public/js/services/*.js',
  'content/mobile/public/js/filters/*.js',
  'content/mobile/public/js/directives/*.js',
  'content/mobile/public/js/controllers/*.js',
  'test/mocks/*.js',
  'test/unit/client/**/*.js'
];

autoWatch = false;
singleRun = true;

browsers = ['Chrome'];

reporters=['junit'];
junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
