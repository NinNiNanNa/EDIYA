(function ($, window, document, undefined) {
  var bakery = {
    init: function () {
      var that = this;
      that.headerFn();
      that.section2Fn();
      that.section4Fn();
      that.eventFn();
    },
    headerFn: function () {
      // 스크롤탑값이 10px 이상 내려오면 상단 메뉴 사라지기
      $(window).scroll(function () {
        if ($(window).scrollTop() >= 10) {
          $("#header").addClass("addFixed");
          $(".goTop_wrap").stop().fadeIn(600);
        } else {
          $("#header").removeClass("addFixed");
          $(".goTop_wrap").stop().fadeOut(600);
        }
      });

      //메인버튼 이벤트(슬라이드다운)
      $(".mainBtn").on({
        mouseenter: function () {
          $(".sub").slideDown(300);
          $(".subBg").slideDown(300);
        },
      });

      //마우스리브 이벤트(슬라이드업)
      $(".header_row2").on({
        mouseleave: function () {
          $(".sub").slideUp(300);
          $(".subBg").slideUp(300);
        },
      });

      // 상단으로 이동
      $(".goTopBtn").on({
        click: function (event) {
          event.preventDefault();

          url = $(this).attr("href");
          $("html,body")
            .stop()
            .animate({ scrollTop: $(url).offset().top }, 800);
        },
      });
    },
    section2Fn: function () {
      $.ajax({
        url: "https://ninninanna.github.io/EDIYA/json/menu.json",
        type: "get",
        dataType: "json",
        success: function (rData) {
          // console.log(rData);

          let str = "";
          $.each(rData.bakery, function (idx, data) {
            // console.log(data.slide);
            // console.log(idx);

            if (data.slide == "true") {
              // console.log(data);

              str +=
                '<div class="slide">' +
                "<div>" +
                '<a href="javascript:void(0);" class="' +
                data.idx +
                '">' +
                '<img class="' +
                data.idx +
                '" src="./img/bakeryImg/' +
                data.img +
                '" alt="' +
                data.krTitle +
                '">' +
                '<span><img class="' +
                data.idx +
                '" src="./img/bakeryImg/' +
                data.thumbImg +
                '" alt="' +
                data.thumbImg +
                '"></span>' +
                '<h5 class="' +
                data.idx +
                '">' +
                data.krTitle +
                "</h5>" +
                "</a>" +
                "</div>" +
                "</div>";
            }
          });
          $("#section2 .slide_wrap").append(str);

          // 슬라이드 구현(slick라이브러리 사용)
          $("#section2 .slide_wrap").slick({
            slide: "div",
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 500,
            arrows: true,
            prevArrow:
              '<span class="prevBtn"><a href="javascript:void(0);"><img src="./img/drinkImg/new_btn_arrow01.gif" alt="slidePrevBtn"></a></span>',
            nextArrow:
              '<span class="nextBtn"><a href="javascript:void(0);"><img src="./img/drinkImg/new_btn_arrow02.gif" alt="slideNextBtn"></a></span>',
            draggable: true,
            responsive: [
              {
                breakpoint: 981,
                settings: {
                  slidesToShow: 2,
                },
              },
            ],
          });

          $(".slide").each(function () {
            $(this).on({
              click: function (e) {
                console.log("클래스 : ", e.target.className);

                let id = e.target.className;
                let txt = "";
                $.get("/json/menu.json", function (d) {
                  // console.log(d);
                  // console.log(d.bakery[1].idx);
                  // console.log(d.bakery.length);

                  for (let i = 0; i < d.bakery.length; i++) {
                    if (d.bakery[i].idx == id) {
                      // console.log(d.bakery[i].krTitle);
                      let data = d.bakery[i];

                      txt +=
                        '<a href="javascript:void(0);" class="closeBtn">' +
                        '<img src="./img/drinkImg/pro_detail_close.gif" alt="">' +
                        "</a>" +
                        '<div class="detail_con">' +
                        "<div>" +
                        "<h2>" +
                        data.krTitle +
                        "</h2>" +
                        "<h3>" +
                        data.enTitle +
                        "</h3>" +
                        '<p class="content">' +
                        data.content +
                        "</p>" +
                        "</div>" +
                        "</div>" +
                        '<div class="detail_comp">' +
                        "<div>" +
                        '<ul class="clearfix">' +
                        "<li><span>칼로리(<i>" +
                        data.calorie +
                        "</i>)</span></li>" +
                        "<li><span>당류(<i>" +
                        data.sugars +
                        "</i>)</span></li>" +
                        "<li><span>단백질(<i>" +
                        data.protein +
                        "</i>)</span></li>" +
                        "<li><span>포화지방(<i>" +
                        data.province +
                        "</i>)</span></li>" +
                        "<li><span>나트륨(<i>" +
                        data.salt +
                        "</i>)</span></li>" +
                        "<li><span>카페인(<i>" +
                        data.Caffeine +
                        "</i>)</span></li>" +
                        "</ul>" +
                        '<p class="allergy">알레르기 성분 정보 : ' +
                        data.allergy2 +
                        "</p>" +
                        '<p class="ect ect1">' +
                        data.ect1 +
                        "</p>" +
                        '<p class="ect ect2">' +
                        data.ect2 +
                        "</p>" +
                        "</div>" +
                        "</div>";
                    }
                  }
                  $("#section2 .menuDetail_wrap").html(txt);
                  $("#section2 .menuDetail_wrap").addClass("addMenuShow");

                  $("#section2 .closeBtn").on({
                    click: function () {
                      $("#section2 .menuDetail_wrap").removeClass(
                        "addMenuShow"
                      );
                    },
                  });
                });
              },
            });
          });
        },
        error: function (eData) {
          console.log(eData);
        },
      });
    },
    section4Fn: function () {
      let dataCount = 0; // bakery의 전체 데이터 갯수
      let count = 8; // 한번에 표출할 데이터의 갯수(더보기 버튼을 누르면 데이터가 8개씩 나옴)
      let currentCount = count; // 현재 표출된 데이터의 갯수 (처음 화면엔 8개의 데이터가 보이기 때문에 시작은 8)

      $.ajax({
        url: "https://ninninanna.github.io/EDIYA/json/menu.json",
        type: "get",
        dataType: "json",
        success: function (rData) {
          // console.log(rData.bakery);
          let data = rData.bakery;

          let str = "";
          for (let i = 0; i < 8; i++) {
            str +=
              "<li>" +
              "<div>" +
              '<div class="menuList">' +
              '<a class="menu_img" href="javascript:void(0);">' +
              '<img src="./img/bakeryImg/' +
              data[i].img +
              '" alt="' +
              data[i].krTitle +
              '">' +
              "</a>" +
              '<div class="menu_content">' +
              '<a href="javascript:void(0);" class="menuTitle">' +
              data[i].krTitle +
              "</a>" +
              '<a href="#" class="giftBtn">선물하기</a>' +
              "</div>" +
              "</div>" +
              '<div class="menuDetail">' +
              '<a href="javascript:void(0);" class="closeBtn">' +
              '<img src="./img/drinkImg/pro_detail_close.gif" alt="">' +
              "</a>" +
              '<div class="detail_con">' +
              "<div>" +
              "<h2>" +
              data[i].krTitle +
              "</h2>" +
              "<h3>" +
              data[i].enTitle +
              "</h3>" +
              '<p class="content">' +
              data[i].content +
              "</p>" +
              "</div>" +
              "</div>" +
              '<div class="detail_comp">' +
              "<div>" +
              '<ul class="clearfix">' +
              "<li>" +
              "<span>칼로리(<i>" +
              data[i].calorie +
              "</i>)</span>" +
              "<span>단백질(<i>" +
              data[i].protein +
              "</i>)</span>" +
              "<span>나트륨(<i>" +
              data[i].salt +
              "</i>)</span>" +
              "</li>" +
              "<li>" +
              "<span>당류(<i>" +
              data[i].sugars +
              "</i>)</span>" +
              "<span>포화지방(<i>" +
              data[i].province +
              "</i>)</span>" +
              "<span>카페인(<i>" +
              data[i].Caffeine +
              "</i>)</span>" +
              "</li>" +
              "</ul>" +
              '<p class="allergy">' +
              data[i].allergy1 +
              "</p>" +
              '<p class="ect ect1">' +
              data[i].ect1 +
              "</p>" +
              '<p class="ect ect2">' +
              data[i].ect2 +
              "</p>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</li>";
          }
          $("#section4 .menuList_wrap > ul").append(str);

          // 각 메뉴이미지 클릭시 상세성분 박스 보이기
          $("#section4 .menu_img").each(function (idx) {
            $(this).on({
              click: function () {
                // console.log(idx);
                $("#section4 .menuDetail").eq(idx).css({ display: "block" });
              },
            });
          });

          // 상세성분 박스안에 'X'버튼 클릭시 상세성분 박스 닫기
          $("#section4 .closeBtn").each(function (idx) {
            $(this).on({
              click: function () {
                $("#section4 .menuDetail").eq(idx).css({ display: "none" });
              },
            });
          });

          $(".moreBtn").on({
            click: function () {
              $.get("/json/menu.json", function (d) {
                // console.log(d.bakery);
                let data = d.bakery;
                dataCount = data.length;
                // console.log(dataCount);

                let str = "";
                for (let i = currentCount; i < currentCount + count; i++) {
                  // console.log(data[i]);

                  // 최대 갯수일 때는 멈추게
                  if (i === dataCount) {
                    $(".moreBtn").css({ display: "none" });
                    break;
                  }
                  str +=
                    "<li>" +
                    "<div>" +
                    '<div class="menuList">' +
                    '<a class="menu_img" href="javascript:void(0);">' +
                    '<img src="./img/bakeryImg/' +
                    data[i].img +
                    '" alt="' +
                    data[i].krTitle +
                    '">' +
                    "</a>" +
                    '<div class="menu_content">' +
                    '<a href="javascript:void(0);" class="menuTitle">' +
                    data[i].krTitle +
                    "</a>" +
                    '<a href="#" class="giftBtn">선물하기</a>' +
                    "</div>" +
                    "</div>" +
                    '<div class="menuDetail">' +
                    '<a href="javascript:void(0);" class="closeBtn">' +
                    '<img src="./img/drinkImg/pro_detail_close.gif" alt="">' +
                    "</a>" +
                    '<div class="detail_con">' +
                    "<div>" +
                    "<h2>" +
                    data[i].krTitle +
                    "</h2>" +
                    "<h3>" +
                    data[i].enTitle +
                    "</h3>" +
                    '<p class="content">' +
                    data[i].content +
                    "</p>" +
                    "</div>" +
                    "</div>" +
                    '<div class="detail_comp">' +
                    "<div>" +
                    '<ul class="clearfix">' +
                    "<li>" +
                    "<span>칼로리(<i>" +
                    data[i].calorie +
                    "</i>)</span>" +
                    "<span>단백질(<i>" +
                    data[i].protein +
                    "</i>)</span>" +
                    "<span>나트륨(<i>" +
                    data[i].salt +
                    "</i>)</span>" +
                    "</li>" +
                    "<li>" +
                    "<span>당류(<i>" +
                    data[i].sugars +
                    "</i>)</span>" +
                    "<span>포화지방(<i>" +
                    data[i].province +
                    "</i>)</span>" +
                    "<span>카페인(<i>" +
                    data[i].Caffeine +
                    "</i>)</span>" +
                    "</li>" +
                    "</ul>" +
                    '<p class="allergy">' +
                    data[i].allergy1 +
                    "</p>" +
                    '<p class="ect ect1">' +
                    data[i].ect1 +
                    "</p>" +
                    '<p class="ect ect2">' +
                    data[i].ect2 +
                    "</p>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</li>";
                }
                currentCount = currentCount + count;
                $("#section4 .menuList_wrap > ul").append(str);

                // 각 메뉴이미지 클릭시 상세성분 박스 보이기
                $("#section4 .menu_img").each(function (idx) {
                  $(this).on({
                    click: function () {
                      // console.log(idx);
                      $("#section4 .menuDetail")
                        .eq(idx)
                        .css({ display: "block" });
                    },
                  });
                });

                // 상세성분 박스안에 'X'버튼 클릭시 상세성분 박스 닫기
                $("#section4 .closeBtn").each(function (idx) {
                  $(this).on({
                    click: function () {
                      $("#section4 .menuDetail")
                        .eq(idx)
                        .css({ display: "none" });
                    },
                  });
                });
              });
            },
          });
        },
        error: function (eData) {
          console.log(eData);
        },
      });
    },
    eventFn: function () {
      $(".eventCloseBtn").on({
        click: function () {
          $(".eventMenu").hide();
        },
      });
    },
  };
  bakery.init();
})(jQuery, window, document);
