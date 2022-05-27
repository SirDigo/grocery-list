const submit = document.querySelector("#submit")
const form = document.querySelector("#new-item")
const container = document.querySelector("#container")

// const xBtn = document.querySelector(".item-btn-x")
const holder = [];

submit.addEventListener( "click", (e) => {
    e.preventDefault();
    post(form.value)
    form.value = ""
})
   
function getter(){
    fetch("http://localhost:3000/items")
        .then(resp => resp.json())
        .then(items => {
            items.forEach(item => {
                holder.push({
                    name : item.name,
                    id : item.id
                })
                createItem(item.name)
            });
    })
    console.log(holder)
}

getter()

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
    .then(
        createItem(data)
    )
    // .then((resp) => {
    //     console
    //     createItem(resp.json())
    // })
    // .then((data) => {
        
    // })
}

function deleteItem(id){
    fetch(`http://localhost:3000/items/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        const found = holder.indexOf(finder(holder, "id", id))
        container.removeChild(container.children[found])
        holder.splice(found, 1)
    })
}

function createItem(contents) {
    //making a new item
    const newItem = document.createElement('div')
    newItem.className = "item"

    //making a new p tag
    const pTag = document.createElement('p')
    pTag.textContent = contents
    pTag.className = "p-tag-item"

    //creating X button on each item
    const btn = document.createElement("button")
    btn.textContent = "X"
    btn.className = "item-btn-x"
    addListener(btn)

    newItem.appendChild(pTag)
    newItem.appendChild(btn)
    container.appendChild(newItem)
}

function finder(array, conditionOne, conditionTwo){
    return (conditionOne === "id" ?
        array.find(element => element.id === conditionTwo) :
        array.find(element => element.name === conditionTwo))
}

function addListener(attachTo){
    attachTo.addEventListener( "click", (e) => {
        const parent = e.target.parentElement.textContent.slice(0, -1)
        // const found = holder.find(element => element.name === parent);
        const found = finder(holder, "name", parent)
        deleteItem(found.id)
    })
}