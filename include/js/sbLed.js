    //
    // Statusbar Led
    //
nrStatusBar.register({
    name: "led",
    type: "Led",
    description: " The widget renders an svg LED, with a bulb and a ring that can be used to display progress",
    
    create : function  (id,options) {
        var sel = id + 'Led';
        var feat = sel + 'Bulb';

        // need to be properly set
        if (typeof options === 'undefined') { 
            options = { color:id, offcolor:"darkgray"}
        } else {
            if (typeof options.offcolor === 'undefined') { 
                options.offcolor = "darkgray";
            }            
        }

        // percentage circle http://jsfiddle.net/alkhoo/JwkYm/15/

        if ($('#' + sel).length === 0 && $('#nrStatusBar').length !== 0 ) {
            nrStatusBar.log( "[create] Led " + sel + " with options: " + JSON.stringify(options));

/*                
            var bulb ='<circle/ id='+ feat 
                + ' cx="20"/ cy="24"/ r="10"/ stroke="grey"/ stroke-width="4"/ fill="' + options.offcolor +'" '
                //+ ' "/ stroke-dasharray="63,20000"/ transform="rotate(-90,20,24)"/ '
                + '><title>' + sel + '</title></circle>';

            function ring(color) {    
                return '<circle id="'+ feat + 'Ring" ' 
                + 'cx="20"/ cy="24"/ r="10"/ stroke="' + color + '"/ stroke-width="4"/ fill="none"/ '
                + 'stroke-dasharray="0,20000"/ transform="rotate(-90,20,24)"/ '
                + '></circle>';
            }    
*/

            var bulb ='<circle/ id='+ feat 
                + ' cx="12"/ cy="12"/ r="10"/ stroke="grey"/ stroke-width="4"/ fill="' + options.offcolor +'" '
                //+ ' "/ stroke-dasharray="63,20000"/ transform="rotate(-90,20,24)"/ '
                + '><title>' + sel + '</title></circle>';

            function ring(color) {    
                return '<circle id="'+ feat + 'Ring" ' 
                    + 'cx="12"/ cy="12"/ r="10"/ stroke="' + color + '"/ stroke-width="4"/ fill="none"/ '
                    + 'stroke-dasharray="0,20000"/ transform="rotate(-90,12,12)"/ '
                    + '></circle>';
            }

            //nrStatusBar.log( "[create] svg " + bulb + ring("darkgrey"));

            var svg = $('<svg/ id=' + sel + ' width="40"/ height="48">' + bulb + ring("darkgrey") + '</svg>');    

            
            svgCode = function(widget) {
                var svgcode = '<svg id="' + sel + '"/ viewBox="0 0 24 24"/ width="24"/ height="24">'+ widget + '</svg>';
                return(svgcode);
            }
            
            mdButton = function(widget) {
                //var mdB = '<button class="md-icon-button md-button md-ink-ripple"/ type="button"/ ng-transclude=""/ aria-label="menu button"/ aria-hidden="false">' +
                //var mdB = '<button class="md-icon-button md-button"/ type="button" onclick="nrStatusBar.click(\'test_me\')">' +
                var mdB = String.raw`<button class="md-icon-button md-button" type="button" onclick="nrStatusBar.click('` + sel + `')">`;
                //var mdB = '<script>var value = "hello world";this.scope.action = function() { console.log("cd " + value);return value; }</script>' +  
                //'<button class="md-icon-button md-button"/ type="button"/ ng-click="send({payload:action()})">' +
                //var mdB = '<button class="md-icon-button md-button md-ink-ripple" type="button" ng-transclude="" ng-click="main.toggleSidenav()" aria-label="menu button" aria-hidden="false"> <ng-md-icon icon="menu"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 18h18v-2H3v2z"></path><path d="M3 13h18v-2H3v2z"></path><path d="M3 6v2h18V6H3z"></path></svg></ng-md-icon> </button>';

                //'<ng-md-icon icon="ServerLedIcon">' + widget + '</ng-md-icon></button>';
                mdB = mdB + '<ng-md-icon>' + widget + '</ng-md-icon></button>';
                return(mdB);
            }

            //var mdBStr = mdButton(svgCode(bulb + ring("darkgrey")));

            //var mdBStr = nrStatusBar.getButtonTag(sel,'<ng-md-icon>' + svgCode(bulb + ring("darkgrey") + '</ng-md-icon>'));
            var mdBStr = nrStatusBar.getSvgTag(sel,bulb + ring("darkgrey"));

            //nrStatusBar.log( "[create] mdB\n" + mdBStr);

            var mdB = $(mdBStr);

            $('#nrStatusBar').append(mdB);
            
            return({type:'Led', id:id, options:options, tag:mdB});
            
        } else {
            console.log("the tag nrStatusBar does not exist");
        }
        return(null);
    },

    update : function(e,payload) {

        //console.log("[update] led payload: " + JSON.stringify(payload));

        function setRing( value ) {
            $('#'+ e.id + 'LedBulbRing').attr("stroke-dasharray", value  + ", 20000");    
        }
        function setBulb( state ) {
            $('#'+ e.id + 'LedBulb').attr('fill', state === 1 ? e.options.color : e.options.offcolor);    
        }

        if ( typeof payload === "object" ) {
            if ( typeof payload.feature != "undefined" && payload.feature === "animate") {                    
                var v = 0
                var interval = Math.round(payload.interval/63) || Math.round(1000/63);
                var atimer = setInterval(function () {
                    setRing(v);
                    if (v >= 63) {
                        clearInterval(atimer);
                        setRing(0);
                    }
                    v = v + 1 ;
                }, interval );
            } else {
                var value = payload.value || 1.0;
                value = Math.round(63.0*value); // KISS
                setRing(value);
                if ( typeof payload.state != "undefined" ) {
                    var state = parseInt(payload.state);
                    setBulb(state);
                }
            } 
        } else {
            var state = parseInt(payload);
            setBulb(state);
        }
    }
});