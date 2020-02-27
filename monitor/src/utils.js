export const FormatData = ({ data, time }) => {
    if (data && data.length > 0) {
        return data.map(item => {
            return {
                ...item,
                '时间': time,
                '估算量': caculateNumber(item),
                '区': getDistrict(item['接收单位']),
                '接收单位类型': getCompanyType(item['接收单位']),
                '物资类型': getProductType(item['品名']),
                '二级分类': getProductSecondType(item),
            }
        })
    }
    return []
}

function calulateMutipdleNumber(string) {
    let tempArray;
    if (!string) {
        return 1
    }
    if (string == '200支') {
        return 200
    }
    if (string.indexOf('/') > 0) {
        tempArray = string.split('/');
        if (tempArray[0].indexOf(',') > 0) {
            let calArray = tempArray[0].split(',')
            return parseInt(tempArray[0].split(',')[calArray.length - 1]) || 1
        }
        if (tempArray[0].indexOf(' ') > 0) {
            let calArray = tempArray[0].split(' ')
            return parseInt(tempArray[0].split(' ')[calArray.length - 1]) || 1
        }
        if (tempArray[0].indexOf('，') > 0) {
            let calArray = tempArray[0].split('，')
            return parseInt(tempArray[0].split('，')[calArray.length - 1]) || 1
        }
        return parseInt(tempArray[0]) || 1
    } else if (string.indexOf('*') > 0) {
        tempArray = string.split('*');
        if (tempArray.length == 2) {
            if (tempArray[0].indexOf('ml')) {
                return parseInt(tempArray[1]) || 1
            }
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
    } else if (string.indexOf('急救中心') >= 0) {
        return '急救中心'
    } else if (string.indexOf('应急储备中心') >= 0) {
        return '应急储备中心'
    } else if (string.indexOf('生态环境局') >= 0) {
        return '生态环境局'
    } else if (string.indexOf('民政局') >= 0) {
        return '民政局'
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
    } else if (string.indexOf('纸尿裤') >= 0) {
        return '纸尿裤'
    } else if (string.indexOf('体温计') >= 0) {
        return '体温计'
    } else if (string.indexOf('空气净化器') >= 0) {
        return '空气净化器'
    } else if (string.indexOf('新风净化机') >= 0) {
        return '空气净化器'
    } else if (string.indexOf('消毒液') >= 0) {
        return '消毒液'
    } else if (string.indexOf('鞋套') >= 0) {
        return '鞋套'
    } else if (string.indexOf('保暖内衣') >= 0) {
        return '保暖内衣'
    } else if (string.indexOf('洗衣液') >= 0) {
        return '洗衣液'
    } else if (string.indexOf('花露水') >= 0) {
        return '花露水'
    } else if (
        string.indexOf('氨酚烷胺') >= 0
        || string.indexOf('泡腾') >= 0
        || string.indexOf('利巴韦林') >= 0
        || string.indexOf('阿奇霉素') >= 0
        || string.indexOf('氯酸烷') >= 0
        || string.indexOf('抗病毒口服液') >= 0
        || string.indexOf('维生素C泡腾片') >= 0
        || string.indexOf('对乙酰氨基酚泡腾片') >= 0
        || string.indexOf('羧甲司坦泡腾片') >= 0
        || string.indexOf('头孢他啶') >= 0
        || string.indexOf('利巴韦林') >= 0
        || string.indexOf('头孢克洛') >= 0
    ) {
        return '西药'
    } else if (
        string.indexOf('香薷水') >= 0
        || string.indexOf('甘草') >= 0
        || string.indexOf('板蓝根') >= 0
        || string.indexOf('金银花') >= 0
        || string.indexOf('一枝蒿') >= 0
        || string.indexOf('银花') >= 0
        || string.indexOf('喉痛灵') >= 0
        || (string.indexOf('胶囊') >= 0 && string.indexOf('羟丙甲纤维空心胶囊') < 0)
        || string.indexOf('口服液') >= 0
    ) {
        return '中成药'
    } else if (
        string.indexOf('敖东酵素') >= 0
        || string.indexOf('泡腾') >= 0
    ) {
        return '保健品'
    } else if (
        string.indexOf('生脉注射液') >= 0
        || string.indexOf('痰热清注射液') >= 0
        || string.indexOf('参附注射液') >= 0
    ) {
        return '中药注射液'
    } else if (string.indexOf('制氧机') >= 0) {
        return '制氧机'
    } else {
        return '-'
    }
}
function getProductSecondType(arrayItem) {
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

export const toThousands =(num)=> {
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
const reducer = (accumulator, currentValue) => {
    return (parseInt(accumulator) || 0) + (parseInt(currentValue) || 0);
}
export const getTotalCount =(data)=> {
    if (data && data.length > 0) {
        return data.map(item => item['估算量']).reduce(reducer);
    }
    return 0
}
