async function login() {
    const email    = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');
    const btnLogin = document.getElementById('btn-login');

    errorMsg.style.display = 'none';
    btnLogin.disabled      = true;
    btnLogin.textContent   = 'Logging in...';

    const response = await apiCall('/users/login', 'POST', { email, password });

    if (response.success && response.data?.token) {
        const user = response.data;
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = 'dashboard/owner.html';
    } else {
        errorMsg.textContent   = response.message || 'Login failed!';
        errorMsg.style.display = 'block';
        btnLogin.disabled      = false;
        btnLogin.textContent   = 'Sign in';
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '../index.html';
}

function authGuard() {
    if (!localStorage.getItem('token')) {
        window.location.href = '../index.html';
    }
}