"use strict";

define([
    "app",
    "helpers/list_helper",
    "helpers/multiview_helper",
    "models/products"
],function(app, list, mview, products){

    function switchViews(scope, view){
        scope.show("side/"+view);
        highlightView(view);
    }

    function highlightView(newv){
        var oldv = mview.getActiveCell();
        var els = $$('side').getChildViews()[0].elements;
        if(oldv) els[oldv].getNode().firstChild.firstChild.style.backgroundColor = '#fff';
        if(newv) els[newv].getNode().firstChild.firstChild.style.backgroundColor = '#fff004';
        mview.setActiveCell(newv);
    }

    var catalog_abc = {
        view:'list',
        id:'catalog_abc',
        template:function(obj, common){
            var checked = obj.checked?"<span class='webix_input_icon fa-check-square-o'></span>":"<span class='webix_input_icon fa-square-o'></span>";
            return "<span style='background-color:"+obj.color+";' class='category'></span>"+checked+obj.value;
        },
        onClick:{
            'webix_input_icon':function(e, id, node){
                products.addToList(id, null, true);
                this.showItem(id);
            }
        }
    };

    var catalog_group = {
        view:"unitlist",
        id:"catalog_group",
        uniteBy:function(obj){
            return "<div class='category_label' style='background-color:"+obj.color+"'>"+obj.category+"</div>";
        },
        template:function(obj){
            var checked = obj.checked?"<span class='webix_input_icon fa-check-square-o'></span>":"<span class='webix_input_icon fa-square-o'></span>";
            return checked+obj.value;
        },
        onClick:{
            'webix_input_icon':function(e, id){
                products.addToList(id, null, true);
                this.showItem(id);
            }
        }
    };

    var favourites = {
        id:"favourites",
        view:"list",
        template:function(obj, common){
            var checked = obj.checked?"<span class='webix_input_icon fa-check-square-o'></span>":"<span class='webix_input_icon fa-square-o'></span>";
            return "<span style='background-color:"+obj.color+";' class='category'></span>"+checked+obj.value;
        },
        onClick:{
            'webix_input_icon':function(e, id, node){
                products.addToList(id, null, true);
                this.showItem(id);
            }
        },
        on:{
            'data->onStoreUpdated':function(){ list.setListEmpty('favourites');}
        }
    };

    var sidebar = {
        view:'toolbar', elements:[
            {view:'icon', width:55, name:"catalog_abc", icon:'sort-alpha-asc', click:function(){switchViews(this.$scope, this.config.name);}},
            {view:'icon', width:55, name:"catalog_group", icon:'list-ul', click:function(){switchViews(this.$scope, this.config.name);}},
            {view:'icon', width:55, name:"favourites", icon:'star', click:function(){switchViews(this.$scope, this.config.name);}},
            {},
            {view:'icon', width:55, icon:'check', click:function(){this.$scope.show("main/shopping/");}}
        ]
    };

    var ui = {
        id:'side',
        rows:[
            sidebar,
                { rows:[
                    { $subview:true}
                ]}
        ]
    };

    return {
        $ui:ui,
        $oninit:function(view, scope){
            list.setOverlayNull('favourites'); //null on redrawing

            //restore last opened tab
            var active = mview.getActiveCell()||"catalog_abc";
            switchViews(scope, active);
        }
    };
});