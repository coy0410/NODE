//新增
function add() {
    window.location.href = "/add";
}

//编辑
Array.from(document.getElementsByClassName("upd_bank")).forEach(i => {
    i.onclick = function() {
        id = this.getAttribute("data_id")
        window.location.href = "/edit?id=" + id;
    }
})

//删除
Array.from(document.getElementsByClassName("del_bank")).forEach(i => {
    i.onclick = function() {
        id = this.getAttribute("data1_id")
        window.location.href = "/del?id=" + id;
    }
})

//刷新
function re() {
    location.href = location.href;
}