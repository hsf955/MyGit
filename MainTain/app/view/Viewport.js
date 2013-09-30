Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath("Nr","../common/widgets/extcomp");
Ext.define('Pandora.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'border',   
    requires: [
        'Nr.tree.CheckPanel',
        'Pandora.view.AreaTree',
        'Pandora.view.GridTree',
        'Pandora.view.TreeTabPanel',
        'Pandora.view.InfoPanel',
        'Pandora.view.MysqlGrid',
        'Pandora.view.MainTainPanel',
        'Pandora.view.MainTabPanel',
        'Pandora.view.LoginForm'
    ],
    items:[
        {
            xtype:'treetab',
            region:'west'
        },
        {
            xtype:'maintab',
            region:'center'
        }
    ]
});
Ext.define("TreeType",{
	statics:{
		AREATREE:0,
		POWERGRIDTREE:1
	}
});

Ext.define("TabType",{
	statics:{
		INFO:0,
		MAINTAIN:1
	}
});
