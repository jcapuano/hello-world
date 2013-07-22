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
  'content/shared/public/angular/angular.js',
  'content/shared/public/angular-ui-bootstrap/ui-bootstrap-tpls-0.2.0.js',
  //'content/shared/public/js/lib/angular/angular-*.js',
  'test/lib/angular/angular-mocks.js',
  //'content/shared/public/js/lib/*.js',
  'content/web/public/js/app.js',
  'content/web/public/js/services/*.js',
  'content/web/public/js/filters/*.js',
  'content/web/public/js/directives/*.js',
  'content/web/public/js/controllers/*.js',
  'test/mocks/CaiServicesMock.js',
  'test/mocks/mockServiceData.js',
  'test/unit/client/**/*.js'
];

autoWatch = true;
singleRun = false;

browsers = ['Chrome'];

//reporters=['junit'];
junitReporter = {
  outputFile: 'test/out/unit.xml',
  suite: 'unit'
};
