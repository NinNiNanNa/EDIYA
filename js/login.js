(function($,window,document,undefined){

    var login = {

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
            // 비밀번호 정규식(8~16자 영문, 숫자, 특수문자를 최소 한가지씩 조합)
            function isPassword(asValue) {
                var regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
             
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

            // 비밀번호에 입력했을때(keydown) delBtn과 pwBtn 띄우기, addClass 지우기
            $('#pw').keydown(function(){
                $('.inputBoxPw input').removeClass('addInputWrong');
                $('.inputBoxPw p').removeClass('addInputWrong');
                $('.inputBoxPw .delBtn').show();
                $('.pwBtn').show();
            });

            // 비밀번호 delBtn 누르면 입력한 내용과 delBtn, pwBtn 삭제
            $('.inputBoxPw .delBtn').on({
                click: function(){
                    $('#pw').val('');
                    $(this).hide();
                    $('.pwBtn').hide();
                    $('#pw').attr('type','password');
                    $('.pwBtn img').attr('src','./img/loginImg/icon_pw_hide.svg');
                }
            });

            // 비밀번호 pwBtn 누르면 입력한 내용 보이게하기
            $('.pwBtn').on({
                click: function(){
                    if( $('#pw').attr('type') == 'password' ){
                        $('#pw').attr('type','text');
                        $('.pwBtn img').attr('src','./img/loginImg/icon_pw_show.svg');
                    }
                    else{
                        $('#pw').attr('type','password');
                        $('.pwBtn img').attr('src','./img/loginImg/icon_pw_hide.svg');
                    }
                }
            })

            // 이메일 아이디, 비밀번호 입력안하고 로그인 버튼 누르면 빨간색 경고글 띄우기 (.addInputWrong)
            $('.loginBtn').on({
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

                    // 비밀번호 입력없이 로그인 버튼 누르면 빨간색 경고글과 테두리 빨간색으로 변경
                    if( $('#pw').val()=='' ){
                        $('.inputBoxPw input').addClass('addInputWrong');
                        $('.inputBoxPw p').addClass('addInputWrong').text('비밀번호를 입력해 주세요.');
                        $('#pw').focus();
                    }
                    // 비밀번호 형식이 아니면 빨간색 경고글('비밀번호가 일치하지 않습니다.'로 텍스트변경)과 테두리 빨간색으로 변경
                    else if( !isPassword($('#pw').val()) ){
                        $('.inputBoxPw input').addClass('addInputWrong');
                        $('.inputBoxPw p').addClass('addInputWrong').text('비밀번호가 일치하지 않습니다.');
                        $('#pw').focus();
                    }
                }
            });

        }

    }
    login.init();

})(jQuery,window,document);