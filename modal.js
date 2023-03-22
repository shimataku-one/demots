// モーダルボタンの要素を取得
var modalBtn = document.getElementById("modalBtn");

// モーダルの要素を取得
var modal = document.getElementById("myModal");

// モーダルの「×」ボタンの要素を取得
var closeBtn = document.getElementsByClassName("close")[0];

// モーダルボタンがクリックされたら、モーダルを開く
modalBtn.onclick = function () {
  modal.style.display = "block";
};

// 「×」ボタンがクリックされたら、モーダルを閉じる
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// モーダルの外側がクリックされたら、モーダルを閉じる
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
