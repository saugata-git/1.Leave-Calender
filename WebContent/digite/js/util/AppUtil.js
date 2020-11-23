var AppUtil = {
	ajax: function (url, data, successFn) {
		
		var ajaxConfig = {
			url: url,
			success: function (response) {
				if ( successFn ) {
					successFn(response)
				}
			}
		} 
		
		if ( data ) {
			ajaxConfig.type = 'POST';
			ajaxConfig.data = data;
		}
		
		$.ajax(ajaxConfig);
	}
}