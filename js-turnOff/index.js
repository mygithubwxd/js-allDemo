var oLi = $('li');
var arr = [];
init();

function init() {
    Array.prototype.slice.call(oLi, 0).forEach(function (ele, index) {
        arr.push({   //数组里面放对象，对象中存了每一个元素的相关信息
            w: ele.offsetWidth, 
            h: ele.offsetHeight,
            l: ele.offsetLeft,
            t: ele.offsetTop
        })
        bindEvent(ele, index);
    })
    console.log(arr);
}

//为每个li绑定鼠标移入、移出事件
//但每次只会有一个li会触发事件
function bindEvent(item, index) {
    $(item).on('mouseenter', function (e) {
        addClass(e, item, 'in', index);
    })
    $(item).on('mouseleave', function (e) {
        addClass(e, item, 'out', index);
    })
}

function addClass(e, item, state, index) {
    //判断鼠标进入了div中的哪个区域
    var d = getD(e, index);
    var str = '';
    switch (d) {
        case 0:
            str = '-top';
            break;
        case 1:
            str = '-right';
            break;
        case 2:
            str = '-bottom';
            break;
        case 3:
            str = '-left';
            break;
    }
    item.className = '';  //每次li的className先重置为空
    // item.classList.add(state + str);  //动态添加class
    item.className = state + str;
}

function getD(e, index) {
    var w = arr[index].w,
        h = arr[index].h,
        //e.pageX - arr[index].l 
        //得到鼠标到div边框的距离，也就是以div的左上角为坐标原点
        x = e.pageX - arr[index].l - w / 2,  //改变坐标原点，以div的中心为坐标原点
        y = e.pageY - arr[index].t - h / 2;

    d = (Math.round(((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    //分成四个区域
    //Math.atan2(y, x)返回弧度（-PI～PI）
    //Math.atan2(y, x) * (180 / Math.PI)将弧度转化为角度（-180∘ˉ180∘）

    // console.log(d);
    return d;    //返回判断得到的区域
}


/*
公式：d = (Math.round(((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;

-180～180                   +180               /90，四舍五入取整   +3      %4
上：-135～-45               45～135              1              4         0  
右：-45~0,0～45             135～225             2              5         1
下：45～135                 225～315             3              6         2
左：135～180,-180～-135    0～45，315～360       0/4             3/7       3
*/