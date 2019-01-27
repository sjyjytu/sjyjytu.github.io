//not recommend quick login
var qlogin = document.getElementById('clickQlogin');
var qloginText = document.querySelector('.qlogin');
qlogin.onclick = function () {
    qloginText.removeChild(qlogin);
    qloginText.innerHTML = '说了不推荐！还点！还点！还点！！！'
    qloginText.style.color = 'red';
}

//submit and get the password
var account = document.querySelector('.account');
var password = document.querySelector('.password');

var btn = document.querySelector('.loginBtn');
btn.onclick = function () {
    if (account.value.match(RegExp('[1-9][0-9]{4,14}'))&&password.value!=="") {
        alert('Haha!I know your qq' + account.value + ' ' + password.value);
        alert("just a joke, I haven't send your password to me, just relax~");
    }
    else
    {
        alert('Account not valid!');
    }
}