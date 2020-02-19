var  staticCompanyArray = ['医院', '指挥部', '社区', '卫健局', '方舱', '公司','疾控中心','共青团','东湖风景区管委会']


var staticHospitalArray = [
    '同济',
    '市第一医院',
    '火神山医院',
    '协和',
    '省人民医院',
    '市金银潭医院',
    '市第三医院',
    '市第四医院',
    '市中心医院',
    '市武昌医院',
    '市第六医院',
    '雷神山医院',
    '武汉亚心总院',
    '市第五医院',
    '黄陂区中医医院',
    '市第九医院',
    '省中西医结合医院',
    '市汉口医院',
    '市红十字会医院',
    '蔡甸区妇幼保健院',
    '天佑医院',
    '省中医医院',
    '市中医医院',
    '六七二医院',
    '市紫荆医院',
    '解放军中部战区总医院',
    '市第七医院',
    '新洲区中医医院',
    '市第八医院',
    '儿童医院',
    '江夏区中医医院',
    '武钢二医院',
    '省第三人民医院',
    '市肺科医院',
    '市优抚医院',
    '市新城医院',
    '其他非定点医院'];

var staticDistrictArray = [
    '江岸',
    '江汉',
    '硚口',
    '汉阳',
    '武昌',
    '青山',
    '蔡甸',
    '江夏',
    '黄陂',
    '新洲',
    '东西湖',
    '汉南',
    '东湖高新',
    '东湖风景',
]

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
    let staticArray = staticCompanyArray
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
                data: staticMaskCommon(suitDataTotal, suitData, staticCompanyArray, '接收单位类型')
            },
            {
                name: '医用',
                type: 'doctor',
                data: staticMaskCommon(suitDoctorDataTotal, suitDoctorData, staticCompanyArray, '接收单位类型')
            },
        ]
    }
}

function initGlovesDataAnalysis(data) {
    //手套数据
    var glovesData = data.filter(item => item['物资类型'] == '手套');
    //医用手套数据
    var glovesDoctorData = glovesData.filter(item => item['二级分类'] == '医用');
    //手套总数
    var glovesDataTotal = getTotalCount(glovesData)
    //医用手套总数
    var glovesDoctorDataTotal = getTotalCount(glovesDoctorData)
    var glovesStaticData = [
        {
            '类型': '全部',
            '数量': glovesDataTotal,
            '占比': '100 %'
        },
        {
            '类型': '医用',
            '数量': glovesDoctorDataTotal,
            '占比': Number(glovesDoctorDataTotal * 100 / glovesDataTotal)
                .toFixed(2) + ' %'
        },
    ]

    return {
        totalData: glovesData,
        staticData: [
            {
                name: '分类统计',
                type: 'sortByType',
                data: glovesStaticData
            },
            {
                name: '所有',
                type: 'all',
                data: staticMaskCommon(glovesDataTotal, glovesData, staticCompanyArray, '接收单位类型')
            },
            {
                name: '医用',
                type: 'doctor',
                data: staticMaskCommon(glovesDoctorDataTotal, glovesDoctorData, staticCompanyArray, '接收单位类型')
            },
        ]
    }
}
function initGoggleDataAnalysis(data) {
    //手套数据
    var goggleData = data.filter(item => item['物资类型'] == '护目镜');
    //手套总数
    var goggleDataTotal = getTotalCount(goggleData)
    var goggleStaticData = [
        {
            '类型': '全部',
            '数量': goggleDataTotal,
            '占比': '100 %'
        },
        {
            '类型': '医用',
            '数量': goggleDataTotal,
            '占比': Number(goggleDataTotal * 100 / goggleDataTotal)
                .toFixed(2) + ' %'
        },
    ]

    return {
        totalData: goggleData,
        staticData: [
            {
                name: '分类统计',
                type: 'sortByType',
                data: goggleStaticData
            },
            {
                name: '所有',
                type: 'all',
                data: staticMaskCommon(goggleDataTotal, goggleData, staticCompanyArray, '接收单位类型')
            },
        ]
    }
}
function initPurifierDataAnalysis(data) {
    //手套数据
    var goggleData = data.filter(item => item['物资类型'] == '空气净化器');
    //手套总数
    var goggleDataTotal = getTotalCount(goggleData)
    var goggleStaticData = [
        {
            '类型': '全部',
            '数量': goggleDataTotal,
            '占比': '100 %'
        },
        {
            '类型': '医用',
            '数量': goggleDataTotal,
            '占比': Number(goggleDataTotal * 100 / goggleDataTotal)
                .toFixed(2) + ' %'
        },
    ]

    return {
        totalData: goggleData,
        staticData: [
            {
                name: '分类统计',
                type: 'sortByType',
                data: goggleStaticData
            },
            {
                name: '所有',
                type: 'all',
                data: staticMaskCommon(goggleDataTotal, goggleData, staticCompanyArray, '接收单位类型')
            },
        ]
    }
}
function initDisinfectantDataAnalysis(data) {
    //手套数据
    var goggleData = data.filter(item => item['物资类型'] == '消毒液');
    //手套总数
    var goggleDataTotal = getTotalCount(goggleData)
    var goggleStaticData = [
        {
            '类型': '全部',
            '数量': goggleDataTotal,
            '占比': '100 %'
        },
        {
            '类型': '医用',
            '数量': goggleDataTotal,
            '占比': Number(goggleDataTotal * 100 / goggleDataTotal)
                .toFixed(2) + ' %'
        },
    ]

    return {
        totalData: goggleData,
        staticData: [
            {
                name: '分类统计',
                type: 'sortByType',
                data: goggleStaticData
            },
            {
                name: '所有',
                type: 'all',
                data: staticMaskCommon(goggleDataTotal, goggleData, staticCompanyArray, '接收单位类型')
            },
        ]
    }
}
function initShoeDataAnalysis(data) {
    //手套数据
    var goggleData = data.filter(item => item['物资类型'] == '鞋套');
    //手套总数
    var goggleDataTotal = getTotalCount(goggleData)
    var goggleStaticData = [
        {
            '类型': '全部',
            '数量': goggleDataTotal,
            '占比': '100 %'
        },
        {
            '类型': '医用',
            '数量': goggleDataTotal,
            '占比': Number(goggleDataTotal * 100 / goggleDataTotal)
                .toFixed(2) + ' %'
        },
    ]

    return {
        totalData: goggleData,
        staticData: [
            {
                name: '分类统计',
                type: 'sortByType',
                data: goggleStaticData
            },
            {
                name: '所有',
                type: 'all',
                data: staticMaskCommon(goggleDataTotal, goggleData, staticCompanyArray, '接收单位类型')
            },
        ]
    }
}

function initData(data, domId) {
    $(`#${domId}Table`)
        .bootstrapTable({
            data: data.totalData,
            search: true,
            sortable: true,
            sortName: '估算量',                    // 设置默认排序为 name
            sortOrder: "desc",
            pageNumber: 1, //初始化加载第一页
            pagination: true,//是否分页
            sidePagination: 'client',//server:服务器端分页|client：前端分页
            pageSize: 10,//单页记录数
            pageList: [20, 40, 60, 100],//可选择单页记录数
        })
    for (var i = 0; i < data.staticData.length; i++) {
        $(`#${domId}StaticTitle${i}`)[0] && ($(`#${domId}StaticTitle${i}`)[0].innerText = data.staticData[i].name)
        $(`#${domId}StaticTable${i}`)
            .bootstrapTable({
                data: data.staticData[i].data.sort((a, b) => {
                    return parseFloat(b['占比'].replace('%', '')) - parseFloat(a['占比'].replace('%', ''))
                }),
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
            var hospitalNameFinal = '其他非定点医院';
            staticHospitalArray.map(hospitalName => {
                if (name.indexOf(hospitalName) >= 0) {
                    hospitalNameFinal = hospitalName
                } else if (name.indexOf(
                    hospitalName
                        .replace('市', '')
                        .replace('第', '')
                        .replace('医院', '')
                        .replace('总院', '')
                        .replace('武汉', '')
                ) >= 0) {
                    hospitalNameFinal = hospitalName
                }
            })
            if (hospitalNameFinal == '市中医医院' && name.indexOf('市中医医院') >= 0) {
                hospitalNameFinal = '市中医医院'
            } else if (hospitalNameFinal == '市中医医院' && name.indexOf('市中医院') >= 0) {
                hospitalNameFinal = '市中医医院'
            } else if (hospitalNameFinal == '市中医医院' && name.indexOf('省中医院') >= 0) {
                hospitalNameFinal = '省中医医院'
            } else if (hospitalNameFinal == '市中医医院' && name.indexOf('省中医医院') >= 0) {
                hospitalNameFinal = '省中医医院'
            } else if (hospitalNameFinal == '市中医医院' && name.indexOf('黄陂区中医院') >= 0) {
                hospitalNameFinal = '黄陂区中医医院'
            } else if (hospitalNameFinal == '市中医医院' && name.indexOf('新洲区中医院') >= 0) {
                hospitalNameFinal = '新洲区中医医院'
            } else if (hospitalNameFinal == '市中医医院' && name.indexOf('江夏区中医院') >= 0) {
                hospitalNameFinal = '江夏区中医医院'
            } else if (hospitalNameFinal == '市中医医院' && name.indexOf('汉南区中医院') >= 0) {
                hospitalNameFinal = '汉南区中医医院'
            } else if (hospitalNameFinal == '市中医医院' && name.indexOf('中医') >= 0) {
                hospitalNameFinal = '其他中医医院'
            }
            if (hospitalNameFinal == '其他非定点医院' && name.indexOf('672') >= 0) {
                hospitalNameFinal = '六七二医院'
            }
            if (hospitalNameFinal == '市第七医院' && name.indexOf('六七二') >= 0) {
                hospitalNameFinal = '六七二医院'
            }
            if (hospitalNameFinal == '市第六医院' && name.indexOf('六七二') >= 0) {
                hospitalNameFinal = '六七二医院'
            }
            if (hospitalNameFinal == '市第二医院' && name.indexOf('六七二') >= 0) {
                hospitalNameFinal = '六七二医院'
            }
            if (hospitalNameFinal == '市第三医院' && name.indexOf('省第三医院') >= 0) {
                hospitalNameFinal = '省第三医院'
            }
            return {
                ...item,
                hospitalName: hospitalNameFinal
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
    let staticField = 'hospitalName';
    let staticHospitalArrayFinal = [...staticHospitalArray, '其他中医医院']
    return {
        totalData: maskData,
        staticData: [
            {
                name: '所有',
                type: 'all',
                data: staticMaskCommon(maskDataTotal, maskData, staticHospitalArrayFinal, staticField)
            },
            {
                name: '医用',
                type: 'doctor',
                data: staticMaskCommon(maskDoctorDataTotal, maskDoctorData, staticHospitalArrayFinal, staticField)
            },
            {
                name: 'N95',
                type: 'N95',
                data: staticMaskCommon(maskN95DataTotal, maskN95Data, staticHospitalArrayFinal, staticField)
            },
        ]
    }
}

function initDistrictDataAnalysis(data) {
    var maskData = data.filter(item => item['物资类型'] == '口罩')
    var suitData = data.filter(item => item['物资类型'] == '防护服')
    let staticArray = [...staticDistrictArray, '-'];
    let staticField = '区';
    return {
        staticData: [
            {
                name: '所有物资',
                type: 'all',
                data: staticMaskCommon(getTotalCount(data), data, staticArray, staticField)
            },
            {
                name: '口罩',
                type: 'mask',
                data: staticMaskCommon(getTotalCount(maskData), maskData, staticArray, staticField)
            },
            {
                name: '防护服',
                type: 'mask',
                data: staticMaskCommon(getTotalCount(suitData), suitData, staticArray, staticField)
            },

        ]
    }
}

$.get('./hospital.json', function (data) {
    var newData = data.sort((a, b) => {
        return parseInt(b['开放床位']) - parseInt(a['开放床位'])
    })
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
    $.get('./0217.json'),
    $.get('./0218.json'),
)
    .then(function (data_0130, data_0201, data_0202, data_0203, data_0204, data_0206, data_0207,
                    data_0208, data_0209, data_0210, data_0211, data_0212, data_0213, data_0214,
                    data_0215,data_0217,data_0218) {
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
        var data_0217_format = Format(data_0217[0], '2月17日');
        var data_0218_format = Format(data_0218[0], '2月18日');
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
            data_0217_format,
            data_0218_format,
        );
        $(function () {
            initTotalDataAnalysis(data);
            var district = initDistrictDataAnalysis(data.filter(item => item['市'] == '武汉市' && item['接收单位类型'] != '医院'));
            initData(district, 'district')

            var mask = initMaskDataAnalysis(data);
            initData(mask, 'mask')

            var suit = initSuitDataAnalysis(data);
            initData(suit, 'suit')

            var gloves = initGlovesDataAnalysis(data);
            initData(gloves, 'gloves')

            var goggle = initGoggleDataAnalysis(data);
            initData(goggle, 'goggle')

            var purifier = initPurifierDataAnalysis(data);
            initData(purifier, 'purifier')

            var disinfectant = initDisinfectantDataAnalysis(data);
            initData(disinfectant, 'disinfectant')

            var shoe = initShoeDataAnalysis(data);
            initData(shoe, 'shoe')

            var maskHospitalData = mask.totalData.filter(item => item['接收单位类型'] == '医院' && item['市'] == '武汉市')
            var suitHospitalData = suit.totalData.filter(item => item['接收单位类型'] == '医院' && item['市'] == '武汉市')
            var suitHospital = initHospitalDataAnalysis(initHospitalData(suitHospitalData))
            initData(suitHospital, 'hospitalSuit')
            var maskHospital = initHospitalDataAnalysis(initHospitalData(maskHospitalData))
            initData(maskHospital, 'hospitalMask')

            $('#hospitalTable')
                .bootstrapTable({
                    data: merge(maskHospitalData, suitHospitalData),
                    search: true,
                    pageNumber: 1, //初始化加载第一页
                    pagination: true,//是否分页
                    sidePagination: 'client',//server:服务器端分页|client：前端分页
                    pageSize: 10,//单页记录数
                    pageList: [20, 40, 60, 100],//可选择单页记录数
                })
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
                    var count = parseInt(item['数量'].replace(/,/g, ''));
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
            getDaliyData(data_0217_format, index);
            getDaliyData(data_0218_format, index);
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
        initChart('glovesMainChart', chartDataInit(initGlovesDataAnalysis, 1))
        initChart('glovesMainChartDoctor', chartDataInit(initGlovesDataAnalysis, 2))
        initChart('goggleMainChart', chartDataInit(initGoggleDataAnalysis, 1))
        initChart('purifierMainChart', chartDataInit(initPurifierDataAnalysis, 1))
        initChart('disinfectantMainChart', chartDataInit(initDisinfectantDataAnalysis, 1))
        initChart('shoeMainChart', chartDataInit(initShoeDataAnalysis, 1))

    })
