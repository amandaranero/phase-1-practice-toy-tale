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
  
  fetch("http://localhost:3000/toys")
    .then((resp)=> resp.json())
    .then((toys)=>{
      toys.forEach(uploadToys)
    })

  function uploadToys(toy){
    const toyCollection = document.getElementById("toy-collection")
    const toyCard = document.createElement("toyCard")
    toyCard.className = "card"
    toyCollection.append(toyCard)

    //toy name
    const toyName = document.createElement("h2")
    toyName.innerText = toy.name
    toyCard.append(toyName)

    //toy image
    const toyImage = document.createElement("img")
    toyImage.className = "toy-avatar"
    toyImage.src = toy.image
    toyCard.append(toyImage)

    //number of likes
    const likeCount = document.createElement("p")
    likeCount.innerText = toy.likes + " likes"
    toyCard.append(likeCount)

    //increase like button
    const incLikeButton = document.createElement("button")
    incLikeButton.id = toy.id
    incLikeButton.className = "like-btn"
    incLikeButton.innerText = "like"
    toyCard.append(incLikeButton)

    //decrease like button
    const decLikeButton = document.createElement("button")
    decLikeButton.id = toy.id
    decLikeButton.className = "like-btn"
    decLikeButton.innerText = "dislike"
    toyCard.append(decLikeButton)

    //increase likes
    incLikeButton.addEventListener("click", ()=>{
      toy.likes = toy.likes + 1
      likeCount.innerText = toy.likes + " likes"
    })

    //decrease likes
    decLikeButton.addEventListener("click", ()=>{
      console.log("click")
      if (toy.likes> 0) {
        toy.likes = toy.likes - 1
      } else {toy.likes = 0}
      likeCount.innerText = toy.likes + " likes"
    })
      // //click to show back of card?
      // toyName.addEventListener("click", ()=>{
      //   toyCard.innerHTML= ""
      // })
  }

  //submit form
  const newToyForm = document.querySelector(".add-toy-form")
  const inputTextArray = document.querySelectorAll(".input-text")
  newToyForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const newToyObj ={
      name: inputTextArray[0].value,
      image: inputTextArray[1].value,
      likes: 0
    }
    uploadToys(newToyObj)
  })
  

})
