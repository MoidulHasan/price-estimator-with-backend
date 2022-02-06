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
        const zipCode = parseInt($("#zip-input").val());

        zipRegex = /^[a-zA-Z][0-9][a-zA-Z] ?[0-9][a-zA-Z][0-9]|[0-9]{5}$/;
        $('#zip-input').val($('#zip-input').val().replace(/([a-z]\d[a-z])(\d[a-z]\d)/gi, '$1 $2'));
        validZip = zipRegex.test($('#zip-input').val());
        if ($('#zip-input').val() == "" || !validZip) {
            zipValMsg = '<h4>Please enter a valid zip/postal code.</h4>';
        }
        // if (locations.get(zipCode)) {
        //     zipValMsg = `<h1>Good news!<br> We've got you covered.</h1><p>Based on your location, you will be working with</p><h3>${locations.get(
        //         zipCode
        //     )}</h3>`;

        //     const location = `<i class="fa fa-map-marker">${locations.get(
        //         zipCode
        //     )}(${zipCode})`;
        //     $("#p2-location").html(location);
        //     setTimeout(function() {
        //         goToPage(2);
        //     }, 2000);
        // } else {
        //     const zipValMsg = `<h1>Sorry.<br> We Don't Serve Your Area Yet.</h1>
        //                     <p>Think there's been a mistake?<br>Give us a call to ask any questions!</p>
        //                     <h6 class="text-center"><span><i class="fas fa-crown"></i></span> 1-888-888-JUNK</h6>`;
        // }
        $("#zip-validation-msg").html(zipValMsg);
    });



});