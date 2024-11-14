import { id, newButton, showError, div, link, bindClick } from './dom_utils.js';
import { fetchGet, fetchPost, fetchPut, online } from './fetch_utils.js';
import { dateConvert } from './helpers.js';
import { isAdmin } from './auth.js';
import { showUserProfile, getUserInfo } from './users.js';
import { getCommentsOffline } from './offline.js';
import { storeComments } from './storage.js';
function createComment() {
    const content = id('comment').value;
    if (content == '') {
        showError('Comment cannot be empty');
        return;
    }
    let data = {
        content: content,
        threadId: id('detail_thread_id').value,
        parentCommentId: null
    }
    fetchPost('/comment', data).then((res)=>{
        console.log('post comment:', res);
        id('comment').value = '';
        showThreadComments(id('detail_thread_id').value, false);
    });

}


function canEditComment(creatorId) {
    return isAdmin() || creatorId == Number(localStorage.getItem('userId'));
}

function getComments(threadId) {
    if(!online()) {
        return getCommentsOffline(threadId);
    }
    return fetchGet('/comments', 'threadId=' + threadId).then(comments=>{
        storeComments(threadId, comments);
        return Promise.resolve(comments);
    });
}

function showThreadComments(threadId, lock) {
    let parent = id('thread_comments');
    parent.innerText = '';
    getComments(threadId).then((data) => {
        console.log('comments', data);
        id('detail_thread_comments_count').value = data.length;
        let result = arrangeComments(data);
        sortComments(result.roots);
        for (let comment of result.roots) {
            // console.log("comment: ", comment);
            addCommentTree(comment, lock, parent, 0);
        }
    });
    
    if(lock) {
        id('create_comment_div').style.display = 'none';
    } else {
        id('create_comment_div').style.display = 'block';
    }

}

function addCommentTree(comment, lock, parent, level) {
    let current = addCommentBlock(comment, lock, parent);
    if(level > 0) {
        current.classList.add('sub_comment');
    }
    if(comment.children.length > 0) {
        sortComments(comment.children);
        for(let sub of comment.children) {
            addCommentTree(sub, lock, current, level + 1);
        }
    }
}


function arrangeComments(comments) {
    let map = {};
    let roots = [];
    for(let comment of comments) {
        comment['children'] = [];
        map[comment.id] = comment;
        if(comment.parentCommentId == null) {
            roots.push(comment);
        }
    }
    for(let comment of comments) {
        if(comment.parentCommentId != null) {
            map[comment.parentCommentId].children.push(comment);
        }
    }
    return {roots, map}
}

function sortComments(comments) {
    for(let i = 0; i < comments.length; i++) {
        for(let j = i + 1; j < comments.length; j++) {
            if(comments[i].createdAt < comments[j].createdAt) {
                let temp = comments[i];
                comments[i] = comments[j];
                comments[j] = temp;
            }
        }
    }
}

function addCommentBlock(comment, lock, parent) {
    let outerBox = div('');
    let box = div('', ['row', 'mb-2', 'comment']);
    let avatar = div('', ['col-1', 'avatar']);
    box.appendChild(avatar);
    let img = document.createElement('img');
    img.src = 'images/default.png';
    let name = div('');
    getUserInfo(comment.creatorId).then(user=>{
        if(user.image != null){
            img.src = user.image;
        }
        name.innerText = user.name;
    })
    avatar.appendChild(img);
    avatar.appendChild(name);

    bindClick(avatar, ()=>{showUserProfile(comment.creatorId)});

    box.appendChild(div(comment.content, ['col-8', 'content']));

    let buttons = div('', 'col-3');
    box.appendChild(buttons);

    if(!lock) {
        newButton('Reply', () => {
            showReplyComment(comment);
        }, buttons, ['btn', 'btn-primary', 'btn-sm', 'me-1']);
        
        let turnon = !liking(comment);
        let likeText = turnon ? 'Like' : 'Unlike';
        newButton(likeText, () => {
            fetchPut('/comment/like', { 'id': comment.id, "turnon": turnon }).then(() => {
                showThreadComments(id('detail_thread_id').value, false);
            });
        }, buttons, ['btn', 'btn-primary', 'btn-sm', 'me-1']);
    }
    if(canEditComment(comment.creatorId)) {
        newButton('Edit', () => {
            showEditComment(comment);
        }, buttons, ['btn', 'btn-primary', 'btn-sm', 'me-1']);
    }

    let timeDiv = div('');
    timeDiv.innerText = dateConvert(comment.createdAt);
    buttons.appendChild(timeDiv);
    buttons.appendChild(div('Likes: ' + comment.likes.length));


    outerBox.appendChild(box);
    parent.appendChild(outerBox);
    return outerBox;
}

function liking(comment) {
    return comment.likes.includes(Number(localStorage.getItem('userId')))
}

function showReplyComment(comment) {
    id('reply_comment_id').value = comment.id;
    var messageModal = new bootstrap.Modal(document.getElementById('commentModal'), {
        keyboard: false
    });
    messageModal.show();
}

function replyComment() {
    const content = id('reply_comment_content').value;
    if (content == '') {
        showError('Comment cannot be empty');
        return;
    }
    let data = {
        content: content,
        threadId: id('detail_thread_id').value,
        parentCommentId: id('reply_comment_id').value
    }
    fetchPost('/comment', data).then((res)=>{
        console.log('reply comment:', res);
        id('reply_comment_content').value = '';
        showThreadComments(id('detail_thread_id').value, false);
    });
}


function showEditComment(comment) {
    id('edit_comment_id').value = comment.id;
    id('edit_comment_content').value = comment.content;
    var messageModal = new bootstrap.Modal(document.getElementById('editCommentModal'), {
        keyboard: false
    });
    messageModal.show();
}

function saveComment() {
    const content = id('edit_comment_content').value;
    if (content == '') {
        showError('Comment cannot be empty');
        return;
    }
    let data = {
        content: content,
        id: id('edit_comment_id').value,
    }
    fetchPut('/comment', data).then((res)=>{
        console.log('edit comment:', res);
        id('edit_comment_content').value = '';
        showThreadComments(id('detail_thread_id').value, false);
    });
}
export {
    createComment,
    showThreadComments,
    replyComment,
    saveComment
}
