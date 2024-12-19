const baseURL = http://localhost:3000/gifts
document.addEventListener("DOMContentLoaded", function () {
    fetch(baseURL)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Sorry. There was a problem retrieving gifts.");
        }
        return resp.json();
      })
      .then((data) => {
        nameList(data);
      })
      .catch((err) => {
        alert("An error occurred: " + err);
      });
    
      submitData();
  });
  
  function nameList(giftArray) {
    giftArray.forEach((giftObject) => {
      renderGift(giftObject); 
    });
  }
  
  function renderGift(giftObject) {
    let nameItem = document.createElement("li");
    nameItem.textContent = giftObject.name;
    let orderedNames = document.querySelector("#giftGetters");
    orderedNames.append(nameItem);
  
    nameItem.addEventListener("click", () => {
      const { id, name, item, price, picture, link, comment } = giftObject;
  
    
      const delGift = document.getElementById("delete");
      const itemGift = document.querySelector("#itemGift");
      const nameGift = document.querySelector("#nameGift");
      const priceGift = document.querySelector("#priceGift");
      const pictureGift = document.querySelector("#mainGift");
      const linkGift = document.querySelector("#linkGift");
      const commentGift = document.querySelector("#commentGift");
      
    
      delGift.innerHTML = "";
  
      let deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Delete";
      deleteBtn.addEventListener("click", (e) => {
        deleteGift(id); 
        nameItem.remove();
        e.target.reset() 
      });
      delGift.appendChild(deleteBtn);
  

      itemGift.innerText = item;
      nameGift.textContent = name;
      priceGift.textContent = price;
      pictureGift.src = picture;
      linkGift.href = link;
      commentGift.textContent = comment;
    });
  }
  
  
  function submitData() {
    const addAnotherGift = document.getElementById("submitForm");
  
    addAnotherGift.addEventListener("submit", (event) => {
      event.preventDefault();
  
      
      const newName = event.target["nameInput"].value;
      const newItem = event.target["itemInput"].value;
      const newPrice = event.target["priceInput"].value;
      const newPicture = event.target["pictureInput"].value;
      const newLink = event.target["linkInput"].value;
      const newComment = event.target["commentInput"].value;
  
      const newGift = {
        item: newItem,
        name: newName,
        price: newPrice,
        picture: newPicture,
        link: newLink,
        comment: newComment,
      };
  
      renderGift(newGift); ft
  
      fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGift),
      })
        .then((res) => res.json())
        .then((giftObj) => {
          alert('Item added successfully ;)')
          console.log(giftObj)
        })
        .catch((error) => console.error(error));
  
      event.target.reset(); 
    });
  }
  
  //Editing a gift 
   function updateData(id) {
         
        const addAnotherGift = document.getElementById("submitForm")

        const editGift = document.createElement('Edit')
        addAnotherGift.addEventListener('submit', (event) => {
        event.preventDefault();
  
       const newName = event.target["nameInput"].value
        const newItem = event.target["itemInput"].value
           const newPrice = event.target["priceInput"].value
           const newPicture = event.target["pictureInput"].value
         const newLink = event.target["linkInput"].value
           const newComment = event.target["commentInput"].value
  
          const updateGift = {
              item: newItem,
               name: newName,
            price: newPrice,
              picture: newPicture,
            link: newLink,
             comment: newComment
           }
  
         const edit = document.getElementById('edit');
          edit.appendChild(editGift)
          renderGift(updateGift);
  
         fetch(`${baseURL}/${id}`, {
             method: "PATCH",
              headers: {
                  "Content-Type": "application/json",
                 "Accept": "application/json"
             },
              body: JSON.stringify(updateGift),
         })
               .then((res) => res.json())
               .then((giftObj) => console.log(giftObj))
               .catch(error => console.error(error))
           event.target.reset()
       })
   }
  

  function deleteGift(id) {
    fetch(`${baseURL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        alert("Item deleted successfully!");
      })
      .catch((error) => console.log("Error: Cannot delete:", error));
  }