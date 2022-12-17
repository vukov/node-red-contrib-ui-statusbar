//
//  Statusbar Manager Singelton
//
if (typeof nrStatusBar === 'undefined') {
    var nrStatusBar = {
        
        version: "0.33",   
        
        initialized : false,
         
        visible : true,
         
        nrStatusBarDiv: null, 

        elements : [],
        getElement : function (type) {
            return ( this.elements.find( e =>  (e.type === type) ) )
         },
        register : function(e) {
            // buffer against multiple registration
            var ele = this.getElement(e.type);
            //nrStatusBar.log("[register] type: " + e.type + " getElement: " + ele );
            if ( typeof ele === "undefined" ) {
                nrStatusBar.log("[register] nrStatusBar registering type: " + (e.type || "unkown") );
                this.elements.push(e);
            } else {
                //nrStatusBar.log("[register] nrStatusBar registering type: " + (e.type || "unkown") + " already in!" );
            }
        },

    
        instances : [],
        getInstance : function (type, id ) {
            return ( this.instances.find( e =>  (e.type === type) && (e.id === id) ) )
         },
        store : function(e) {
            // buffer against multiple calls
            var ist = this.getInstance(e.type,e.id);
            if ( typeof ist === "undefined" ) {
                nrStatusBar.log("[store] nrStatusBar store type:" + (e.type || "unkown") + " id:" + e.id);
                this.instances.push(e);
            }
        },        

        log : function(log_text) {
             console.log("[nrStatusBar] " + log_text);
        },

        print: function(log_text) {
            console.log("[nrStatusBar] elements length:" + this.elements.length);
            this.elements.forEach(function(e,i,a) {
                console.log("  " + i + ": " + JSON.stringify(e,0,2));
            }); 
            console.log("[nrStatusBar] instances length:" + this.instances.length);
            this.instances.forEach(function(e,i,a) {
                console.log("  " + i + ": " + JSON.stringify(e,0,2));
            });
         },
         
         init: function() {
             if ( $('#nrStatusBar').length === 0 ) {
                 nrStatusBar.log("[init] initializing nrStatusBar");

                if ($('.md-toolbar-tools').length === 0 ) {
                    nrStatusBar.log("[init] the tag .md-toolbar-tools does not exist");
                    this.initialized = false;
                    return;
                }
                var toolbar = $('.md-toolbar-tools');

                 var div = $('<div id="nrStatusBar" />');
                 //$('#nrStatusBarScript').parent().hide();
                 
                 div[0].style.margin = '5px 5px 5px auto';
                 div[0].style.textAlign = 'right';
                 div[0].style.height = '48px';
                 
                 // display:flex; flex-direction: row;
                 div[0].style.display = 'flex';
                 div[0].style.flexDirection = 'row';
                 
                 toolbar.append(div);
                 nrStatusBarDiv = div;
                 this.initialized = true;

                 // show up after a second
                 $('#nrStatusBar').fadeOut(1);
                 setTimeout(function(){
                    $('#nrStatusBar').fadeIn(500);
                },1000);
             } else {
                 nrStatusBar.log("[init] nrStatusBar instance already exists");
             }
         },

        // std html onClick feature there is no conneciton back to the node-red server by now 
        click: function(sel) {
            nrStatusBar.log("[click]" + " sel:" + sel);
        },

        visibility : function (show) {
            if (show) {
                nrStatusBar.log("fade in");
                $('#nrStatusBar').fadeIn(500);
                this.initialized = true;
            } else {
                nrStatusBar.log("fade out");
            $('#nrStatusBar').fadeOut(500);
                this.initialized = false;
            }
        },
        // update the status bar      
        update: function (type, id, state) {

            if ( typeof state === "object") {
                nrStatusBar.log("[update]" + " type:" + type + " id:" + id + " state:" + JSON.stringify(state));
            } else {
                nrStatusBar.log("[update]" + " type:" + type + " id:" + id + " state:" + state);
            }

            var i = this.getInstance(type, id);
            if ( typeof i === "undefined") {
                nrStatusBar.log("[update] not yet registered type:" + type + " id:" + id + " state:" + state);
                return;
            }

            var e = this.getElement(type);
            if ( typeof e === "undefined") {
                nrStatusBar.log("[update] element not found type:" + type );
                return;
            }
            e.update(i,state);
            return;
        },
        // update the status bar      
        show: function (type, id, show) {

            var i = this.getInstance(type, id);
            if ( typeof i === "undefined") {
                nrStatusBar.log("[update] not yet registered type:" + type + " id:" + id + " state:" + show);
                return;
            }
            nrStatusBar.log("[update] not yet registered type:" + type + " id:" + id + " state:" + show);
            if (show) {
                $('#' + i.id + i.type).fadeIn(250);
            } else {
                $('#' + i.id + i.type).fadeOut(250);    
            }
            return;
        },        
        // dispatch the creation of the SBWs
        create: function(type, id, options) {
            if ( !this.initialized) this.init();
            var i = this.getInstance(type, id);
            if ( i !== undefined) {
                nrStatusBar.log("[create] already instanciated type:" + type + " id:" + id);
                return;
            }

            var e = this.getElement(type);
            if ( e === undefined) {
                nrStatusBar.log("[create] element not found type:" + type );
                return;
            }

            var fullElement = e.create(id,options);
            if (fullElement != null) {
                nrStatusBar.store( fullElement);    
                e.update(fullElement,0); // initialize the widget    
            } else {
                nrStatusBar.log("[create] unsccessful creation of type:" + type + " id:" + id );
            }
            return;
        },

        //
        //  here we may add the stype=width:fit-content" to solve the text wdith isssue
        //
        getButtonTag: function(sel,tags) {
                var mdB = String.raw`<button class="md-icon-button md-button" type="button" onclick="nrStatusBar.click('` + sel + `')">`;
                mdB = mdB + tags + '</button>';
                return(mdB);
        },

        getSvgTag: function(sel,tags) {
            var svgcode = '<ng-md-icon><svg id="' + sel + '"/ viewBox="0 0 24 24"/ width="24"/ height="24">'+ tags + '</svg></ng-md-icon>';
            return(this.getButtonTag(sel, svgcode));
        }
    }
}
