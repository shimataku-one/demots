// モーダルを取得
var modal = document.getElementById("myModal");
// ボタンを取得
var btn = document.getElementById("openModalBtn");
// <span> (x) 要素を取得
var span = document.getElementsByClassName("close")[0];
// ボタンがクリックされたときにモーダルを開く
btn.onclick = function() {
modal.style.display = "block";
}
// <span> (x) がクリックされたときにモーダルを閉じる
span.onclick = function() {
modal.style.display = "none";
}
// モーダルの外側がクリックされたときにモーダルを閉じる
window.onclick = function(event) {
if (event.target == modal) {
modal.style.display = "none";
}
}
