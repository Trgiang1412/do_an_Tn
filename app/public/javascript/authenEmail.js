const form = document.querySelector('form');
const email = document.querySelector('.emailLogin');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    forgotPassword();
})


async function forgotPassword() {
    try {
        await axios.put('http://localhost:9000/api/authen/authentication-email', {
            email: email.value,
        }).then((res) => {
            alert('Đã gửi thông tin đến email')
        });

    } catch (error) {
        alert('Email không chính xác')
    }
}