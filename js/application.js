var updateTotal = function() {
    grandTotal = 0;
    $('tbody tr').each(function (i, element) {
        var price = parseFloat($(element).children('.price').children('span').text());
        var quantity = parseFloat($(element).find('.quantity input').val());
        var total = Math.round(price * quantity * 100)/100;
        $(element).children('.total').html("$" + total)
        grandTotal += total;
    });
    grandTotal = Math.round(grandTotal*100)/100;
    $('#grandTotal').html(grandTotal);
}

$(document).ready(function() {
    // Load the total of the sample row given
    updateTotal();

    // update the total whenever an input is changed
    var timeout;
    $(document).on('input', function() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            updateTotal();
        }, 250);
    })

    // Make X button delete a row
    $(document).on('click', '.remove', function() {
        $(this).closest('tr').remove();
        updateTotal();
    })

    // Make add button add the new content to the DOM and create a new row
    $('#addItem').on('submit', function(event) {
        event.preventDefault();
        var name = $(this).children('[name=name]').val();
        var price = $(this).children('[name=price]').val();
        var quantity = $(this).children('[name=quantity]').val();
        var total = Math.round(price * quantity * 100)/100;

        $('tbody').append(
            '<tr>' + 
                '<td class="item">' + name + '</td>' +
                '<td class="price">$<span>' + price + '</span></td>' +
                '<td class="quantity"><input type="number" value="' + quantity + '"></td>' +
                '<td class="total">$' + total + '</td>' +
                '<td><button class="btn btn-sm btn-danger remove">X</button></td>' + 
            '</tr>'
        );
        updateTotal();
    });
});