<?php
    $res = [
        "status" => 200,
        "order_no" => 2022988
    ];

    echo json_encode($res);

    // the message
    $msg = "First line of text\nSecond line of text";

    // use wordwrap() if lines are longer than 70 characters
    $msg = wordwrap($msg,70);

    // send email
    mail("antu.khan.988@gmail.com","Test Email From php code",$msg);
?>