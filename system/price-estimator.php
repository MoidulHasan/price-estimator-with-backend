<?php
    $covered_area = [
        33157 => "Junk King Miami South",
        83714 => "Junk King Boise"
    ];
    if($_GET['zip_code']){
        $zip_code = $_GET['zip_code'];

        // Check area is covered or not
        if(isset($covered_area[$zip_code])){
            echo json_encode(
                [
                    "status" => "found",
                    $zip_code => $covered_area[$zip_code]
                ]
            );
        }
        else{
            echo json_encode(
                [
                    "status" => "not found"
                ]
            );
        }
    }
?> 