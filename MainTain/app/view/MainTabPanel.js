Ext.define('Pandora.view.MainTabPanel', {
    extend: 'Ext.TabPanel',
    alias:'widget.maintab',
    items:[
        {
            xtype:'infopanel',
            tabtype:TabType.INFO,
            title:'基础信息'
        },
        {
            xtype:'maintainpanel',
            tabtype:TabType.MAINTAIN,
            title:'基础信息维护'         
        }
    ]
});
