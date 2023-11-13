// Define a variable to store the modal element
const modal = new bootstrap.Modal(document.getElementById("exampleModel"));

// Function to handle editing
const handleActionEdit = (elementId) => {
  const el = document.getElementById(elementId);
  const productId = elementId.split("@")[1];

  // Set input field values based on the product data
  document.getElementById("fullname").value = el.children[0].innerText;
  document.getElementById("image").value = el.children[1].innerText;
  document.getElementById("brand").value = el.children[2].innerText;
  document.getElementById("category").value = el.children[3].innerText;
  document.getElementById("description").value = el.children[4].innerText;
  document.getElementById("price").value = el.children[5].innerText;
  document.getElementById("countInStock").value = el.children[6].innerText;
  document.getElementById("rating").value = el.children[7].innerText;
  document.getElementById("numReviews").value = el.children[8].innerText;

  // Open the modal 
  modal.show();

  document.getElementById("btnUpdate").onclick = ()=>{
    handleUpdate(productId)
  }


 
};



const handleUpdate = async (menuId) => {
    // const el = document.getElementById(menuId);
  const fullName = document.getElementById("fullname")
  const image = document.getElementById("image")
  const brand = document.getElementById("brand")
  const category = document.getElementById("category")
  const description = document.getElementById("description")
  const price = document.getElementById("price")
  const countInStock = document.getElementById("countInStock")
  const rating = document.getElementById("rating")
  const numReviews = document.getElementById("numReviews")

   await fetch(`http://localhost:3000/${menuId}`, {
    method: "PUT",
    headers: {
        "Content-Type" : "application/json"
    },
    body : JSON.stringify({
        name : fullName.value,
        image: image.value,
        brand: brand.value,
        category: category.value,
        description: description.value,
        price: price.value,
        countInStock: countInStock.value,
        rating: rating.value,
        numReviews: numReviews.value
    })
  })
  location.reload()
};

// console.log("hello")