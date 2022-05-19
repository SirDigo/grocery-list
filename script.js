const submit = document.querySelector("#submit")
const form = document.querySelector("#new-item")
const container = document.querySelector("#container")


submit.addEventListener( "click", (e) => {
    // e.preventDefault();
    post(form.value)
    form.value = ""
})

fetch("http://localhost:3000/items")
    .then(resp => resp.json())
    .then(items => {
        items.forEach(item => {
            createItem(item.name)
        });
})

function post(data){
    const object = { name: data }
    fetch("http://localhost:3000/items", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(object),
    })
    .then((resp) => {
        console.log(resp)
        resp.json()
    })
    .then((data) => createItem(data))
}

function createItem(contents) {
    const newItem = document.createElement('div')
    newItem.textContent = contents
    // console.log(newItem)
    container.appendChild(newItem)
}