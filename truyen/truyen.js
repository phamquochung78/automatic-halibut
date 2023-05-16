var truyenApi = 'http://localhost:3000/truyens';

function start(){
    getTruyens(renderTruyens);
    handleCreateForm();
}   
start ();


function getTruyens(callback){
    fetch(truyenApi)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function createTruyen(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(truyenApi, options)
    .then(function(response){
        response.json();
    })
    .then(callback);
}

function handleDeleteTruyen(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(truyenApi + '/' + id, options)
    .then(function(response){
        response.json();
    })
    .then(function(){
      var truyenItem = document.querySelector('.truyen-item-' + id)
      if (truyenItem){
        truyenItem.remove();
      }
    });
}

function renderTruyens(truyens){
    var listTruyensBlock = document.querySelector('#list-truyens');
    var htmls = truyens.map(function(truyen){
        return`
        <li class="truyen-item-${truyen.id}">
            <h4>${truyen.name}</h4>
            <p>${truyen.description}</p>
            <button onclick="handleDeleteTruyen(${truyen.id})">Delete</button>
        </li>
        `;
    });
    listTruyensBlock.innerHTML = htmls.join('');
}

function handleCreateForm(){
    var createBtn = document.querySelector('#create');
    
    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        
        var formData = {
            name: name,
            description: description
        };
        createTruyen(formData, function(){
            getTruyens(renderTruyens);
        });
    }
}