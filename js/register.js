const registerForm = document.getElementById('formularioRegistro')

registerForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const name = document.getElementById('userRegister').value
    const mail = document.getElementById('mailRegister').value
    const password = document.getElementById('passwordRegister').value

    const users = JSON.parse(localStorage.getItem('users')) || []
    const isUserReg = users.find(user => user.mail === mail)

    if(isUserReg){
        return alert('El mail '+mail+' ya esta registrado.')
    }
    else{
        users.push({name: name, mail: mail, password: password})
        localStorage.setItem('users', JSON.stringify(users))
        alert('Registro exitoso')
    }
})