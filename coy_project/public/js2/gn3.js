//更改管理员资料
Array.from(document.getElementsByClassName("upd_detail")).forEach(i => {
    i.onclick = function() {
        id = this.getAttribute("data_id")
        window.location.href = "/edit2?id=" + id;
    }
})

//刷新
function re() {
    location.href = location.href;
}