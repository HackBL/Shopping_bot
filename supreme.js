var $ = window.jQuery;
/*
  Category: jackets, shirts, tops_sweaters, sweatshirts, pants, shorts, hats, bags, accessories, shoes
  Size: Small, Medium, Large, XLarge
*/

/*-------- Input Product Information --------*/
// Category
var product_category = 'accessories'; 

// Name
var product_name = "Tagless Tees"; 

// Color
var product_color = "Black";

// Size
var product_size = 'Medium';

/*-------- Input Personal Information --------*/
// Personal Info
var person_name = "Alex Swaz"; 
var person_email = "bot@mail.com";
var person_tel = "3111231234";
var person_address = "123 california Ave";
var person_apt = "";
var person_zip = "94111";
var person_city = "San Francisco";
var person_state = "CA";
// Card Info
var card_number = "1111222233334444";
var card_month = "03";
var card_year = "2023";
var card_cvv = 112;

/*--------------------------------- DO NOT TOUCH ! ---------------------------------*/ 
var main_link = "https://www.supremenewyork.com/";
var check_out = "https://www.supremenewyork.com/checkout";

var cur_link = window.location.href;
var category_link = main_link+"/shop/all/"+product_category;

/*----- Functional Code -----*/
function getRandomArbitrary(min, max) { // random float #
  return Math.random() * (max-min) + min;
}

function process_status() {
  return $('body').text().indexOf('Unfortunately') > -1
}

/*----- Product Code -----*/
function jumpToCategory() {
  if (!cur_link.includes(product_category)) 
    window.location.href = category_link;
}

function jumpToProduct() {
  if(cur_link == main_link+"/shop/all/"+product_category) {
    var names = [];
    var colors = [];

    $("a:contains("+product_name+")").each(function() { // Same Name urls
      names.push($(this).attr('href'));
    });

    $("a:contains("+product_color+")").each(function() { // Same Color urls
      colors.push($(this).attr('href'));
    });

    var specific_url = $.grep(names, function(element) { // Match color & name
      return $.inArray(element, colors ) !== -1;
    });

    // At Start，Refresh OR Rplenishment, Sold out 
    if ((specific_url == "") || ($("a[href$='" + specific_url + "']").find(".sold_out_tag").text())) 
      window.location.href = category_link;
    else if (cur_link != specific_url && specific_url != '')  // Jump to Specific Product
      window.location.href = main_link + specific_url;
  }

  if ($('#s option').length > 0)  // Size
    $('#s option:contains('+product_size+')').attr('selected', 'selected');

  if ($("input[name = 'commit']").val() != 'remove') { // Add to card
    $("input[name = 'commit']").trigger("click");

    $(document).ajaxStop(function() { // Jump to Checkout After all requests complete
      window.location.href = check_out; 
    });
  }
  else   // Product already in list
    window.location.href = check_out;
}

function result() {
  if(cur_link == main_link)  // Jump to category
    jumpToCategory();

  if(cur_link.includes(product_category) || cur_link.includes("tops-sweaters"))  // Jump to Product
    jumpToProduct();
  else { // Forms
    $("#order_billing_name").val(person_name);
    $("#order_email").val(person_email);
    $("#order_tel").val(person_tel);
    $("#bo").val(person_address);
    $("#oba3").val(person_apt);
    $("#order_billing_zip").val(person_zip);
    $("#order_billing_city").val(person_city);
    $('#order_billing_state option:contains('+person_state+')').attr('selected', 'selected');
    $("#nnaerb").val(card_number);
    $('#credit_card_month option:contains('+card_month+')').attr('selected', 'selected');
    $('#credit_card_year option:contains('+card_year+')').attr('selected', 'selected');
    $("#orcer").val(card_cvv); 
    $('.icheckbox_minimal').trigger( "click" );

    setTimeout(function() { // Process Button
        $("input[name = 'commit']").trigger("click");
    }, getRandomArbitrary(100, 250));

    if (process_status()) { // Go back if failed to process
      window.location.href = main_link;
    }
  }
}

result();
