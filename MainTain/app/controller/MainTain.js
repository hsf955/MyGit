Ext.define('Pandora.controller.MainTain', {
    extend: 'Ext.app.Controller',
    stores: ['AreaStore','GridStore','MysqlStore'],//声明该控制层要用到的store  
    models: ['AreaModel','GridModel','MysqlModel'],//声明该控制层要用到的model  
  views: ['AreaTree','GridTree','TreeTabPanel','MainTabPanel','MainTainPanel','LoginForm'],//声明该控制层要用到的view  
    refs: [//相当于一个映射,这样就可以在控制层方便的通过geter取得相应的对象了
        {ref: 'areatree',selector: 'areatree'},
        {ref: 'gridtree',selector: 'gridtree'},
        {ref: 'treetab',selector: 'treetab'},
        {ref: 'maintab',selector: 'maintab'},
        {ref: 'maintainpanel',selector: 'maintainpanel'},
        {ref: 'mysqlgrid',selector: 'mysqlgrid'},
        {ref: 'loginform',selector: 'loginform',autoCreate: true,xtype: 'loginform'}
    ],
    logined: false,
    init: function() {
        this.control({
            'maintab panel':{
    		activate: this.onTabactive
            },
            'maintainpanel #submitbt':{
    		click: this.onSubmitbt
            },
            'mysqlgrid #addrecord':{
    		click: this.onAddrecord
            },
            'mysqlgrid #removerecord':{
    		click: this.onRemoverecord
            },
            'mysqlgrid':{
    		afterrender: this.onMysqlgridlayout
            },
            'loginform button[action=login]': {
           click: this.onLogin
       },
            'loginform button[action=cancel]': {
           click: this.onLogout
       }
        });
    },
    onTabactive: function() {
        var curTab = this.getMaintab().getActiveTab();
        if(curTab.tabtype == TabType.MAINTAIN){
            if(!this.logined){
                this.getLoginform().show();
            }
        }
    },
    onLogin: function() {
        var win = this.getLoginform();
	var form = win.down('form');
	var values = form.getValues();
	if (values.userName == "admin" && values.passWord == "admin") {
	    win.close();
            this.logined = true;
	}
        else{
            this.logined = false;
            form.down('label').setText('用户名或密码错误!');
        }
    },
            
    onLogout: function() {
        var win = this.getLoginform();
        this.getMaintab().setActiveTab(0);
        win.close();
        this.logined = false;
    },
            
    onMysqlgridlayout: function() {
        this.getMysqlgrid().rowEditeOb.on('edit',this.onUpdate,this);
        this.readgridConfig(this);
        this.getLoginform().show();
    },
            
    readgridConfig: function(me) {
        Ext.Ajax.request({
            url:'config/gridconfig.xml',
            method:'POST',
            success:function(response,request){
            	var xml = response.responseXML.documentElement;
                var myfields = me.getGridFields(xml);
                me.getMysqlModelModel().setFields(myfields);
                var mycolumns = me.getGridColumns(xml);
                me.getMysqlgrid().reconfigure(undefined,mycolumns);
                me.defaultvalue = me.getDefaultValue(xml);
                me.sqlcolumns = me.getSqlColumns(xml);
            },
            failure:function(){
                MsgTip.msg('写数据库', '无数据返回!');
            }
        });
    },

    getGridFields: function(xml) {
        var fields = [];
        var columnsArr = xml.getElementsByTagName("columns");
        Ext.Array.each(columnsArr,function(columns){
            var columnArr = columns.getElementsByTagName("column");
            if (columnArr.length == 0){
                var buf = {};
                buf.name = columns.getAttribute('dataIndex');
                buf.type = columns.getAttribute('type');
                fields.push(buf);
            }
            else{
                Ext.Array.each(columnArr,function(column){
                    var buf = {};
                    buf.name = column.getAttribute('dataIndex');
                    buf.type = column.getAttribute('type');
                    fields.push(buf);
                });
            }
        });
        return fields;
    },
      
    getGridColumns: function(xml) {
        var columnsbuf = [];
        var columnsArr = xml.getElementsByTagName("columns");
        Ext.Array.each(columnsArr,function(columns){
            var columnArr = columns.getElementsByTagName("column");
            if (columnArr.length == 0){
                var buf = {};
                buf.header = columns.getAttribute('header');
                buf.width = parseInt(columns.getAttribute('width'));
                buf.dataIndex = columns.getAttribute('dataIndex');
                buf.editor = {
                    allowBlank: false
                };
                columnsbuf.push(buf);
            }
            else{
                var buf = {};
                buf.header = columns.getAttribute('header');
                var childcol = [];
                Ext.Array.each(columnArr,function(column){
                    var child = {};
                    child.header = column.getAttribute('header');
                    child.width = parseInt(column.getAttribute('width'));
                    child.dataIndex = column.getAttribute('dataIndex');
                    child.editor = {
                        allowBlank: false
                    };
                    childcol.push(child);
                });
                buf.columns = childcol;
                columnsbuf.push(buf);
            }
        });
        return columnsbuf;
    },
    
    getDefaultValue: function(xml) {
        var valueStr = "{";
        var value = new Array();
        var columnsArr = xml.getElementsByTagName("columns");
        Ext.Array.each(columnsArr,function(columns){
            var columnArr = columns.getElementsByTagName("column");
            if (columnArr.length == 0){
                var str = columns.getAttribute('dataIndex') + ":\"" + columns.getAttribute('defaultvalue') + "\"";
                value.push(str);
            }
            else{
                Ext.Array.each(columnArr,function(column){
                    var str = column.getAttribute('dataIndex') + ":\"" + column.getAttribute('defaultvalue') + "\"";
                    value.push(str);
                });
            }
        });
        valueStr = valueStr + value.toString() + "}";
        var defaultvalue = eval('(' + valueStr + ')');
        return defaultvalue;
    },
    
    getSqlColumns: function(xml) {
        var sqlcol = {};
        var strArr = new Array();
        var typeArr = new Array();
        var columnsArr = xml.getElementsByTagName("columns");
        Ext.Array.each(columnsArr,function(columns){
            var columnArr = columns.getElementsByTagName("column");
            if (columnArr.length == 0){
                strArr.push(columns.getAttribute('dataIndex'));
                typeArr.push(columns.getAttribute('type'));
            }
            else{
                Ext.Array.each(columnArr,function(column){
                    strArr.push(column.getAttribute('dataIndex'));
                    typeArr.push(column.getAttribute('type'));
                });
            }
        });
        sqlcol.str = strArr.toString();
        sqlcol.type = typeArr.toString();
        return sqlcol;
    },
    
    onSubmitbt: function() {
        var curtree = this.getTreetab().getActiveTab();
	var recs = curtree.getChecked();
	var stationNamebuf = [];
	Ext.Array.each(recs,function(rec){
            if (rec.raw.level === 3){
		stationNamebuf.push("'" + rec.raw.text + "'");
            }
	});
	if (stationNamebuf.length > 0){
            this.readMysqlData(this.getMaintainpanel(),stationNamebuf,this.sqlcolumns);
	}
	else{
            Ext.Msg.alert("提示", "没有厂站被选择!");
	}
    },
    
    readMysqlData: function(mtpanel,stationNamebuf,sqlcolumns){
        var param = {};
	var sqlStr = "SELECT * FROM stationbaseinfo WHERE wturstation IN ($stationNames)";
        sqlStr = sqlStr.replace("$stationNames",stationNamebuf.toString());
        param.type = "read";
        param.sql = sqlStr;
        param.columnsStr = sqlcolumns.str;
        param.columnsType = sqlcolumns.type;
        this.requestRead(mtpanel,param);
    },
            
    requestRead: function(mtpanel,param){
	Ext.Ajax.request({
            url:'data/handleMysql.jsp',
            params:{type:param.type,sql:param.sql,columnsStr:param.columnsStr,columnsType:param.columnsType},
            method:'POST',
            text:"Updating...",
            success:function(result,request){
		if (!result.responseText)
                    return;
		var jsonData = eval('(' + result.responseText + ')');
                if (jsonData.result == "success"){
                    MsgTip.msg('读数据', '成功!',true,1000);
                    mtpanel.down("mysqlgrid").getStore().loadData(jsonData.data);
                }
                else{
                    MsgTip.msg('读数据', '失败!('+ jsonData.err +')');
                }
            },
            failure:function(){
                MsgTip.msg('读数据', '无数据返回!');
            }
	});
    },
    
    onAddrecord: function(){
        var rowEditing = this.getMysqlgrid().rowEditeOb;
        rowEditing.cancelEdit();
        var r = Ext.create('Pandora.model.MysqlModel', this.defaultvalue);
        this.getMysqlgrid().getStore().insert(0, r);
        rowEditing.startEdit(0, 0);
    },
            
    onRemoverecord: function(){
        var rowEditing = this.getMysqlgrid().rowEditeOb;
        var sm = this.getMysqlgrid().getSelectionModel();
        rowEditing.cancelEdit();
        var comlumData = sm.getSelection()[0].data;
        if (this.hasNullvalue(comlumData)){
            this.getMysqlgrid().getStore().remove(sm.getSelection());
            if (this.getMysqlgrid().getStore().getCount() > 0) {
                sm.select(0);
            }
        }
        else{
            var param = {};
            var sqlStr = "DELETE FROM stationbaseinfo WHERE (company=\""+ comlumData.company + "\" AND transName=\"" + comlumData.transName +"\")";
            param.type = "delete";
            param.sql = sqlStr;
            this.requestExecute(param);
            this.getMysqlgrid().getStore().remove(sm.getSelection());
            if (this.getMysqlgrid().getStore().getCount() > 0) {
                sm.select(0);
            }
        }
    },
    
    requestExecute: function(param){
	Ext.Ajax.request({
            url:'data/handleMysql.jsp',
            params:{type:param.type,sql:param.sql},
            method:'POST',
            text:"Updating...",
            success:function(result,request){
		if (!result.responseText)
                    return;
		var jsonData = eval('(' + result.responseText + ')');
                if (jsonData.result == "success"){
                    MsgTip.msg('写数据库', '成功!',true,1000);
                }
                else{
                    MsgTip.msg('写数据库', '失败!('+ jsonData.err +')');
                }
            },
            failure:function(){
                MsgTip.msg('写数据库', '无数据返回!');
            }
	});
    },
    
    onUpdate: function(editor, e) {
        if (this.hasNullvalue(e.record.data)){
            MsgTip.msg('请检查', '所有字段不能为null!');
            return;
        }
        var changedData = e.record.getChanges();
        var updateArr = new Array();
        for (items in changedData){
            var update = items + '=' + "\"" + changedData[items] + "\"";
            updateArr.push(update);
        }
        if (updateArr.length == 0){
            return;
        }
        
        var originalData = e.record.raw;
        if (this.hasNullvalue(originalData)){      //若原始数据中有null，标示该条数据为新添加数据，需要insert
            var columnsArr = [];
            var valueArr = [];
            for (items in e.record.data){
               columnsArr.push(items);
                valueArr.push("\"" + e.record.data[items] + "\"");
            }      
            var param = {};
            var sqlStr = "INSERT INTO stationbaseinfo (" + columnsArr.toString() + ") VALUES ("+ valueArr.toString() + ")";
            param.type = "insert";
            param.sql = sqlStr;
            this.requestExecute(param);
        }
        else{
            var param = {};
            var sqlStr = "UPDATE stationbaseinfo SET " + updateArr.toString() + " WHERE (company=\""+ originalData.company + "\" AND transName=\"" + originalData.transName +"\")";
            console.log(sqlStr);
            param.type = "update";
            param.sql = sqlStr;
            this.requestExecute(param);
        }
    },
            
    hasNullvalue:function(object){
        nullNum = 0;
        for (items in object){
            if (object[items] == "null"){
                nullNum = nullNum + 1;
            }
        }
        if (nullNum){
            return true;
        }
        else{
            return false;
        }
    }
});
