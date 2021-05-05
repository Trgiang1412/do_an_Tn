const form = document.querySelector('form');
const email = document.querySelector('.emailLogin');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    forgotPassword();
})


async function forgotPassword() {
    try {
        await axios.put('http://localhost:9007/api/authen/authentication-email', {
            email: email.value,
        }).then((res) => {
            console.log(res, 'res register')
        });

    } catch (error) {
        console.error(error);
    }
}