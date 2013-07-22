var fs = require('fs');

module.exports = function(ptor, module, scriptfile) {
	var script = fs.readFileSync(scriptfile).toString();

	ptor.addMockModule(module, script);
}
