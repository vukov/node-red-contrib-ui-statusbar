//
// SBW Icon (fontawsome 4.7)
//  good spinning icons here 
//  https://fontawesome.com/v4.7.0/examples/#animated
//  https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons
//
nrStatusBar.register({

    name: "icon",
    type: "Icon",        
    description: "The widget allows using the fa icon set in two states.",

    create : function  (id,options) {
        var sel = id + 'Icon';
        //
        //  implict icon options
        //
        //  a) icon and color (offcolor)
        //  b) icon and officon

        // need to be properly set rgb(29,157,116)
        if (typeof options === 'undefined') { 
            options = { icon:"fa-font-awesome", color:"#1D9D74", offcolor:"DarkGray"}
        } else {
            if (typeof options.icon === 'undefined') options.icon = "fa-font-awesome";
            if (typeof options.offcolor === 'undefined') options.offcolor = "DarkGray";
            if (typeof options.officon === 'undefined') options.officon = options.icon;
        }

        uiButton = function(w) {
            return('<button class="md-icon-button md-button md-ink-ripple" type="button" onclick="nrStatusBar.click(\'' + sel + '\')">'
                + '<ui-icon aria-hidden="false">'
                + '    <i id="' + sel + '" class="' + options.officon + '" ng-class="icon" style="color : DarkGray"></i>'
                + '</ui-icon>'
            + '</button>');
        }

        if ($('#' + sel).length === 0 && $('#nrStatusBar').length !== 0 ) {
            nrStatusBar.log( "[create] Icon " + sel + " with options: " + JSON.stringify(options));
            var p = $('<div/ style="margin: 10px 10px"/ width="40"/ height="48">' + 
                    '<i id="' + sel + '" class="' + options.officon + '" ng-class="icon"' + ' style="color : DarkGray">' + 
                '</div>');
            p = uiButton(""); 
            
            var mdBStr = nrStatusBar.getButtonTag(sel, 
                '<ui-icon aria-hidden="false">'
                + '    <i id="' + sel + '" class="' + options.officon + '" ng-class="icon" style="color : DarkGray"></i>'
                + '</ui-icon>'
            );
            
            $('#nrStatusBar').append(mdBStr);
            return({type:'Icon', id:id, options:options, tag:p});
        }
        return(null);
    },

    update : function(e,state) {
        state = parseInt(state);

        var sel = '#'+ e.id + 'Icon';
        var iconclass = "fa ";
        var iconcolor = "";

        if (state === 1) {
            iconclass += e.options.icon;
            iconcolor = e.options.color;
        } else {
            iconclass += e.options.officon
            iconcolor = e.options.offcolor;
        }

        $(sel).attr('class', iconclass );
        $(sel).attr('style', 'color : ' + iconcolor );
    }     
});

