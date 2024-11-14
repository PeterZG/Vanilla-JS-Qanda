
import { isLogin, loginId } from "./auth.js";
import { fetchGet, online } from "./fetch_utils.js";
import { getAllThreads, showDetail } from "./thread.js";
import { id, bindClick } from "./dom_utils.js";

function recordUserWatchedThreads() {
    let userId = loginId();
    let watchIds = [];
    let commentCountMap = {};
    let fetchWaits = [];

    // we need to get all threads to collect which threads are watched by user
    // this can be slow when there are many threads
    getAllThreads().then(threads => {
        for(let thread of threads) {
            if(thread.watchees.includes(userId)){
                watchIds.push(thread.id);
                commentCountMap[thread.id] = 0;
                let fetchWait = fetchGet('/comments', 'threadId='+thread.id);
                fetchWaits.push(fetchWait);
                fetchWait.then(comments=>{
                    commentCountMap[thread.id] = comments.length;
                });
            }
        }
        Promise.all(fetchWaits).then(()=>{
            let watchData = {
                ids: watchIds,
                counts: commentCountMap
            }
            localStorage.setItem('watchData', JSON.stringify(watchData));
        });
    });
}

let watchTimer;
function startWatchTimer() {
    if(watchTimer != null) {
        clearInterval(watchTimer);
    }
    if(!isLogin() || !online()){
        return;
    }
    watchTimer = setInterval(()=>{
        if(!isLogin() || !online()){
            return;
        }
        if(localStorage.getItem('watchData') == null) {
            return;
        }
        let watchData = JSON.parse(localStorage.getItem('watchData'));
        // console.log('watch timer ids:', watchData.ids);
        for(let threadId of watchData.ids) {
            fetchGet('/comments', 'threadId='+threadId).then(comments=>{
                if(comments.length != watchData.counts[threadId]) {
                    watchData = JSON.parse(localStorage.getItem('watchData'));
                    watchData.counts[threadId] = comments.length;
                    localStorage.setItem('watchData', JSON.stringify(watchData));

                    id('notify_thread').innerText = threadId;
                    bindClick('notify_thread', ()=>{showDetail(threadId)});
                    new bootstrap.Toast(id('liveToast'), {delay: 5000}).show();
                }
            });
        }
    }, 3000);
}

function addToWatchList(threadId) {
    if(localStorage.getItem('watchData') == null) {
        return;
    }
    
    let watchData = JSON.parse(localStorage.getItem('watchData'));
    const index = watchData.ids.indexOf(threadId);
    if(index != -1) {
        return;
    }
    fetchGet('/comments', 'threadId='+threadId).then(comments=>{
        watchData = JSON.parse(localStorage.getItem('watchData'));
        if(watchData.ids.indexOf(threadId) == -1) {
            watchData.ids.push(threadId);
            watchData.counts[threadId] = comments.length;
            localStorage.setItem('watchData', JSON.stringify(watchData));
        }
    });
}

function removeFromWatchList(threadId) {
    if(localStorage.getItem('watchData') == null) {
        return;
    }
    let watchData = JSON.parse(localStorage.getItem('watchData'));
    const index = watchData.ids.indexOf(threadId);
    if(index != -1) {
        watchData.ids.splice(index, 1);
        localStorage.setItem('watchData', JSON.stringify(watchData));
    }
}
export {
    recordUserWatchedThreads,
    startWatchTimer,
    addToWatchList,
    removeFromWatchList
}
