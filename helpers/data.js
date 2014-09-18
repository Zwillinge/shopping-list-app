"use strict";
define(function(data){
	return {
		array:function(data){
			var hash = {};
			for (var i = 0; i < data.length; i++)
				hash[data[i].id] = data[i];
			
			return {
				data:data,
				hash:hash,
				get:function(id, key, alter){
					var obj = hash[id];
					if (!obj || typeof obj[key] == "undefined")
						return alter;
					return obj[key];
				}
			};
		}
	};
});