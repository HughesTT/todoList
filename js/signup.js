const apiUrl = `https://todoo.5xcamp.us`;
const signupEmail = document.querySelector('#signupEmail');
const signupNickname = document.querySelector('#signupNickname');
const signupPwd = document.querySelector('#signupPwd');
const checkPwd = document.querySelector('#checkPwd');
const signupBTN = document.querySelector('#signupBTN');

signupBTN.addEventListener('click',function(e){
  e.preventDefault();
  if (signupEmail.value.trim() == '' || signupNickname.value.trim() == '' || signupPwd.value.trim() == ''){
    alert('Data is incorrect, please check again');
    return;
  }
  if (signupPwd.value !== checkPwd.value){
    alert('Password is incorrect, please check again');
    return;
  }
  let item = {};
  item.email = signupEmail.value;
  item.password = signupPwd.value;
  item.nickname = signupNickname.value;

  axios.post(`${apiUrl}/users`,{user:item})
  .then(response => {
    alert(response.data.message);
    alert('landing to Login')
    location.assign('index.html');
  })
  .catch(err => {
    alert(err.response.data.error);
    console.log(err.response.data.error);
  })
})