define(['ec', 'jquery', 'require'],function(ec,$,reqiure){
    function pieTable(option){
        var _option = $.extend({
            data:[]
        },option);
        this.init(_option);
        var self = this;
        $(window).resize(function() {
            self.mychar.resize();
        });
    }
    pieTable.prototype = {
        init:function(opt){
            $('#'+opt.areaId).empty();
            var div = '<div id="pieTimg" class="pieTable-group-box clearfix"></div>',
                divtit = '<ul class="ptlwrap clearfix"></ul>';
            $('#'+opt.areaId).append(div);
            $('#'+opt.areaId).append(divtit);
            if(!opt.data){
                opt.data = []
            }
            var ecopt = {legend:{
                show:true,
                type:'scroll',
                itemWidth:13,
                itemHeight:13,
                itemGap:30,
                formatter:function(name){
                    for(let i=0;i<opt.data.length;i++){
                        if(opt.data[i].name==name){
                            return {
                                type:'selfcol',
                                texts:[name,opt.data[i].value,opt.data[i].m2m],
                                comcols:['#fff','#f8ffbe'],
                                zifont:18,
                                numfont:10,
                                distance:30,
                                special:3,
                                specialcol:['#5ac246','#e6684e']
                            }
                        }
                    }
                },
                tooltip:{
                    show:true
                },
                textStyle:{
                    color:"#fff",
                    padding:[0,0,0,10],
                    fontSize:18
                },
                data:[]
            },series:[]};
            ecopt.color = ["#0096ff","#ffb42a","#ee6b4f","#4dcacc","#3aa870","#4cc8ca","#1a4e8f"];
            var centers = [['600','160'],['200','160']],colrads = [['70','88'],['70','88']],
                ss = opt.title.split('|'),legtits = ss.slice(1);
            opt.title = ss[0];
            var obj = document.getElementById('pieTimg'),mychar = ec.init(obj);
            this.mychar = mychar;
            if(opt.legendPosition=='left'){
                ecopt.legend = $.extend({
                    orient:'vertical',
                    left:'13%',
                    top:'16%'
                },ecopt.legend);
                $('.ptlwrap').css('left','14%');
                for(let i=0;i<legtits.length;i++){
                    $('.ptlwrap').append('<li>'+legtits[i]+'</li>');
                }
            }else{
                ecopt.legend = $.extend({
                    orient:'vertical',
                    //right:'37%',
                    left:'50%',
                    top:'16%'
                },ecopt.legend);
                $('.ptlwrap').css('left','51%');
                for(let i=0;i<legtits.length;i++){
                    $('.ptlwrap').append('<li>'+legtits[i]+'</li>');
                }
                opt.legendPosition='right';
            }
            if(opt.data.length!=0){
                var allnum = 0;
                $('.ptlwrap').css('display','block');
                for(let i=0;i<opt.data.length;i++){
                    allnum = allnum + (+opt.data[i].value);
                    ecopt.legend.data.push({
                        name:opt.data[i].name,
                        icon:'rect'
                    })
                    let clname = opt.data[i].m2m.charAt(0)=='-'?'icon-jiantou1-copy-copy':'icon-shangjiantou';
                    let nums = opt.data[i].m2m.charAt(0)=='-'?opt.data[i].m2m.substring(1):opt.data[i].m2m;
                    let gredpd = opt.data[i].m2m.charAt(0)=='-'?'grfonts':'redfonts';
                }
                ecopt.series.push({
                    type:'pie',
                    center:opt.legendPosition=='left'?centers[0]:centers[1],
                    radius:['100','140'],
                    label:{
                        normal:{
                            formatter:'{d}'+'%',
                            position:'inside',
                            fontSize:'14',
                            textStyle:{color:'#fff'}
                        }
                    },
                    labelLine:{
                        normal:{show:false,length:5,length2:2}
                    },
                    data:opt.data
                })
                ecopt.series.push({
                    type:'pie',
                    center:opt.legendPosition=='left'?centers[0]:centers[1],
                    radius:['100'],
                    z:1,
                    label:{
                        normal:{
                            position:'center',
                            formatter:'{b}',
                            fontSize:'24',
                            textStyle:{color:'#d1d2d3'}
                        }
                    },
                    itemStyle:{
                        normal:{
                            color:'#041121',
                            opacity:0.7
                        }
                    },
                    data:[{name:opt.title,value:allnum}]
                })
            }else{
                ecopt.color = ['#ccc'];
                ecopt.series.push({
                    type:'pie',
                    center:['440','160'],
                    radius:['100','130'],
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
                    center:['440','160'],
                    radius:['100'],
                    z:1,
                    label:{
                        normal:{
                            position:'center',
                            formatter:'{b}',
                            fontSize:'20',
                            textStyle:{color:'#cccdce'}
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
    pieTable.prototype.constructor = pieTable;
    return pieTable;
})
