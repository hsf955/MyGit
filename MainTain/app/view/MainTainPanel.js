Ext.define('Pandora.view.MainTainPanel', {
    extend: 'Ext.Panel',
    alias:'widget.maintainpanel',
    layout:'border',
    border:false,
    items:[
        {
            xtype:'form',
            region: 'north',
            border:false,
            standardSubmit:true,
            bodyPadding:10,
            header:false,
            layout: {
                type: 'hbox',
                pack: 'begin',   
                align: 'left' 
            },
            items:[
                {
                    xtype:'button',
                    itemId:'submitbt',
                    width:60,
                    text:'提交',
                    margin:'0 0 0 0',
                    name:'提交'
                }
            ]
        },{
            xtype:'mysqlgrid',
            border:false,
            region:'center'
        }
    ]
});

