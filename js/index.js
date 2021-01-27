(function () {
  'use strict';

  var months = ['januari', 'februari', 'maret', 'april', 'mei', 'juni', 'juli', 'agustus', 'september', 'oktober', 'november', 'desember'],
      days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'],
      daysMin = ['', '', '', '', '', '', ''];

  function postDate(daysName, daysMinName, monthsName, monthsMinName, seasonsName) {
    var _counterLength = 60;

    for (var counter = 0; counter < _counterLength; counter++) {
      innerDate(counter, 'date-');
      innerDate(counter, 'date');
    }

    function innerDate(counter, dateType) {
      var newCounter;
      dateType === 'date-' ? newCounter = -counter : newCounter = counter;

      var _msInDay = 86400000,
          _localDate = new Date(Date.now() + newCounter * _msInDay),
          _day = _localDate.getDate(),
          _month = _localDate.getMonth() + 1,
          _year = _localDate.getFullYear();

      var dayDefault = addZero(_day),
          monthDefault = addZero(_month),
          defaultDate = dayDefault + '.' + monthDefault + '.' + _year;
      var dateClass = dateType + counter,
          nodeList = document.querySelectorAll('.' + dateClass);

      for (var i = 0; i < nodeList.length; i++) {
        var dateFormat = nodeList[i].dataset.format;
        dateFormat !== undefined && dateFormat !== '' ? nodeList[i].innerHTML = String(changeFormat(dayDefault, monthDefault, _year, dateFormat)) : nodeList[i].innerHTML = defaultDate;
      }
    }

    function changeFormat(_day, _month, _year, format, counter) {
      var innerFormat = format;
      var testFormat = ["dd", "mm", "yyyy", "monthFull"],
          dateFormat = {
        dd: _day,
        mm: _month,
        yyyy: _year,
        monthFull: getMonthName(_month, monthsName, true)
      };

      for (var i = 0; i < testFormat.length; i++) {
        var string = testFormat[i];
        var regExp = new RegExp(string);
        innerFormat = innerFormat.replace(regExp, dateFormat[string]);
      }

      return innerFormat.split(' ').join(' ');
    }

    function getMonthName(_month, monthsName, bigFirstLetter, counter) {
      var monthCounter = !!counter ? counter : 0,
          month = _month + monthCounter > 12 ? monthCounter - (12 - _month) : _month + monthCounter;
      return changeFirstLetter(bigFirstLetter, monthsName[month - 1]);
    }

    function addZero(numb) {
      return numb < 10 ? '0' + numb : numb;
    }

    function changeFirstLetter(isBig, str) {
      return isBig && str.length > 0 ? str[0].toUpperCase() + str.slice(1) : str;
    }
  }

  if (document.body.classList.contains('ev-date')) {
    document.addEventListener("DOMContentLoaded", function () {
      postDate(days, daysMin, months);
    });
  }

  var scrollSmooth = (function () {
    $(document).on("click", "a[href^=\"#\"]", function (event) {
      event.preventDefault();
      $("html, body").animate({
        scrollTop: $($.attr(this, "href")).offset().top
      }, 500);
    });
  });

  var animation = (function () {
    var windowHeight = $(window).height();

    function animationA(params) {
      $(params).each(function () {
        var self = $(this),
            height;

        if (self.height() >= windowHeight) {
          height = self.offset().top + windowHeight - 100;
        } else {
          height = self.offset().top + self.height();
        }

        if ($(document).scrollTop() + windowHeight >= height) {
          self.addClass("active");
        } // else {
        // 	self.removeClass("active");
        // }

      });
    }

    $(document).on("scroll", function () {
      animationA(".research-item__info");
      animationA(".research__pie"); // animationA(".week-item__icon");
      // animationA(".certificates__item--center");
      // animationA(".order-box__img");

      animationA(".research-stat__number");
    });
    var oldPrice = document.querySelectorAll(".x_price_previous");
    var newPrice = document.querySelectorAll(".x_price_current");

    function delimiter(price) {
      for (var i = 0; i < price.length; i++) {
        price[i].textContent = price[i].textContent.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1.');
      }
    }

    delimiter(oldPrice);
    delimiter(newPrice);
  });

  var illness = (function () {
    // $( ".illness-box__title" ).click(function() {
    // 	$(this).parent().toggleClass("active");
    // });
    if (window.matchMedia("(min-width: 1024px)").matches) {
      $(".illness-box__title").click(function () {
        $(".illness__box").removeClass("active");
        $(this).parent().addClass("active");
      });
    } else {
      $(".illness-box__title").click(function () {
        if ($(this).parent().hasClass("active")) {
          $(".illness__box").removeClass("active");
          $(this).parent().removeClass("active");
        } else {
          $(".illness__box").removeClass("active");
          $(this).parent().addClass("active");
        }
      });
    }
  });

  var reviews = (function () {
    $(".reviews-item__btn").on("click", function () {
      $(this).parent().toggleClass("active");

      if (!$(this).data("status")) {
        $(this).html("Скрыть отзыв");
        $(this).data("status", true);
      } else {
        $(this).html("Прочитать весь отзыв");
        $(this).data("status", false);
      }
    }); // $(window).on("load", function() {
    //   $(".reviews-list").mCustomScrollbar();
    // });

    $(".star1").on("click", function () {
      $(this).parent().removeClass("active1 active2 active3 active4 active5").addClass("active1");
    });
    $(".star2").on("click", function () {
      $(this).parent().removeClass("active1 active2 active3 active4 active5").addClass("active2");
    });
    $(".star3").on("click", function () {
      $(this).parent().removeClass("active1 active2 active3 active4 active5").addClass("active3");
    });
    $(".star4").on("click", function () {
      $(this).parent().removeClass("active1 active2 active3 active4 active5").addClass("active4");
    });
    $(".star5").on("click", function () {
      $(this).parent().removeClass("active1 active2 active3 active4 active5").addClass("active5");
    });
    $(".feedback-btn").click(function () {
      var reviewInput1 = $(".input__val-1").val().length,
          reviewInput2 = $(".input__val-2").val().length,
          // reviewInput3 = $(".input__val-3").val().length,
      reviewInput4 = $(".input__val-4").val().length;
      var pattern = /^[A-Za-zА-Яа-яЁё]{0,}$/;
      var nameTest = pattern.test($(".input__val-1").val());
      var cityTest = pattern.test($(".input__val-3").val());

      if (reviewInput1 !== 0 && nameTest) {
        $(".feedback-name").removeClass('error');
      } else {
        $(".feedback-name").addClass('error');
      } // if (reviewInput3 !== 0 && cityTest) {
      // 	$(".feedback-city").removeClass('error');
      // } else {
      // 	$(".feedback-city").addClass('error');
      // }


      if (reviewInput2 !== 0 && Number($(".input__val-2").val()) >= 18 && Number($(".input__val-2").val()) <= 120) {
        $(".feedback-age").removeClass('error');
      } else {
        $(".feedback-age").addClass('error');
      } // && reviewInput3 !== 0 && cityTest && reviewInput2 !== 0 && Number($(".input__val-2").val()) >= 18 && Number($(".input__val-2").val()) <= 120


      if (reviewInput4 !== 0) {
        $(".feedback-text").removeClass('error');
      } else {
        $(".feedback-text").addClass('error');
      }

      if (reviewInput1 !== 0 && nameTest && reviewInput4 !== 0 && reviewInput2 !== 0 && Number($(".input__val-2").val()) >= 18 && Number($(".input__val-2").val()) <= 120) {
        $(".input__val-1").val(""); // $(".input__val-2").val("");
        // $(".input__val-3").val("");

        $(".input__val-4").val("");
        $(".feedback-rating").removeClass("active1 active2 active3 active4 active5");
        $(".feedback-modal").fadeIn();
        setTimeout('$(".feedback").fadeOut(); $(".feedback-modal").fadeOut();', 3000);
      }
    });
    $(".input__val-2").on("input", function () {
      $(this).val($(this).val().replace(/[A-Za-zА-Яа-яЁё]/, ""));
    });
    $(".feedback").fadeOut();
    $(".feedback-modal").fadeOut();
    $(".reviews-btn").click(function () {
      $(".feedback").fadeIn();
    });
    var oldPrice = document.querySelectorAll(".x_price_previous");
    var newPrice = document.querySelectorAll(".x_price_current"); // function delimiter(price) {
    // 	for (let i = 0; i < price.length; i++) {
    // 		price[i].textContent = price[i].textContent.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1.');
    // 	}
    // }
    // delimiter(oldPrice);
    // delimiter(newPrice);
  });
  $(".social__img").on("click", function (e) {
    var target = $(e.target),
        dislikeImg = target.parent().next().children().first(),
        likeImg = target.parent().prev().children().first(),
        dislikeCount = target.parent().next().children().last(),
        likeCount = target.parent().prev().children().last();

    if (target.hasClass("like")) {
      target.toggleClass("used");
      target.toggleClass("like-active");
      dislikeImg.removeClass("dislike-active");

      if (target.hasClass("like-active")) {
        target.next().text(Number(target.next().text()) + 1);
      } else {
        target.next().text(Number(target.next().text()) - 1);
      }

      if (dislikeImg.hasClass("used")) {
        dislikeCount.text(Number(dislikeCount.text()) - 1);
        dislikeImg.removeClass("used");
      }
    } else {
      target.toggleClass("used");
      target.toggleClass("dislike-active");
      likeImg.removeClass("like-active");

      if (target.hasClass("dislike-active")) {
        target.next().text(Number(target.next().text()) + 1);
      } else {
        target.next().text(Number(target.next().text()) - 1);
      }

      if (likeImg.hasClass("used")) {
        likeCount.text(Number(likeCount.text()) - 1);
        likeImg.removeClass("used");
      }
    }
  });

  var banner = (function () {
    $(window).on("scroll resize", function () {
      j(".x_order_form, footer");
      i();
    });

    function j() {
      var q = $(".banner"),
          m = $(".main-banner"),
          l = $(window).scrollTop(),
          s = l + $(window).height(),
          p = $(window).width();
      var u = 0;

      for (var k = 0; k < arguments.length; k++) {
        $(arguments[k]).each(function (w, r) {
          var o = $(r).offset().top,
              x = o + $(r).outerHeight(),
              v = $(r).offset().left,
              n = v + $(r).width();
          o <= s && x >= l && v <= p && n >= 0 && (u += 1);
        });
      }

      l <= 100 || u > 0 ? q.fadeOut() : q.fadeIn().css({
        bottom: m.outerHeight()
      });
    }

    function i() {
      var k = document.querySelector(".main-banner"),
          l = document.querySelector(".banner");
      var redBannerHeight;
      k ? redBannerHeight = k.clientHeight : k;
      redBannerHeight ? l.style.bottom = redBannerHeight - 1 + "px" : l.style.bottom = 0 + "px";
    }

    $('.info__link').on('click', function () {
      var el = $(this);
      var dest = el.attr('href');

      if (dest !== undefined && dest !== '') {
        $('html').animate({
          scrollTop: $(dest).offset().top
        }, 1000);
      }

      return false;
    });
  });

  var stat = (function () {
    function $$(selector, context) {
      context = context || document;
      var elements = context.querySelectorAll(selector);
      return Array.prototype.slice.call(elements);
    }

    $$('.research__pie').forEach(function (pie) {
      var p = parseFloat(pie.textContent);
      var NS = "http://www.w3.org/2000/svg";
      var svg = document.createElementNS(NS, "svg");
      var circle = document.createElementNS(NS, "circle");
      var title = document.createElementNS(NS, "title");
      circle.setAttribute("r", 16);
      circle.setAttribute("cx", 16);
      circle.setAttribute("cy", 16);
      circle.setAttribute("stroke-dasharray", p + " 100");
      svg.setAttribute("viewBox", "0 0 32 32");
      title.textContent = pie.textContent;
      pie.textContent = '';
      svg.appendChild(title);
      svg.appendChild(circle);
      pie.appendChild(svg);
    });
  });

  var popupForm = (function () {
    function randomInteger(min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }

    var counter = 1;
    setInterval(function () {
      var randNum = randomInteger(27, 47);

      if (counter == 1) {
        $(".online-1").removeClass("active");
        $(".online-2").addClass("active");
        counter = 0;
      } else {
        $(".online-1").addClass("active");
        $(".online-2").removeClass("active");
        $(".online-dynamic-1").html(randNum);
        counter = 1;
      }
    }, 10000);
  });

  function main() {
    scrollSmooth();
    animation();
    illness();
    reviews();
    banner();
    reviews();
    stat();
    popupForm();
  }

  if (document.documentElement.clientWidth < 480) {
    window.addEventListener('scroll', function () {
      return setTimeout(main, 1000);
    }, {
      once: true
    });
  } else {
    main();
  }

}());
