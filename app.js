"use strict";
define([
	"libs/core",
	"helpers/menu"
], function(core, menu){

	//configuration
	var app = core.create({
		name:		"Shopping List App",
		version:	"1.0",
		debug:		true,
		start:"/app/main/shopping"
	});

    app.use("menu");

	return app;
});