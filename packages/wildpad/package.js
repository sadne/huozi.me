Package.describe({
	name: 'started:wildpad',
	version: '0.0.1',
	summary: 'Wildpad',
	git: ''
});


Package.onUse(function(api) {
  api.use(['started:wilddog']);

  api.addFiles([
    'lib/utils.js',
    'lib/span.js',
    'lib/text-op.js',
    'lib/text-operation.js',
    'lib/annotation-list.js',
    'lib/cursor.js',
    'lib/wilddog-adapter.js',
    'lib/rich-text-toolbar.js',
    'lib/wrapped-operation.js',
    'lib/undo-manager.js',
    'lib/client.js',
    'lib/editor-client.js',
    'lib/ace-adapter.js',
    'lib/constants.js',
    'lib/entity-manager.js',
    'lib/entity.js',
    'lib/rich-text-codemirror.js',
    'lib/rich-text-codemirror-adapter.js',
    'lib/formatting.js',
    'lib/text.js',
    'lib/line-formatting.js',
    'lib/line.js',
    'lib/parse-html.js',
    'lib/serialize-html.js',
    'lib/text-pieces-to-inserts.js',
    'lib/headless.js',
    'lib/wildpad.js'
  ], 'client');

  api.export('wildpad', 'client');
});
