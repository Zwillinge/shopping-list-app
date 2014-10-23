"use strict";
define([
    "app",
    "models/products"
    ], function(app, products){

    function adjustPosition(view){
        var top = view.getNode().offsetTop+30;
        var left = view.getNode().offsetLeft;
        view.setPosition(left, top);
    }

    function hideSuggest(){
        $$("suggest").hide();
    }

    var suggest = {
        view:'datasuggest',
        id:'suggest',
        css:'suggest',
        relative:"bottom",
        height:"auto",
        autofit:false,
        width:(function(){return window.innerWidth-20;})(),
        filter:function(item,value){
            if (value && item.value.toString().toLowerCase().indexOf(value.toLowerCase())!==-1)
                return true;
            return false;
        },
        body:{
            autoheight:true,
            borderless:true,
            template:"<div class='suggest_item' style='background-color:#color#;'>#value#</div>",
            type:{
                width:'auto', height: 'auto'
            },
            data:[
                {id:1, value:"one"}
            ]
        },
        on:{
            'onValueSuggest':function(){app.trigger("enterNumDelimiter")},
            'onShow':function(){
                adjustPosition(this);
                app.trigger("optionsShowHandler");
            },
            'onHide':function(){app.trigger("optionsHideHandler")}
        }
    };

    return {
        $ui:suggest,
        $oninit:function(view, scope){
            $$("suggest").getList().sync(products.data);
            scope.on(app, "isInCatalog", hideSuggest);

            window.onresize = function(){
                $$("suggest").define("width", window.innerWidth-20);
                $$("suggest").resize();
            }
        }
    };

});