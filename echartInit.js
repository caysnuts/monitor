function initChart(domId,data){
    var myChart = echarts.init(document.getElementById(domId));
    var option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['医院', '指挥部', '社区', '卫健局', '方舱', '公司']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['0130', '0201', '0202', '0203', '0204', '0206', '0207', '0208', '0209', '0210', '0211', '0212', '0213', '0214']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '医院',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: data['医院']
            },
            {
                name: '指挥部',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: data['指挥部']
            },
            {
                name: '社区',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: data['社区']
            },
            {
                name: '卫健局',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: data['卫健局']
            },
            {
                name: '方舱',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: data['方舱']
            }, {
                name: '公司',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: data['公司']
            }
        ]
    };
    myChart.setOption(option);

}
