const form = document.querySelector('form')
const username = document.querySelector('.userName');
const address = document.querySelector('.address');
const phone = document.querySelector('.phoneNumber');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const checkpassword = document.querySelector('.confimPassword');




form.addEventListener('submit', (e) => {
    e.preventDefault();
    getUsers();

});

async function getUsers() {

    try {
        await axios.post('http://localhost:9007/api/authen/register', {
            name: username.value,
            address: address.value,
            phone: phone.value,
            email: email.value,
            password: password.value,
        }).then((res) => {
            alert('Đăng kí thành công')
            window.location = "/"
        });

    } catch (error) {
        alert('Email đã đăng kí')
    }
}



// function checkInputs() {
//     const addressValue = address.value;
//     const phoneValue = phone.value;
//     const usernameValue = username.value;
//     const emailValue = email.value;
//     const passwordValue = password.value;
//     const checkpasswordValue = checkpassword.value;
//     switch ('') {
//         case usernameValue:
//             setErrorFor(username, 'vui long nhap ten')
//             break;
//         case emailValue:
//             setErrorFor(email, 'vui long nhap email')
//             break;
//         case passwordValue:
//             setErrorFor(password, 'vui long nhap password')
//             break;
//         case checkpasswordValue:
//             setErrorFor(checkpassword, 'vui long nhap lai password')
//             break;
//         case addressValue:
//             setErrorFor(address, 'vui long nhap dia chi')
//             break;
//         case phoneValue:
//             setErrorFor(phone, 'vui long nhap so dien thoai')
//     }

// }

// function setErrorFor(input, message) {
//     const formControl = input.parentElement;
//     const small = formControl.querySelector('small')
//     small.innerText = message;
//     formControl.className = 'mb-2 error';
// }