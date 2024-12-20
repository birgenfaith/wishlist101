const baseURL = "http://localhost:3000/gifts";

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
    const { id, name, item, price, picture, link, comment } = giftObject;

    let nameItem = document.createElement("li");
    nameItem.textContent = name;
    let orderedNames = document.querySelector("#giftGetters");
    orderedNames.append(nameItem);

    nameItem.addEventListener("click", () => {
        const delGift = document.getElementById("delete");
        const itemGift = document.querySelector("#itemGift");
        const nameGift = document.querySelector("#nameGift");
        const priceGift = document.querySelector("#priceGift");
        const pictureGift = document.querySelector("#mainGift");
        const linkGift = document.querySelector("#linkGift");
        const commentGift = document.querySelector("#commentGift");

        delGift.innerHTML = ""; 

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            deleteGift(id);
            nameItem.remove(); 
        });
        delGift.appendChild(deleteBtn);

        itemGift.innerText = item;
        nameGift.textContent = name;
        priceGift.textContent = `Price: ${price}`;
        pictureGift.src = picture;
        linkGift.href = link;
        commentGift.textContent = `Comment: ${comment}`;
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

        fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newGift),
        })
            .then((res) => res.json())
            .then((giftObj) => {
                renderGift(giftObj); 
                alert("Item added successfully!");
            })
            .catch((error) => console.error(error));

        event.target.reset(); 
    });
}


function deleteGift(id) {
    fetch(`${baseURL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(() => {
            alert("Item deleted successfully!");
        })
        .catch((error) => console.log("Error: Cannot delete:", error));
}
