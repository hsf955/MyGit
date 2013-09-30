Ext.define('Pandora.view.AreaTree',{
    extend:'Nr.tree.CheckPanel',
    alias:'widget.areatree',
    border:false,
    title:'按地区检索',
    header:true,
    checked:true,
    store:'AreaStore'
});


