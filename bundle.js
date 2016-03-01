var path = require('path');
var tl = require('vso-task-lib');

var bundle = new tl.ToolRunner(tl.which('bundle', true));
var binstubs = tl.getInput('createBinstubs', false);

bundle.arg('install --deployment');
var path = tl.getInput('path', false);

if (path) {
    bundle.arg('--path=' + path)
}

if (binstubs) {
    bundle.arg('--binstubs=bin')
}

bundle.exec({ failOnStdErr: false})
.then(function(code) {
    tl.exit(code);
})
.fail(function(err) {
    console.error(err.message);
    tl.debug('taskRunner fail');
    tl.exit(1);
})
