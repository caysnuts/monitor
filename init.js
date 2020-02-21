var staticCompanyArray = ['医院', '指挥部', '社区', '卫健局', '方舱', '公司',
    '疾控中心', '急救中心', '武汉市民政局', '生态环境局', '应急储备中心', '共青团', '东湖风景区管委会']


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

function rowStyle(row, index){
    if (row['类型'] == '指挥部' || row['类型'] == '卫健局') {
        return {
            css: {
                color: 'red'
            }
        }
    }
    if (parseFloat(row['占比'].replace("%","")) >= 10) {
        console.log(parseFloat(row['占比'].replace("%","")))
        return {
            css: {
                'font-weight': '600'
            }
        }
    }
    return {
        css: {}
    }
}

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
                data: staticForCommonNoZero(maskDataTotal, maskData, staticArray, staticField)
            },
            {
                name: 'N95',
                type: 'N95',
                data: staticForCommonNoZero(maskN95DataTotal, maskN95Data, staticArray, staticField)
            },
            {
                name: '医用',
                type: 'doctor',
                data: staticForCommonNoZero(maskDoctorDataTotal, maskDoctorData, staticArray, staticField)
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
                data: staticForCommonNoZero(suitDataTotal, suitData, staticCompanyArray, '接收单位类型')
            },
            {
                name: '医用',
                type: 'doctor',
                data: staticForCommonNoZero(suitDoctorDataTotal, suitDoctorData, staticCompanyArray, '接收单位类型')
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
                data: staticForCommonNoZero(glovesDataTotal, glovesData, staticCompanyArray, '接收单位类型')
            },
            {
                name: '医用',
                type: 'doctor',
                data: staticForCommonNoZero(glovesDoctorDataTotal, glovesDoctorData, staticCompanyArray, '接收单位类型')
            },
        ]
    }
}

function initTypeDataAnalysis(data, type) {
    //数据
    var goggleData = data.filter(item => item['物资类型'] == type);
    //总数
    var goggleDataTotal = getTotalCount(goggleData)
    return {
        totalData: goggleData,
        staticData: [
            {
                name: '所有',
                type: 'all',
                data: staticForCommonNoZero(goggleDataTotal, goggleData, staticCompanyArray, '接收单位类型')
            },
        ]
    }
}

function initTypeDataAnalysisForTime(data, type) {
    //数据
    var goggleData = data.filter(item => item['物资类型'] == type);
    //总数
    var goggleDataTotal = getTotalCount(goggleData)
    return {
        totalData: goggleData,
        staticData: [
            {
                name: '所有',
                type: 'all',
                data: staticForCommonTime(goggleDataTotal, goggleData, staticCompanyArray, '接收单位类型')
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
            sortOrder: 'desc',
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
                rowStyle:rowStyle
            })
    }
}

function initDataCommon(data, domId, name) {
    let html =
        `<h3>总数量统计</h3>
            <div class="static">
                <div>
                    <table 
                    id="${domId}StaticTable0" 
                    style="width: 700px"
                    >
                        <thead>
                        <tr>
                            <th data-field="类型">类型</th>
                            <th data-field="数量">数量</th>
                            <th data-field="占比">占比</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>

            <h3>${name} 明细查询</h3>
            <div>
                <table id="${domId}Table">
                    <thead>
                    <tr>
                        <th data-field="接收单位">接收单位</th>
                        <th data-field="品名">品名</th>
                        <th data-field="规格">规格</th>
                        <th data-field="计量单位">计量单位</th>
                        <th data-field="数量">数量</th>
                        <th data-field="时间">时间</th>
                        <th data-field="估算量">估算量</th>
                        <th data-field="市">市</th>
                        <th data-field="区">区</th>
                        <th data-field="接收单位类型">接收单位类型</th>
                        <th data-field="二级分类">二级分类</th>
                    </tr>
                    </thead>
                </table>
            </div>`;
    $(`#${domId}`)
        .append($(html))
    $(`#${domId}Table`)
        .bootstrapTable({
            data: data.totalData,
            search: true,
            sortable: true,
            sortName: '估算量',                    // 设置默认排序为 name
            sortOrder: 'desc',
            pageNumber: 1, //初始化加载第一页
            pagination: true,//是否分页
            sidePagination: 'client',//server:服务器端分页|client：前端分页
            pageSize: 10,//单页记录数
            pageList: [20, 40, 60, 100],//可选择单页记录数
        })
    $(`#${domId}StaticTable0`)
        .bootstrapTable({
            data: data.staticData[0].data.sort((a, b) => {
                return parseFloat(b['占比'].replace('%', '')) - parseFloat(a['占比'].replace('%', ''))
            }),
            pageNumber: 1, //初始化加载第一页
            pagination: false,//是否分页
            sidePagination: 'client',//server:服务器端分页|client：前端分页
            rowStyle:rowStyle
        })
}

function initDataHospital(data, domId, name) {
    let html =
        `<div class="static">
                <div>
                    <h5 id="${domId}StaticTitle0">${name}</h5>
                    <table 
                    id="${domId}StaticTable0" 
                    style="width: 300px"
                    >
                        <thead>
                        <tr>
                            <th data-field="类型">类型</th>
                            <th data-field="数量">数量</th>
                            <th data-field="占比">占比</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>`;
    $(`#${domId}`)
        .append($(html))
    $(`#${domId}StaticTable0`)
        .bootstrapTable({
            data: data.staticData[0].data.sort((a, b) => {
                return parseFloat(b['占比'].replace('%', '')) - parseFloat(a['占比'].replace('%', ''))
            }),
            pageNumber: 1, //初始化加载第一页
            pagination: false,//是否分页
            sidePagination: 'client',//server:服务器端分页|client：前端分页
            rowStyle:rowStyle
        })
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

function initHospitalDataAnalysis(data, name) {
    //数据
    var maskData = data.filter(item => item['接收单位类型'] == '医院');
    //总数
    var maskDataTotal = getTotalCount(maskData)
    let staticField = 'hospitalName';
    let staticHospitalArrayFinal = [...staticHospitalArray, '其他中医医院']
    return {
        totalData: maskData,
        staticData: [
            {
                name: name,
                data: staticForCommonNoZero(maskDataTotal, maskData, staticHospitalArrayFinal, staticField)
            },
        ]
    }
}

function initDistrictDataAnalysis(data) {
    var maskData = data.filter(item => item['物资类型'] == '口罩')
    var suitData = data.filter(item => item['物资类型'] == '防护服')
    var glovesData = data.filter(item => item['物资类型'] == '手套')
    var goggleData = data.filter(item => item['物资类型'] == '护目镜')
    var purifierData = data.filter(item => item['物资类型'] == '空气净化器')
    var disinfectantData = data.filter(item => item['物资类型'] == '消毒液')
    var shoeData = data.filter(item => item['物资类型'] == '鞋套')
    var diapersData = data.filter(item => item['物资类型'] == '纸尿裤')
    var thermometerData = data.filter(item => item['物资类型'] == '体温计')
    let staticArray = [...staticDistrictArray, '-'];
    let staticField = '区';
    return {
        staticData: [
            {
                name: '所有物资',
                type: 'all',
                data: staticForCommonNoZero(getTotalCount(data), data, staticArray, staticField)
            },
            {
                name: '口罩',
                type: 'mask',
                data: staticForCommonNoZero(getTotalCount(maskData), maskData, staticArray, staticField)
            },
            {
                name: '防护服',
                type: 'mask',
                data: staticForCommonNoZero(getTotalCount(suitData), suitData, staticArray, staticField)
            },
            {
                name: '手套',
                type: 'mask',
                data: staticForCommonNoZero(getTotalCount(glovesData), glovesData, staticArray, staticField)
            },
            {
                name: '护目镜',
                type: 'mask',
                data: staticForCommonNoZero(getTotalCount(goggleData), goggleData, staticArray, staticField)
            },
            {
                name: '空气净化器',
                type: 'mask',
                data: staticForCommonNoZero(getTotalCount(purifierData), purifierData, staticArray, staticField)
            },
            {
                name: '消毒液',
                type: 'mask',
                data: staticForCommonNoZero(getTotalCount(disinfectantData), disinfectantData, staticArray, staticField)
            },
            {
                name: '鞋套',
                type: 'mask',
                data: staticForCommonNoZero(getTotalCount(shoeData), shoeData, staticArray, staticField)
            },
            {
                name: '纸尿裤',
                type: 'mask',
                data: staticForCommonNoZero(getTotalCount(diapersData), diapersData, staticArray, staticField)
            },
            {
                name: '体温计',
                type: 'mask',
                data: staticForCommonNoZero(getTotalCount(thermometerData), thermometerData, staticArray, staticField)
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
    $.get('./0219.json'),
)
    .then(function (data_0130, data_0201, data_0202, data_0203, data_0204, data_0206, data_0207,
                    data_0208, data_0209, data_0210, data_0211, data_0212, data_0213, data_0214,
                    data_0215, data_0217, data_0218, data_0219) {
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
        var data_0219_format = Format(data_0219[0], '2月19日');
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
            data_0219_format,
        );
        $(function () {
            initTotalDataAnalysis(data);
            var district = initDistrictDataAnalysis(data.filter(
                item => item['市'] == '武汉市' && (
                    item['接收单位类型'] == '指挥部'
                    || item['接收单位类型'] == '卫健局'
                ))
            );
            initData(district, 'district')

            var mask = initMaskDataAnalysis(data);
            initData(mask, 'mask')

            var suit = initSuitDataAnalysis(data);
            initData(suit, 'suit')

            var gloves = initGlovesDataAnalysis(data);
            initData(gloves, 'gloves')

            var goggle = initTypeDataAnalysis(data, '护目镜');
            initDataCommon(goggle, 'goggle', '护目镜')

            var purifier = initTypeDataAnalysis(data, '空气净化器');
            initDataCommon(purifier, 'purifier', '空气净化器')

            var disinfectant = initTypeDataAnalysis(data, '消毒液');
            initDataCommon(disinfectant, 'disinfectant', '消毒液')

            var shoe = initTypeDataAnalysis(data, '鞋套');
            initDataCommon(shoe, 'shoe', '鞋套')

            var diapers = initTypeDataAnalysis(data, '纸尿裤');
            initDataCommon(diapers, 'diapers', '纸尿裤')

            var thermometer = initTypeDataAnalysis(data, '体温计');
            initDataCommon(thermometer, 'thermometer', '体温计')

            function filterLocationAndHospital(data) {
                return data.totalData.filter(item => item['接收单位类型'] == '医院' && item['市'] == '武汉市')
            }

            function initHospitalItem(data, domId, name) {
                var hospitalData = filterLocationAndHospital(data)
                var itemHospital = initHospitalDataAnalysis(initHospitalData(hospitalData), name)
                initDataHospital(itemHospital, domId, name)

            }

            initHospitalItem(mask, 'hospitalMask', '口罩')
            initHospitalItem(suit, 'hospitalSuit', '防护服')
            initHospitalItem(gloves, 'hospitalGloves', '手套')
            initHospitalItem(goggle, 'hospitalGoggle', '护目镜')
            initHospitalItem(purifier, 'hospitalPurifier', '空气净化器')
            initHospitalItem(disinfectant, 'hospitalDisinfectant', '消毒液')
            initHospitalItem(shoe, 'hospitalShoe', '鞋套')
            initHospitalItem(diapers, 'hospitalDiapers', '纸尿裤')
            initHospitalItem(thermometer, 'hospitalThermometer', '体温计')


            $('#hospitalTable')
                .bootstrapTable({
                    data: data.filter(item => item['接收单位类型'] == '医院' && item['市'] == '武汉市'),
                    search: true,
                    pageNumber: 1, //初始化加载第一页
                    pagination: true,//是否分页
                    sidePagination: 'client',//server:服务器端分页|client：前端分页
                    pageSize: 10,//单页记录数
                    pageList: [20, 40, 60, 100],//可选择单页记录数
                })
        })

        function chartDataInit(datafunc, index, type) {
            var hospital_data = [];
            var zhihui_data = [];
            var social_data = [];
            var weijianju_data = [];
            var fangcang_data = [];
            var company_data = [];

            function getDaliyData(formatData, index) {
                var static_data = datafunc(formatData, type).staticData[index].data;
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
            getDaliyData(data_0219_format, index);
            return {
                '医院': hospital_data,
                '指挥部': zhihui_data,
                '社区': social_data,
                '卫健局': weijianju_data,
                '方舱': fangcang_data,
                '公司': company_data,
            }
        }

        initChart('maskMainChart', chartDataInit(initTypeDataAnalysisForTime, 0, '口罩'))
        initChart('suitMainChart', chartDataInit(initTypeDataAnalysisForTime, 0, '防护服'))
        initChart('glovesMainChart', chartDataInit(initTypeDataAnalysisForTime, 0, '手套'))
        initChart('goggleMainChart', chartDataInit(initTypeDataAnalysisForTime, 0, '护目镜'))
        initChart('purifierMainChart', chartDataInit(initTypeDataAnalysisForTime, 0, '空气净化器'))
        initChart('disinfectantMainChart', chartDataInit(initTypeDataAnalysisForTime, 0, '消毒液'))
        initChart('shoeMainChart', chartDataInit(initTypeDataAnalysisForTime, 0, '鞋套'))
        initChart('diapersMainChart', chartDataInit(initTypeDataAnalysisForTime, 0, '纸尿裤'))
        initChart('thermometerMainChart', chartDataInit(initTypeDataAnalysisForTime, 0, '体温计'))

    })
