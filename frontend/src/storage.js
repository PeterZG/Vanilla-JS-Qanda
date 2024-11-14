function storeUser(user) {
    let storage = localStorage.getItem('userMap');
    let userMap;
    if(storage == null) {
        userMap = {};
    }else{
        userMap = JSON.parse(storage);
    }
    userMap[user.id] = user;
    localStorage.setItem('userMap', JSON.stringify(userMap));
}

function retriveUser(userId) {
    let storage = localStorage.getItem('userMap');
    if(storage == null) {
        return null;
    }
    let userMap = JSON.parse(storage);
    return userMap[userId];
}

function storeAllThreads(threads) {
    localStorage.setItem('allThreads', JSON.stringify(threads));
}

function retriveThread(threadId) {
    let storage = localStorage.getItem("allThreads");
    if(storage == null) {
        return null;
    }
    let allThreads = JSON.parse(localStorage.getItem("allThreads"));
    for(let thread of allThreads) {
        if(thread.id == threadId) {
            console.log('offline detail:', thread);
            return thread;
        }
    }
    return null;
}

function storeComments(threadId, comments) {
    let storage = localStorage.getItem("allThreads");
    if(storage == null) {
        return;
    }
    let allThreads = JSON.parse(localStorage.getItem("allThreads"));
    for(let thread of allThreads) {
        if(thread.id == threadId) {
            thread.comments = comments;
        }
    }
    localStorage.setItem("allThreads", JSON.stringify(allThreads));
}

function retriveComments(threadId) {
    let storage = localStorage.getItem("allThreads");
    if(storage == null) {
        return [];
    }
    let allThreads = JSON.parse(localStorage.getItem("allThreads"));
    for(let thread of allThreads) {
        if(thread.id == threadId) {
            return thread.comments || [];
        }
    }
    return [];
}
export {
    storeUser,
    retriveUser,
    storeAllThreads,
    retriveThread,
    storeComments,
    retriveComments
}
