
    function core_Debug_HTML(line,sbw) {
        var html = String.raw`
<script id="StatusBar` + sbw.Id+sbw.Type + `" type="text/javascript">
if (typeof nrStatusBar !== 'undefined') {
` + line + `;
} else {
console.log("StatusbarWidget: nrStatusBar undefined" + '` + sbw.Type + sbw.Id + `' );
}    
</script>
`;
        return html;
    };

    function core_HTML(line,sbw) {
        var html = String.raw`<script id="StatusBar` + sbw.Id+sbw.Type + `" type="text/javascript">` + line + `;</script>`;
        return html;
    };    

    function create_HTML(msg) {
        var line = "nrStatusBar.create(\"" + msg.sbw.Type + "\",\"" + msg.sbw.Id + "\"," + msg.sbw.Options + ")";
        return core_HTML(line,msg.sbw)
    };

    function update_HTML(msg) {
        var msgp = "";
        if ( typeof msg.payload === "object") {
            msgp = JSON.stringify(msg.payload);
        } else if ( typeof msg.payload === "string") {
            msgp = "\"" + msg.payload + "\"";
        }
        var line = "nrStatusBar.update(\"" + msg.sbw.Type + "\",\"" + msg.sbw.Id + "\"," + msgp + ")";
        return core_HTML(line,msg.sbw)
    };

    function print_HTML(msg) {
        var line = "nrStatusBar.print()";
        return core_HTML(line,msg.sbw)
    };    


module.exports = {
      
	createTemplate: function (msg, node, RED) {
        if (msg.topic === "update") {
            msg.template = update_HTML(msg);
        } else if ( msg.topic === "create") {
            msg.template = create_HTML(msg);
        } else if ( msg.topic === "print") {
            msg.template = print_HTML(msg);
        }
        //console.log("sbwUtility cerateTemplate:\n" + msg.template);
        return msg.template;
	}

};