import { fetchGet, fetchPut, online } from "./fetch_utils.js";
import { showPage } from "./ui.js"
import { id, showInfo } from "./dom_utils.js";
import { getAllThreads } from "./thread.js";
import { div, span } from "./dom_utils.js";
import { isAdmin, loginId } from "./auth.js";
import { storeUser } from "./storage.js";
import { getUserInfoOffline } from "./offline.js";
import { fileToDataUrl } from "./helpers.js";



function showUserProfile(userId) {
    showPage('user_profile');
    id('user_id').value = userId;
    getUserInfo(userId).then((user) => {
        console.log('user info:', user);
        id('user_name').value = user.name;
        id('user_email').value = user.email;
        if (user.image != null) {
            id('user_image').setAttribute('src', user.image);
        }
        if(user.admin) {
            id('user_type').value = "1";
        }else{
            id('user_type').value = "0";
        }
    });

    if(userId == loginId()) {
        id('user_profile_edit').style.display = 'block';
    } else {
        id('user_profile_edit').style.display = 'none';
    }

    if(isAdmin() && userId != loginId()) {
        id('user_is_admin_div').classList.remove('d-none');
    } else {
        id('user_is_admin_div').classList.add('d-none');
    }

    showUserThreads();
}

function showUserThreads() {
    getAllThreads().then((threads) => {
        console.log("user all threads loaded.", threads);

        let userThreads = filterUserThreads(threads, Number(id('user_id').value));
        id('user_threads').innerText = '';
        for(let userThread of userThreads) {
            appendUserThread(userThread);
        }
    });
}

function filterUserThreads(threads, userId) {
    let userThreads = [];
    for(let thread of threads) {
        if (thread.creatorId == userId) {
            userThreads.push(thread);
        }
    }
    return userThreads;
}

function appendUserThread(thread) {
    let parent = id('user_threads');

    let box = div('', 'user_thread');
    let title = div(thread.title, 'title');
    box.appendChild(title);
    box.appendChild(div(thread.content, 'content'));
    let bottom = div('', 'comment_info');
    let likes = span('Likes: ' + thread.likes.length);
    let comments = span(' Comments: 0');
    fetchGet('/comments', 'threadId=' + thread.id).then(res=>{
        comments.innerText = ' Comments: ' + res.length;
    });
    bottom.appendChild(likes);
    bottom.appendChild(comments);
    box.appendChild(bottom);
    parent.appendChild(box);
}

function saveUser() {

    let user = {
    };
    let loginUser = JSON.parse(localStorage.getItem('user'));
    
    if(id('user_name').value != '') {
        user.name = id('user_name').value;
    }
    let email = id('user_email').value;
    if(email != '' && email != loginUser.email) {
        user.email = email;
    }
    let password = id('user_password').value;
    if(password != '') {
        user.password = password;
    }
    
    const file = id('user_image_file').files[0];
    if(file != null) {
        fileToDataUrl(file).then(res=>{
            user.image = res;
            fetchPut('/user', user).then(res=>{
                console.log('update1 user:', res);
                showInfo("User info updated.")
            });
        });
    } else {
        fetchPut('/user', user).then(res=>{
            console.log('update2 user:', res);
            showInfo("User info updated.")
        });
    }

    
}

function updateUserType() {
    let type = id('user_type').value;
    console.log('user type:', type);
    let userId = id('user_id').value;
    let email = id('user_email').value;
    fetchPut('/user/admin', {email: email, userId:userId, turnon: type==1}).then(res=>{
        showInfo("User type updated.")
    });
}

function getUserInfo(userId) {
    if(!online()) {
        return getUserInfoOffline(userId);
    }
    return fetchGet('/user', 'userId=' + userId).then(user=>{
        storeUser(user);
        return Promise.resolve(user);
    });
}

export {
    showUserProfile,
    saveUser,
    updateUserType,
    getUserInfo
}
