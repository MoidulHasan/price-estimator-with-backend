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
    dropDownListItemTruckTruck = "",
    dropDownItems = "";

let Order_info = {
    Client_info: {
        Name: "",
        Email: "",
        Address: "",
        Phone: ""
    },
    Seervice_info: {
        Service_name: "",
        Estimated_price: "",
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
        // alert(zipCode);
        zipRegex = /^[a-zA-Z][0-9][a-zA-Z] ?[0-9][a-zA-Z][0-9]|[0-9]{5}$/;
        $('#zip-input').val($('#zip-input').val().replace(/([a-z]\d[a-z])(\d[a-z]\d)/gi, '$1 $2'));
        validZip = zipRegex.test($('#zip-input').val());
        if ($('#zip-input').val() == "" || !validZip) {
            zipValMsg = '<h4>Please enter a valid zip/postal code.</h4>';
        } else {
            getZipData(zipCode);
        }
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
                const location = `<i class="fa fa-map-marker">${data.location}(${zipCode})`;
                $("#p2-location").html(location);
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
        if (Order_info.Client_info.Name == "" || Order_info.Client_info.Email == "") {
            alert("Please Enter Your Name and Email Address.")
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
            if (servicetype === "pickup" && currentPage == 5) {
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
        // alert(thisAction)
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
        if (truck_total + aamount > 6) { $('#large-volume-dialog').modal('show'); return; }
        if (truck_total + aamount < 0) { return; }

        truck_total = Number(truck_total) + Number(aamount);
        if (Math.abs(aamount) == 1) full_truck += aamount;
        if (Math.abs(aamount) == .5) half_truck += aamount * 2;

        // Set to fixed decimal place for consistent calculations
        truck_total = parseFloat(truck_total.toFixed(1));
        var width = parseInt((truck_total / 6) * 100);
        console.log(truck_total, width);

        // Build 'My Items' dropdown item
        dropDownListItemTruck =
            `<div id="pickup-truck" class="p-2 border-danger border-bottom-3 text-start">
                <a href="#" class="bg-light p-2 m-0 text-decoration-none text-start border-1 border-danger border-bottom">
                    <span class="count">${truck_total}</span>&nbsp;<span class="item-name">Pickup Truck Load(s)</span>
                </a>
            </div>`;

        //Update items in 'My Items' dropdown
        $("#dropdown-items").html(dropDownListItemTruck);

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
            finalStartingPrice = startingPrice;
            finalEndingPrice = endingPrice;
            finalDiscount = lbod;
        }
    } // GetPricePickUP()




    function resetPricingViews() {

        $('#book-type').val('');
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

        // Build 'My Items' dropdown item
        dropDownListItemTruck =
            `<div id="pickup-truck" class="p-2 border-danger border-bottom-3 text-start">
                <a href="#" class="bg-light p-2 m-0 text-decoration-none text-start border-1 border-danger border-bottom">
                    <span class="count">${truck_total}</span>&nbsp;<span class="item-name">Pickup Truck Load(s)</span>
                </a>
            </div>`;

        //Update items in 'My Items' dropdown
        $("#dropdown-items").html(dropDownListItemTruck);
    }

    $(".btn-reset-truck").click(function() {
        resetTruckloadsView();
    });

    $(".btn-reset-items").click(function() {
        resetAddItemsView();
    });


    $(".btn-book-now").click(function() {

        // if (servicetype = "pickup") {

        // } else if (servicetype = "items") {

        // }
    });

});