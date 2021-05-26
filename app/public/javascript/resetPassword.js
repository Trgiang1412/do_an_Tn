const form = document.querySelector('form');
const newPass = document.querySelector('.newPass');
const check = document.querySelector('.confirmPass')
form.addEventListener('submit', (e) => {
    e.preventDefault();
    forgotPassword();
})


async function forgotPassword() {
    try {
        await axios.put('http://localhost:9007/api/authen/resetpassword', {
            newPass: newPass.value,
            resetpasswordtoken: check.value
        }).then((res) => {
            alert('Đổi mật khẩu thành công')
            window.location = "/"
        });

    } catch (error) {
        alert('Lỗi')
    }
}