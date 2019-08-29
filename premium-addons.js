(function($) {
  /****** Premium Progress Bar Handler ******/
  var PremiumProgressBarWidgetHandler = function($scope, $) {
    var progressbarElement = $scope
      .find(".premium-progressbar-progress-bar")
      .each(function() {
        var settings = $(this).data("settings"),
          length = settings["progress_length"],
          speed = settings["speed"];

        $(this).animate({ width: length + "%" }, speed);
      });
  };

  /****** Premium Progress Bar Scroll Handler *****/
  var PremiumProgressBarScrollWidgetHandler = function($scope, $) {
    yjzanFrontend.waypoint(
      $scope,
      function() {
        PremiumProgressBarWidgetHandler($(this), $);
      },
      {
        offset: Waypoint.viewportHeight() - 150,
        triggerOnce: true
      }
    );
  };

  /****** Premium Video Box Handler ******/
  var PremiumVideoBoxWidgetHandler = function($scope, $) {
    var videoBoxElement = $scope.find(".premium-video-box-container"),
        videoContainer = videoBoxElement.find(".premium-video-box-video-container"),
        type = videoBoxElement.data("type"),
        video,
        vidSrc,
        checkRel;
    videoBoxElement.on("click", function() {
      
        if ("self" === type) {
            video = videoContainer.find("video");
            vidSrc = video.attr("src");
            $(video)
            .get(0)
            .play();
        videoContainer.css({
          opacity: "1",
          visibility: "visible"
        });
        } else {
            vidSrc = videoContainer.data("src");
            vidSrc = vidSrc + "&autoplay=1";
            var iframe = $( "<iframe/>" );
            checkRel = vidSrc.indexOf("rel=0");
            iframe.attr( 'src', vidSrc );
            iframe.attr( 'frameborder', '0' );
            iframe.attr( 'allowfullscreen', '1' );
            iframe.attr( 'allow', 'autoplay;encrypted-media;' );
            videoContainer.css("background", "#000");
            videoContainer.html( iframe );
        }
        videoBoxElement.find(".premium-video-box-image-container").remove();
      
    });
  };

  /****** Premium Grid Handler ******/
  var PremiumGridWidgetHandler = function($scope, $) {
    var galleryElement = $scope.find(".premium-gallery-container"),
        isotopeOptions = galleryElement.data("settings"),
        layout         = isotopeOptions['img_size'],
        columnWidth    = null;
        
    if( layout === 'metro' ) {
        layout = 'masonry';
        columnWidth = ".grid-sizer";
    }
    var grid = galleryElement.imagesLoaded(function() {
        grid.isotope({
            itemSelector: ".premium-gallery-item",
            percentPosition: true,
            animationOptions: {
                duration: 750,
                easing: "linear"
            },
            filter: isotopeOptions["active_cat"],
            layoutMode: layout,
            masonry: {
                columnWidth: columnWidth
            }
        });
    });

    $scope.find(".premium-gallery-cats-container li a").click(function(e) {
      e.preventDefault();
      $scope
        .find(".premium-gallery-cats-container li .active")
        .removeClass("active");
      $(this).addClass("active");
      var selector = $(this).attr("data-filter");
      galleryElement.isotope({ filter: selector });
      return false;
    });

    $(".premium-img-gallery a[data-rel^='prettyPhoto']").prettyPhoto({
      theme: "pp_default",
      hook: "data-rel",
      opacity: 0.7,
      show_title: false,
      deeplinking: false,
      overlay_gallery: isotopeOptions['overlay_gallery'],
      custom_markup: "",
      default_width: 900,
      default_height: 506,
      social_tools: ""
    });
  };

  /****** Premium Counter Handler ******/
  var PremiumCounterHandler = function($scope, $) {
    var counterElement = $scope.find(".premium-counter");
    yjzanFrontend.waypoint(counterElement, function () {
        var counterSettings = counterElement.data(),
        incrementElement = counterElement.find(".premium-counter-init"),
        iconElement      = counterElement.find(".icon");
        $(incrementElement).numerator(counterSettings);
        $(iconElement).addClass( "animated " + iconElement.data("animation") );
    });
  };

  /****** Premium Fancy Text Handler ******/
  var PremiumFancyTextHandler = function($scope, $) {
    var fancyTextElement = $scope.find(".premium-fancy-text-wrapper");
    var fancyTextSettings = fancyTextElement.data("settings");
    function escapeHtml(unsafe) {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
    if (fancyTextSettings["effect"] === "typing") {
      var fancyStrings = [];
      fancyTextSettings["strings"].forEach(function(item) {
        fancyStrings.push(escapeHtml(item));
      });
      fancyTextElement.find(".premium-fancy-text").typed({
        strings: fancyStrings,
        typeSpeed: fancyTextSettings["typeSpeed"],
        backSpeed: fancyTextSettings["backSpeed"],
        startDelay: fancyTextSettings["startDelay"],
        backDelay: fancyTextSettings["backDelay"],
        showCursor: fancyTextSettings["showCursor"],
        cursorChar: fancyTextSettings["cursorChar"],
        loop: fancyTextSettings["loop"]
      });
    } else {
      fancyTextElement.find(".premium-fancy-text").vTicker({
        speed: fancyTextSettings["speed"],
        showItems: fancyTextSettings["showItems"],
        pause: fancyTextSettings["pause"],
        mousePause: fancyTextSettings["mousePause"],
        direction: "up"
      });
    }
  };

  /****** Premium Countdown Handler ******/
  var PremiumCountDownHandler = function($scope, $) {
    var countDownElement = $scope.find(".premium-countdown").each(function() {
      var countDownSettings = $(this).data("settings");
      var label1 = countDownSettings["label1"],
        label2 = countDownSettings["label2"],
        newLabe1 = label1.split(","),
        newLabe2 = label2.split(",");
      if (countDownSettings["event"] === "onExpiry") {
        $(this)
          .find(".premium-countdown-init")
          .pre_countdown({
            labels: newLabe2,
            labels1: newLabe1,
            until: new Date(countDownSettings["until"]),
            format: countDownSettings["format"],
            padZeroes: true,
            onExpiry: function() {
              $(this).html(countDownSettings["text"]);
            },
            serverSync: function() {
              return new Date(countDownSettings["serverSync"]);
            }
          });
      } else if (countDownSettings["event"] === "expiryUrl") {
        $(this)
          .find(".premium-countdown-init")
          .pre_countdown({
            labels: newLabe2,
            labels1: newLabe1,
            until: new Date(countDownSettings["until"]),
            format: countDownSettings["format"],
            padZeroes: true,
            expiryUrl: countDownSettings["text"],
            serverSync: function() {
              return new Date(countDownSettings["serverSync"]);
            }
          });
      }
      times = $(this)
        .find(".premium-countdown-init")
        .pre_countdown("getTimes");
      function runTimer(el) {
        return el == 0;
      }
      if (times.every(runTimer)) {
        if (countDownSettings["event"] === "onExpiry") {
          $(this)
            .find(".premium-countdown-init")
            .html(countDownSettings["text"]);
        }
        if (countDownSettings["event"] === "expiryUrl") {
          var editMode = $("body").find("#yjzan").length;
          if (editMode > 0) {
            $(this)
              .find(".premium-countdown-init")
              .html(
                "<h1>You can not redirect url from yjzan Editor!!</h1>"
              );
          } else {
            window.location.href = countDownSettings["text"];
          }
        }
      }
    });
  };

  /****** Premium Carousel Handler ******/
  var PremiumCarouselHandler = function($scope, $) {
    var carouselElement = $scope
      .find(".premium-carousel-wrapper")
      .each(function() {
        var carouselSettings = $(this).data("settings");
        function slideToShow(slick) {
          slidesToShow = slick.options.slidesToShow;

          windowWidth = jQuery(window).width();
          if (windowWidth < 1025) {
            slidesToShow = carouselSettings["slidesDesk"];
          }
          if (windowWidth < 769) {
            slidesToShow = carouselSettings["slidesTab"];
          }
          if (windowWidth < 481) {
            slidesToShow = carouselSettings["slidesMob"];
          }
          return slidesToShow;
        }
        $(this).on("init", function(event, slick) {
          event.preventDefault();
          $(this)
            .find("item-wrapper.slick-active")
            .each(function(index, el) {
              $this = $(this);
              $this.addClass($this.data("animation"));
            });
          $(".slick-track").addClass("translate");
        });
        $(this)
          .find(".premium-carousel-inner")
          .slick({
            vertical: carouselSettings["vertical"],
            slidesToScroll: carouselSettings["slidesToScroll"],
            slidesToShow: carouselSettings["slidesToShow"],
            responsive: [
              {
                breakpoint: 1025,
                settings: {
                  slidesToShow: carouselSettings["slidesDesk"],
                  slidesToScroll: carouselSettings["slidesToScroll"]
                }
              },
              {
                breakpoint: 769,
                settings: {
                  slidesToShow: carouselSettings["slidesTab"],
                  slidesToScroll: carouselSettings["slidesTab"]
                }
              },
              {
                breakpoint: 481,
                settings: {
                  slidesToShow: carouselSettings["slidesMob"],
                  slidesToScroll: carouselSettings["slidesMob"]
                }
              }
            ],
            fade: carouselSettings["fade"],
            infinite: carouselSettings["infinite"],
            speed: carouselSettings["speed"],
            autoplay: carouselSettings["autoplay"],
            autoplaySpeed: carouselSettings["autoplaySpeed"],
            draggable: carouselSettings["draggable"],
            touchMove: carouselSettings["touchMove"],
            rtl: carouselSettings["rtl"],
            useTransform: false,
            adaptiveHeight: carouselSettings["adaptiveHeight"],
            pauseOnHover: carouselSettings["pauseOnHover"],
            centerMode: carouselSettings["centerMode"],
            centerPadding: carouselSettings["centerPadding"],
            arrows: carouselSettings["arrows"],
            nextArrow: carouselSettings["nextArrow"],
            prevArrow: carouselSettings["prevArrow"],
            dots: carouselSettings["dots"],
            customPaging: function(slider, i) {
              return '<i class="' + carouselSettings["customPaging"] + '"></i>';
            }
          });
        $(this).on("afterChange", function(
          event,
          slick,
          currentSlide,
          nextSlide
        ) {
          slidesScrolled = slick.options.slidesToScroll;
          slidesToShow = slideToShow(slick);
          centerMode = slick.options.centerMode;
          $currentParent = slick.$slider[0].parentElement.id;
          slideToAnimate = currentSlide + slidesToShow - 1;
          if (slidesScrolled == 1) {
            if (centerMode == true) {
              animate = slideToAnimate - 2;
              $inViewPort = $(
                "#" + $currentParent + " [data-slick-index='" + animate + "']"
              );
              $inViewPort.addClass($inViewPort.data("animation"));
            } else {
              $inViewPort = $(
                "#" +
                  $currentParent +
                  " [data-slick-index='" +
                  slideToAnimate +
                  "']"
              );
      
              $inViewPort.find('p, h1, h2, h3, h4, h5, h6, span, a, img, i, button').addClass($inViewPort.data("animation")).removeClass("premium-carousel-content-hidden");
            }
          } else {
            for (var i = slidesScrolled + currentSlide; i >= 0; i--) {
              $inViewPort = $(
                "#" + $currentParent + " [data-slick-index='" + i + "']"
              );
              $inViewPort.find('p, h1, h2,h3,h4,h5,h6,span, img, i, button').addClass($inViewPort.data("animation")).removeClass("premium-carousel-content-hidden");
            }
          }
        });
        $(this).on("beforeChange", function(event, slick, currentSlide) {
          $inViewPort = $("[data-slick-index='" + currentSlide + "']");
          $inViewPort.siblings().find('p, h1, h2, h3, h4, h5,h6, span, a, img, i, button').removeClass($inViewPort.data("animation")).addClass("premium-carousel-content-hidden");
        });
        if (carouselSettings["vertical"]) {
          var maxHeight = -1;
          $(".slick-slide").each(function() {
            if ($(this).height() > maxHeight) {
              maxHeight = $(this).height();
            }
          });
          $(".slick-slide").each(function() {
            if ($(this).height() < maxHeight) {
              $(this).css(
                "margin",
                Math.ceil((maxHeight - $(this).height()) / 2) + "px 0"
              );
            }
          });
        }
        var marginFix = {
          element: $("a.ver-carousel-arrow"),
          getWidth: function() {
            var width = this.element.outerWidth();
            return width / 2;
          },
          setWidth: function(type) {
            type = type || "vertical";
            if (type == "vertical") {
              this.element.css("margin-left", "-" + this.getWidth() + "px");
            } else {
              this.element.css("margin-top", "-" + this.getWidth() + "px");
            }
          }
        };
        marginFix.setWidth();
        marginFix.element = $("a.carousel-arrow");
        marginFix.setWidth("horizontal");
      });
  };

  /****** Premium Banner Handler ******/
  var PremiumBannerHandler = function($scope, $) {
    var bannerElement = $scope.find(".premium_banner");
    bannerElement.find(".premium_addons-banner-ib").hover(
      function() {
        $(this)
          .find(".premium_addons-banner-ib-img")
          .addClass("active");
      },
      function() {
        $(this)
          .find(".premium_addons-banner-ib-img")
          .removeClass("active");
      }
    );
  };

  /****** Premium Modal Box Handler ******/
  var PremiumModalBoxHandler = function($scope, $) {
    var modalBoxElement = $scope.find(".premium-modal-box-container"),
      modalBoxSettings = modalBoxElement.data("settings");

    if (modalBoxElement.length > 0) {
      if (modalBoxSettings["trigger"] === "pageload") {
        $(document).ready(function($) {
          setTimeout(function() {
            modalBoxElement.find(".premium-modal-box-modal").modal();
          }, modalBoxSettings["delay"] * 1000);
        });
      }
    }
  };

  /****** Premium Blog Handler ******/
  var PremiumBlogHandler = function($scope, $) {
    var blogElement = $scope.find(".premium-blog-wrap"),
      masonryBlog = blogElement.data("pa-masonry"),
      colsNumber = blogElement.data("col"),
      carousel = blogElement.data("carousel"),
      autoPlay = blogElement.data("play"),
      speed = blogElement.data("speed"),
      fade = blogElement.data("fade"),
      prevArrow =
        '<a type="button" data-role="none" class="carousel-arrow carousel-prev" aria-label="Next" role="button" style=""><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
      nextArrow =
        '<a type="button" data-role="none" class="carousel-arrow carousel-next" aria-label="Next" role="button" style=""><i class="fa fa-angle-right" aria-hidden="true"></i></a>';

    if (masonryBlog) {
      blogElement.imagesLoaded(function() {
        blogElement.isotope({
          itemSelector: ".premium-blog-post-container",
          percentPosition: true,
          animationOptions: {
            duration: 750,
            easing: "linear",
            queue: false
          }
        });
      });
    }
    
    if ( carousel && ! masonryBlog ) {
      $(blogElement).slick({
        infinite: true,
        slidesToShow: colsNumber,
        slidesToScroll: colsNumber,
        responsive: [
          { breakpoint: 769, settings: { slidesToShow: 1, slidesToScroll: 1 } },
          { breakpoint: 481, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ],
        autoplay: autoPlay,
        autoplaySpeed: speed,
        nextArrow: nextArrow,
        prevArrow: prevArrow,
        fade: fade,
        draggable: true
      });
    }
    
  };
  
  /****** Premium Image Scroll ******/
  var PremiumImageScrollHandler = function($scope, $) {
    var scrollElement    = $scope.find(".premium-image-scroll-container"),
        scrollOverlay    = scrollElement.find(".premium-image-scroll-overlay"),
        scrollVertical   = scrollElement.find(".premium-image-scroll-vertical"),
        dataElement      = scrollElement.data("settings"),
        imageScroll      = scrollElement.find('.premium-image-scroll-image'),
        direction        = dataElement['direction'],
        reverse          = dataElement['reverse'],
        transformOffset  = null;
        
        function startTransform() {
            imageScroll.css("transform", (direction == "vertical" ? "translateY" : "translateX") + "( -" +  transformOffset + "px)");
        }
        
        function endTransform() {
            imageScroll.css("transform", (direction == 'vertical' ? "translateY" : "translateX") + "(0px)");
        }
        
        function setTransform() {
            if( direction == "vertical" ) {
                transformOffset = imageScroll.height() - scrollElement.height();
            } else {
                transformOffset = imageScroll.width() - scrollElement.width();
            }
        }
        
        if( dataElement["trigger"] == "scroll" ) {
            scrollElement.addClass("premium-container-scroll");
            if ( direction == "vertical" ) {
                scrollVertical.addClass("premium-image-scroll-ver");
            } else {
                scrollElement.imagesLoaded(function() {
                  scrollOverlay.css( { "width": imageScroll.width(), "height": imageScroll.height() } );
                });
            }
        } else {
            if ( reverse === 'yes' ) {
                scrollElement.imagesLoaded(function() {
                    scrollElement.addClass("premium-container-scroll-instant");
                    setTransform();
                    startTransform();
                });
            }
            if ( direction == "vertical" ) {
                scrollVertical.removeClass("premium-image-scroll-ver");
            }
            scrollElement.mouseenter(function() {
                scrollElement.removeClass("premium-container-scroll-instant");
                setTransform();
                reverse === 'yes' ? endTransform() : startTransform();
            });

            scrollElement.mouseleave(function() {
                reverse === 'yes' ? startTransform() : endTransform();
            });
        }
    };

  //Yjzan JS Hooks
  $(window).on("yjzan/frontend/init", function() {
    yjzanFrontend.hooks.addAction(
      "frontend/element_ready/premium-addon-video-box.default",
      PremiumVideoBoxWidgetHandler
    );
    yjzanFrontend.hooks.addAction(
      "frontend/element_ready/premium-img-gallery.default",
      PremiumGridWidgetHandler
    );
    yjzanFrontend.hooks.addAction(
      "frontend/element_ready/premium-addon-fancy-text.default",
      PremiumFancyTextHandler
    );
    yjzanFrontend.hooks.addAction(
      "frontend/element_ready/premium-counter.default",
      PremiumCounterHandler
    );
    yjzanFrontend.hooks.addAction(
      "frontend/element_ready/premium-countdown-timer.default",
      PremiumCountDownHandler
    );
    yjzanFrontend.hooks.addAction(
      "frontend/element_ready/premium-carousel-widget.default",
      PremiumCarouselHandler
    );
    yjzanFrontend.hooks.addAction(
      "frontend/element_ready/premium-addon-banner.default",
      PremiumBannerHandler
    );
    yjzanFrontend.hooks.addAction(
      "frontend/element_ready/premium-addon-modal-box.default",
      PremiumModalBoxHandler
    );
    yjzanFrontend.hooks.addAction(
      "frontend/element_ready/premium-addon-blog.default",
      PremiumBlogHandler
    );
    yjzanFrontend.hooks.addAction(
      "frontend/element_ready/premium-image-scroll.default",
      PremiumImageScrollHandler
    );
    if (yjzanFrontend.isEditMode()) {
      yjzanFrontend.hooks.addAction(
        "frontend/element_ready/premium-addon-progressbar.default",
        PremiumProgressBarWidgetHandler
      );
    } else {
      yjzanFrontend.hooks.addAction(
        "frontend/element_ready/premium-addon-progressbar.default",
        PremiumProgressBarScrollWidgetHandler
      );
    }
  });
})(jQuery);