Ext.define('Pandora.view.InfoPanel', {
    extend: 'Ext.Panel',
    alias:'widget.infopanel',
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
            xtype:'panel',
            border:false,
            itemId:'reportletpanel',
            html:"<iframe id='id_reportletpanel' name='id_reportletpanel' width='100%' height='100%' frameborder=0 src=''></iframe>",
            region:'center'
        }
    ]
});