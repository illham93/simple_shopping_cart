$(document).ready(function() {

    var price = $('.price span').text();
    var quantity = $('.quantity').find('input').val();
    var total = price * quantity;
    $('.total').html("$" + total)

})