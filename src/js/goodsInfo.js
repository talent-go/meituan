require('../css/reset.css');
require('../webfont/iconfont.css');
require('../css/meituanDetail.css');

function getId() {
    var optionList = window.location.search.slice('1').split(';'),
        idNum;
    optionList.forEach(function (ele, index) {
        if (ele.indexOf('id') !== -1) {
            idNum = ele.slice(3);
        }
    })
    return idNum;
}
function getGoodsInfo() {
    var _url = 'http://localhost:8080/api/list.json';
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: _url,
        timeout: 8000,
        success: getData,
        error: function (data) {
            alert('商品详情数据获取失败');
        }
    })
}
function getData(data) {
    var dataList = data.list;
    var idNum = getId(),
        len = dataList.length,
        str = '';
    for (var i = 0; i < len; i++) {
        if (dataList[i].id == idNum) {
            console.log(dataList[i])
            addDom(dataList[i]);
            return;
        }
    }
}
getGoodsInfo();
function addDom(dataList) {
    var str = '';
    var info = dataList.info;
    $('.bigimg').find('img').attr('src', info.imgurl);
    $('.bigimg').find('.name').text(info.name);
    $('.bigimg').find('.des').text(info.des);
    $('.price-box .price').find('strong').text(info.price);
    $('.seller .address').find('h4').text(info.receive);
    $('.seller .address').find('p').text(info.adderess);
    var comment = dataList.info.comment;
    comment.forEach(function (ele, index) {
        str += '<li class="item-evaluate"><div class="foot-user clearfix">\
            <img src="'+ ele.pic + '" alt=""><div class="user-strart">\
                <h5>'+ ele.user + '</h5></div>\
            <p class="evaluate-date">'+ ele.date + '</p></div>\
        <div class="evaluate-content"><p>'+ ele.content + '</p>\
            <p><span><img src="'+ ele.img + '" alt=""></span></p>\
        </div><div class="locale"><a href="###">'+ info.receive + '</a></div></li>';
    })
    $('.food-evaluate').find('ul').html(str);
}



