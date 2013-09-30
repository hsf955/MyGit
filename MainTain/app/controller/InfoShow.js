Ext.define('Pandora.controller.InfoShow', {
    extend: 'Ext.app.Controller',
    stores: ['AreaStore','GridStore'],//声明该控制层要用到的store  
    models: ['AreaModel','GridModel'],//声明该控制层要用到的model  
  views: ['AreaTree','GridTree','TreeTabPanel','InfoPanel'],//声明该控制层要用到的view  
    refs: [//相当于一个映射,这样就可以在控制层方便的通过geter取得相应的对象了
        {ref: 'areatree',selector: 'areatree'},
        {ref: 'gridtree',selector: 'gridtree'},
        {ref: 'treetab',selector: 'treetab'},
        {ref: 'infopanel',selector: 'infopanel'}
    ],
    init: function() {
        this.control({
            'infopanel #submitbt':{
    		click: this.onSubmitbt
            }     
        });
        this.getAreaStoreStore().on('load',this.onareatreeLoad,this);
    },
    
    onareatreeLoad: function() {
        var curtree = this.getTreetab().getActiveTab();
	var recs = curtree.getChecked();
	var stationNamebuf = [];
	Ext.Array.each(recs,function(rec){
            if (rec.raw.level === 3){
		stationNamebuf.push(rec.raw.text);
            }
	});
	if (stationNamebuf.length > 0){
            this.submitReport(curtree,stationNamebuf);
	}
    },
    
    onSubmitbt: function() {
        var curtree = this.getTreetab().getActiveTab();
	var recs = curtree.getChecked();
	var stationNamebuf = [];
	Ext.Array.each(recs,function(rec){
            if (rec.raw.level === 3){
		stationNamebuf.push(rec.raw.text);
            }
	});
	if (stationNamebuf.length > 0){
            this.submitReport(curtree,stationNamebuf);
	}
	else{
            Ext.Msg.alert("提示", "没有厂站被选择!");
	}
    },
    
    submitReport: function(curtree,stationNameArr){
	var value = {};
	value.reporttype = 6;
	value.treetype = curtree.treeType;
	value.stationlist = stationNameArr;
	var params = Ext.JSON.encode(value);
	var reporturl = '/WebReport/NRReportServer?reportlet=com.narirelays.report.reportlet.DaTangReportlet&op=view&params='+params;
	document.getElementById('id_reportletpanel').src=reporturl;
    }
});

