/**
 * Created by pghoo on 19/01/2016.
 */
simpleCart.email = "pghoou@hotmail.com";
simpleCart({
  // array representing the format and columns of the cart,
  // see the cart columns documentation
  cartColumns: [
    {attr: "name", label: "Name"},
    {view: 'image', attr: "thumb", label: "Image"},
    {view: "currency", attr: "price", label: "Price"},
    {view: "decrement", label: ''},
    {attr: "quantity", label: "Qty"},
    {view: "increment", label: ''},
    {view: "currency", attr: "total", label: "SubTotal"},
    {view: "remove", text: "Remove", label: false}
  ],

  cartStyle: "table",

  currency: "EUR",

  checkout: {
    type: "SendForm",
    url: "/purchase",
    // http method for form, "POST" or "GET", default is "POST"
    method: "POST",
    target: "_blank",
    // url to return to on successful checkout, default is null
    success: "/success",
    // url to return to on cancelled checkout, default is null
    cancel: "/cart",
    // an option list of extra name/value pairs that can
    // be sent along with the checkout data
    extra_data: {}
  }
});

$(function () {

  $('.checkout').on('click', function (event) {
    event.preventDefault();
    simpleCart.checkout();
  });

  $('.item_add').on('click', function () {
    var id = $(this).closest("tr").data("id");
    var quantity = $(this).closest("tr").find(".item_Quantity").val();
    var name = $(this).closest("tr").find(".item_name").html();
    var price = $(this).closest("tr").find(".item_price").html();
    var imagePath = $(this).closest("tr").find("img").attr('src');
    console.log(id);
    console.log(quantity);
    console.log(name);
    console.log(price);
    console.log(imagePath);
    simpleCart.add(
      {
        iid: id,
        quantity: quantity,
        name: name,
        price: price,
        thumb: imagePath
      });
  });
});

simpleCart.bind("afterCreate", function () {
  $cart_table = $(".simpleCart_items table");
  $cart_table.addClass("table").addClass("table-hover");
  $(".simpleCart_items").css("margin", "0 auto");
  $cart_table.find('.simpleCart_decrement').addClass("fa fa-minus-circle").html('');
  $cart_table.find('.simpleCart_increment').addClass("fa fa-plus-circle").html('');
});
