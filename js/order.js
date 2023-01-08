const mobileMenu = document.getElementById("mobileMenu");
const navMenuItems = document.getElementById("navItems");
const navMenuClose = document.getElementById("mobileMenuClose");
const shopICon = document.querySelector(".mobileNav");
const shopBagde = document.querySelector(".cartBox");


// Mobile and Tablet NAvbar implementation//
if (mobileMenu) {
   mobileMenu.addEventListener("click", () => {
       navMenuItems.classList.add("active");
       mobileMenu.style.display = "none";
       shopICon.style.display = "none";
       shopBagde.style.display = "none";
       navMenuClose.style.display = "flex"; 
   })    
}


if (navMenuClose) {
 navMenuClose.addEventListener("click", () => {
      navMenuItems.classList.remove("active");
      mobileMenu.style.display = "flex" 
      shopICon.style.display = "flex";      
    })
}

const labels = document.getElementById("labels");
const ordersInCart = document.getElementById("orderSummary");

let cartBasket = JSON.parse(localStorage.getItem("suits")) || [];

const itemsInCart = () => {
    let cartIcon = document.getElementById("itemsUpdate");
    cartIcon.innerHTML = cartBasket.map((idx) => idx.quantity).reduce((x, y) => x + y, 0);
  }
  
  const itemsMobileInCart = () => {
    let cartIcon = document.getElementById("mobileItemsUpdate");
    cartIcon.innerHTML = cartBasket.map((idx) => idx.quantity).reduce((x, y) => x + y, 0);
  }
  
  itemsInCart();
  itemsMobileInCart();
  

let loadCartItems = () => {
 if (cartBasket.length !== 0) {
  return (ordersInCart.innerHTML = cartBasket.map((idx) => {
    let {id , item} = idx;
    // let findItems = shopItems.find((stuff) => stuff.id === id) || [];
    return `
    <div class="selectedCartItems">Loading...</div>
    `
  }).join(""));
 } else {
  ordersInCart.innerHTML = ``;
  labels.innerHTML = `
  <h3><b>No Items in Cart</b></h3>
  <a href="./shop.html">
  <button class="backToShopBtn">Back to Shop</button>
  </a>
  `
 }
}

loadCartItems();