const form = document.querySelector('form');
const newPass = document.querySelector('.newPass');
// const check = document.querySelector('.confirmPass')
form.addEventListener('submit', (e) => {
    e.preventDefault();
    forgotPassword();
})


async function forgotPassword() {
    try {
        await axios.put('http://localhost:9007/api/authen/resetpassword/:resetpasswordtoken', {
            newPass: newPass.value,
        }).then((res) => {
            console.log(res, 'res register')
            window.location = "/login"
        });

    } catch (error) {
        console.error(error);
    }
}