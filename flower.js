
//  Scroll all sections //
function scrollToSection(id) {
  const section = document.getElementById(id);
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
  
  //  buttonka shop now
function goProducts() {
  const products = document.getElementById('products');
  window.scrollTo({ top: products.offsetTop - 77, behavior: 'smooth' });
}

// Fade in products on scroll
window.addEventListener('scroll', () => {
  const products = document.querySelector('.products');
  const rect = products.getBoundingClientRect();
  if(rect.top < window.innerHeight - 100){
    products.classList.add('visible');
  }
});

// Soo hel cart-ka localStorage ama samee array cusub
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = document.getElementById("cartCount");

// Update cart count marka page lasoa furo
document.addEventListener("DOMContentLoaded", () => {
  cartCount.innerText = cart.length;
});

// Button-yada Add to Cart dhan
let buttons = document.querySelectorAll(".add-cart");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    let card = btn.parentElement;
    let name = card.querySelector("h3").innerText;
    let price = card.querySelector("p").innerText;
    let img = card.querySelector("img").src;

    // Ku dar item cart
    cart.push({ name, price, img });

    //  Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update gareyo cart countkeyga //
    cartCount.innerText = cart.length;

    alert(name + " ku dar cart");
  });
});

// Cart modal
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const carT = document.querySelector(".cart");

carT.addEventListener("click", () => {
  renderCart();
  cartModal.style.display = "flex";
});
   

// soo bandhigid //
function renderCart() {
  cartItems.innerHTML = "";

  if(cart.length === 0){
    cartItems.innerHTML = "<li>cart waa eber</li>";
  } else {
    cart.forEach((item, index) => {
      let li = document.createElement("li");

      // Sawirka
      let img = document.createElement("img");
      img.src = item.img;
      img.style.width = "50px";

      // Magaca & priceka
      let text = document.createElement("span");
      text.innerText = `${item.name} - ${item.price}`;

      // Remove button
      let removeBtn = document.createElement("button");
      removeBtn.innerText = "Remove";
      removeBtn.style.marginLeft = "8px";
      removeBtn.style.cursor = "pointer";
      removeBtn.style.background = "blue";
      removeBtn.style.color = "white";
      removeBtn.style.border = "none";
      removeBtn.style.borderRadius = "4px";

      // Remove item event
      removeBtn.addEventListener("click", () => {
        // ka saar array-ga
        cart.splice(index, 1); 
        // update localStorage
        localStorage.setItem("cart", JSON.stringify(cart)); 

        // update count
        cartCount.innerText = cart.length; 
        renderCart(); // dib u render cart
      });

      li.appendChild(img);
      li.appendChild(text);
      li.appendChild(removeBtn);
      cartItems.appendChild(li);
    });
  }
}

// Close cart
function closeCart(){
  cartModal.style.display = "none";
}

  // booking //

  document.addEventListener("DOMContentLoaded", () => {

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  const form = document.getElementById("bookingForm");
  const message = document.getElementById("message");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");

  // inuu ogolaanin lambar
  nameInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z\s]/g, "");
  });

  //inu ogalinin ogolaan xaraf
  phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });

  form.addEventListener("submit", function(e){
    e.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const flower = document.getElementById("flower").value;
    const date = document.getElementById("date").value;

    if(name.length < 3){
      message.innerText = "Magacu waa inuu ka badan yahay 3 xaraf";
      message.style.color = "red";
      return;
    }

    if(phone.length < 8){
      message.innerText = "Phone number waa inuu noqdaa ugu yaraan 8 lambar";
      message.style.color = "red";
      return;
    }

    if(flower === "" || date === ""){
      message.innerText = "Fadlan buuxi dhammaan xogta";
      message.style.color = "red";
      return;
    }

    const booking = { name, phone, flower, date };
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    message.innerText = "Booking waa lagu guuleystay ";
    message.style.color = "green";

    form.reset();
  });

});
   
