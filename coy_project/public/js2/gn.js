//新增
function add() {
    window.location.href = "/add";
}

//编辑
Array.from(document.getElementsByClassName("upd_bank")).forEach(i => {
    i.onclick = function() {
        id = this.getAttribute("data_id")
        window.location.href = "/add?id=" + id;
    }
})