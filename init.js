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
    return data.map(item => item['估算量'])
        .reduce(reducer);
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
                data: staticMask(maskDataTotal, maskData)
            },
            {
                name: 'N95',
                type: 'N95',
                data: staticMask(maskN95DataTotal, maskN95Data)
            },
            {
                name: '医用',
                type: 'doctor',
                data: staticMask(maskDoctorDataTotal, maskDoctorData)
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
                data: staticMask(suitDataTotal, suitData)
            },
            {
                name: '医用',
                type: 'doctor',
                data: staticMask(suitDoctorDataTotal, suitDoctorData)
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
)
    .then(function (data_0130, data_0201, data_0202, data_0203, data_0204, data_0206, data_0207, data_0208, data_0209, data_0210, data_0211, data_0212, data_0213) {
        var data = merge(
            Format(data_0130[0], '1月30日'),
            Format(data_0201[0], '2月01日'),
            Format(data_0202[0], '2月02日'),
            Format(data_0203[0], '2月03日'),
            Format(data_0204[0], '2月04日'),
            Format(data_0206[0], '2月06日'),
            Format(data_0207[0], '2月07日'),
            Format(data_0208[0], '2月08日'),
            Format(data_0209[0], '2月09日'),
            Format(data_0210[0], '2月10日'),
            Format(data_0211[0], '2月11日'),
            Format(data_0212[0], '2月12日'),
            Format(data_0213[0], '2月13日'),
            Format(data_0213[0], '2月14日')
        );
        $(function () {
            initTotalDataAnalysis(data);

            var mask = initMaskDataAnalysis(data);
            initData(mask, 'mask')
            var suit = initSuitDataAnalysis(data);
            initData(suit, 'suit')
        })
    })
