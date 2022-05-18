const submit = document.querySelector("#submit")
const form = document.querySelector("#new-item")
const container = document.querySelector("#container")


submit.addEventListener( "click", (e) => {
    e.preventDefault();
    post(form.value)
    form.value = ""
})

fetch("db.json")
    .then(resp => resp.json())
    .then(items => {
        items.forEach(item => {
            createItem(item.name)
        });
})

function post(data){
    const object = { name: data }
    return fetch("db.json", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(object),
    })
        .then((resp) => resp.json())
        .then((data) => console.log(data))
}

function createItem(contents) {
    const newItem = document.createElement('div')
    newItem.textContent = contents
    console.log(newItem)
    container.appendChild(newItem)
}