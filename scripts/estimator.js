const siteName = "http://localhost/Upwork/pricing-estimator-final";
let currentPage = 1,
    servicetype = "",
    fullname = "",
    email = "",
    price,
    zipCode,
    full_truck = 0,
    half_truck = 0,
    truck_total = 0;




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
        servicetype = "items";
        goToPage(3);
    });

    // Action on By Pickup Truck Loads button click
    $("#add-by-Pickup-Truck-Loads").click(function() {
        servicetype = "pickup";
        goToPage(3);
    });

    // Action on Full Name and email submission
    $("#btn-start-estimation").click(function() {
        fullname = $("#name-input").val();
        email = $("#email-input").val();
        getPricingData(zipCode);
        if (servicetype == "items") {
            goToPage(4);
        } else if (servicetype == "pickup") {
            goToPage(5);
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
            if (currentPage > 4) {
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



    // Function for turck price calculation

    // Action on full pickup load plus
    $("#full-truck-plus").click(function() {
        // $("#progress_bar").removeClass(`w-${full_truck}`);
        full_truck += 1;
        truck_total += 16.66;
        var width = Math.floor(truck_total);
        $("#progress_bar").css('width', `${width}%`);
        $("#space_occopaied").html(`${width}%`);
    });
    // Action on full pickup load minus
    $("#full-truck-minus").click(function() {
        full_truck -= 1;
        truck_total -= 16.66;
        var width = Math.floor(truck_total);
        $("#progress_bar").css('width', `${width}%`);
        $("#space_occopaied").html(`${width}%`);
    });
});