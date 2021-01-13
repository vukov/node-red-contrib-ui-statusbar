    //
    // Statusbar Text
    //
    nrStatusBar.register({
        name: "text",
        type: "Text",
        description: "The widget renders an Text",
        
        create : function  (id,options) {
            var sel = id + 'Text';
    
            // need to be properly set rgb(29,157,116)
            if (typeof options === 'undefined') { 
                options = { text:"test", color:"#1D9D74", fontSize:"100%"}
            } else {
                if (typeof options.text === 'undefined') options.text = "text";
                if (typeof options.color === 'undefined') options.offcolor = "White";
            }
            
            if ($('#' + sel).length === 0 && $('#nrStatusBar').length !== 0 ) {
                nrStatusBar.log( "[create] Text " + sel + " with options: " + JSON.stringify(options));

                var mdBStr = $(nrStatusBar.getButtonTag(sel, 
                    '<p id=' + sel + 'Field class=' + sel + 'FieldClass style="display:inline">' + options.text + '</p>'
                ))

                $('#nrStatusBar').append(mdBStr);

                // var head = document.getElementsByTagName('head')[0];
                // var script = document.createElement('style');
                // script.type = 'text/css';
                // script.id = "TextFieldClass",
                // script.content = "." + id + "TextFieldClass {color:" + options.color + "}";
                // nrStatusBar.log( "[create] append " + script.content );
                // head.appendChild(script); 
                
                return({type:'Text', id:id, options:options, tag:mdBStr});
            }
        },
    
        update : function(e,payload) {
            
            var sel = '#'+ e.id + 'TextField';
            var text = "-"
            if ( typeof payload === "string") {
                text = payload;    
            } else {
                text = payload.text || e.options.text;
                textcolor = payload.color || e.options.color;
                textsize = payload.fontSize || e.options.fontSize;           
            }
            $(sel).html(text);
            //$(sel).css({"color": textcolor, "display":"inline"})
        }
    });