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
    } else if (string.indexOf('武汉') >= 0) {
        return '武汉市'
    } else if (string.indexOf('襄阳市') >= 0) {
        return '襄阳市'
    } else if (string.indexOf('黄冈市') >= 0) {
        return '黄冈市'
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
    } else if (string.indexOf('指挥部') >= 0) {
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
            return parseInt(tempArray[0].split(',')[1])
        }
        if (tempArray[0].indexOf('，') > 0) {
            return parseInt(tempArray[0].split('，')[1])
        }
        return parseInt(tempArray[0])
    } else if (string.indexOf('*') > 0) {
        var tempArray = string.split('*')
        return Number(tempArray[0]) * Number(tempArray[1])
    } else if (string == 'EAR200P') {
        return 200
    } else if (string == '平面型耳带式') {
        return 2000
    } else if (string == '9105') {
        return 50
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
        ) {
            return 'N95'
        }
    }
    if (arrayItem['品名']) {
        if (
            arrayItem['品名'].indexOf('医用') >= 0
        ) {
            return '医用'
        }
    }
    if (arrayItem['规格']) {
        if (
            arrayItem['规格'].indexOf('医用') >= 0
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
            '地区': getLocation(data[i]['接收单位']),
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

function staticMask(maskDataTotal, maskData) {
    console.log('start =============')
    //医院
    var maskDataTotalToHospital = 0;
    try {
        maskDataTotalToHospital = maskData.filter(item => item['接收单位类型'] == '医院')
            .map(item => item['估算量'])
            .reduce(reducer);
        console.log('医院', maskDataTotalToHospital)
    } catch (e) {

    }
    //指挥部
    var maskDoctorDataTotalToCommand = 0;
    try {
        maskDoctorDataTotalToCommand = maskData.filter(item => item['接收单位类型'] == '指挥部')
            .map(item => item['估算量'])
            .reduce(reducer);
        console.log('指挥部', maskDoctorDataTotalToCommand)
    } catch (e) {

    }
    //社区
    var maskDoctorDataTotalToCommunity = 0;
    try {
        maskDoctorDataTotalToCommunity = maskData.filter(item => item['接收单位类型'] == '社区')
            .map(item => item['估算量'])
            .reduce(reducer);
        console.log('社区', maskDoctorDataTotalToCommunity)
    } catch (e) {

    }
    //卫健局
    var maskDoctorDataTotalToHealth = 0;
    try {
        maskDoctorDataTotalToHealth = maskData.filter(item => item['接收单位类型'] == '卫健局')
            .map(item => item['估算量'])
            .reduce(reducer);
        console.log('卫健局', maskDoctorDataTotalToHealth)
    } catch (e) {

    }
    //方舱
    var maskDoctorDataTotalToFangcang = 0;
    try {
        maskDoctorDataTotalToFangcang = maskData.filter(item => item['接收单位类型'] == '方舱')
            .map(item => item['估算量'])
            .reduce(reducer);
        console.log('方舱', maskDoctorDataTotalToFangcang)
    } catch (e) {

    }
    //公司
    var maskDoctorDataTotalToCompany = 0;
    try {
        maskDoctorDataTotalToCompany = maskData.filter(item => item['接收单位类型'] == '公司')
            .map(item => item['估算量'])
            .reduce(reducer);
        console.log('方舱', maskDoctorDataTotalToCompany)
    } catch (e) {

    }
    return [
        {
            '类型': '全部',
            '数量': toThousands(maskDataTotal),
            '占比': '100 %'
        },
        {
            '类型': '医院',
            '数量': toThousands(maskDataTotalToHospital),
            '占比': Number(maskDataTotalToHospital * 100 / maskDataTotal)
                .toFixed(2) + ' %'
        },
        {
            '类型': '指挥部',
            '数量': toThousands(maskDoctorDataTotalToCommand),
            '占比': Number(maskDoctorDataTotalToCommand * 100 / maskDataTotal)
                .toFixed(2) + ' %'
        },
        {
            '类型': '社区',
            '数量': toThousands(maskDoctorDataTotalToCommunity),
            '占比': Number(maskDoctorDataTotalToCommunity * 100 / maskDataTotal)
                .toFixed(2) + ' %'
        },
        {
            '类型': '卫健局',
            '数量': toThousands(maskDoctorDataTotalToHealth),
            '占比': Number(maskDoctorDataTotalToHealth * 100 / maskDataTotal)
                .toFixed(2) + ' %'
        },
        {
            '类型': '方舱',
            '数量': toThousands(maskDoctorDataTotalToFangcang),
            '占比': Number(maskDoctorDataTotalToFangcang * 100 / maskDataTotal)
                .toFixed(2) + ' %'
        },
        {
            '类型': '公司',
            '数量': toThousands(maskDoctorDataTotalToCompany),
            '占比': Number(maskDoctorDataTotalToCompany * 100 / maskDataTotal)
                .toFixed(2) + ' %'
        },
    ]
}
