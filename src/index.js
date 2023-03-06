let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })

  //new TOY
  const newToyForm = document.querySelector(".add-toy-form")
  newToyForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    // console.log(newToyName)
    const newToyName = newToyForm.name.value
    const newToyImage = newToyForm.image.value

    const newToyOb = {
      name: newToyName,
      image: newToyImage, 
      likes: 0
    }
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToyOb)
      })
     .then((resp)=>resp.json())
     .then((data)=>{
      addToys(data)
     })
    })
    
  fetch("http://localhost:3000/toys")
  .then((resp)=> resp.json())
  .then((toys)=>{
    toys.forEach(addToys)
  })

function addToys(toy){
  const toyCollection = document.getElementById("toy-collection")
  const toyCard = document.createElement("div")
  toyCard.className = "card"
  toyCollection.append(toyCard)

  //toy card info

  //toy name
  const toyName = document.createElement("h2")
  toyName.innerText = toy.name

  //toy image
  const toyImage = document.createElement("img")
  toyImage.src = toy.image
  toyImage.className = "toy-avatar"

  //toy likes
  const toyLikes = document.createElement("p")
  toyLikes.innerText = toy.likes + " likes"

  //like Button
  const likeButton = document.createElement("button")
  likeButton.innerText = "Like"
  likeButton.id = toy.id

  toyCard.append(toyName,toyImage, toyLikes, likeButton)
}
  })
  



  //new toy


  // const  newToyObj = {
 
  // }

  // const configObj = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Accept": "application/json",
  //   },
  //   body: JSON.stringify(
  //     newToyObj
  //   )
  // }

  



