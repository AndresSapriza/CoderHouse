const socket = io();
let productsForm = document.getElementsByName('products')[0];
let userForm = document.getElementsByName('User')[0];
let connectButton = document.getElementById('connect');
let sendInput = document.getElementById('send');
let userName = '';

socket.on('history', data => {
    if(data.length > 0){
        let history = document.getElementById('history');

        let html =  `<table class="table">
            <thead>
            <tr>
                <th scope="col">id</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Photo</th>
            </tr>
            </thead>
            <tbody>`;
        data.forEach(product => {
                html += `<tr>
                    <th scope="row">${product.id}</th>
                    <td>${product.title}</td>
                    <td>${product.price}</td>
                    <td><img src=${product.thumbnail}></td>
                </tr>`
            });
        
        html += `</tbody>
            </table> `

        history.innerHTML = html;
    }
});

socket.on('chat', data => {
    let html = '';
    let messageClass = '';
    let headerClass = '';
    let chatHistory = document.getElementById('chatHistory');
    let divChat = document.getElementsByClassName('chat-history')[0];
    
    if(data.length == undefined){
        data = [data];
    }

    data.forEach((message) => {
        let li = document.createElement('li');
        li.className = 'clearfix';
        if (message.user === userName){
            messageClass = 'message my-message';
        } else {
            messageClass = 'message other-message float-right';
            headerClass = 'text-right'
        }
    
        html = `<div class="message-data ${headerClass}">
                    <span class="message-data-time">${message.user} ${message.date}</span>
                </div>
                <div class="${messageClass}"> ${message.message} </div>`;
        
        li.innerHTML = html;
    
        chatHistory.appendChild(li);

    });
    
    
    divChat.scrollTop = divChat.scrollHeight;
});

productsForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let formData = new FormData(evt.target);
    let product = {};
    console.log(formData);
    formData.forEach((value, key) => product[key]=value);
    productsForm.reset();
    socket.emit('products',product);
});

userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let userNameElement = document.getElementById('userName');
    let messageInput = document.getElementById('message');
    let divChat = document.getElementsByClassName('chat-history')[0];

    messageInput.disabled = false;
    sendInput.disabled = false;
    divChat.className = 'chat-history'
    userName = userNameElement.value;

    socket.emit('sended',userName);
});

sendInput.addEventListener('click', (evt) => {
    evt.preventDefault();
    let messageInput = document.getElementById('message');
    let date = new Date();
    let message = {'user':userName, 'message':messageInput.value, 'date':date.toLocaleString()};
    
    socket.emit('message',message);
});