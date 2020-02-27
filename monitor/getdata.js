var headArray = ['接收单位', '品名', '规格', '计量单位', '数量'];
var body = $('.MsoNormalTable tr')
var bodyArray = [];
var name = '';
for (var i = 1; i < body.length; i++) {
    var children = $(body[i])
        .children();
    var bodyItem = {};
    if (children.length == 5) {
        name = children[0].innerText;
        for (var j = 0; j < children.length; j++) {
            bodyItem[headArray[j]] = children[j].innerText
        }
        bodyArray.push(bodyItem)
    } else {
        bodyItem[headArray[0]] = name;
        for (var j = 0; j < children.length; j++) {
            bodyItem[headArray[j + 1]] = children[j].innerText
        }
        bodyArray.push(bodyItem)
    }
}
console.log(JSON.stringify(bodyArray))
