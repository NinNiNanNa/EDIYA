(function($,window,document,undefined){

    var ediyaMain = {

        init: function(){
            var that = this;
                that.headerFn();
                that.section1Fn();
                that.section2Fn();
                that.section3Fn();
                that.section5Fn();
                that.eventFn();
        },
        headerFn : function(){

            // 스크롤탑값이 10px 이상 내려오면 상단 메뉴 사라지기
            $(window).scroll(function(){
                if( $(window).scrollTop() >= 10 ){
                    $('#header').addClass('addFixed');
                    $('.goTop_wrap').stop().fadeIn(600);
                }
                else{
                    $('#header').removeClass('addFixed');
                    $('.goTop_wrap').stop().fadeOut(600);
                }
            });

            //메인버튼 이벤트(슬라이드다운)
            $('.mainBtn').on({
                mouseenter:  function(){
                    $('.sub').slideDown(300);
                    $('.subBg').slideDown(300);
                }	
            });
            
            //마우스리브 이벤트(슬라이드업)
            $('.header_row2').on({
                mouseleave:  function(){
                    $('.sub').slideUp(300);
                    $('.subBg').slideUp(300);
                }	
            });

            // 상단으로 이동
            $('.goTopBtn').on({
                click:	function(event){
                    event.preventDefault();	
                    
                    url = $(this).attr('href');
                    $('html,body').stop().animate({ scrollTop: $( url ).offset().top },800);		
                }
            });

        },
        section1Fn : function(){

            var winW = 0;
            var cnt = 0;
            var z = 0;
            var setId1 = 0;
            var setId2 = 0;
            var count = 0;
            
            function resizeFn(){
                winW = $(window).innerWidth();

                // console.log( winW );
                
                $('#section1 .slide_wrap').css({ width: winW*12, marginLeft: -winW });
                $('#section1 .slide').css({ width: winW });
                
                //리사이즈 변화시 left 값 애니메이션 시간을 0으로 설정
                $('#section1 .slide_wrap').stop().animate({ left: -(winW*cnt) }, 0);
            }
            setTimeout(resizeFn,100);
            
            $(window).resize(function(){
                resizeFn();
            });

            // 1. 메인슬라이드 함수
            function mainSlindeFn(){
                $('#section1 .slide_wrap').stop().animate({ left: -(winW*cnt) }, 800, function(){
                    if( cnt > 9 ){ cnt = 0; }
                    if( cnt < 0 ){ cnt = 9; }
                    $('#section1 .slide_wrap').stop().animate({ left: -(winW*cnt) }, 0);
                });
                cnt>9?z=0:z=cnt;
                pageBtnFn(z);
            }

            // 2-1. 다음 슬라이드 카운트 함수
            function nextSlideCountFn(){
                cnt++;
                mainSlindeFn();
            }

            // 2-2. 이전 슬라이드 카운트 함수
            function prevSlideCountFn(){
                cnt--;
                mainSlindeFn();
            }

            // 3-1. 다음 버튼 클릭 이벤트
            $('.nextBtn').on({
                click : function(){
                    if( !$('#section1 .slide_wrap').is( ':animated') ){
                        nextSlideCountFn();
                        pauseFn();
                    }
                }
            });

            // 3-2. 이전 버튼 클릭 이벤트
            $('.prevBtn').on({
                click : function(){
                    if( !$('#section1 .slide_wrap').is( ':animated') ){
                        prevSlideCountFn();
                        pauseFn();
                    }
                }
            });

            // 4. 페이지버튼 표시 함수
            function pageBtnFn(z){
                $('#section1 .pageBtn_wrap li').removeClass('addPageBtn');
                $('#section1 .pageBtn_wrap li').eq(z).addClass('addPageBtn');
            }

            // 5. 페이지버튼 클릭 이벤트
            $('#section1 .pageBtn').each(function(idx){
                $(this).on({
                    click : function(){
                        cnt = idx;
                        mainSlindeFn();
                        pauseFn();
                    }
                });
            });

            // 6. 자동타이머 함수
            function autoTimerFn(){
                setId1 = setInterval(nextSlideCountFn, 4000);
            }
            autoTimerFn();

            // 7. 일시정지 함수 5초간 이벤트 없으면 자동 재실행
            function pauseFn(){
                count = 0;
                clearInterval( setId1 );
                clearInterval( setId2 );

                setId2 = setInterval(function(){
                    count++;
                    // console.log(count);
                    if( count >= 5 ){
                        nextSlideCountFn();
                        autoTimerFn();
                        clearInterval( setId2 );
                    }
                }, 1000);


            }

        },
        section2Fn : function(){

            var winW = 0;
            var cnt = 0;
            var z = 0;
            var setId1 = 0;
            var setId2 = 0;
            var count = 0;
            
            function resizeFn(){
                winW = $(window).innerWidth();
                
                $('#section2 .slide_wrap').css({ width: winW*5, marginLeft: -winW });
                $('#section2 .slide').css({ width: winW });
                
                $('#section2 .slide_wrap').stop().animate({ left: -(winW*cnt) }, 0);
            }
            setTimeout(resizeFn,100);
            
            $(window).resize(function(){
                resizeFn();
            });

            function s2SlindeFn(){
                $('#section2 .slide_wrap').stop().animate({ left: -(winW*cnt) }, 800, function(){
                    if( cnt > 2 ){ cnt = 0; }
                    if( cnt < 0 ){ cnt = 2; }
                    $('#section2 .slide_wrap').stop().animate({ left: -(winW*cnt) }, 0);
                });
                cnt>2?z=0:z=cnt;
                s2pageBtnFn(z);
                // console.log(cnt);
            }

            function s2nextSlideCountFn(){
                cnt++;
                s2SlindeFn();
                console.log(cnt);
            }

            function s2pageBtnFn(z){
                $('#section2 .pageBtn_wrap li').removeClass('addPageBtn');
                $('#section2 .pageBtn_wrap li').eq(z).addClass('addPageBtn');
                console.log(z);
            }

            $('#section2 .pageBtn').each(function(idx){
                $(this).on({
                    click : function(){
                        cnt = idx;
                        s2SlindeFn();
                        s2pauseFn();
                    }
                });
            });

            function s2autoTimerFn(){
                setId1 = setInterval(s2nextSlideCountFn, 4000);
            }
            s2autoTimerFn();

            function s2pauseFn(){
                count = 0;
                clearInterval( setId1 );
                clearInterval( setId2 );

                setId2 = setInterval(function(){
                    count++;
                    if( count >= 5 ){
                        s2nextSlideCountFn();
                        s2autoTimerFn();
                        clearInterval( setId2 );
                    }
                }, 1000);


            }

        },
        section3Fn : function(){

            var t = 0;
		
            $(window).scroll(function(){
                if( $(window).scrollTop() >= $('#section2').offset().top+100 ){
                    if( t==0 ){
                        t=1;
                        sec3AniFn();
                    }
                }
                else{
                    t=0;
                    sec3AniFomatFn();
                }
            });
            
            
            function sec3AniFomatFn(){
                $('#section3 .img_wrap').stop().animate({left:-1000,opacity:0 },2000,'easeOutQuint');	
                $('#section3 .text_wrap').stop().animate({left:-1000,opacity:0 },2500,'easeOutQuint');	
                $('#section3 .button_wrap').stop().animate({left:-1000,opacity:0 },2500,'easeOutQuint');				
                $('#section3 .factoryImg').stop().animate({opacity:0 },2000);				
            }
            
            
            
            function sec3AniFn(){
                $('#section3 .img_wrap').stop().animate({left:0,opacity:1 },2000,'easeOutQuint');	
                $('#section3 .text_wrap').stop().animate({left:0,opacity:1 },2500,'easeOutQuint');	
                $('#section3 .button_wrap').stop().animate({left:0,opacity:1 },2500,'easeOutQuint');	
                $('#section3 .factoryImg').stop().animate({opacity:1 },2000);	
            }

        },
        section5Fn : function(){
            var t = 0;
		
            $(window).scroll(function(){
                if( $(window).scrollTop() >= $('#section4').offset().top-100 ){
                    if( t==0 ){
                        t=1;
                        sec5AniFn();
                    }
                }
                else{
                    t=0;
                    sec5AniFomatFn();
                }
            });
            
            
            function sec5AniFomatFn(){
                $('#section5 .text_wrap').stop().animate({left:1000,opacity:0 },2000,'easeOutQuart');	
                $('#section5 .button_wrap').stop().animate({left:1000,opacity:0 },2500,'easeOutQuart');	
            }
            
            
            
            function sec5AniFn(){
                $('#section5 .text_wrap').stop().animate({left:0,opacity:1 },2000,'easeOutQuart');	
                $('#section5 .button_wrap').stop().animate({left:0,opacity:1 },2500,'easeOutQuart');	
            }	
        },
        eventFn : function(){
            
            $('.eventCloseBtn').on({
                click: function(){
                    $('.eventMenu').hide();
                }
            });
        }

    }
    ediyaMain.init();

})(jQuery,window,document);