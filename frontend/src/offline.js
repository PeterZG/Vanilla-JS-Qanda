import { retriveUser, retriveThread, retriveComments } from "./storage.js";


function getThreadIdsOffline(startIndex) {
    let storage = localStorage.getItem("allThreads");
    if(storage == null) {
        return Promise.resolve([]);
    }
    let allThreads = JSON.parse(localStorage.getItem("allThreads"));
    let start = Number(startIndex);
    let threadIds = [];
    for(let i = start; i < allThreads.length && i < start + 5; i++) {
        threadIds.push(allThreads[i].id);
    }
    console.log('offline threads:', threadIds);
    // return Promise.resolve(threads);
    return Promise.resolve(threadIds);
}

function getThreadOffline(threadId) {
    return Promise.resolve(retriveThread(threadId));
}

function getUserInfoOffline(userId) {
    let user = retriveUser(userId);
    if(user == null) {
        user == {
            id: userId,
            name: userId,
            email: null,
            admin: false,
            image: null
        }
    }
    return Promise.resolve(user);
}

function getCommentsOffline(threadId) {
    let comments = retriveComments(threadId);
    return Promise.resolve(comments);
}

export {
    getThreadIdsOffline,
    getThreadOffline,
    getUserInfoOffline,
    getCommentsOffline
}
