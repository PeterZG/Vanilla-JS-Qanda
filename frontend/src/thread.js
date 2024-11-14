import { id, select, bindClick, getRadioValue, newButton, div, pre, span, link, showError } from './dom_utils.js';
import { fetchPost, fetchGet, fetchPut, fetchDelete, online } from "./fetch_utils.js";
import { showPage, showDashboard } from './ui.js';
import { showThreadComments } from './comment.js';
import { showUserProfile, getUserInfo } from './users.js';
import { isAdmin, isLogin } from './auth.js';
import { addToWatchList, removeFromWatchList } from './notification.js';
import { getThreadIdsOffline, getThreadOffline } from './offline.js';
import { storeAllThreads } from './storage.js';

let threadTimer;

function createThread() {
    if(id('thread_title').value == '' || id('thread_content').value == '') {
        showError('Please enter title and content.');
        return;
    }
    let data = {
        "title": id('thread_title').value,
        "isPublic": getRadioValue('thread_public') == 1,
        "content": id('thread_content').value
    };

    fetchPost('/thread', data).then((res) => {
        showDashboard();
        showDetail(res.id);

        id('thread_title').value = ''
        id('thread_content').value = ''
    });

    
    // create test data
    // for(let i = 13; i < 31; i++) {
    //     fetchPost('/thread', {
    //         "title": i,
    //         "isPublic": getRadioValue('thread_public') == 1,
    //         "content": i
    //     });
    // }
}

function getThread(threadId) {
    if(!online()) {
        return getThreadOffline(threadId);
    }
    return fetchGet('/thread', "id=" + threadId);
}

function getThreadIds(startIndex) {
    if(!online()) {
        return getThreadIdsOffline(startIndex);
    }
    return fetchGet('/threads', "start=" + startIndex);
}

function getThreads(startIndex) {
    
    return getThreadIds(startIndex).then((res) => {
        let count = res.length;
        let allThreads = [];
        let parent = id('thread_list');
        for (let i = 0; i < count; i++) {
            let box = div('', 'thread_item');
            parent.appendChild(box);
            allThreads.push(showThreadById(res[i], box));
        }

        return Promise.all(allThreads).then(()=>{
            return Promise.resolve({ 'count': count, 'ids': res });
        });
    });
}

function showThreadById(threadId, element) {
    return getThread(threadId).then((thread) => {
        // console.log('one of threads:', thread);
        showThread(thread, element);
    });
}

function showThread(thread, box) {

    let currThreadId = Number(localStorage.getItem('currThreadId'));

    box.setAttribute('data-id', thread.id);
    box.setAttribute('id', 'thread_item_' + thread.id);
    if (thread.id == currThreadId) {
        box.classList.add('select');
    }
    box.appendChild(div(thread.title, 'title'));
    let date = 'Created at: ' + thread.createdAt.substring(0, 10);
    box.appendChild(div(date));
    let authorDiv = div('');
    let creatorLink = link('javascript:void(0)', 'Author');
    authorDiv.appendChild(creatorLink);
    bindClick(creatorLink, () => {
        showUserProfile(thread.creatorId);
    });

    authorDiv.appendChild(span(' Likes: ' + thread.likes.length, ['like_count', 'sub_info']));
    box.appendChild(authorDiv);

    getUserInfo(thread.creatorId).then(user => {
        creatorLink.innerText = 'Author: ' + user.name;
    });

    bindClick(box, () => {
        showDetail(thread.id);
        for (let item of select('.thread_item')) {
            item.classList.remove('select');
        }
        box.classList.add('select');
    });
}

function canEdit(creatorId) {
    return isAdmin() || creatorId == Number(localStorage.getItem('userId'));
}

function liking(thread) {
    return thread.likes.includes(Number(localStorage.getItem('userId')))
}
function watching(thread) {
    return thread.watchees.includes(Number(localStorage.getItem('userId')))
}

function showDetail(threadId) {
    localStorage.setItem('currThreadId', threadId);
    getThread(threadId).then((thread) => {
        console.log('detail: ', thread);
        updateThreadContent(thread);

        showThreadComments(thread.id, thread.lock);

        updateThreadLikeCount(thread.id, thread.likes.length);

        startThreadTimer();
    });
}

function updateThreadDetail(threadId) {
    getThread(threadId).then((thread) => {
        updateThreadContent(thread);
        updateThreadLikeCount(thread.id, thread.likes.length);
    });
}

function updateThreadContent(thread) {
    console.log("update thread detail start...", thread.id);
    id('detail_thread_id').value = thread.id;
    id('detail_thread_lock').value = thread.lock;
    const parent = id('thread_detail');
    parent.innerText = '';


    // thread details
    let box = div('', '');
    box.appendChild(div(thread.title, ['title']));
    box.appendChild(div(thread.content, 'content'));
    let likeDiv = div('Likes:' + thread.likes.length, ['likes', 'sub_info']);
    likeDiv.setAttribute('id', 'thread_detail_likes');
    box.appendChild(likeDiv);

    // creator
    let creatorLink = link('javascript:void(0)', 'Crretor');
    box.appendChild(creatorLink);
    bindClick(creatorLink, () => {
        showUserProfile(thread.creatorId);
    });
    getUserInfo(thread.creatorId).then(user => {
        creatorLink.innerText = 'Author: ' + user.name;
    });

    let buttonRow = div('', 'row');
    let buttonCol = div('', 'col');
    buttonRow.appendChild(buttonCol);
    parent.appendChild(buttonRow);

    // edit button
    if (canEdit(thread.creatorId)) {
        let editBtn = newButton("Edit", () => {
            showEditThread(thread.id);
        }, buttonCol, ['btn', 'btn-primary', 'me-3']);
    }

    // like button
    if (!thread.lock) {
        let turnon = !liking(thread);
        let likeText = turnon ? 'Like' : 'Unlike';
        let likeBtn = newButton(likeText, () => {
            fetchPut('/thread/like', { 'id': thread.id, "turnon": turnon }).then(() => {
                updateThreadDetail(thread.id);
            });
        }, buttonCol, ['btn', 'btn-primary', 'me-3']);
    }

    // watch button
    let watchTurnon = !watching(thread);
    let watchText = watchTurnon ? 'Watch' : 'Unwatch';
    let watchBtn = newButton(watchText, () => {
        fetchPut('/thread/watch', { 'id': thread.id, "turnon": watchTurnon }).then(() => {
            updateThreadDetail(thread.id);
            if (watchTurnon) {
                addToWatchList(thread.id);
            } else {
                removeFromWatchList(thread.id);
            }
        });
    }, buttonCol, ['btn', 'btn-primary', 'me-3']);

    // delete button
    if (canEdit(thread.creatorId)) {
        let deleteBtn = newButton("Delete", () => {
            fetchDelete('/thread', { 'id': thread.id }).then(() => {
                showDashboard();
            });
        }, buttonCol, ['btn', 'btn-danger']);
    }

    parent.appendChild(box);
    
    console.log("update thread detail end...", thread.id);
}

function updateThreadLikeCount(threadId, count) {
    let elements = select('#thread_item_' + threadId + ' .like_count');
    if (elements.length > 0) {
        elements[0].innerText = ' Likes: ' + count;
    }
}

function showEditThread(threadId) {
    showPage('edit_thread');


    getThread(threadId).then((thread) => {
        id('edit_id').value = thread.id;
        id('edit_title').value = thread.title;
        id('edit_content').value = thread.content;

        let publicIndex = thread.isPublic ? 1 : 0;
        id('edit_public' + publicIndex).checked = true;

        let lockIndex = thread.lock ? 1 : 0;
        id('edit_locked' + lockIndex).checked = true;
    });
}

function saveThread() {
    let threadId = id('edit_id').value;
    let data = {
        "id": threadId,
        "title": id('edit_title').value,
        "isPublic": getRadioValue('edit_public') == 1,
        "lock": getRadioValue('edit_locked') == 1,
        "content": id('edit_content').value
    };

    fetchPut('/thread', data).then((res) => {
        console.log("save edit:", res);
        showDashboard();

        showDetail(threadId);
    });
}

function getAllThreadIds() {
    let startIndex = 0;
    let list = [];

    return loadAllThreadIds(startIndex, list).then(data => {
        return Promise.resolve(data.ids);
    });
}

function loadThreadIds(startIndex) {
    console.log("load ids - start:", startIndex);
    return fetchGet('/threads', "start=" + startIndex).then(ids => {
        return Promise.resolve({
            count: ids.length,
            ids: ids
        })
    });
}

function loadAllThreadIds(startIndex, list) {

    return loadThreadIds(startIndex).then(data => {
        if (data.count > 0) {
            for (let id of data.ids) {
                list.push(id);
            }
            return loadAllThreadIds(startIndex + data.count, list);
        } else {
            return Promise.resolve({ 'ids': list });
        }
    });
}

function getAllThreads() {
    return getAllThreadIds().then(ids => {
        console.log("load ids:", ids);
        let threads = [];
        let fetchThreads = [];
        for (let i = 0; i < ids.length; i++) {
            threads.push[i];
            let fetchThread = fetchGet('/thread', 'id=' + ids[i]).then((thread) => {
                threads[i] = thread;
            });
            fetchThreads.push(fetchThread);
        }

        return Promise.all(fetchThreads).then(() => {
            
            storeAllThreads(threads);
            return Promise.resolve(threads);
        });
    })
}

function stopThreadTimer() {
    if (threadTimer != null) {
        clearInterval(threadTimer);
    }
}

function startThreadTimer() {
    if (threadTimer != null) {
        clearInterval(threadTimer);
    }
    if (!isLogin() || !online()) {
        return;
    }
    let threadId = id('detail_thread_id').value;
    threadTimer = setInterval(() => {
        // console.log("timer:", new Date());
        if (!isLogin() || !online()) {
            return;
        }

        getThread(threadId).then((thread) => {
            id('thread_detail_likes').innerText = 'Likes:' + thread.likes.length;
        });

        fetchGet('/comments', 'threadId=' + threadId).then((data) => {
            let count = id('detail_thread_comments_count').value;
            if (data.length != count) {
                showThreadComments(threadId);
            }
        });

    }, 2000);
}


export {
    createThread,
    getThread,
    getThreads,
    showDetail,
    saveThread,
    getAllThreads,
    stopThreadTimer
};
