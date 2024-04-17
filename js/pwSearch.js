(function($,window,document,undefined){

    var pwSearch = {

        init: function(){
            var that = this;
                that.headerFn();
                that.sectionFn();

        },
        headerFn : function(){
            var url;

            // 스크롤탑값이 10px 이상 내려오면 
            // 상단 메뉴 사라지기 & goTop버튼 fadeIn
            $(window).scroll(function(){
                if( $(window).scrollTop() >= 10 ){
                    $('#header').addClass('addFixed');
                    $('.goTop').stop().fadeIn(600);
                }
                else{
                    $('#header').removeClass('addFixed');
                    $('.goTop').stop().fadeOut(600);
                }
            });

            //메인버튼 이벤트(슬라이드다운)
            $('.mainBtn2').on({
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
            $('.smoothBtn').on({
                click:	function(event){
                    event.preventDefault();	
                    
                    url = $(this).attr('href');
                    $('html,body').stop().animate({ scrollTop: $( url ).offset().top },800);		
                }
            });

        },
        sectionFn : function(){

            // 이메일 아이디 정규식
            function isEmail(asValue) {
                var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
             
                return regExp.test(asValue);
            }

            // 휴대폰번호 정규식
            function isPhoneNumber(asValue) {
                var regExp = /^\d{3}\d{3,4}\d{4}$/;
             
                return regExp.test(asValue);
            }

            // 이메일 아이디에 입력했을때(keydown) delBtn 띄우기, addClass 지우기
            $('#id').keydown(function(){
                $('.inputBoxId input').removeClass('addInputWrong');
                $('.inputBoxId p').removeClass('addInputWrong');
                $('.inputBoxId .delBtn').show();
            });

            // 이메일 아이디 delBtn 누르면 입력한 내용과 delBtn 삭제
            $('.inputBoxId .delBtn').on({
                click: function(){
                    $('#id').val('');
                    $(this).hide();
                }
            });

            // 휴대폰번호에 입력했을때(keydown) delBtn 띄우기, addClass 지우기
            $('#tel').keydown(function(){
                $('.inputBoxTel input').removeClass('addInputWrong');
                $('.inputBoxTel p').removeClass('addInputWrong');
                $('.inputBoxTel .delBtn').show();
            });

            // 휴대폰번호 delBtn 누르면 입력한 내용과 delBtn 삭제
            $('.inputBoxTel .delBtn').on({
                click: function(){
                    $('#tel').val('');
                    $(this).hide();
                }
            });

            // 이메일 아이디, 비밀번호 입력안하고 로그인 버튼 누르면 빨간색 경고글 띄우기 (.addInputWrong)
            $('.pwConBtn').on({
                click: function(e){
                    // 이메일 아이디 입력없이 로그인 버튼 누르면 빨간색 경고글과 테두리 빨간색으로 변경
                    if( $('#id').val()=='' ){
                        $('.inputBoxId input').addClass('addInputWrong');
                        $('.inputBoxId p').addClass('addInputWrong').text('이메일을 입력해 주세요.');
                        $('#id').focus();
                    }
                    // 이메일 형식이 아니면 빨간색 경고글('잘못된 이메일 형식입니다.'로 텍스트변경)과 테두리 빨간색으로 변경
                    else if( !isEmail($('#id').val()) ){
                        $('.inputBoxId input').addClass('addInputWrong');
                        $('.inputBoxId p').addClass('addInputWrong').text('잘못된 이메일 형식입니다.');
                        $('#id').focus();
                    }

                    // 휴대폰번호 입력없이 로그인 버튼 누르면 빨간색 경고글과 테두리 빨간색으로 변경
                    if( $('#tel').val()=='' ){
                        $('.inputBoxTel input').addClass('addInputWrong');
                        $('.inputBoxTel p').addClass('addInputWrong').text('휴대폰번호를 입력해 주세요.');
                        $('#tel').focus();
                    }
                    // 휴대폰번호 형식이 아니면 빨간색 경고글('11자 이내의 숫자로만 입력해주세요.'로 텍스트변경)과 테두리 빨간색으로 변경
                    else if( !isPhoneNumber($('#tel').val()) ){
                        $('.inputBoxTel input').addClass('addInputWrong');
                        $('.inputBoxTel p').addClass('addInputWrong').text('11자 이내의 숫자로만 입력해주세요.');
                        $('#tel').focus();
                    }
                }
            });

        }

    }
    pwSearch.init();

})(jQuery,window,document);