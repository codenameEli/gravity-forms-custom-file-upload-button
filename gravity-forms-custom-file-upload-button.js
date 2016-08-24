// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

    "use strict";

    var pluginName = "gravityFormsCustomFileUploadButton",
        defaults = {
            buttonText: 'Upload File',
            buttonClass: '',
            pathText: 'No file choosen',
        };

    function Plugin( input, options, id )
    {
        this.id = id;
        this.input = input;
        this.$input = $(input);
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    $.extend( Plugin.prototype, {

        init: function()
        {   
            var _ = this;

            _.$element = _.createElement();
            _.$form = _.$element.closest('form');
            _.$button = _.$element.find('.gf_custom_file_upload_button');
            _.$path = _.$element.find('.gf_custom_file_upload_path_text');
            _.$removeControl = _.$element.find('.remove_control');
            
            _.appendElement();
            _.attachListeners();
        },

        changePath: function(val)
        {   
            var _ = this;

            _.$path.text(val);
        },

        createElement: function()
        {
            var _ = this;
            var element = '';

            element += '<div id="gf_custom_file_upload_' + _.id + '" class="gf_custom_file_upload">';
                
                element += '<div class="gf_custom_file_upload_button ' + _.settings.buttonClass + '">';
                    element += _.settings.buttonText;
                element += '</div>';

                element += '<span class="gf_custom_file_upload_path_text">';
                    element += _.settings.pathText;
                element += '</span>';

                element += '<div class="gf_custom_file_upload_path_control">';
                    element += '<span class="control remove_control">X</span>'
                element += '</div>';

            element += '</div>';

            return $(element);
        },

        appendElement: function()
        {
            var _ = this;

            _.$input.before(_.$element);
        },

        removeFileSelectedClass: function()
        {
            var _ = this;

            _.$element.removeClass('file_selected');
        },

        addFileSelectedClass: function()
        {
            var _ = this;

            _.$element.addClass('file_selected');  
        },

        removeFile: function()
        {
            var _ = this;

            _.removeFileSelectedClass();
            _.$input.val('');
            _.changePath( _.settings.pathText );
        },

        attachListeners: function()
        {
            var _ = this;
            
            _.$button.on('click', function() {
                _.$input.trigger('click');
            });

            _.$input.on('change', function() {
                if ( this.files == 'undefined' ) { // Remove/No file selected

                } else {
                    _.addFileSelectedClass();
                    _.changePath(this.files[0].name);
                }
            });

            _.$removeControl.on('click', function() {
                _.removeFile();
            });
        },
    } );

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function( options ) {
        var id = 0;
        return this.each( function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" +
                    pluginName, new Plugin( this, options, id ) );

                id++;
            }
        } );
    };
} )( jQuery, window, document );
