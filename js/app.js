// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAX_9ujel3jRKl2wwceehy3UI7LXWULg_s",
  authDomain: "fooddeliveryapp-27a82.firebaseapp.com",
  databaseURL: "https://fooddeliveryapp-27a82.firebaseio.com",
  projectId: "fooddeliveryapp-27a82",
  storageBucket: "fooddeliveryapp-27a82.appspot.com",
  messagingSenderId: "350183637276",
  appId: "1:350183637276:web:4b87b3dd5df5af17197ad9",
  measurementId: "G-FWHM1K4BQ0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


document.addEventListener('init', function (event) {
  var page = event.target;
  console.log(page.id);

  if (page.id === 'foodcategorypage') {
    console.log("foodcategorypage");

    $("#logout").click(function () {
      content.load('login.html');
    });

    $("#fastfood").click(function () {
      content.load('resturantlist.html');
    });
    $("#kebabs").click(function () {
      content.load('resturantlist.html');
    });
    $("#chinese").click(function () {
      content.load('resturantlist.html');
    });
    $("#pizza").click(function () {
      content.load('resturantlist.html');
    });
    $("#thai").click(function () {
      content.load('resturantlist.html');
    });
    $("#vegeterian").click(function () {
      content.load('resturantlist.html');
    });

    $("#carousel").empty();
    db.collection("recommended").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var item = `<ons-carousel-item modifier="nodivider" id="item${doc.data().id}" class="recomended_item">
            <div class="thumbnail" style="background-image: url('${doc.data().photoURL}')">
            </div>
            <div class="recomended_item_title" id="item1_${doc.data().id}">${doc.data().name}</div>
        </ons-carousel-item>`
        $("#carousel").append(item);
      });
    });

    $("#carousel").empty();
    db.collection("list").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var item = `<ons-carousel-item modifier="nodivider" id="item${doc.data().id}" class="recomended_item">
            <div class="thumbnail" style="background-image: url('${doc.data().photoURL}')">
            </div>
            <div class="recomended_item_title" id="item1_${doc.data().id}">${doc.data().name}</div>
        </ons-carousel-item>`
        $("#carousel").append(item);
      });
    });

    $("#carousel").empty();
    db.collection("complete").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var item = `<ons-carousel-item modifier="nodivider" id="item${doc.data().id}" class="recomended_item">
            <div class="thumbnail" style="background-image: url('${doc.data().photoURL}')">
            </div>
            <div class="recomended_item_title" id="item1_${doc.data().id}">${doc.data().name}</div>
        </ons-carousel-item>`
        $("#carousel").append(item);
      });
    });

  }

  if (page.id === 'resturantlistpage') {
    console.log("resturantlistpage");

    $("#backfcg").click(function () {
      content.load('foodcategory.html');
    });

    $("#morenoodle").click(function () {
      content.load('resturantmenu.html');
    });
    $("#moresubway").click(function () {
      content.load('');
    });
    $("#moredonuts").click(function () {
      content.load('');
    });
    $("#morejack").click(function () {
      content.load('');
    });
  }

  if (page.id === 'resturantmenupage') {
    console.log("resturantmenupage");

    $("#backrl").click(function () {
      content.load('resturantlist.html');
    });

    $("#order").click(function () {
      content.load('orderconfirmation.html');
    });
  }

  if (page.id === 'orderconfirmationpage') {
    console.log("orderconfirmationpage");

    $("#backrm").click(function () {
      content.load('resturantmenu.html');
    });

    $("#credit").click(function () {
      content.load('');
    });
    $("#paypal").click(function () {
      content.load('complete.html');
    });
    $("#cash").click(function () {
      content.load('complete.html');
    });
    $("#cancle").click(function () {
      content.load('foodcategory.html');
    });
  }

  if (page.id === 'loginpage') {
    console.log("loginpage");
    
    $("#sing").click(function () {
      content.load('register.html');
    });

    $("#login").click(function () {
      var email = $("#email").val();
      var password = $("#password").val();
      firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        content.load('foodcategory.html');
      }
      )
        .catch(function (error) {
          console.log(error.message);
        });
    })

    $("#gbtn").click(function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        content.load('foodcategory.html');

      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;

      });
    });
  }

  if (page.id === 'registerpage') {
    console.log("registerpage");
    
    $("#backlogin").click(function () {
      content.load('login.html');
    });

    $("#register").click(function () {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak');
        } else {
          alert(errorMessage);
          content.load('foodcategory.html');
        }
        console.log(error);
      });
    });  
    
    $("#gbtn").click(function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        content.load('foodcategory.html');

      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;

      });
    });
  }



  // ************************************************
  // Shopping Cart API
  // ************************************************

  var shoppingCart = (function () {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }

    // Save cart
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function (name, price, count) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function (name, count) {
      for (var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count--;
          if (cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
      }
      saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
      cart = [];
      saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
      var totalCount = 0;
      for (var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
      var totalCart = 0;
      for (var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
      var cartCopy = [];
      for (i in cart) {
        item = cart[i];
        itemCopy = {};
        for (p in item) {
          itemCopy[p] = item[p];

        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();


  // *****************************************
  // Triggers / Events
  // ***************************************** 
  // Add item
  $('.add-to-cart').click(function (event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });

  // Clear items
  $('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();
  });


  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
      output += "<tr>" +
        "<td>" + cartArray[i].name + "</td>" +
        "<td>(" + cartArray[i].price + ")</td>" +
        "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>" +
        "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
        "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>" +
        "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>" +
        " = " +
        "<td>" + cartArray[i].total + "</td>" +
        "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }

  // Delete item button

  $('.show-cart').on("click", ".delete-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })


  // -1
  $('.show-cart').on("click", ".minus-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.show-cart').on("click", ".plus-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })

  // Item count input
  $('.show-cart').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });

  displayCart();

});