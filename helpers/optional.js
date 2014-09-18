"use strict";
define(function(){
	return {
		$onui:function(ui, name, url, scope){
			//optional sub-views
			var child = scope.$layout;
			if (child){
				if (!url.length)
					child.root.hide();
				else if (child.root.config.hidden)
					child.root.show();
			}
		}
	}
})
			