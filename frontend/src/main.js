import { BACKEND_PORT } from './config.js';
// A helper you may want to use when uploading new images to the server.
import { fileToDataUrl } from './helpers.js';

import { id, bindClick, hideError, toBottom } from './dom_utils.js';
import { login, register, logout, isLogin } from './auth.js';
import { showHeader, showDashboard, checkLoginState, showPage, loadThreads } from './ui.js';
import { createThread, saveThread } from './thread.js';
import { createComment, replyComment, saveComment } from './comment.js';
import { saveUser, showUserProfile, updateUserType } from './users.js';
import { startWatchTimer } from './notification.js';
import { testNetwork } from './fetch_utils.js';


console.log('Let\'s go!');



bindClick('home_link', showDashboard);

bindClick('login', login);
bindClick('register_link', () => { showPage('register_div') });
// Change focus when user pressed enter key
id('email').addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
        id('password').focus();
    }
});
// Login when user pressed enter key
id('password').addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
        login();
    }
});

bindClick('register', register);
bindClick('login_link', () => { showPage('login_div') });

bindClick('logout', logout);
bindClick('profile_link', () => {
    showUserProfile(Number(localStorage.getItem('userId')));
});

bindClick('create_link', () => { showPage('create_div') });
bindClick('create_thread', createThread);

bindClick('save_thread', saveThread);

bindClick('create_comment', createComment);
bindClick('reply_comment_btn', replyComment);
bindClick('edit_comment_btn', saveComment);

bindClick('save_user', saveUser);
bindClick('update_user_type_btn', updateUserType);

document.addEventListener('scroll', function () {
    if(!isLogin()){
        return;
    }
    if (toBottom()) {
        console.log("over...");
        if (localStorage.getItem('startId') != '0') {
            console.log("over load...");
            loadThreads();
        }
    }
});

// showPage('login_div')


// check network status
let testState = testNetwork(localStorage.getItem('userId'));
Promise.all([testState]).then(()=>{
    checkLoginState();
    startWatchTimer();
});
