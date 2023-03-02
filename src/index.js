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
      //add new toy (NOT DOING POST JUST MANIP DOM)
  const toyForm = document.querySelector(".add-toy-form")
  
    toyForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        const newToyObj = {
          name: toyForm.name.value,
          image: toyForm.image.value,
          likes: 0
        }
        addToyInfo(newToyObj)
    });


  //get the images
  fetch("http://localhost:3000/toys")
    .then((resp)=> resp.json())
    .then((toys)=> {
      toys.forEach(addToyInfo)
    })
  
  function addToyInfo(toy){
      //create and append card
      const toyCollection = document.getElementById("toy-collection")
      const toyCard = document.createElement("div")
      toyCard.className= "card"
      toyCollection.append(toyCard)

      //create elements
      const toyName = document.createElement("h2")
      toyName.innerText = toy.name

      const toyImage = document.createElement("img")
      toyImage.src = toy.image
      toyImage.className = "toy-avatar"

      const toyLikes = document.createElement("p")
      toyLikes.innerText = toy.likes + " Likes"

      const likeButton = document.createElement("button")
      likeButton.innerText = "like"
      likeButton.className = "like-btn"
      likeButton.id = toy.likes

      //add to card
      toyCard.append(toyName, toyImage, toyLikes, likeButton)

      //increasing likes
      likeButton.addEventListener("click", ()=> {
        toy.likes = toy.likes + 1
        return toyLikes.innerText = toy.likes + " Likes"
      })
    }

});



  //THIS IS ADDING TO THE JSON BUT NOT TO THE PAGE...UNLESS I REFRESH IT
  // const toyForm = document.querySelector(".add-toy-form")
  // toyForm.addEventListener("submit", function(e){
  //   e.preventDefault()
  //   const inputFields = document.querySelectorAll(".input-text")
  //   const newToyName = inputFields[0].value
  //   const newToyImage = inputFields[1].value
  //   const configObj={
  //     method: "POST",
  //     headers:{
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: newToyName,
  //       image: newToyImage,
  //       likes: 3
  //     })
  //   }

  //   fetch("http://localhost:3000/toys", configObj)
  //   toyForm.reset();
  // })
