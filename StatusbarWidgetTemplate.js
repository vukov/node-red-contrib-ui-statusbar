//
//	Node-Red Contribution
//
//	see also 
//	https://nodered.org/docs/
//	https://nodered.org/docs/creating-nodes/
//
//	generated 2018-04-20 10:31:38.388
//
module.exports = function(RED) {

	//
	//	see also 
	//	https://nodered.org/docs/
	//	https://nodered.org/docs/creating-nodes/
	//	https://github.com/node-red/node-red/wiki/API-Reference#server-Node-input
	//
	function StatusbarWidgetTemplateNode(config) {
		RED.nodes.createNode(this, config);
		
		var node = this;

		node.name = config.name;

		var sbwUtility = require('./sbwUtility');

		var sbw = {
			Type: config.sbwType,
			Id: config.sbwId,
			Options: config.sbwOptions
		};

		//node.log('created ' + JSON.stringify(sbw));

		// const fs = require('fs')
		// const process = require('process'); 
		// // this need the full path when deplyoing
		// var cwd = process.cwd();

		// var singeltonFilename = 'nrStatusBarSingelton_0.4.html'; 

		//node.log("nrStatusBarSingelton cwd is:\"" + cwd + "\"");

		// in testing mode
		// try {
		// 	if (fs.existsSync(cwd + '/include/' + singeltonFilename)) {
		// 		filepath = cwd;
		// 	} else if (fs.existsSync(cwd + '/.node-red/node_modules/include/' + singeltonFilename)) {
		// 		filepath = cwd + '/.node-red/node_modules';
		// 	}
		// } catch(err) {
		// 	console.error(err)
		// 	node.error("nrStatusBarSingelton file nof found:\"" + cwd + "\"");
		// }

		// may be there is a better way to include the scripts
		const data = "<script id=\"sbManager\" type=\"text/javascript\" src=\"ui_statusbarwidget/js/sbManager.js\"></script>"+
		"<script id=\"sbLed\" type=\"text/javascript\" src=\"ui_statusbarwidget/js/sbLed.js\"></script>"+
		"<script id=\"sbLed\" type=\"text/javascript\" src=\"ui_statusbarwidget/js/sbText.js\"></script>"+
		"<script id=\"sbIcon\" type=\"text/javascript\" src=\"ui_statusbarwidget/js/sbIcon.js\"></script>";

		//
		//	event input
		//
		node.on('input',function(msg) {

			// set the configured parameters
			if ( typeof msg.sbw === "undefined" ) {
				msg.sbw = sbw;
			}
			
			if (msg.payload === "connect") { // msg from ui_control, when the client browser reloads
				msg.template = data;
				node.send(msg);
				setTimeout(function(){
						msg.topic = "create";
						if ( typeof msg.sbw === "undefined" ) {
							msg.sbw = sbw;
						}
						msg.template = sbwUtility.createTemplate(msg,node,RED);
						node.send(msg);
				},750);
				return;
			}

			if (msg.topic === "init") {
				//msg.template = data;
				node.send(msg);
				return;
			}


			msg.template = sbwUtility.createTemplate(msg,node,RED);
			node.send(msg);
	
		});
		
		//
		//	event close
		//
		node.on('close',function(done) {
			node.log('close');			
			done();
		});

	}
	RED.nodes.registerType("StatusbarWidgetTemplate",StatusbarWidgetTemplateNode);

	var path = require('path');
	var uipath = 'ui';
	if (RED.settings.ui) {
		uipath = RED.settings.ui.path;
	}
    var fullPath = path.join('/', uipath, '/ui_statusbarwidget/*').replace(/\\/g, '/');
    //console.log("ui_statusbarwidget: fullpath: " + fullPath);
	RED.httpNode.get(fullPath, function (req, res) {
		var options = {
			root: __dirname + '/include/',
			dotfiles: 'deny'
        };
        //console.log("ui_statusbarwidget: fullpath: " + fullPath);
        //console.log("ui_statusbarwidget: req.params[0]: " + req.params[0] + " options:" + JSON.stringify(options));
		res.sendFile(req.params[0], options)
	});

}

