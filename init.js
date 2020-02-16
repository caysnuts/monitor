function initTotalDataAnalysis(data) {
    $('#table')
        .bootstrapTable({
            data: data,
            search: true,
            pageNumber: 1, //初始化加载第一页
            pagination: true,//是否分页
            sidePagination: 'client',//server:服务器端分页|client：前端分页
            pageSize: 10,//单页记录数
            pageList: [20, 40, 60, 100],//可选择单页记录数
        })
}

function getTotalCount(data) {
    if (data && data.length > 0) {
        return data.map(item => item['估算量'])
            .reduce(reducer);
    }
    return 0
}

function initMaskDataAnalysis(data) {
    //口罩数据
    var maskData = data.filter(item => item['物资类型'] == '口罩');
    //n95口罩数据
    var maskN95Data = maskData.filter(item => item['二级分类'] == 'N95');
    //医用口罩数据
    var maskDoctorData = maskData.filter(item => item['二级分类'] == '医用');
    //口罩总数
    var maskDataTotal = getTotalCount(maskData)
    //N95口罩总数
    var maskN95DataTotal = getTotalCount(maskN95Data)
    //医用口罩总数
    var maskDoctorDataTotal = getTotalCount(maskDoctorData)
    var maskStaticData = [
        {
            '类型': '全部',
            '数量': maskDataTotal,
            '占比': '100 %'
        },
        {
            '类型': 'N95',
            '数量': maskN95DataTotal,
            '占比': Number(maskN95DataTotal * 100 / maskDataTotal)
                .toFixed(2) + ' %'
        },
        {
            '类型': '医用',
            '数量': maskDoctorDataTotal,
            '占比': Number(maskDoctorDataTotal * 100 / maskDataTotal)
                .toFixed(2) + ' %'
        },
    ]
    let staticArray = ['医院', '指挥部', '社区', '卫健局', '方舱', '公司'];
    let staticField = '接收单位类型';
    return {
        totalData: maskData,
        staticData: [
            {
                name: '分类统计',
                type: 'sortByType',
                data: maskStaticData
            },
            {
                name: '所有',
                type: 'all',
                data: staticMaskCommon(maskDataTotal, maskData, staticArray, staticField)
            },
            {
                name: 'N95',
                type: 'N95',
                data: staticMaskCommon(maskN95DataTotal, maskN95Data, staticArray, staticField)
            },
            {
                name: '医用',
                type: 'doctor',
                data: staticMaskCommon(maskDoctorDataTotal, maskDoctorData, staticArray, staticField)
            },
        ]
    }
}

function initSuitDataAnalysis(data) {
    //防护服数据
    var suitData = data.filter(item => item['物资类型'] == '防护服');
    //医用防护服数据
    var suitDoctorData = suitData.filter(item => item['二级分类'] == '医用');
    //防护服总数
    var suitDataTotal = getTotalCount(suitData)
    //医用防护服总数
    var suitDoctorDataTotal = getTotalCount(suitDoctorData)
    var suitStaticData = [
        {
            '类型': '全部',
            '数量': suitDataTotal,
            '占比': '100 %'
        },
        {
            '类型': '医用',
            '数量': suitDoctorDataTotal,
            '占比': Number(suitDoctorDataTotal * 100 / suitDataTotal)
                .toFixed(2) + ' %'
        },
    ]

    return {
        totalData: suitData,
        staticData: [
            {
                name: '分类统计',
                type: 'sortByType',
                data: suitStaticData
            },
            {
                name: '所有',
                type: 'all',
                data: staticMaskCommon(suitDataTotal, suitData, ['医院', '指挥部', '社区', '卫健局', '方舱', '公司'], '接收单位类型')
            },
            {
                name: '医用',
                type: 'doctor',
                data: staticMaskCommon(suitDoctorDataTotal, suitDoctorData, ['医院', '指挥部', '社区', '卫健局', '方舱', '公司'], '接收单位类型')
            },
        ]
    }
}


function initData(data, domId) {
    $(`#${domId}Table`)
        .bootstrapTable({
            data: data.totalData,
            search: true,
            pageNumber: 1, //初始化加载第一页
            pagination: true,//是否分页
            sidePagination: 'client',//server:服务器端分页|client：前端分页
            pageSize: 10,//单页记录数
            pageList: [20, 40, 60, 100],//可选择单页记录数
        })
    for (var i = 0; i < data.staticData.length; i++) {
        $(`#${domId}StaticTitle${i}`)[0].innerText = data.staticData[i].name;
        $(`#${domId}StaticTable${i}`)
            .bootstrapTable({
                data: data.staticData[i].data,
                pageNumber: 1, //初始化加载第一页
                pagination: false,//是否分页
                sidePagination: 'client',//server:服务器端分页|client：前端分页
            })
    }
}

function initHospitalData(data) {
    if (data && data.length > 0) {
        return data.map(item => {
            let name = item['接收单位'];
            if (name.indexOf('金银潭') >= 0) {
                return {
                    ...item,
                    hospitalName: '市金银潭医院'
                }
            } else if (name.indexOf('武昌') >= 0) {
                return {
                    ...item,
                    hospitalName: '市武昌医院'
                }
            } else if (name.indexOf('四医院') >= 0) {
                return {
                    ...item,
                    hospitalName: '市第四医院'
                }
            } else if (name.indexOf('武汉市中心医院') >= 0) {
                return {
                    ...item,
                    hospitalName: '市中心医院'
                }
            } else if (name.indexOf('三医院') >= 0) {
                return {
                    ...item,
                    hospitalName: '市第三医院'
                }
            } else if (name.indexOf('同济') >= 0) {
                return {
                    ...item,
                    hospitalName: '同济'
                }
            } else if (name.indexOf('协和') >= 0) {
                return {
                    ...item,
                    hospitalName: '协和'
                }
            } else if (name.indexOf('省人民医院') >= 0) {
                return {
                    ...item,
                    hospitalName: '省人民医院'
                }
            } else if (name.indexOf('火神山') >= 0) {
                return {
                    ...item,
                    hospitalName: '火神山医院'
                }
            } else if (name.indexOf('一医院') >= 0) {
                return {
                    ...item,
                    hospitalName: '市第一医院'
                }
            } else {
                return {
                    ...item,
                    hospitalName: '全省其他'
                }
            }
        })
    }
}

function initHospitalDataAnalysis(data) {
    //口罩数据
    var maskData = data.filter(item => item['接收单位类型'] == '医院');
    //n95口罩数据
    var maskN95Data = maskData.filter(item => item['二级分类'] == 'N95');
    //医用口罩数据
    var maskDoctorData = maskData.filter(item => item['二级分类'] == '医用');
    //口罩总数
    var maskDataTotal = getTotalCount(maskData)
    //N95口罩总数
    var maskN95DataTotal = getTotalCount(maskN95Data)
    //医用口罩总数
    var maskDoctorDataTotal = getTotalCount(maskDoctorData)
    let staticArray = ['市金银潭医院', '市武昌医院', '市第四医院', '市中心医院', '市第三医院', '同济', '协和', '省人民医院', '火神山医院', '市第一医院', '全省其他'];
    let staticField = 'hospitalName';
    return {
        totalData: maskData,
        staticData: [
            {
                name: '所有',
                type: 'all',
                data: staticMaskCommon(maskDataTotal, maskData, staticArray, staticField)
            },
            {
                name: '医用',
                type: 'doctor',
                data: staticMaskCommon(maskDoctorDataTotal, maskDoctorData, staticArray, staticField)
            },
            {
                name: 'N95',
                type: 'N95',
                data: staticMaskCommon(maskN95DataTotal, maskN95Data, staticArray, staticField)
            },
        ]
    }
}

$.get('./hospital.json', function (data) {
    var newData = data.filter(item => item['开放床位'] > 500)
    $('#hospitalBedTableSuit')
        .bootstrapTable({
            data: newData,
            pageNumber: 1, //初始化加载第一页
            pagination: false,//是否分页
            sidePagination: 'client',//server:服务器端分页|client：前端分页
        })
})


$.when(
    $.get('./0130.json'),
    $.get('./0201.json'),
    $.get('./0202.json'),
    $.get('./0203.json'),
    $.get('./0204.json'),
    $.get('./0206.json'),
    $.get('./0207.json'),
    $.get('./0208.json'),
    $.get('./0209.json'),
    $.get('./0210.json'),
    $.get('./0211.json'),
    $.get('./0212.json'),
    $.get('./0213.json'),
    $.get('./0214.json'),
    $.get('./0215.json'),
)
    .then(function (data_0130, data_0201, data_0202, data_0203, data_0204, data_0206, data_0207, data_0208, data_0209, data_0210, data_0211, data_0212, data_0213, data_0214, data_0215) {
        var data_0130_format = Format(data_0130[0], '1月30日');
        var data_0201_format = Format(data_0201[0], '2月01日');
        var data_0202_format = Format(data_0202[0], '2月02日');
        var data_0203_format = Format(data_0203[0], '2月03日');
        var data_0204_format = Format(data_0204[0], '2月04日');
        var data_0206_format = Format(data_0206[0], '2月06日');
        var data_0207_format = Format(data_0207[0], '2月07日');
        var data_0208_format = Format(data_0208[0], '2月08日');
        var data_0209_format = Format(data_0209[0], '2月09日');
        var data_0210_format = Format(data_0210[0], '2月10日');
        var data_0211_format = Format(data_0211[0], '2月11日');
        var data_0212_format = Format(data_0212[0], '2月12日');
        var data_0213_format = Format(data_0213[0], '2月13日');
        var data_0214_format = Format(data_0214[0], '2月14日');
        var data_0215_format = Format(data_0215[0], '2月15日');
        var data = merge(
            data_0130_format,
            data_0201_format,
            data_0202_format,
            data_0203_format,
            data_0204_format,
            data_0206_format,
            data_0207_format,
            data_0208_format,
            data_0209_format,
            data_0210_format,
            data_0211_format,
            data_0212_format,
            data_0213_format,
            data_0214_format,
            data_0215_format,
        );
        $(function () {
            initTotalDataAnalysis(data);

            var mask = initMaskDataAnalysis(data);
            initData(mask, 'mask')
            var maskHospital = initHospitalDataAnalysis(initHospitalData(mask.totalData))
            initData(maskHospital, 'hospitalMask')
            var suit = initSuitDataAnalysis(data);
            initData(suit, 'suit')
            var suitHospital = initHospitalDataAnalysis(initHospitalData(suit.totalData))
            initData(suitHospital, 'hospitalSuit')

            //初始化图表
        })

        function chartDataInit(datafunc, index) {
            var hospital_data = [];
            var zhihui_data = [];
            var social_data = [];
            var weijianju_data = [];
            var fangcang_data = [];
            var company_data = [];

            function getDaliyData(formatData, index) {
                var static_data = datafunc(formatData).staticData[index].data;
                static_data.map(item => {
                    var count = parseInt(item['数量'].replace(',', ''));
                    if (item['类型'] == '医院') {
                        hospital_data.push(count);
                    } else if (item['类型'] == '指挥部') {
                        zhihui_data.push(count)
                    } else if (item['类型'] == '社区') {
                        social_data.push(count)
                    } else if (item['类型'] == '卫健局') {
                        weijianju_data.push(count)
                    } else if (item['类型'] == '方舱') {
                        fangcang_data.push(count)
                    } else if (item['类型'] == '公司') {
                        company_data.push(count)
                    }
                })
            }

            getDaliyData(data_0130_format, index);
            getDaliyData(data_0201_format, index);
            getDaliyData(data_0202_format, index);
            getDaliyData(data_0203_format, index);
            getDaliyData(data_0204_format, index);
            getDaliyData(data_0206_format, index);
            getDaliyData(data_0207_format, index);
            getDaliyData(data_0208_format, index);
            getDaliyData(data_0209_format, index);
            getDaliyData(data_0210_format, index);
            getDaliyData(data_0211_format, index);
            getDaliyData(data_0212_format, index);
            getDaliyData(data_0213_format, index);
            getDaliyData(data_0214_format, index);
            getDaliyData(data_0215_format, index);
            return {
                '医院': hospital_data,
                '指挥部': zhihui_data,
                '社区': social_data,
                '卫健局': weijianju_data,
                '方舱': fangcang_data,
                '公司': company_data,
            }
        }

        initChart('maskMainChart', chartDataInit(initMaskDataAnalysis, 1))
        initChart('maskMainChartN95', chartDataInit(initMaskDataAnalysis, 2))
        initChart('maskMainChartDoctor', chartDataInit(initMaskDataAnalysis, 3))
        initChart('suitMainChart', chartDataInit(initSuitDataAnalysis, 1))
        initChart('suitMainChartDoctor', chartDataInit(initSuitDataAnalysis, 2))

    })
