<?php
    require_once("config.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Meta tags -->
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Google fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    <!-- Bootstrap CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <!-- Swipers Styles CDN -->
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
    <!-- Custom CSS -->
    <link rel="stylesheet" href="./styles/style.css" />

    <title>Price Estimators final</title>
</head>

<body>

    <div class="text-center">
        <div class="slide-content">
            <h1 id="ctl00_BannerContent_BannerH1">Pricing Estimator</h1>
            <p>Click the green button to get started!</p>
            <div class="btn-group btn-group-lg btn-group p-3" role="group">
                <a class="btn btn-default btn-success" role="button" id="launch-modal" data-bs-toggle="modal" data-bs-target="#peModal">Launch Pricing Estimator</a>
            </div>
        </div>
    </div>


    <!-- Modal Start-->
    <div class="modal fade" id="peModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content bg-custom text-white text-center p-0">
                <!-- Modal Header Start -->
                <div class="modal-header border-0 d-flex justify-content-between align-items-center">
                    <button id="prev-page" type="button" class="btn border-0 p-0 m-0">
                        <i class="fa fa-chevron-left" style="font-size: 14px"></i>
                    </button>
                    <p class="p-0 m-0">
                        <h6 class="text-center"><span><i class="fas fa-crown"></i></span> 1-888-888-JUNK</h6>
                    </p>
                    <!-- Close Button -->
                    <button type="button" class="btn-close border-0 p-0 m-0" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <!-- Modal Header End -->

                <!-- Modal Content Start -->

                <!-- Page 1 input zip code start -->
                <div id="p-1" class="modal-body step step-1 p-md-5">
                    <div class="container-fluid mt-5">
                        <h2>What&#39;s Your Zip Code?</h2>
                        <div class="row">
                            <div class="col-sm-4 col-xs-3"></div>
                            <div class="col-sm-4 col-xs-6">
                                <div class="form-group py-3">
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" aria-describedby="zip-submit" id="zip-input" />
                                        <button class="btn btn-primary" id="zip-submit" type="button">
                                            <i class="fa fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xs-3"></div>
                            <div class="col-12">
                                <div class="" id="zip-validation-msg"></div>
                            </div>
                        </div>
                    </div>
                    <div id="zipcode-validation-msg">

                    </div>
                    <div class="col-md-12 mt-5">
                        <p>
                            ** This pricing estimator provides an online estimate. The final price will be determined onsite by our staff. The price for heavy material, such as dirt, gravel, roofing material, and concrete, cannot be estimated with this tool as this material is charged
                            by the bed load.
                        </p>
                    </div>
                </div>
                <!-- Page 1 input zip code end -->

                <!-- Page 2 By Items or Pickup Truck Start -->
                <div id="p-2" class="modal-body step step-2 p-0 m-0 d-none">
                    <div class="container-fluid">
                        <div class="row header-block">
                            <div class="col-md-12 p-0 m-0">
                                <h2 class="p-0 m-0">By Items or Pickup Truck Loads?</h2>
                                <h4 id="p2-location"></h4>
                            </div>
                        </div>

                        <div class="row justify-content-around p-0 py-0 mx-2 m-md-0">
                            <div class="col-12 col-md-5 m-0 p-0 bg-light rounded rounded-3 mb-3">
                                <img src="<?php echo $path; ?>/images/service_add_items.png" alt="" srcset="" />
                                <h4 class="text-danger fw-1 shadow-sm bg-body rounded">
                                    Add My Items
                                </h4>
                                <div class="text-dark bg-light">
                                    <div class="inner-shadow service-bullets pt-3 pb-3">
                                        <p><strong>Recommended for:</strong></p>
                                        <ul class="text-start">
                                            <li>Furniture Removal</li>
                                            <li>Appliance Disposal &amp; Recycling</li>
                                            <li>Electronics Disposal &amp; Recycling</li>
                                            <li>Mattress Disposal</li>
                                            <li>Hot Tub Disposal</li>
                                        </ul>
                                    </div>
                                    <button id="add-My-Items" type="button" class="col-12 btn btn-lg px-5 btn-success m-0 text-white" id="btn-fs-add-items">
                                        Add My Items
                                    </button>
                                </div>
                            </div>

                            <div class="col-12 col-md-5 m-0 p-0 bg-light my-3 mt-md-0 rounded rounded-3">
                                <img src="images/service_truckloads.png" alt="" srcset="" />
                                <h4 class="text-danger fw-1 shadow-sm bg-body rounded">
                                    By Pickup Truck Loads
                                </h4>
                                <div class="text-dark bg-light">
                                    <div class="inner-shadow service-bullets pt-3 pb-3">
                                        <p><strong>Recommended for:</strong></p>
                                        <ul class="text-start">
                                            <li>Yard Waste Removal</li>
                                            <li>Construction Waste Removal</li>
                                            <li>Foreclosure Clean Outs</li>
                                            <li>Trash/Garbage Removal</li>
                                            <li>Garage Clean Outs</li>
                                        </ul>
                                    </div>
                                    <button id="add-by-Pickup-Truck-Loads" type="button" class="col-12 btn btn-lg px-5 btn-success m-0 text-white" >
                                        By Pickup Truck Loads
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Page 2 By Items or Pickup Truck End -->

                <!-- Page 3 start Lets get some info -->
                <div id="p-3" class="modal-body step step-3 d-none" style="display: block">
                    <div class="row header-block">
                        <div class="col-md-12">
                            <h2 class="fw-bold">
                                Great!<br />Let's Get Some Info.&nbsp;&nbsp;
                            </h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3 col-xs-1"></div>
                        <div class="col-sm-6 col-xs-10">
                            <div class="form-group">
                                <input id="name-input" class="input-lg border-0 mb-2" type="text" placeholder="First &amp; Last Name" data-validate-as="name" data-error="Please enter a valid First &amp; Last Name" />
                            </div>
                            <div class="form-group">
                                <input id="email-input" class="input-lg border-0 mb-2" type="text" placeholder="Email Address" inputmode="email" data-validate-as="email" data-error="Please enter a valid email address" />
                            </div>
                            <div id="dropoff-validation-msg"></div>
                        </div>
                        <div class="col-sm-3 col-xs-1"></div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4 col-xs-1"></div>
                        <div class="col-sm-4 col-xs-10">
                            <button id="btn-start-estimation" class="btn form-control button-custom fw-bold border-0 text-white" type="button">
                                Let's Get Started
                            </button>
                        </div>
                        <div class="col-sm-4 col-xs-1"></div>
                    </div>
                    <div class="col-md-12" style="margin-top: 15px">
                        <p>
                            ** This pricing estimator provides an online estimate. The final price will be determined onsite by our staff. The price for heavy material, such as dirt, gravel, roofing material, and concrete, cannot be estimated with this tool as this material is charged
                            by the bed load.
                        </p>
                    </div>
                </div>
                <!-- page 3 end lets get some info -->


                <!-- Page 4 start add items -->
                <div id="p-4" class="modal-body step step-4 d-none" style="display: block">
                    <div class="container-fluid text-light">
                        <div class="row p-0 m-0">
                            <div class="col-12 col-md-6 p-0 m-0">
                                <h2 class="p-0 m-0 fw-bold text-center text-md-start">
                                    How Many Loads?
                                </h2>
                            </div>
                            <div class="col-6 p-0 m-0">
                                <p class="pt-3 m-0 text-end d-none d-md-block">
                                    Tap the +/- buttons to add/remove
                                </p>
                            </div>
                            <div class="col-8 text-start p-0 m-0">
                                <h5 class="p-0 m-0">
                                    <i class="fa fa-map-marker"></i>
                                    <span id="location">Junk King San Antonio Northwest</span> (
                                    <span id="zip-code">78238</span>)
                                </h5>
                            </div>
                            <div class="col-4 p-0 m-0 text-end">
                                <button class="btn text-light border-0" data-toggle="dropdown" aria-expanded="false" type="button">
                                    My Items&nbsp;
                                    <i class="fa fa-chevron-circle-down" style="margin-left: 8"></i>
                                </button>
                            </div>
                        </div>
                        <div class="row p-0 m-0">
                            <div class="container-fluid-md text-center p-0 m-0">
                                <div class="swiper mySwiper p-0 m-0">
                                    <div class="swiper-button-prev"></div>
                                    <div class="swiper-button-next"></div>

                                    <div class="swiper-wrapper ps-3 p-0 m-0">
                                        <div class="swiper-slide active">
                                            <a href="#" data-category="Couches &amp; Chairs" data-slide="0" class="">
                                                <img class="img-responsive" src="<?php echo $path; ?>/images/ico_Couches_and_Chairs.png" />
                                            </a>
                                            <span>Couches &amp; Chairs</span>
                                        </div>
                                        <div class="swiper-slide">
                                            <a href="#" data-category="Tables &amp; Dressers" data-slide="1" class="cat-slide">
                                                <img class="img-responsive" src="<?php echo $path; ?>/images/ico_Tables_and_Dressers.png" />
                                            </a>
                                            <span>Tables &amp; Dressers</span>
                                        </div>
                                        <div class="swiper-slide">
                                            <a href="#" data-category="Electronics" data-slide="2" class="cat-slide">
                                                <img class="img-responsive" src="<?php echo $path; ?>/images/ico_electronics.png" />
                                            </a>
                                            <span>Electronics</span>
                                        </div>
                                        <div class="swiper-slide">
                                            <a href="#" data-category="Appliances" data-slide="3" class="cat-slide">
                                                <img class="img-responsive" src="<?php echo $path; ?>/images/ico_appliances.png" />
                                            </a>
                                            <span>Appliances</span>
                                        </div>
                                        <div class="swiper-slide">
                                            <a href="#" data-category="Mattresses" data-slide="4" class="cat-slide">
                                                <img class="img-responsive" src="<?php echo $path; ?>/images/ico_Mattresses.png" />
                                            </a>
                                            <span>Mattresses</span>
                                        </div>
                                        <div class="swiper-slide">
                                            <a href="#" data-category="Miscellaneous" data-slide="5" class="cat-slide">
                                                <img class="img-responsive" src="<?php echo $path; ?>/images/ico_miscellaneous.png" />
                                            </a>
                                            <span>Miscellaneous</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-light row m-0 p-0 mt-2 text-dark">
                            <div class="col-9">
                                <h3 class="text-start">
                                    <span class="hidden-sm">Your </span>Estimate:
                                    <span class="text-danger" id="estemeted-rate">$0</span>
                                </h3>
                            </div>
                            <div class="col-3">
                                <button class="btn btn-danger btn-sm btn-reset btn-reset-tl" type="button" onclick="resetTruckloadsView();">
                                    <span>Clear&nbsp;</span><span class="hidden-xs">Items&nbsp;</span><i
                                        class="fa fa-rotate-left jk-red"></i>
                                </button>
                            </div>
                        </div>

                        <div id="item_list" class="col-12 row p-0 m-0 bg-custom-truck inner-shadow p-1 text-dark">

                        </div>

                        <div class="row pt-3">
                            <div class="col-sm-6">
                                <h3 class="m-0 fw-bold">
                                    Book Now &amp;&nbsp;<span class="text-warning">Save $<span
                                            class="online-discount-amount jk-gold">20</span>!</span>
                                    <span>*</span>
                                </h3>
                                <p class="small m-0">* excludes jobs $99 and under</p>
                            </div>
                            <div class="col-sm-6">
                                <button class="btn button-custom w-100 p-1 mt-1 text-light fw-bold" id="btn-book-jk-truck" type="button" onclick="sendEvent('#peModal',7, &quot;forward&quot;)">
                                    Pick These Up!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Page 4 end add items -->


                <!-- Page 5 start Add by Truck load -->
                <div id="p-5" class="modal-body step step-5 d-none">
                    <div class="container-fluid text-light">
                        <div class="row p-0 m-0">
                            <div class="col-12 col-md-6 p-0 m-0">
                                <h2 class="p-0 m-0 fw-bold text-center text-md-start">
                                    How Many Loads?
                                </h2>
                            </div>
                            <div class="col-6 p-0 m-0">
                                <p class="pt-3 m-0 text-end d-none d-md-block">
                                    Tap the +/- buttons to add/remove
                                </p>
                            </div>
                            <div class="col-8 text-start p-0 m-0">
                                <h5 class="p-0 m-0">
                                    <i class="fa fa-map-marker"></i>
                                    <span id="location">Junk King San Antonio Northwest</span> (
                                    <span id="zip-code">78238</span>)
                                </h5>
                            </div>
                            <div class="col-4 p-0 m-0 text-end">
                                <button class="btn text-light border-0" data-toggle="dropdown" aria-expanded="false" type="button">
                                    My Items&nbsp;
                                    <i class="fa fa-chevron-circle-down" style="margin-left: 8"></i>
                                </button>
                            </div>
                        </div>
                        <div class="row bg-light text-dark">
                            <div class="col-12 fw-bold pt-2">
                                <h6>
                                    *<span class="text-danger">1</span> Junk King Truck =
                                    <span class="text-danger">6</span> Regular Pickup Truck Loads
                                </h6>
                            </div>
                            <div class="col-12 row m-0 p-0 pt-3 bg-custom-truck shadow">
                                <div class="col-6">
                                    <img src="<?php echo $path; ?>/images/pickup-truck-full.png" />
                                    <div>
                                        <span id="full-truck-count">2</span><span> Full Pickup Truck Load(s)</span>
                                    </div>
                                    <div class="btn-group" role="group">
                                        <button id="full-truck-minus" class="btn border-0">
                                            <i class="fal fa-minus"></i>
                                        </button>

                                        <button id="full-truck-plus" class="btn border-0">
                                            <i class="fas fa-plus-square text-danger"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <img src="<?php echo $path; ?>/images/pickup-truck-half.png" />
                                    <div>
                                        <span id="half-truck-count">2</span><span> Half Pickup Truck Load(s)</span>
                                    </div>
                                    <div class="btn-group" role="group">
                                        <button data-action="add-half" id="half-truck-minus" class="btn border-0">
                                            <i class="fal fa-minus"></i>
                                        </button>

                                        <button data-action="add-full" id="half-truck-plus" class="btn border-0">
                                            <i class="fas fa-plus-square text-danger"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 row p-0 m-0 bg-custom-truck inner-shadow p-5">
                                <div class="col-12 p-0 m-0">
                                    <div id="truck-container p-0 m-0">
                                        <div class="truck-image">
                                            <div class="progress">
                                                <div id="progress_bar" class="progress-bar" style="width: 0%" role="progressbar">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 fw-bold">
                                    <h3>
                                        <span id="space_occopaied" class="text-danger">0%</span> FULL JUNK KING TRUCK
                                    </h3>
                                </div>
                            </div>

                            <div class="bg-light row m-0 p-0 pt-2">
                                <div class="col-9">
                                    <h3 class="text-start">
                                        <span class="hidden-sm">Your </span>Estimate:
                                        <span class="text-danger" id="estemeted-rate">$0</span>
                                    </h3>
                                </div>
                                <div class="col-3">
                                    <button class="btn btn-danger btn-sm btn-reset btn-reset-tl" type="button" onclick="resetTruckloadsView();">
                                        <span>Clear&nbsp;</span><span class="hidden-xs">Items&nbsp;</span><i
                                            class="fa fa-rotate-left jk-red"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="row pt-3">
                            <div class="col-sm-6">
                                <h3 class="m-0 fw-bold">
                                    Book Now &amp;&nbsp;<span class="text-warning">Save $<span
                                            class="online-discount-amount jk-gold">20</span>!</span>
                                    <span>*</span>
                                </h3>
                                <p class="small m-0">* excludes jobs $99 and under</p>
                            </div>
                            <div class="col-sm-6">
                                <button class="btn button-custom w-100 p-1 mt-1 text-light fw-bold" id="btn-book-jk-truck" type="button" onclick="sendEvent('#peModal',7, &quot;forward&quot;)">
                                    Book It!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Page 5 end Add by Truck load -->

                <!-- Modal Content End -->


            </div>
        </div>
    </div>
    <!-- Modal End -->

    <!-- Bootstrap Scripts -->
    <script src=" https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js " integrity=" sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB " crossorigin=" anonymous "></script>
    <script src=" https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js " integrity=" sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13 " crossorigin=" anonymous "></script>

    <!-- Swiper JS -->
    <script src=" https://unpkg.com/swiper/swiper-bundle.min.js "></script>

    <!-- JQuery CDN -->
    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>


    <!-- Initialize Swiper -->
    <script>
        var swiper = new Swiper(" .mySwiper ", {
            slidesPerView: 1,
            spaceBetween: 10,
            slidesPerGroup: 1,
            loop: false,
            loopFillGroupWithBlank: true,
            pagination: {
                el: " .swiper-pagination ",
                clickable: true,
            },
            navigation: {
                nextEl: " .swiper-button-next ",
                prevEl: " .swiper-button-prev ",
            },
            breakpoints: {
                360: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                480: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                800: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
            },
        });
    </script>

    <!-- Custom Script Start -->
    <script src="<?php echo $path; ?>/scripts/estimator.js"></script>
    <!-- Custom Script End -->
</body>

</html>