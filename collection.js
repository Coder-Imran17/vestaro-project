// selecting products //
var productContainer =document.getElementById("products")
// SELECTING MOBILE VIEW SEARCH BAR //
var mobileSearch =document.getElementById("mobile-search")
// SELECTING DESKTOP VIEW SEARCH BAR //
var desktopSearch = document.getElementById("desktop-search");
// selecting the divs inside the product container //
var productlist = productContainer.querySelectorAll("div")


// COMMOM SEARCH HANDLER ( Search bar - Mobile & Desktop )//

function handleSearch(event) {
  var enteredValue = event.target.value.toUpperCase();
  var matchFound = false;

  var delay = 0 //For staggering effect on products

//Loop through each product//

  for(count=0;count<productlist.length;count=count+1) {

    var productname = productlist[count].querySelector("p").textContent.toUpperCase();

      if (productname.toUpperCase().indexOf(enteredValue) < 0) {
        productlist[count].style.display = "none";
        productlist[count].classList.remove("product-animate")
      } else {
        productlist[count].style.display = "block";
        //Reset animation (force reflow)
        productlist[count].classList.remove("product-animate");

        void productlist[count].offsetWidth; // <- This forces a browser reflow, 
        // which restarts the animation when the class is re-added(works everytime typed)
        productlist[count].style.animationDelay = delay + "s";
        productlist[count].classList.add("product-animate");
        delay += 0.1;
        matchFound = true;
      }
  }


var noProductMsg = document.getElementById("no-products")
if(!matchFound) {
  noProductMsg.style.display = "block"; 
} else {
  noProductMsg.style.display = "none";
  }
}

// Attach the event to both input tags //
desktopSearch.addEventListener("keyup",handleSearch);
mobileSearch.addEventListener("keyup",handleSearch);


// FILTER/CATEGORY BUTTONS //

// selecting the filter/category buttons//
var filterButtons = document.querySelectorAll(".filter-btn")

filterButtons.forEach((btn)=> {
  btn.addEventListener("click", ()=> {
    //remove "active" from all//
    filterButtons.forEach((b)=>
    b.classList.remove("active"));
    btn.classList.add("active");

    var filterValue = btn.getAttribute("data-filter");

    var matchFound = false;
    var delay = 0;

    for (count=0;count<productlist.length;count=count+1) {
      var category = productlist[count].getAttribute("data-category");
      var match = filterValue === "all" || filterValue === category;

      if (match) {
        productlist[count].style.display = "block";

        productlist[count].classList.remove("product-animate");
        void productlist[count].offsetWidth;
        productlist[count].style.animationDelay = delay + "s"
        productlist[count].classList.add("product-animate");

        delay += 0.1;
        matchFound = true;
      } else {
        productlist[count].style.display = "none";
        productlist[count].classList.remove("product-animate");
      }
    }

    var noProductMsg = document.getElementById("no-products");
    noProductMsg.style.display = matchFound ? "none" : "block";
  })
})

// SIDE NAV BAR OPTIONS //

var sidenav = document.querySelector(".side-navbar");

function showNavbar() {
  sidenav.style.left = "0";
}

function closeNavbar() {
  sidenav.style.left = "-60%";
}

