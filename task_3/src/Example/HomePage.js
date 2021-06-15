/*import React from 'react';


function HomePage(props) {
    return (
        <div>
              <header class="header_area">

            <div class="main_menu">
            	<nav class="navbar navbar-expand-lg navbar-light">
					<div class="container">
						<a class="navbar-brand logo_h" href="index.html"><img src="https://www.flaticon.com/svg/vstatic/svg/25/25694.svg?token=exp=1617124799~hmac=73d80e820252b85c174001f50994f5eb" style={{width: "40px", height: "25px"}} alt=""/><strong>KRISHA</strong></a>
						<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						</button>
						<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                            <ul class="nav navbar-nav menu_nav ml-auto">
                                <li class="nav-item"><a class="nav-link" href="sell.html">Sell</a></li> 
                                <li class="nav-item"><a class="nav-link" href="about-us.html">Rent</a></li>
                                <li class="nav-item"><a class="nav-link" href="favorites.html">Favorites</a></li> 
                                <li class="nav-item submenu dropdown">
                                  <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Personal</a>
                                  <ul class="dropdown-menu">
                                    <li class="nav-item"><a class="nav-link" href="myads.html">My ads</a></li>
                                    <li class="nav-item"><a class="nav-link" href="settings.html">Settings</a></li>
                                  </ul>
                                </li> 
                                <li class="nav-item"><a class="nav-link" href="login.html">Sign in</a></li> 
                                <li class="nav-item"><a class="nav-link" href="register.html">Register</a></li> 
                                <li class="nav-item"><div class="but" style={{marginTop: "15px", marginRight: "10px"}}>
                        <a href="postanad.html" class="genric-btn primary">Post an ad</a></div></li> 
                            </ul>
                        </div> 
					</div>
            	</nav>
            </div>
        </header>

        <div class="container">

    <div class="col-lg-12">
        <div class="row" style={{backgroundColor: "#FFD700"}}>
            <div class="input-group-icon mt-10" style={{marginRight: "10px", marginLeft: "20px", marginTop: "15px"}}>
                <div class="form-select" id="default-select">
                    <select>
                        <option value="1">Buy</option>
                        <option value="1">Rent</option>
                    </select>
                </div>
            </div>
            <div class="input-group-icon mt-10" style={{marginRight: "10px", marginLeft: "10px", marginTop: "15px"}}>
                <div class="form-select" id="default-select">
                    <select>
                        <option value="1">apartment</option>
                        <option value="1">house</option>
                        <option value="1">country house</option>
                        <option value="1">plot</option>
                        <option value="1">office</option>
                        <option value="1">premises</option>
                        <option value="1">building</option>
                        <option value="1">shop, boutique</option>
                        <option value="1">stock</option>
                        <option value="1">other</option>
                    </select>
                </div>
            </div>
            <div class="input-group-icon mt-10" style={{marginRight: "10px", marginLeft: "10px", marginTop: "15px"}}>
                <div class="form-select" id="default-select">
                    <select>
                        <option value="1">All Kazakhstan</option>
                        <option value="1">Almaty</option>
                        <option value="1">Nur-Sultan</option>
                        <option value="1">Shymkent</option>
                        <option value="1">Karagandy</option>
                        <option value="1">Semey</option>
                        <option value="1">Taldykorgan</option>
                        <option value="1">Taraz</option>
                        <option value="1">Aktobe</option>
                        <option value="1">Atyrau</option>
                    </select>
                </div>
            </div>
            <div class="input-group-icon mt-10" style={{marginRight: "10px", marginLeft: "10px", marginTop: "15px"}}>
                <div class="form-select" id="default-select2">
                    <select>
                        <option value="1">any room</option>
                        <option value="1">1 room</option>
                        <option value="1">1-2 rooms</option>
                        <option value="1">2 rooms</option>
                        <option value="1">2-3 rooms</option>
                    </select>
                </div>
            </div>
            <br/>
            <br/>
            <div>
                <input type="text" name="from" placeholder="from" onfocus="this.placeholder = ''" onblur="this.placeholder = 'from'" required class="inp" style={{marginRight: "10px", marginLeft: "10px", marginTop: "15px",marginBottom: "15px"}}/>
            </div>
            <div>
                <input type="text" name="to" placeholder="to" onfocus="this.placeholder = ''" onblur="this.placeholder = 'to'" required class="inp" style={{marginRight: "10px", marginLeft: "20px", marginBottom: "15px"}}/>
            </div>
            <div class="switch-wrap d-flex justify-content-between" style={{marginRight: "10px", marginLeft: "10px", marginTop: "15px"}}>
                <div class="confirm-checkbox">
                    <input type="checkbox" id="confirm-checkbox"/>
                    <label for="confirm-checkbox"></label>
                </div>
                <p style={{marginLeft: "5px"}}>has photo</p>
            </div>
            <div class="switch-wrap d-flex justify-content-between" style={{marginRight: "10px", marginLeft: "10px", marginTop: "15px"}}>
                <div class="confirm-checkbox">
                    <input type="checkbox" id="confirm-checkbox"/>
                    <label for="confirm-checkbox"></label>
                </div>
                <p style={{marginLeft: "5px"}}>from trusted agencies</p>
            </div>
            <div class="switch-wrap d-flex justify-content-between" style={{marginRight: "10px", marginLeft: "10px", marginTop: "15px"}}>
                <div class="confirm-checkbox">
                    <input type="checkbox" id="confirm-checkbox"/>
                    <label for="confirm-checkbox"></label>
                </div>
                <p style={{marginLeft: "5px"}}>from the owners</p>
            </div>
            <div class="but" style={{marginRight: "10px", marginLeft: "10px", marginBottom: "15px"}}>
                <a href="#" class="genric-btn primary-border">Search</a>
            </div>

        </div>
    </div>
</div>

        <section class="latest_blog_area p_120">
            <div class="container">
                <div class="row latest_blog_inner">
                    <div class="col-lg-3 col-md-6">
                        <div class="l_blog_item">
                            <img class="img-fluid" src="https://shmkt-photos-kr.kcdn.kz/webp/67/6722eaa3-dd45-47d0-bf6b-7f2987d50c43/1-750x470.webp" alt=""/>
                            <a class="date" href="course-details.html">2-комнатная квартира, 74 м², 2/25 этаж посуточно, Каблукова 264</a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="l_blog_item">
                            <img class="img-fluid" src="https://shmkt-photos-kr.kcdn.kz/webp/1c/1c6cfca1-2631-4026-a0e6-69624aaddc84/13-750x470.webp" alt=""/>
                            <a class="date" href="course-details.html">1-комнатная квартира, 50 м², 19/25 этаж посуточно, Каблукова 264</a>
                            
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="l_blog_item">
                            <img class="img-fluid" src="https://shmkt-photos-kr.kcdn.kz/webp/14/14d6d517-91f5-4294-b5ad-0e9bf0630d16/28-750x470.webp" alt=""/>
                            <a class="date" href="course-details.html">2-комнатная квартира, 60 м², 13/18 этаж посуточно, Айманова 140 — Мынбаева</a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="l_blog_item">
                            <img class="img-fluid" src="https://shmkt-photos-kr.kcdn.kz/webp/6c/6c4a0fcb-5371-4ad6-9a3d-bf802aafe95b/1-750x470.webp" alt=""/>
                            <a class="date" href="course-details.html">2-комнатная квартира, 70 м², 8/25 этаж посуточно, Каблукова 38В</a>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="row latest_blog_inner">
                    <div class="col-lg-3 col-md-6">
                        <div class="l_blog_item">
                            <img class="img-fluid" src="https://shmkt-photos-kr.kcdn.kz/webp/67/6722eaa3-dd45-47d0-bf6b-7f2987d50c43/1-750x470.webp" alt=""/>
                            <a class="date" href="course-details.html">2-комнатная квартира, 74 м², 2/25 этаж посуточно, Каблукова 264</a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="l_blog_item">
                            <img class="img-fluid" src="https://shmkt-photos-kr.kcdn.kz/webp/1c/1c6cfca1-2631-4026-a0e6-69624aaddc84/13-750x470.webp" alt=""/>
                            <a class="date" href="course-details.html">1-комнатная квартира, 50 м², 19/25 этаж посуточно, Каблукова 264</a>
                            
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="l_blog_item">
                            <img class="img-fluid" src="https://shmkt-photos-kr.kcdn.kz/webp/14/14d6d517-91f5-4294-b5ad-0e9bf0630d16/28-750x470.webp" alt=""/>
                            <a class="date" href="course-details.html">2-комнатная квартира, 60 м², 13/18 этаж посуточно, Айманова 140 — Мынбаева</a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="l_blog_item">
                            <img class="img-fluid" src="https://shmkt-photos-kr.kcdn.kz/webp/6c/6c4a0fcb-5371-4ad6-9a3d-bf802aafe95b/1-750x470.webp" alt=""/>
                            <a class="date" href="course-details.html">2-комнатная квартира, 70 м², 8/25 этаж посуточно, Каблукова 38В</a>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="row latest_blog_inner">
                    <div class="col-lg-3 col-md-6">
                        <div class="l_blog_item">
                            <img class="img-fluid" src="https://shmkt-photos-kr.kcdn.kz/webp/67/6722eaa3-dd45-47d0-bf6b-7f2987d50c43/1-750x470.webp" alt=""/>
                            <a class="date" href="course-details.html">2-комнатная квартира, 74 м², 2/25 этаж посуточно, Каблукова 264</a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="l_blog_item">
                            <img class="img-fluid" src="https://shmkt-photos-kr.kcdn.kz/webp/1c/1c6cfca1-2631-4026-a0e6-69624aaddc84/13-750x470.webp" alt=""/>
                            <a class="date" href="course-details.html">1-комнатная квартира, 50 м², 19/25 этаж посуточно, Каблукова 264</a>
                            
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="l_blog_item">
                            <img class="img-fluid" src="https://shmkt-photos-kr.kcdn.kz/webp/14/14d6d517-91f5-4294-b5ad-0e9bf0630d16/28-750x470.webp" alt=""/>
                            <a class="date" href="course-details.html">2-комнатная квартира, 60 м², 13/18 этаж посуточно, Айманова 140 — Мынбаева</a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="l_blog_item">
                            <img class="img-fluid" src="https://shmkt-photos-kr.kcdn.kz/webp/6c/6c4a0fcb-5371-4ad6-9a3d-bf802aafe95b/1-750x470.webp" alt=""/>
                            <a class="date" href="course-details.html">2-комнатная квартира, 70 м², 8/25 этаж посуточно, Каблукова 38В</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    
        
        
        <div>
        <footer class="bg-light text-center text-lg-start">
          <div class="container p-4">
            <div class="row">
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h6 class="text-uppercase">© 2006—2021 «KRISHA»</h6>

                <ul class="list-unstyled mb-0">
                  <li>
                    <a href="#!" class="text-dark">Terms of use</a>
                  </li>
                  <li>
                    <a href="#!" class="text-dark">Site Map</a>
                  </li>
                  <li>
                    <a href="#!" class="text-dark">Rules for posting ads</a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h6 class="text mb-0">Site and newspaper information</h6>

                <ul class="list-unstyled">
                  <li>
                    <a href="#!" class="text-dark">Write us a letter</a>
                  </li>
                  <li>
                    <a href="#!" class="text-dark">Work at "Колёса Крыша Маркет"</a>
                  </li>
                  <li>
                    <a href="#!" class="text-dark">Follow our news</a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h6 class="text">Favorites</h6>

                <ul class="list-unstyled mb-0">
                    <li>
                    <a href="#!" class="text-dark">Personal Area</a>
                  </li>
                  <li>
                    <a href="#!" class="text-dark">Post an ad</a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                

                <ul class="list-unstyled mb-0">
                  <li>
                    <a href="#!" class="text-dark">Apps for Android and iOS</a>
                  </li>
                  <li>
                    <a href="#!" class="text-dark">Mobile version of the site</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
    </div>
        
        <script src="js/jquery-3.3.1.min.js"></script>
        <script src="js/popper.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/stellar.js"></script>
        <script src="vendors/lightbox/simpleLightbox.min.js"></script>
        <script src="vendors/nice-select/js/jquery.nice-select.min.js"></script>
        <script src="vendors/isotope/imagesloaded.pkgd.min.js"></script>
        <script src="vendors/isotope/isotope.pkgd.min.js"></script>
        <script src="vendors/owl-carousel/owl.carousel.min.js"></script>
        <script src="vendors/popup/jquery.magnific-popup.min.js"></script>
        <script src="js/jquery.ajaxchimp.min.js"></script>
        <script src="vendors/counter-up/jquery.waypoints.min.js"></script>
        <script src="vendors/counter-up/jquery.counterup.js"></script>
        <script src="js/mail-script.js"></script>
        <script src="js/theme.js"></script>
        </div>
    );
}

export default HomePage;*/