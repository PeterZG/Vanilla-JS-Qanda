import { id, select, toBottom } from "./dom_utils.js";
import { getThreads, showDetail, stopThreadTimer } from "./thread.js";
import { showUserProfile } from "./users.js";

function showPage(pageId) {
    let pages = select('.page');
    for (let page of pages) {
        page.style.display = "none";
    }
    const page = id(pageId);
    if(page.getAttribute('data-display') != null) {
        page.style.display = page.getAttribute('data-display');
    } else {
        page.style.display = "block";
    }

    stopThreadTimer();
}

function showHeader(headerId) {
    let pages = select('.header');
    for (let page of pages) {
        page.style.display = "none";
    }
    if(id(headerId) != null) {
        id(headerId).style.display = "block";
    }
}

function showDashboard() {
    showHeader('loginHeader');
    showPage('dashboard');
    id('thread_list').innerText = '';
    id('thread_detail').innerText = '';
    id('thread_comments').innerText = '';
    localStorage.setItem('startId', 0);
    localStorage.setItem('currThreadId', '');

    let load = loadThreads();
    load.then(()=>{
        console.log('then id:', localStorage.getItem('currThreadId'));
        if(localStorage.getItem('currThreadId') != '') {
            let currThreadId = Number(localStorage.getItem('currThreadId'));
            showDetail(currThreadId);
        }
    });
}

function loadThreads() {
    let startId = Number(localStorage.getItem('startId'));
    console.log('startId :', startId);
    if(startId < 0) {
        return;
    }
    return getThreads(startId).then(data=>{
        console.log('threads data:', data);
        if(data.count > 0){
            localStorage.setItem('startId', startId + data.count);
            if(localStorage.getItem('currThreadId') == '') {
                localStorage.setItem('currThreadId', data.ids[0]);
            }
            if(toBottom()){
                loadThreads();
            }
        }else{
            localStorage.setItem('startId', -1);
        }
    });
}

function checkLoginState() {
    const token = localStorage.getItem('token');
    if (token == null) {
        showPage('login_div');
        return;
    }

    showHeader('loginHeader');
    var fragment = window.location.hash;
    console.log('fragment: ', fragment);
    
    if (fragment == '#profile') {
        showUserProfile(Number(localStorage.getItem('userId')));
    } else if(fragment.startsWith('#profile=')) {
        showUserProfile(Number(fragment.split('=')[1]));
    } else if(fragment.startsWith('#thread=')) {
        showDashboard();
        showDetail(fragment.split('=')[1]);
    } else {
        showDashboard();
    }
}

export {
    showPage,
    showHeader,
    showDashboard,
    checkLoginState,
    loadThreads,
}
