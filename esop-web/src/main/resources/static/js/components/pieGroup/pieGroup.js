define(['ec', 'jquery', 'require'],function(ec,$,reqiure){
    function pieGroup(option){
        var _option = $.extend({
            data:{
                series:[]
            }
        },option);
        this.init(_option);
        var self = this;
        $(window).resize(function() {
            self.mychar.resize();
        });
    }
    pieGroup.prototype = {
        init:function(opt){
            $('#'+opt.areaId).empty();
            var div = '<div id="piecimg" class="pies-group-box clearfix"></div>';
            $('#'+opt.areaId).append(div);
            if(!opt.data.series){
                opt.data.series = []
            }
            var obj = document.getElementById('piecimg'),mychar = ec.init(obj);
            this.mychar = mychar;
            var ecopt = {title:{
                text:opt.data.series.length==0?'没有数据':opt.title?opt.title:'',
                top:8,
                left:45,
                textStyle:{
                    color:'#fff',
                    fontSize:20,
                    fontFamily:'sans-serif',
                    fontWeight:'normal'
                }
            },legend:{
                show:true,
                itemWidth:10,
                itemHeight:10,
                formatter:'{name}',
                textStyle:{color:"#fff",padding:[0,0,0,5]},
                data:[]
            },series:[]};
            if(!!opt.data.legend){
                for(let i=0;i<opt.data.legend.length;i++){
                    ecopt.legend.data.push({
                        name:opt.data.legend[i],
                        icon:'rect'
                    })
                }
            }
            if(opt.data.series.length>0){
                opt.data.series.length>4?opt.data.series = opt.data.series.slice(0,4):'';
                ecopt.color = ["#0095fe","#fdb32a","#ec6a4f","#4cc8ca","#3aa770","#1a4e8f"];
                for(let i=0;i<opt.data.series.length;i++){
                    for(let j=0;j<opt.data.series[i].value.length;j++){
                        let num = opt.data.series[i].value[j];
                        opt.data.series[i].value[j] = {
                            name:opt.data.legend[j],
                            value:num
                        }
                    }
                }
                var circenter = [],neiradius = [],wairadius = [];
                ecopt.legend.orient = opt.legstyle?opt.legstyle:'vertical';
                if(opt.legendPosition && opt.legendPosition.length == 2){
                    ecopt.legend.left = opt.legendPosition[0];
                    ecopt.legend.top = opt.legendPosition[1];
                    var cirwidth = parseFloat($('.pies-group-box').css('width')),
                        consheig = parseFloat($('.pies-group-box').css('height'));
                    //图例上下情况（不管宽）
                    if(opt.legstyle=='horizontal'){
                        var heiline = parseFloat($('.pies-group-box').css('height'))/2,circomhei=0,cenbase=cirwidth/opt.data.series.length,fircen=cenbase/2;
                        //图例在上面
                        if(opt.legendPosition[1]<=heiline){
                            circomhei = (consheig-opt.legendPosition[1])/2+opt.legendPosition[1];
                        }else{
                            circomhei = (consheig-(consheig-opt.legendPosition[1])+10)/2;
                        }
                        for(let i=0;i<opt.data.series.length;i++){
                            if(i==0){
                                circenter.push([fircen,circomhei])
                            }else{
                                circenter.push([fircen+(i*cenbase),circomhei])
                            }
                        }
                    //图例左右情况（不管高）
                    }else{
                        var widline = cirwidth/2,
                            cirbase = (cirwidth-opt.legendPosition[0])/opt.data.series.length,
                            firscen = cirbase/2,
                            heigs = (consheig-15)/2;
                        if(opt.legendPosition[0]<=widline){
                            cirbase = (cirwidth-opt.legendPosition[0]-85)/opt.data.series.length
                            firscen = firscen+opt.legendPosition[0]+85;
                        }else{
                            cirbase = (cirwidth-(cirwidth-opt.legendPosition[0]))/opt.data.series.length;
                            firscen = cirbase/2+5;
                        }
                        for(let i=0;i<opt.data.series.length;i++){
                            if(i==0){
                                circenter.push([firscen,heigs]);
                            }else{
                                circenter.push([firscen+(i*cirbase),heigs])
                            }
                        }
                    }
                }else{
                    ecopt.legend.orient = 'vertical';
                    ecopt.legend.right = '4%';
                    ecopt.legend.top = '30%';
                    if(opt.data.series.length==1){
                        circenter = [['430','190']];
                    }else if(opt.data.series.length==2){
                        circenter = [[250,180],[570,180]];
                    }else if(opt.data.series.length==3){
                        circenter = [[140,180],[390,180],[640,180]];
                    }else if(opt.data.series.length==4){
                        circenter = [[105,190],[295,190],[486,190],[675,190]];
                    }
                }
                if(opt.data.series.length==1 || opt.data.series.length==2){
                    wairadius = ['60','78'];neiradius = ['88'];
                }else if(opt.data.series.length==3){
                    wairadius = ['55','73'];neiradius = ['83'];
                }else if(opt.data.series.length==4){
                    wairadius = ['35','45'];neiradius = ['55'];
                }
                // var datatwo = {
                //     left:[[310,180],[620,180]],
                //     right:[[250,180],[570,180]],
                //     top:[[270,180],[610,180]],
                //     bottom:[[270,180],[610,180]]
                // },datathr = {
                //     left:[[235,180],[485,180],[735,180]],
                //     right:[[140,180],[390,180],[640,180]],
                //     top:[[170,190],[440,190],[710,190]],
                //     bottom:[[170,180],[440,180],[710,180]]
                // },datafour = {
                //     left:[[205,190],[395,190],[585,190],[775,190]],
                //     right:[[105,190],[295,190],[486,190],[675,190]],
                //     top:[[118,190],[333,190],[548,190],[763,190]],
                //     bottom:[[118,190],[333,190],[548,190],[763,190]]
                // };
                //环图数据
                for(let i=0;i<opt.data.series.length;i++){
                    ecopt.series.push({
                        type:'pie',
                        center:circenter[i],
                        radius:wairadius,
                        label:{
                            normal:{
                                formatter:'{d}'+'%',
                                fontSize:14
                            }
                        },
                        labelLine:{
                            normal:{show:false,length:5,length2:2}
                        },
                        data:opt.data.series[i].value
                    })
                    ecopt.series.push({
                        type:'pie',
                        center:circenter[i],
                        radius:neiradius,
                        z:1,
                        label:{
                            normal:{
                                formatter:'{b}',
                                position:'center',
                                color:'#cccdce',
                                fontSize:24
                            }
                        },
                        itemStyle:{
                            normal:{
                                color:'#041121',
                                opacity:0.7
                            }
                        },
                        data:[{name:opt.data.series[i].title,value:100}]
                    })
                }
            }else{
                ecopt.color = ['#ccc'];
                ecopt.series.push({
                    type:'pie',
                    center:['430','190'],
                    radius:['60','78'],
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
            }
            mychar.setOption(ecopt);
        }
    };
    pieGroup.prototype.constructor = pieGroup;
    return pieGroup;
})
