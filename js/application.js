var updateTotal = function() {
    grandTotal = 0;
    $('tbody tr').each(function (i, element) {
        var price = parseFloat($(element).children('.price').children('span').text());
        var quantity = parseFloat($(element).find('.quantity input').val());
        var total = (Math.round(price * quantity * 100)/100);
        grandTotal += total;
        total = total.toFixed(2);
        $(element).children('.total').html("$" + total)
   
    });
    grandTotal = (Math.round(grandTotal*100)/100).toFixed(2);
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

    // Make X button delete a row and update total
    $(document).on('click', '.remove', function() {
        $(this).closest('tr').remove();
        updateTotal();
    })

    // Make add button add the new content to the DOM and create a new row
    $('#addItem').on('submit', function(event) {
        event.preventDefault();
        var name = $(this).children('[name=name]').val();
        var price = Number($(this).children('[name=price]').val()).toFixed(2);
        var quantity = $(this).children('[name=quantity]').val();
        var total = (Math.round(price * quantity * 100)/100).toFixed(2);

        $('.table1').append(
            '<tr>' + 
                '<td class="item">' + name + '</td>' +
                '<td class="price">$<span>' + price + '</span></td>' +
                '<td class="quantity"><input type="number" value="' + quantity + '"></td>' +
                '<td class="total">$' + total + '</td>' +
                '<td><button class="btn btn-sm btn-success add">✓</button></td>' +
                '<td><button class="btn btn-sm btn-danger remove">X</button></td>' + 
            '</tr>'
        );
        updateTotal();
    });

    // Add to cart button
    $(document).on('click', '.add', function() {
        var name = $(this).parent().siblings('.item').text();
        var price = Number($(this).parent().siblings('.price').text().slice(1)).toFixed(2);
        var quantity = Number($(this).parent().siblings('.quantity').children().val());
        var total = (Math.round(price * quantity * 100)/100).toFixed(2);
        $(this).closest('tr').remove();
        $('.table2').append(
            '<tr>' + 
                '<td class="item">' + name + '</td>' +
                '<td class="price">$<span>' + price + '</span></td>' +
                '<td class="quantity"><input type="number" value="' + quantity + '"></td>' +
                '<td class="total">$' + total + '</td>' +
                '<td><button class="btn btn-sm btn-danger remove">X</button></td>' + 
            '</tr>'
        );
    })
});