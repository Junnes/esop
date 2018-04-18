define(['ec', 'jquery', 'require'],function(ec,$,reqiure){
    function piePlus(option){
        var _option = $.extend({
            data:[]
        },option);
        this.init(_option);
        var self = this;
        $(window).resize(function() {
            self.mychar.resize();
        });
    }
    piePlus.prototype = {
        init:function(opt){
            $('#'+opt.areaId).empty();
            var div = '<div id="piePimg" class="piePlus-group-box clearfix"></div>';
            $('#'+opt.areaId).append(div);
            if(!opt.data){
                opt.data = []
            }
            var fun = function(name){
                for(let i=0;i<opt.data.length;i++){
                    if(opt.data[i].name == name){
                        return opt.data[i].value
                    }
                }
            }
            var ecopt = {legend:{
                show:true,
                type:'scroll',
                itemWidth:10,
                itemHeight:10,
                formatter:function(name){
                    for(let i=0;i<opt.data.length;i++){
                        if(opt.data[i].name == name){
                            return {
                                type:'selfcol',
                                texts:[name,opt.data[i].value],
                                comcols:['#fff','#f8ffbe'],
                                zifont:12,
                                numfont:10,
                                distance:20
                            }
                        }
                    }
                },
                tooltip:{show:true},
                textStyle:{
                    color:"#ccced2",
                    padding:[0,0,0,3]
                },
                data:[]
            },series:[]};
            ecopt.color = ["#0095fe","#fdb32a","#ec6a4f","#3aa770","#72fff7","#4cc8ca","#1a4e8f"];
            var centers = [['250','170'],['360','150'],['170','150'],['250','140']],
                colrads = [['70','96'],['60','86']],
                wcenter = [['110','115'],['100','105']];
            var obj = document.getElementById('piePimg'),mychar = ec.init(obj);
            this.mychar = mychar;
            if(opt.legendPosition=='right'){
                ecopt.legend = $.extend({
                    orient:'vertical',
                    itemGap:20,
                    left:'61%',
                    top:'23%'
                },ecopt.legend);
            }else if(opt.legendPosition=='left'){
                ecopt.legend = $.extend({
                    orient:'vertical',
                    itemGap:20,
                    left:'10%',
                    top:'23%'
                },ecopt.legend);
            }else if(opt.legendPosition=='top'){
                ecopt.legend = $.extend({
                    orient:'vertical',
                    itemGap:20,
                    left:'61%',
                    top:'23%'
                },ecopt.legend);
                opt.legendPosition='right';
                /*ecopt.legend = $.extend({
                    orient:'horizontal',
                    left:'5%',
                    top:'8%'
                },ecopt.legend);*/
            }else if(opt.legendPosition=='bottom'){
                ecopt.legend = $.extend({
                    orient:'vertical',
                    itemGap:20,
                    left:'61%',
                    top:'23%'
                },ecopt.legend);
                opt.legendPosition='right';
                /*ecopt.legend = $.extend({
                    orient:'horizontal',
                    left:'5%',
                    bottom:'8%'
                },ecopt.legend);*/
            }else{
                ecopt.legend = $.extend({
                    orient:'vertical',
                    itemGap:20,
                    right:'13%',
                    top:'23%'
                },ecopt.legend);
                opt.legendPosition='right';
            }
            if(opt.data.length!=0){
                var neidata = opt.data.slice(0,opt.data.length-1),
                    waidata = opt.data.slice(opt.data.length-1),
                    znum = 0;
                for(let i=0;i<opt.data.length;i++){
                    znum = znum + (+opt.data[i].value);
                    ecopt.legend.data.push({
                        name:opt.data[i].name,
                        icon:'rect'
                    })
                }
                waidata.push({
                    value:znum-(+waidata[0].value),
                    itemStyle:{
                        normal:{
                            color:'#071829',
                            opacity:0.8
                        },
                        emphasis:{
                            color:'#071829'
                        }
                    }
                });
                ecopt.series.push({
                    type:'pie',
                    center:opt.legendPosition=='top'?centers[0]:opt.legendPosition=='left'?centers[1]:opt.legendPosition=='right'?centers[2]:centers[3],
                    radius:opt.legendPosition=='top'?colrads[1]:opt.legendPosition=='bottom'?colrads[1]:colrads[0],
                    label:{
                        normal:{
                            formatter:'{d}'+'%',
                            position:'inside',
                            fontSize:'12',
                            textStyle:{color:'#fff'}
                        }
                    },
                    labelLine:{
                        normal:{show:false,length:5,length2:2}
                    },
                    data:neidata
                })
                ecopt.series.push({
                    type:'pie',
                    center:opt.legendPosition=='top'?centers[0]:opt.legendPosition=='left'?centers[1]:opt.legendPosition=='right'?centers[2]:centers[3],
                    radius:opt.legendPosition=='top'?['60']:opt.legendPosition=='bottom'?['60']:['70'],
                    z:1,
                    label:{
                        normal:{
                            position:'center',
                            formatter:[
                                '{a|{c}}',
                                '{b|{b}}'
                            ].join('\n\n'),
                            rich:{
                                a:{
                                    color:'#f8ffbe',
                                    fontSize:24
                                },
                                b:{
                                    color:'#fff',
                                    fontSize:16
                                }
                            }
                        }
                    },
                    itemStyle:{
                        normal:{
                            color:'#041121',
                            opacity:0.7
                        }
                    },
                    data:[{name:opt.title,value:znum}]
                })
                ecopt.series.push({
                    type:'pie',
                    hoverAnimation:false,
                    center:opt.legendPosition=='top'?centers[0]:opt.legendPosition=='left'?centers[1]:opt.legendPosition=='right'?centers[2]:centers[3],
                    radius:opt.legendPosition=='top'?wcenter[1]:opt.legendPosition=='bottom'?wcenter[1]:wcenter[0],
                    label:{
                        normal:{show:false}
                    },
                    labelLine:{
                        normal:{show:false,length:5,length2:2}
                    },
                    data:waidata
                })
            }else{
                ecopt.color = ['#ccc'];
                ecopt.series.push({
                    type:'pie',
                    center:['270','140'],
                    radius:['70','88'],
                    hoverAnimation:false,
                    labelLine:{
                        normal:{show:false}
                    },
                    itemStyle:{
                        normal:{color:"#ccc"},
                        emphasis:{color:"#ccc"}
                    },
                    data:[{
                        value:30
                    }]
                })
                ecopt.series.push({
                    type:'pie',
                    center:['270','140'],
                    radius:['70'],
                    z:1,
                    label:{
                        normal:{
                            position:'center',
                            formatter:[
                                '{b|{b}}'
                            ].join('\n\n'),
                            rich:{
                                b:{
                                    color:'#cccdce',
                                    fontSize:16
                                }
                            }
                        }
                    },
                    itemStyle:{
                        normal:{
                            color:'#041121',
                            opacity:0.7
                        }
                    },
                    data:[{name:'没有数据',value:0}]
                })
            }
            mychar.setOption(ecopt);
        }
    };
    piePlus.prototype.constructor = piePlus;
    return piePlus;
})
