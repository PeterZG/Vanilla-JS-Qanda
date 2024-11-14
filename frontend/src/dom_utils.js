function id(elementId) {
    return document.getElementById(elementId);
}

function select(cssSelector) {
    return document.querySelectorAll(cssSelector);
}

function bindClick(element, callback) {
    if (typeof (element) === 'string') {
        id(element).addEventListener('click', callback);
    } else {
        element.addEventListener('click', callback);
    }
}

function showError(message) {
    id('error_body').innerText = message;
    let messageModal = bootstrap.Modal.getInstance(id('errorModal'));
    if(messageModal == null) {
        messageModal = new bootstrap.Modal(id('errorModal'), {
            keyboard: false
        });
    }
    messageModal.show();
}

function showInfo(message) {
    id('message_body').innerText = message;
    var messageModal = new bootstrap.Modal(document.getElementById('messageModal'), {
        keyboard: false
    });
    messageModal.show();
}

function hideError() {
    id('error').style.display = 'none';
}

function getRadioValue(name) {
    const radios = document.getElementsByName(name);
    let value;
    for (let ele of radios) {
        if (ele.checked) {
            value = ele.value;
        }
    }
    return value;
}

function newButton(text, callback, parent, classes) {
    let button = document.createElement('button');
    button.innerText = text;
    if (callback != null) {
        bindClick(button, () => {
            callback();
        });
    }
    addClass(button, classes);
    if (parent != null) {
        parent.appendChild(button);
    }
    return button;
}

function addClass(element, className) {
    if(className != null && className != '') {
        if(typeof(className) == 'string') {
            element.classList.add(className);
        }else{
            for(let name of className) {
                element.classList.add(name);
            }
        }
    }
    return element;
}
function div(content, className) {
    let div = document.createElement('div');
    div.innerText = content;
    return addClass(div, className);
}

function pre(content, className) {
    let div = document.createElement('pre');
    div.innerText = content;
    return addClass(div, className);
}

function span(content, className) {
    let div = document.createElement('span');
    div.innerText = content;
    return addClass(div, className);
}

function link(href, text) {
    let a = document.createElement('a');
    a.innerText = text;
    a.setAttribute('href', href);
    return a;
}

function toBottom() {
    return (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
}

function setSelectValue() {

}

export {
    id,
    select,
    bindClick,
    showError,
    showInfo,
    hideError,
    getRadioValue,
    newButton,
    div,
    pre,
    span,
    link,
    toBottom
}
