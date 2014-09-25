define(function(){

    var active = null;

    function setActiveCell(cell){
        active = cell;
    }

    function getActiveCell(){
        return active;
    }

    return{
        getActiveCell:getActiveCell,
        setActiveCell:setActiveCell
    }

});
