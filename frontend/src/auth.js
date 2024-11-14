import { id, showError, showInfo } from './dom_utils.js';

import { fetchPost, fetchGet } from './fetch_utils.js';
import { showPage, showHeader, checkLoginState } from './ui.js';
import { recordUserWatchedThreads, startWatchTimer } from './notification.js';
import { getUserInfo } from './users.js';
function login() {
    let email = id('email').value;
    let password = id('password').value;
    if(email == '' || password == '') {
        showError("Please input the field required.");
        return;
    }
    let data = {
        email: email,
        password: password
    };

    // record user
    fetchPost('/auth/login', data).then(resp => {
        console.log("auth:", resp);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('userId', resp.userId);
        checkLoginState();
        // record addtional user info
        getUserInfo(resp.userId).then(user=>{
            console.log('user info:', user);
            localStorage.setItem('isAdmin', user.admin);
            localStorage.setItem('user', JSON.stringify(user));
        });
        // record user watched threads
        recordUserWatchedThreads();
        startWatchTimer();
    });
};

function register() {
    let email = id('register_email').value;
    let password = id('register_password').value;
    let name = id('register_name').value;

    if(email == '' || password == '' || name == '') {
        showError("Please input the field required.");
        return;
    }

    let data = {
        email: email,
        password: password,
        name: name
    };
    let confirm_password = id('confirm_password').value;
    if (data.password != confirm_password) {
        showError("Error confirm password");
        return;
    }
    fetchPost('/auth/register', data).then(resp => {
        console.log(resp);
        showPage('login_div');
        showInfo('Register successfully.');
    });
}

function logout() {
    localStorage.clear();
    
    showHeader('');
    showPage('login_div');
}

function isAdmin() {
    return localStorage.getItem('isAdmin') == 'true';
}

function loginId() {
    return Number(localStorage.getItem('userId'));
}

function isLogin() {
    return localStorage.getItem('token') != null;
}

export {
    login,
    register,
    logout,
    isAdmin,
    loginId,
    isLogin
}
