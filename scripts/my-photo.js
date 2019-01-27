var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* 遍历图片并添加至缩略图区 */
for (var i = 1;i<6;i++){
  var newImage = document.createElement('img');
  newImage.setAttribute('src', 'images/pic'+ i.toString() + '.jpg');
  thumbBar.appendChild(newImage);
  // newImage.onclick = function () {
  //   displayedImage.setAttribute('src','images/pic'+ i.toString() + '.jpg');
  // }
}
var smallImage = document.querySelectorAll('.thumb-bar img');
for (var i = 0;i<smallImage.length;i++){
  smallImage[i].onclick = function (e) {
    displayedImage.setAttribute('src',e.target.getAttribute('src'));
  }
}
/* 编写 变亮/变暗 按钮 */
btn.onclick = function(){
  var btnClass = btn.getAttribute('class');
  if (btnClass === 'dark'){
    btn.setAttribute('class','light');
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    btn.textContent = '变亮';
  }
  else {
    btn.setAttribute('class','dark');
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    btn.textContent = '变暗';
  }
}
