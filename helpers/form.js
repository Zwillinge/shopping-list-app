"use strict";
define([
], function(){

	var buttons = {
		cols:[
			{ view:"button", id:"helpers:form:remove", value:"Remove", gravity:0.5, click: remove_button},
			{},
			{ view:"button", value:"Save", type:"form", gravity:0.5, click: add_button, hotkey:"ctrl+enter" },
			{ view:"button", value:"Cancel", gravity:0.5, click: cancel_button, hotkey:"esc"}
		]
	};

	var winbuttons = {
		rows:[
			{ height:20 },
			buttons
		]
	};


	function show_popup(config, extra, id){
		winbuttons.rows[1].cols[0].hidden = (config.$remove === false) || !id;

		var ui = webix.copy(config.$ui);
		if (config.$head)
			ui.head = (id?"Edit":"Add")+" "+config.$head;
		ui.toSaveId = id;

		var view = webix.ui(ui);
			view.show();
			view.$$data = config.$data;

		var form = view.getBody();

		if (config.$oninit)
			config.$oninit(view, form);

		if (extra)
			form.setValues(extra, true);

		if (id && config.$data.getItem)
			form.setValues(config.$data.getItem(id), true);
	}

	function add_button(){
		var top = this.getTopParentView();
		var data = this.getFormView().getValues();

		var $data = top.$$data;

		if (!top.config.toSaveId){		//add
			$data.add(data);
		} else if ($data.updateItem)	//edit
			$data.updateItem(top.config.toSaveId, data);
		
		top.close();
	}

	function remove_button(){
		var top = this.getTopParentView();

		webix.confirm({
			text:"There is no undo. <br> Do you really want to delete this record ?",
			callback:function(result){
				if (result){
					top.$$data.remove(top.config.toSaveId);
					top.close();
				}
			}
		});
	}

	function cancel_button(){
		this.getTopParentView().close();
	}


	return {
		popup:function(config){
			config.add = function(extra){
				show_popup(config, extra);
			};
			config.edit = function(id, extra){
				show_popup(config, extra, id);
			};

			if (typeof config.$remove === "undefined")
				config.$remove = true;

			return config;
		},

		addButton:add_button,
		cancelButton:cancel_button,
		winbuttons:winbuttons
	};
});