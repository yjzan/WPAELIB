( function ( $ ){
    "use strict";
    
    $(".pa-checkbox").on("click", function(){
       if($(this).prop("checked") == true) {
           $(".pa-elements-table input").prop("checked", 1);
       }else if($(this).prop("checked") == false){
           $(".pa-elements-table input").prop("checked", 0);
       }
    });
   
    $( 'form#pa-pro-settings' ).on( 'submit', function(e) {
		e.preventDefault();
		$.ajax( {
			url: settings.ajaxurl,
			type: 'post',
			data: {
				action: 'pa_pro_save_admin_addons_settings',
				fields: $( 'form#pa-pro-settings' ).serialize(),
			},
            success: function( response ) {
				swal(
				  'Settings Saved!',
				  'Click OK to continue',
				  'success'
				);
			},
			error: function() {
				swal(
				  'Oops...',
				  'Something Wrong!',
				);
			}
		} );

	} );
    
    $( 'form#pa-white-label-settings' ).on( 'submit', function(e) {
		e.preventDefault();
        if ( 'valid' == $(this).find("input[type='submit']").data("lic") ) {
            $.ajax( {
    			url: settings.ajaxurl,
        		type: 'post',
    			data: {
                    action: 'pa_wht_lbl_save_settings',
                	fields: $( 'form#pa-white-label-settings' ).serialize()
            	},
                success: function( response ) {
    				swal(
                	  'Settings Saved!',
            		  'Click OK to continue',
        			  'success'
    				);
                },
                error: function() {
                    swal(
                    'Oops...',
                    'Something Wrong!',
                    );
                }
            } );
        } else {
            swal({
                html: 'Please activate <a href="'+ settings.adminurl + "/admin.php?page=premium-addons-pro-license" + '">Premium Addons License</a> to use white labeling option',
                type: 'warning'
            });
        }
	});
    
} )(jQuery);