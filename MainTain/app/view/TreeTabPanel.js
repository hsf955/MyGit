Ext.define('Pandora.view.TreeTabPanel', {
    extend: 'Ext.TabPanel',
    alias:'widget.treetab',
    id:'id_treetab',
    tabPosition:'bottom',
    split:true,
    border:false,
    items:[
        {
            xtype:'areatree',
            width:250,
            treeType: TreeType.AREATREE
        },
        {
            xtype:'gridtree',
            width:250,
            treeType: TreeType.POWERGRIDTREE
        }
    ]
});
