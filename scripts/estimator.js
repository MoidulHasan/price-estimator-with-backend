const siteName = "http://localhost/Upwork/pricing-estimator-final";
let currentPage = 1,
    servicetype = "",
    price,
    zipCode,
    full_truck = 0,
    half_truck = 0,
    truck_total = 0,
    bod = 20,
    finalStartingPrice = 0,
    finalEndingPrice = 0,
    finalDiscount = 0,
    dropDownListItem = "",
    itemsList = [];

let Order_info = {
    Client_info: {
        Name: "",
        Email: "",
        Address: "",
        Phone: "",
        ZipCode: "",
    },
    Seervice_info: {
        Service_name: "",
        Estimated_Starting_Price: "",
        Estimated_Ending_Price: "",
        items_list: "",
        Service_date: "",
        Service_time: ""
    }
};




$(document).ready(function() {

    // Capture enter press for Zipcode input
    $('#zip-input').keypress(function(e) {
        if (e.which == 13) { //Enter key pressed
            $('#zip-submit').click();
        }
    });

    // Validate Zipcode input
    $("#zip-submit").click(function() {
        var zipValMsg = "";
        zipCode = parseInt($("#zip-input").val());
        if (zipCode == "NaN") {
            zipValMsg = '<h4>Please enter a valid zip/postal code.</h4>';
        } else {
            zipRegex = /^[a-zA-Z][0-9][a-zA-Z] ?[0-9][a-zA-Z][0-9]|[0-9]{5}$/;
            $('#zip-input').val($('#zip-input').val().replace(/([a-z]\d[a-z])(\d[a-z]\d)/gi, '$1 $2'));
            validZip = zipRegex.test($('#zip-input').val());
            if ($('#zip-input').val() == "" || !validZip) {
                zipValMsg = '<h4>Please enter a valid zip/postal code.</h4>';
            } else {
                getZipData(zipCode);
            }
        }
        $("#zip-validation-msg").html(zipValMsg);
    });

    // Valide zipcode and get data
    const getZipData = (zipCode) => {
        // API url
        const zip_val_url = siteName + "/system/area-info.php?zip_code=" + zipCode;
        // get json data
        $.getJSON(zip_val_url, function(data) {
            // show not found message
            if (data.status !== "not found") {
                zipValMsg = `<h1>Good news!<br> We've got you covered.</h1><p>Based on your location, you will be working with</p><h3>${data.location}</h3>`;
                // get and set location data to modal header
                const location = `<i class="far fa-map-marker">${data.location}(${zipCode})`;
                $(".location").html(location);
                setTimeout(function() {
                    goToPage(2);
                }, 2000);
            } else {
                zipValMsg = `<h1>Sorry.<br> We Don't Serve Your Area Yet.</h1>
                                    <p>Think there's been a mistake?<br>Give us a call to ask any questions!</p>
                                    <h6 class="text-center"><span><i class="fas fa-crown"></i></span> 1-888-888-JUNK</h6>`;
            }
            $("#zip-validation-msg").html(zipValMsg);
        });
    };

    // Action on add-My-Items button click
    $("#add-My-Items").click(function() {
        Order_info.Seervice_info.Service_name = "items";
        servicetype = "items";
        goToPage(3);
    });

    // Action on By Pickup Truck Loads button click
    $("#add-by-Pickup-Truck-Loads").click(function() {
        Order_info.Seervice_info.Service_name = "pickup";
        servicetype = "pickup";
        goToPage(3);
    });

    // Action on Full Name and email submission
    $("#btn-start-estimation").click(function() {
        Order_info.Client_info.Name = $("#name-input").val();
        Order_info.Client_info.Email = $("#email-input").val();
        if (Order_info.Client_info.Name == "" || Order_info.Client_info.Email == "" || !isEmail(Order_info.Client_info.Email)) {
            swal({
                title: "Please Enter Your Name and Valid Email Address.",
            });
        } else {
            getPricingData(zipCode);
            if (servicetype == "items") {
                goToPage(4);
            } else if (servicetype == "pickup") {
                goToPage(5);
            }
        }
    });

    // Function to go to another page
    const goToPage = (nextPage) => {
        $(`#p-${currentPage}`).addClass("d-none");
        $(`#p-${nextPage}`).removeClass("d-none");
        currentPage = nextPage;
    };

    // Action on previous page button click
    $("#prev-page").click(function() {
        if (currentPage > 1) {
            if (currentPage == 3) {
                $('#empty-items-dialog').modal('show');
            } else if (servicetype === "pickup" && currentPage == 5) {
                goToPage(currentPage - 1);
            } else if (servicetype === "items" && currentPage == 6) {
                goToPage(currentPage - 1);
            }
            goToPage(currentPage - 1);
        }
    });

    // Get pricing data from server
    const getPricingData = (zipCode) => {
        const priceURL = "http://localhost/Upwork/pricing-estimator-final/system/price.php"
        $.ajax({
            type: "POST",
            url: priceURL,
            data: { zip_code: zipCode },
            dataType: "json",
            success: function(response) {
                price = response;
            }
        });
    };


    // Add/remove pickup trucks
    $('body').on('click', '#full-truck-plus, #full-truck-minus, #half-truck-plus, #half-truck-minus', function(e) {
        e.preventDefault();
        var thisAction = $(this).data('action');
        var aamount = 0;

        switch (thisAction) {
            case 'add-full':
                aamount = 1;
                break;
            case 'add-half':
                aamount = .5;
                break;
            case 'remove-full':
                if (full_truck <= 0) { return; }
                aamount = -1;
                break;
            case 'remove-half':
                if (half_truck <= 0) { return; }
                aamount = -.5;
                break;
        }


        // Show large volume modal if size too large
        if (truck_total + aamount > 6) {
            swal({
                title: "Custom Quote",
                text: "It appears that your job is fairly large and you will most likely benefit from a custom quote. Please call us to discuss your job."
            });
            return;
        }
        if (truck_total + aamount < 0) { return; }

        truck_total = Number(truck_total) + Number(aamount);
        if (Math.abs(aamount) == 1) full_truck += aamount;
        if (Math.abs(aamount) == .5) half_truck += aamount * 2;

        // Set to fixed decimal place for consistent calculations
        truck_total = parseFloat(truck_total.toFixed(1));
        var width = parseInt((truck_total / 6) * 100);
        // console.log(truck_total, width);

        // Build 'My Items' dropdown item
        dropDownListItem =
            `<div id="pickup-truck" class="p-2 border-danger border-bottom-3 text-start">
                <a href="#" class="bg-light p-2 m-0 text-decoration-none text-start border-1 border-danger border-bottom">
                    <span class="count">${truck_total}</span>&nbsp;<span class="item-name">Pickup Truck Load(s)</span>
                </a>
            </div>`;

        //Update items in 'My Items' dropdown
        $(".dropdown-items").html(dropDownListItem);
        // Update Item Lists
        itemsList["Pickup Truck Load(s)"] = truck_total;

        // Enable/disable next step button
        var nextStepDisabled = truck_total <= 0 ? true : false;
        $('#btn-book-truck').toggleClass('disabled', nextStepDisabled);

        // Update running totals
        $("#progress_bar").css('width', `${width}%`);
        $("#space_occopaied").html(`${width}%`);
        $('#full-truck-count').html(full_truck);
        $('#half-truck-count').html(half_truck);

        GetPricePickUP();
        console.log(finalStartingPrice, finalEndingPrice, finalDiscount)
    }); // Add/remove pickup trucks()




    /* Function To Get Estimated Pick Up Price Start */
    function GetPricePickUP() {
        if (truck_total <= 0) {
            resetTruckloadsView();
            return;
        }
        var volume = truck_total;
        var calculatedVolume = volume / 6.0;
        if (calculatedVolume >= 0) {
            console.log("calculatedVolume :", calculatedVolume);
            var pricing = price.Category_Price;
            //var pIdx = Math.floor(volume / .5) + 1;

            if (calculatedVolume < .083) pIdx = 0;
            else if (calculatedVolume < .125) pIdx = 1;
            else pIdx = Math.floor((calculatedVolume * 12).toFixed(2)) + 1;


            var basePrice = pIdx >= pricing.length ? pricing[pricing.length - 1].EndingPrice : pricing[pIdx].StartingPrice;
            var foffset = calculatedVolume > .333 ? price.Price_Range.High : price.Price_Range.Low;
            var startingPrice = Math.floor(foffset >= 0 ? basePrice : basePrice + foffset);
            var endingPrice = Math.floor(foffset >= 0 ? basePrice + foffset : basePrice);
            console.log(truck_total, basePrice, foffset, startingPrice, endingPrice);
            var lbod = bod;
            if (startingPrice < 100) lbod = 0;
            var priceStr = endingPrice > startingPrice ? '$' + startingPrice + '-$' + endingPrice : '$' + startingPrice;
            var offerStr = lbod > 0 ? '<span class="jk-black d-none-xs"> (-$' + lbod + ')</span>' : '';
            // console.log(priceStr)
            $('.estemeted-rate').html(priceStr);
            $('.discount').html(offerStr);
            finalStartingPrice = startingPrice;
            finalEndingPrice = endingPrice;
            finalDiscount = lbod;
            $('.final-price').html(priceStr + offerStr);
        }
    } // GetPricePickUP()

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            return false;
        } else {
            return true;
        }
    }


    function resetPricingViews() {

        resetAddItemsView();
        resetTruckloadsView();

    }

    function resetAddItemsView() {

        // Clear items list
        $("#items-slider").each(function() {

            $('.item').removeClass('selected');
            $('.item-count').html(0);
            $('.item-data').attr({ "data-item-totalcount": "0", "data-item-totalvolume": "0" });

        });

        // Remove green box around category icons
        $('#categories-slider').find('a').removeClass("active");

        $('#categories-slider li:first-child a').addClass('active');

        $("#total-items").val(0);
        $("#total-volume").val(0);
        $("#items-running-total").val('');
        $('.pe-dropdown-menu').children().remove();
        $('#conf-items-list').children().remove();
        $('.ai-price-range').html("$0");
        $('.price-discount').html('');
        $('#BONotesHF').val('');


        // Disable next step button
        $('#btn-book-ai').toggleClass('disabled', true);

    }

    function resetTruckloadsView() {
        truck_total = 0;
        full_truck = 0;
        half_truck = 0;
        finalStartingPrice = 0;
        finalEndingPrice = 0;
        finalDiscount = 0;
        // Enable/disable next step button
        var nextStepDisabled = truck_total <= 0 ? true : false;
        $('#btn-book-truck').toggleClass('disabled', nextStepDisabled);

        // Update running totals
        $("#progress_bar").css('width', `0%`);
        $("#space_occopaied").html(`0%`);
        $('#full-truck-count').html(full_truck);
        $('#half-truck-count').html(half_truck);
        $('.estemeted-rate').html("$0");
        $('.final-price').html("");

        // Build 'My Items' dropdown item
        dropDownListItem =
            `<div id="pickup-truck" class="p-2 border-danger border-bottom-3 text-start">
                <a href="#" class="bg-light p-2 m-0 text-decoration-none text-start border-1 border-danger border-bottom">
                    <span class="count">${truck_total}</span>&nbsp;<span class="item-name">Pickup Truck Load(s)</span>
                </a>
            </div>`;

        //Update items in 'My Items' dropdown
        $(".dropdown-items").html(dropDownListItem);
        // Update Item Lists
        itemsList = [];
    }

    $(".btn-reset-truck").click(function() {
        resetTruckloadsView();
    });

    $(".btn-reset-items").click(function() {
        resetAddItemsView();
    });


    $(".btn-book-now").click(function() {
        $("#client-name").val(Order_info.Client_info.Name);
        $("#client-email").val(Order_info.Client_info.Email);

        goToPage(6);
    });

    $("#client-booking-date").change(function() {
        if ($("#client-booking-date").val() != "") {
            $('#client-time').prop('disabled', false);
        } else {
            $('#client-time').prop('disabled', true);
        }
    });

    $("#final-booking").click(function() {
        var name = $("#client-name").val();
        var email = $("#client-email").val();
        var address = $("#client-address").val();
        var phone = $("#client-phone").val();
        var date = $("#client-booking-date").val();
        var time = $("#client-time").val();
        if (name == "" || email == "" || address == "" || phone == "" || date == "" || time == "" || !isEmail(email)) {
            swal({
                title: "Please Fillup All Data Currectly.",
            });
        } else {
            Order_info.Client_info.Name = name;
            Order_info.Client_info.Email = email;
            Order_info.Client_info.Address = address;
            Order_info.Client_info.Phone = phone;
            Order_info.Client_info.ZipCode = zipCode;
            Order_info.Seervice_info.Estimated_Starting_Price = finalStartingPrice;
            Order_info.Seervice_info.Estimated_Ending_Price = finalEndingPrice;
            Order_info.Seervice_info.items_list = itemsList;
            Order_info.Seervice_info.Service_date = date;
            Order_info.Seervice_info.Service_time = time;
            confirm_order();
        }
    });

    const confirm_order = () => {
        const orderURL = "http://localhost/Upwork/pricing-estimator-final/system/confirm-order.php"
        $.ajax({
            type: "POST",
            url: orderURL,
            data: Order_info,
            dataType: "json",
            success: function(response) {
                if (response.status == 200) {
                    const customer_info = `
                        <div>${Order_info.Client_info.Name}</div>
                        <div>${Order_info.Client_info.Email}</div>
                        <div>${Order_info.Client_info.Phone}</div>
                        <div>${Order_info.Client_info.Address}</div>
                    `;
                    $("#order-number").html(response.order_no);
                    $("#order-customer-info").html(customer_info);
                    createItemList();
                    swal("Thank You!", "your Order has been received!", "success").then(
                        goToPage(7)
                    );
                } else {
                    swal("Sorry Something Went Wrong!", "Please Contact With Us", "failed")
                }
            }
        });
    }

    const createItemList = () => {
        const allItems = Order_info.Seervice_info.items_list;
        const items_keys = Object.keys(allItems);
        const list = document.getElementById('order-items-list');
        items_keys.forEach((key, index) => {
            // console.log(key, " ", allItems[key]);
            // create an item for each one
            var listItem = document.createElement('li');

            // Add the item text
            listItem.innerHTML = `${key} - ${allItems[key]}`;
            // Add item to the list
            list.appendChild(listItem);
        });
    }

    $("close-modal").click(
        function() {
            location.reload();
        }
    );
});