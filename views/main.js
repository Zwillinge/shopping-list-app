"use strict";
define([
    "app",
    "views/popups/suggest",
    "views/shopping"
],function(app, suggest, shopping){

    function renameList(batch){
        var toolbar = $$("mainbar"),
            elements = toolbar.getChildViews();

        if(batch===2)
            elements[1].setValue(elements[0].getValue()); //from label to input
        else{
            elements[0].setValue(elements[1].getValue()); //save input value to label
            webix.storage.local.put("list1", elements[1].getValue());
        }
        toolbar.showBatch(batch);
        webix.delay(function(){
            elements[1].focus();
        });
    }

    function enterNumDelimiter(){
        var value = $$("search").getValue();
        if(value && value.indexOf(':')==-1){
            $$("search").setValue(value+': ');
        }
        $$("search").focus();
    }

    function addLayer(){
        $$("search").getParentView().getNode().style.backgroundColor = "#dedede";
    }

    function removeLayer(){
        $$("search").getParentView().getNode().style.backgroundColor = "#fff";
    }

    function menuActions(id){
        switch(id){
            case '2':
                renameList(2);
                break;
            case '3': /*or triggers with listeners?*/
                shopping.clearList();
                break;
            case '4':
                shopping.clearBought();
                break;
        }
    }

    var mainbar = {
        view:'toolbar',
        id:'mainbar',
        visibleBatch:1,
        cols:[
            {view:'label', id:"listName", batch:1},
            {view:'text', css:"rename", batch:2, on:{
                'onBlur':function(){renameList(1);}
            }},
            {view:'menu', width:35, openAction:"click", data:[
                {id:1, value:"<span class='webix_input_icon fa-ellipsis-v'></span>", submenu:[
                    {id:2, value:'Rename'},
                    {id:3, value:'Clear list'},
                    {id:4, value:'Clear bought products'}
                ]}
            ],
            on:{
                "onMenuItemClick":function(id){ menuActions(id); }
            }}
        ]
    };

    var main  = {
        id:'main',
        rows:[
            mainbar,
            {cols:[
                {view:'text', id:"search", css:'num', icon:'cog', suggest: suggest, placeholder:"Product: quantity",  on:{
                    'onItemClick':function(id, e){
                        if(e.target.className==="webix_input_icon fa-cog") enterNumDelimiter();
                    }
                }},
                {view:'icon', icon:'align-justify', click:function(){this.$scope.show("/side");}}
            ]},
            { $subview:true }
        ]
    };


    return {
        $oninit:function(view, scope){

            /*caching*/
            var listName = webix.storage.local.get("list1")||"List1";
            $$("listName").setValue(listName);
            webix.storage.local.put("list1", listName);

            /*hotkeys*/
            webix.UIManager.addHotKey("enter", function(view){
                if(view.config.id!=="search")
                    renameList(1);
                else{
                    app.trigger("isInCatalog", $$("search").getValue());
                    $$("search").setValue('');
                }
            });

            /*event handlers*/
            scope.on(app, "enterNumDelimiter", enterNumDelimiter);
            scope.on(app, "optionsShowHandler", addLayer);
            scope.on(app, "optionsHideHandler", removeLayer);
        },
        $ui:main
    };
});