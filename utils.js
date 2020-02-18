var companySet = new Set();
var numberTypeSet = new Set();

function toThousands(num) {
    var result = [],
        counter = 0;
    num = (num || 0).toString()
        .split('');
    for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(num[i]);
        if (!(counter % 3) && i != 0) {
            result.unshift(',');
        }
    }
    return result.join('');
}

function merge() {
    return Array.prototype.concat.apply([], arguments)
}


function getLocation(string) {
    if (!string) {
        return ''
    }
    if (string.indexOf('武汉市') >= 0) {
        return '武汉市'
    } else if (
        string.indexOf('武汉') >= 0
        || string.indexOf('江岸') >= 0
        || string.indexOf('江汉') >= 0
        || string.indexOf('硚口') >= 0
        || string.indexOf('汉阳') >= 0
        || string.indexOf('武昌') >= 0
        || string.indexOf('青山') >= 0
        || string.indexOf('洪山') >= 0
        || string.indexOf('蔡甸') >= 0
        || string.indexOf('江夏') >= 0
        || string.indexOf('黄陂') >= 0
        || string.indexOf('新洲') >= 0
        || string.indexOf('东西湖') >= 0
        || string.indexOf('汉南') >= 0
        || string.indexOf('东湖高新') >= 0
        || string.indexOf('东湖风景') >= 0
    ) {
        return '武汉市'
    } else if (
        string.indexOf('同济') >= 0
        || string.indexOf('武钢二医院') >= 0
        || string.indexOf('中国人民解放军中部战区总医院') >= 0
        || string.indexOf('协和医院') >= 0
        || string.indexOf('672') >= 0
        || string.indexOf('六七二') >= 0
        || string.indexOf('湖北省高级人民法院') >= 0
        || string.indexOf('湖北省中西医结合医院') >= 0
        || string.indexOf('天佑医院') >= 0
        || string.indexOf('湖北省') >= 0
    ) {
        return '武汉市'
    } else if (string.indexOf('宜昌') >= 0) {
        return '宜昌市'
    } else if (string.indexOf('襄阳') >= 0) {
        return '襄阳市'
    } else if (string.indexOf('黄石') >= 0) {
        return '黄石市'
    } else if (string.indexOf('十堰') >= 0) {
        return '十堰市'
    } else if (string.indexOf('鄂州') >= 0) {
        return '鄂州市'
    } else if (string.indexOf('荆州') >= 0) {
        return '荆州市'
    } else if (string.indexOf('荆门') >= 0) {
        return '荆门市'
    } else if (string.indexOf('黄冈') >= 0) {
        return '黄冈市'
    } else if (string.indexOf('咸宁') >= 0) {
        return '咸宁市'
    } else if (string.indexOf('孝感') >= 0) {
        return '孝感市'
    } else if (string.indexOf('随州') >= 0) {
        return '随州市'
    } else if (string.indexOf('恩施土家族') >= 0) {
        return '恩施土家族苗族自治州'
    } else if (string.indexOf('天门') >= 0) {
        return '天门市'
    } else if (string.indexOf('仙桃') >= 0) {
        return '仙桃市'
    } else if (string.indexOf('潜江') >= 0) {
        return '潜江市'
    } else if (string.indexOf('神农架') >= 0) {
        return '神农架林区'
    } else {
        return '-'
    }
}

function getDistrict(string) {
    if (!string) {
        return ''
    }
    if (string.indexOf('江岸') >= 0) {
        return '江岸'
    } else if (string.indexOf('江汉') >= 0) {
        return '江汉'
    } else if (string.indexOf('硚口') >= 0) {
        return '硚口'
    } else if (string.indexOf('汉阳') >= 0) {
        return '汉阳'
    } else if (string.indexOf('武昌') >= 0) {
        return '武昌'
    } else if (string.indexOf('青山') >= 0) {
        return '青山'
    } else if (string.indexOf('洪山') >= 0) {
        return '洪山'
    } else if (string.indexOf('蔡甸') >= 0) {
        return '蔡甸'
    } else if (string.indexOf('江夏') >= 0) {
        return '江夏'
    } else if (string.indexOf('黄陂') >= 0) {
        return '黄陂'
    } else if (string.indexOf('新洲') >= 0) {
        return '新洲'
    } else if (string.indexOf('东西湖') >= 0) {
        return '东西湖'
    } else if (string.indexOf('汉南') >= 0) {
        return '汉南'
    } else if (string.indexOf('东湖高新') >= 0) {
        return '东湖高新'
    } else if (string.indexOf('东湖风景') >= 0) {
        return '东湖风景'
    } else {
        return '-'
    }
}

function getCompanyType(string) {
    if (!string) {
        return ''
    }
    if (string.indexOf('方舱') >= 0) {
        return '方舱'
    } else if (string.indexOf('医院') >= 0) {
        return '医院'
    } else if (
        string.indexOf('指挥部') >= 0
    ) {
        return '指挥部'
    } else if (string.indexOf('社区') >= 0) {
        return '社区'
    } else if (string.indexOf('卫健局') >= 0) {
        return '卫健局'
    } else if (string.indexOf('卫生健康局') >= 0) {
        return '卫健局'
    } else if (string.indexOf('疾控中心') >= 0) {
        return '疾控中心'
    } else if (string.indexOf('公司') >= 0) {
        return '公司'
    } else if (string.indexOf('共青团') >= 0) {
        return '共青团'
    } else if (string.indexOf('东湖风景区管委会') >= 0) {
        return '东湖风景区管委会'
    } else if (
        string.indexOf('武汉市江岸区') >= 0
        || string.indexOf('武汉市江夏区') >= 0
        || string.indexOf('武汉市蔡甸区') >= 0
        || string.indexOf('武汉市江汉区') >= 0
        || string.indexOf('东湖风景区管委会') >= 0
    ) {
        return '指挥部'
    } else {
        return '-'
    }
}

function calulateMutipdleNumber(string) {
    if (!string) {
        return 1
    }
    if (string.indexOf('/') > 0) {
        var tempArray = string.split('/')
        if (tempArray[0].indexOf(',') > 0) {
            let calArray = tempArray[0].split(',')
            return parseInt(tempArray[0].split(',')[calArray.length - 1]) || 1
        }
        if (tempArray[0].indexOf('，') > 0) {
            let calArray = tempArray[0].split('，')
            return parseInt(tempArray[0].split('，')[calArray.length - 1]) || 1
        }
        return parseInt(tempArray[0])
    } else if (string.indexOf('*') > 0) {
        var tempArray = string.split('*')
        if (tempArray.length == 2) {
            return parseInt(tempArray[0]) * parseInt(tempArray[1]) || 1
        } else {
            return 1
        }
    } else if (string == 'EAR200P') {
        return 200
    } else if (string == '平面型耳带式') {
        return 2000
    } else if (string == '9105') {
        return 50
    } else if (parseInt(string) > 0) {
        if (Number(string) == string && Number(string) < 10000) {
            return Number(string) || 1
        } else {
            return 1
        }
    } else {
        return 1
    }
}

function caculateNumber(arrayItem) {
    if (arrayItem['数量']) {
        if (!arrayItem['计量单位'] || arrayItem['计量单位'] == '/') {
            return arrayItem['数量']
        } else if (arrayItem['计量单位'] == '箱') {
            return arrayItem['数量'] * calulateMutipdleNumber(arrayItem['规格'])
        } else if (arrayItem['计量单位'] == '桶') {
            return arrayItem['数量'] * 1
        } else if (arrayItem['计量单位'] == '件') {
            return arrayItem['数量'] * calulateMutipdleNumber(arrayItem['规格'])
        } else if (arrayItem['计量单位'] == '台') {
            return arrayItem['数量'] * 1
        } else if (arrayItem['计量单位'] == '只' || arrayItem['计量单位'] == '个') {
            return arrayItem['数量'] * 1
        } else if (arrayItem['计量单位'] == '袋') {
            return arrayItem['数量'] * 1
        } else if (arrayItem['计量单位'] == '包') {
            return arrayItem['数量'] * 1
        } else if (arrayItem['计量单位'] == '双') {
            return arrayItem['数量'] * 1
        } else if (arrayItem['计量单位'] == '瓶') {
            return arrayItem['数量'] * 1
        } else if (arrayItem['计量单位'] == '盒') {
            return arrayItem['数量'] * calulateMutipdleNumber(arrayItem['规格'])
        } else if (arrayItem['计量单位'] == '支') {
            return arrayItem['数量'] * 1
        } else if (arrayItem['计量单位'] == '套') {
            return arrayItem['数量'] * 1
        } else if (arrayItem['计量单位'] == '副') {
            return arrayItem['数量'] * 1
        } else if (arrayItem['计量单位'] == '壶') {
            return arrayItem['数量'] * 1
        } else if (arrayItem['计量单位'] == '提') {
            return arrayItem['数量'] * 1
        } else if (arrayItem['计量单位'] == '张') {
            return arrayItem['数量'] * 1
        } else if (arrayItem['计量单位'] == '组') {
            return arrayItem['数量'] * 1
        } else if (arrayItem['计量单位'] == '床') {
            return arrayItem['数量'] * 1
        } else {
            return arrayItem['数量'] * 1
        }
    }
    return '-'
}

function getProductType(string) {
    if (!string) {
        return ''
    }
    if (string.indexOf('口罩') >= 0) {
        return '口罩'
    } else if (string.indexOf('护目镜') >= 0) {
        return '护目镜'
    } else if (string.indexOf('防护服') >= 0) {
        return '防护服'
    } else if (string.indexOf('手术服') >= 0) {
        return '手术服'
    } else if (string.indexOf('手套') >= 0) {
        return '手套'
    } else {
        return '-'
    }
}

function getMaskProductType(arrayItem) {
    if (arrayItem['品名']) {
        if (
            arrayItem['品名'].indexOf('95') >= 0
            || arrayItem['品名'].indexOf('９５') >= 0
            || arrayItem['品名'].indexOf('KF94') >= 0
            || arrayItem['品名'].indexOf('kf94') >= 0
            || arrayItem['品名'].indexOf('FFP2') >= 0
            || arrayItem['品名'].indexOf('ffp2') >= 0
            || arrayItem['品名'].indexOf('good job') >= 0
        ) {
            return 'N95'
        }
    }
    if (arrayItem['规格']) {
        if (
            arrayItem['规格'].indexOf('95') >= 0
            || arrayItem['规格'].indexOf('９５') >= 0
            || arrayItem['规格'].indexOf('KF94') >= 0
            || arrayItem['规格'].indexOf('kf94') >= 0
            || arrayItem['规格'].indexOf('FFP2') >= 0
            || arrayItem['规格'].indexOf('ffp2') >= 0
            || arrayItem['规格'].indexOf('good job') >= 0
        ) {
            return 'N95'
        }
    }
    if (arrayItem['规格']) {
        if (
            arrayItem['规格'].indexOf('医用') >= 0
        ) {
            return '医用'
        }
    }
    if (arrayItem['品名']) {
        if (
            (
                arrayItem['品名'].indexOf('医用') >= 0
                && arrayItem['品名'].indexOf('非医用') < 0
            )
            || arrayItem['品名'].indexOf('SURGITEC') >= 0
            || arrayItem['品名'].indexOf('BAOTHACH') >= 0
            || arrayItem['品名'].indexOf('SURGICAL') >= 0
            || arrayItem['品名'].indexOf('Pasture') >= 0
            || arrayItem['品名'].indexOf('surgicalface') >= 0
        ) {
            return '医用'
        }
    }
    return '-'
}

function Format(data, date) {
    //add date
    var newData = [];
    for (var i = 0; i < data.length; i++) {
        newData.push({
            ...data[i],
            '时间': date,
            '估算量': caculateNumber(data[i]),
            '市': getLocation(data[i]['接收单位']),
            '区': getDistrict(data[i]['接收单位']),
            '接收单位类型': getCompanyType(data[i]['接收单位']),
            '物资类型': getProductType(data[i]['品名']),
            '二级分类': getMaskProductType(data[i]),
        })
        //add to companySet
        companySet.add(data[i]['接收单位'])
        numberTypeSet.add(data[i]['计量单位'])
    }
    return newData
}

const reducer = (accumulator, currentValue) => {
    return (parseInt(accumulator) || 0) + (parseInt(currentValue) || 0);
}

function staticMaskCommon(maskDataTotal, maskData, staticArray, staticField) {
    var staticResult = staticArray.map(arrayItem => {
        var countTotal = 0;
        try {
            countTotal = maskData.filter(item => item[staticField] == arrayItem)
                .map(item => item['估算量'])
                .reduce(reducer);
        } catch (e) {
        }
        return {
            '类型': arrayItem,
            '数量': toThousands(countTotal),
            '占比': Number(countTotal * 100 / maskDataTotal)
                .toFixed(2) + ' %'
        }
    })
    return [
        {
            '类型': '全部',
            '数量': toThousands(maskDataTotal),
            '占比': '100 %'
        },
        ...staticResult
    ]
}
