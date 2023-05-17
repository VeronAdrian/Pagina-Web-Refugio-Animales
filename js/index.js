const user = JSON.parse(localStorage.getItem('login_success')) || false

if(user){
    console.log("Logueado como "+user.name)
    document.getElementById('loginRegister').style.display = 'none'
}
else{
    document.getElementById('logout').style.display = 'none'
    document.getElementById('profile').style.display = 'none'
}

const logout = document.getElementById('logout')
logout.addEventListener('click', (e)=>{
    localStorage.removeItem('login_success')
    return window.location="index.html"
})