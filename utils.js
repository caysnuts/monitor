var companySet = new Set();
var numberTypeSet = new Set();

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
    if (string.indexOf('医院') >= 0) {
        return '医院'
    } else if (string.indexOf('指挥部') >= 0) {
        return '指挥部'
    } else if (string.indexOf('社区') >= 0) {
        return '社区'
    } else if (string.indexOf('卫健局') >= 0) {
        return '卫健局'
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
    } else if (string.indexOf('手术服') >= 0) {
        return '手术服'
    } else if (string.indexOf('手套') >= 0) {
        return '手套'
    } else {
        return '-'
    }
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
        })
        //add to companySet
        companySet.add(data[i]['接收单位'])
        numberTypeSet.add(data[i]['计量单位'])
    }
    return newData
}
