var headArray = ['医院名称', '开放床位', '已用床位', '空床位'];
var body = $('#detailContent tr')
var bodyArray = [];
for (var i = 1; i < body.length; i++) {
    var children = $(body[i])
        .children();
    var bodyItem = {};
    for (var j = 1; j < children.length; j++) {
        bodyItem[headArray[j - 1]] = children[j].innerText
    }
    bodyArray.push(bodyItem)
}
console.log(JSON.stringify(bodyArray))
