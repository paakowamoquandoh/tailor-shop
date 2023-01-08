import { shopItems } from "./shop";
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
  });
}

if (navMenuClose) {
  navMenuClose.addEventListener("click", () => {
    navMenuItems.classList.remove("active");
    mobileMenu.style.display = "flex";
    shopICon.style.display = "flex";
  });
}

console.log({ shopItems });
//  Shop Items display
let shop = document.getElementById("productsBox");

let cartBasket = JSON.parse(localStorage.getItem("suits")) || [];

// let shopItems = [
//   {
//       image: "../img/homeCart/image1.png",
//       title: "Classic Fit Suit",
//       description: "Classic, best suits man with a fuller build",
//       price: "Ghc 1899",
//       uniqueId: "classic"
//   },
//   {
//       image: "../img/homeCart/image2.png",
//       title: "Slim Fit Suit",
//       description: "Contoured to the body, slim but has some room for comfort",
//       price: "Ghc 1960",
//       uniqueId: "slim"
//   },
//   {
//       image: "../img/homeCart/image3.png",
//       title: "Modern Fit Suit",
//       description: "Slim fit, contoured, shorter length.",
//       price: "Ghc 2899",
//       uniqueId: "modern"
//   },
//   {
//       image: "../img/homeCart/image4.png",
//       title: "Patch Pocket Blazer",
//       description: "Popular style from the 80s where the classic ‘V’ style was a mainstay",
//       price: "Ghc 2099",
//       uniqueId: "patchpocket"
//   },
//   {
//       image: "../img/homeCart/image5.png",
//       title: "Double Breasted Suit",
//       description: "4, 6 or 8 buttons max, 6 being the most common",
//       price: "Ghc 2800",
//       uniqueId: "doublebreasted"
//   },
//   {
//       image: "../img/homeCart/image6.png",
//       title: "Single Breasted Suit",
//       description: "Inclusion of either one, two or three buttons along the seam",
//       price: "Ghc 1999",
//       uniqueId: "singlebreasted"
//   },
//   {
//       image: "../img/homeCart/image7.png",
//       title: "Peak Lapel Suit",
//       description: "Noticeable high peaks directed to shoulders, most popular style from the 16th century.",
//       price: "Ghc 2444",
//       uniqueId: "peak"
//   },
//   {
//       image: "../img/homeCart/image8.png",
//       title: "Shawl Lapel Suit",
//       description: "Rounded sides, continuous curve with no hard edges, iconic smoking jacket style.",
//       price: "Ghc 2223",
//       uniqueId: "shawl"
//   },
//   {
//       image: "../img/homeCart/image9.png",
//       title: "Other clothings",
//       description: "Classic, best suits man with a fuller build",
//       price: "Ghc 899",
//       uniqueId: "tshirts"
//   },
//   {
//       image: "../img/homeCart/image10.png",
//       title: "Other clothings",
//       description: "Classic, best suits man with a fuller build",
//       price: "Ghc 899",
//       uniqueId: "longsleeves"
//   },
//   {
//       image: "../img/homeCart/image11.png",
//       title: "Other clothings",
//       description: "Classic, best suits man with a fuller build",
//       price: "Ghc 899",
//       uniqueId: "shortsleeves"
//   },
//   {
//       image: "../img/homeCart/image13.png",
//       title: "Other clothings",
//       description: "Classic, best suits man with a fuller build",
//       price: "Ghc 899",
//       uniqueId: "womensjacket"
//   }
// ];

// items loading to DOM functions
function loadItems() {
  return (shop.innerHTML = shopItems
    .map((item) => {
      let { image, title, description, price, uniqueId } = item;
      let searchItems = cartBasket.find((idx) => idx.id === uniqueId) || [];
      return `<div id=product-id-${uniqueId} class="product">
    <img src="${image}" alt="" />
    <div class="description">
      <span>${title}</span>
      <h5>${description}</h5>
      <div class="stars">
        <ion-icon name="star"></ion-icon>
        <ion-icon name="star"></ion-icon>
        <ion-icon name="star"></ion-icon>
        <ion-icon name="star"></ion-icon>
        <ion-icon name="star"></ion-icon>
      </div>
      <h4>${price}</h4>
    </div>
    <a onclick="addItem(${uniqueId})"><ion-icon name="cart-outline" class="proCart"></ion-icon></a>
    <div id=${uniqueId} class="quantity">
    ${searchItems.quantity === undefined ? 0 : searchItems.quantity}
    </div>
      <a onclick="removeItem(${uniqueId})"><ion-icon name="remove-circle-outline" class="takeOut"></ion-icon></a>
  </div>`;
    })
    .join(""));
}

const generateProducts = () => {
  loadItems();
};
generateProducts();

// Product adding and removing functions
// add item function below
const addItem = (uniqueId) => {
  let uniqueItem = uniqueId;
  let findItems = cartBasket.find((idx) => idx.id === uniqueItem.id);

  if (findItems === undefined) {
    cartBasket.push({
      id: uniqueItem.id,
      quantity: 1,
    });
  } else {
    findItems.quantity += 1;
  }

  updateItems(uniqueItem.id);
  localStorage.setItem("suits", JSON.stringify(cartBasket));
};

// remove item function below
const removeItem = (uniqueId) => {
  let uniqueItem = uniqueId;
  let findItems = cartBasket.find((idx) => idx.id === uniqueItem.id);

  if (findItems === undefined) return;
  else if (findItems.quantity === 0) return;
  else {
    findItems.quantity -= 1;
  }
  updateItems(uniqueItem.id);
  cartBasket = cartBasket.filter((idx) => idx.quantity !== 0);

  localStorage.setItem("suits", JSON.stringify(cartBasket));
};

// item quantity update
const updateItems = (id) => {
  let updateFoundItems = cartBasket.find((idx) => idx.id === id);

  document.getElementById(id).innerHTML = updateFoundItems.quantity;
  itemsInCart();
  itemsMobileInCart();
};

const itemsInCart = () => {
  let cartIcon = document.getElementById("itemsUpdate");
  cartIcon.innerHTML = cartBasket
    .map((idx) => idx.quantity)
    .reduce((x, y) => x + y, 0);
};

const itemsMobileInCart = () => {
  let cartIcon = document.getElementById("mobileItemsUpdate");
  cartIcon.innerHTML = cartBasket
    .map((idx) => idx.quantity)
    .reduce((x, y) => x + y, 0);
};

itemsInCart();
itemsMobileInCart();

// Shop Items Js Implementation //
// let mainImage = document.getElementById("mainProduct");
// let smallerImage = document.getElementsByClassName("typesGroup");

// mainImage[0].onclick = function(){
//   mainImage.src = smallerImage[0].src;
// }
// smallerImage[1].onclick = function(){
//   mainImage.src = smallerImage[1].src;
// }
// smallerImage[2].onclick = function(){
//   mainImage.src = smallerImage[2].src;
// }
// smallerImage[3].onclick = function(){
//   mainImage.src = smallerImage[3].src;
// }
