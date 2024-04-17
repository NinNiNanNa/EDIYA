(function($,window,document,undefined){

    var join = {

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
            $('#pw1').keydown(function(){
                $('.inputBoxPw1 input').removeClass('addInputWrong');
                $('.inputBoxPw1 p').removeClass('addInputWrong');
                $('.inputBoxPw1 .delBtn').show();
                $('.inputBoxPw1 .pwBtn').show();
            });
            $('#pw2').keydown(function(){
                $('.inputBoxPw2 input').removeClass('addInputWrong');
                $('.inputBoxPw2 p').removeClass('addInputWrong');
                $('.inputBoxPw2 .delBtn').show();
                $('.inputBoxPw2 .pwBtn').show();
            });

            // 비밀번호 delBtn 누르면 입력한 내용과 delBtn, pwBtn 삭제
            $('.inputBoxPw1 .delBtn').on({
                click: function(){
                    $('#pw1').val('');
                    $(this).hide();
                    $('.inputBoxPw1 .pwBtn').hide();
                    $('#pw1').attr('type','password');
                    $('.inputBoxPw1 .pwBtn img').attr('src','./img/loginImg/icon_pw_hide.svg');
                }
            });
            $('.inputBoxPw2 .delBtn').on({
                click: function(){
                    $('#pw2').val('');
                    $(this).hide();
                    $('.inputBoxPw2 .pwBtn').hide();
                    $('#pw2').attr('type','password');
                    $('.inputBoxPw2 .pwBtn img').attr('src','./img/loginImg/icon_pw_hide.svg');
                }
            });

            // 비밀번호 pwBtn 누르면 입력한 내용 보이게하기
            $('.inputBoxPw1 .pwBtn').on({
                click: function(){
                    if( $('#pw1').attr('type') == 'password' ){
                        $('#pw1').attr('type','text');
                        $('.inputBoxPw1 .pwBtn img').attr('src','./img/loginImg/icon_pw_show.svg');
                    }
                    else{
                        $('#pw1').attr('type','password');
                        $('.inputBoxPw1 .pwBtn img').attr('src','./img/loginImg/icon_pw_hide.svg');
                    }
                }
            })
            $('.inputBoxPw2 .pwBtn').on({
                click: function(){
                    if( $('#pw2').attr('type') == 'password' ){
                        $('#pw2').attr('type','text');
                        $('.inputBoxPw2 .pwBtn img').attr('src','./img/loginImg/icon_pw_show.svg');
                    }
                    else{
                        $('#pw2').attr('type','password');
                        $('.inputBoxPw2 .pwBtn img').attr('src','./img/loginImg/icon_pw_hide.svg');
                    }
                }
            })

            
            $('.joinConBtn').on({
                click: function(e){
                    if( $('#id').val()=='' ){
                        $('.inputBoxId input').addClass('addInputWrong');
                        $('.inputBoxId p').addClass('addInputWrong').text('이메일을 입력해 주세요.');
                        $('#id').focus();
                    }
                    else if( !isEmail($('#id').val()) ){
                        $('.inputBoxId input').addClass('addInputWrong');
                        $('.inputBoxId p').addClass('addInputWrong').text('잘못된 이메일 형식입니다.');
                        $('#id').focus();
                    }

                    if( $('#pw1').val()=='' ){
                        $('.inputBoxPw1 input').addClass('addInputWrong');
                        $('.inputBoxPw1 p').addClass('addInputWrong').text('비밀번호를 입력해 주세요.');
                        $('#pw1').focus();
                    }
                    else if( !isPassword($('#pw1').val()) ){
                        $('.inputBoxPw1 input').addClass('addInputWrong');
                        $('.inputBoxPw1 p').addClass('addInputWrong').text('비밀번호는 영문,숫자,특수문자 조합하여 8~16자리입니다.');
                        $('#pw1').focus();
                    }

                    if( $('#pw2').val()=='' ){
                        $('.inputBoxPw2 input').addClass('addInputWrong');
                        $('.inputBoxPw2 p').addClass('addInputWrong').text('비밀번호를 입력해 주세요.');
                        $('#pw2').focus();
                    }
                    else if( !($('#pw1').val() == $('#pw2').val()) ){
                        $('.inputBoxPw2 input').addClass('addInputWrong');
                        $('.inputBoxPw2 p').addClass('addInputWrong').text('비밀번호가 일치하지 않습니다.');
                        $('#pw2').focus();
                    }
                }
            });


            // 약관동의 - CHECKBOX
            $('.acceptChk').each(function(index){
                $(this).on({
                    click:  function(){
                        
                        //한개씩 각각 체크
                        if( $(this).is(':checked') ){ //선택하면(1번째클릭)
                            $(this).prop('checked', true).addClass('addAccCheck');
                        }
                        else{ //선택하면(2번째클릭) 토글기능 - 한번은 선택, 한번은 해제
                            $(this).prop('checked', false).removeClass('addAccCheck');
                        }

                        //첫번째 버튼인 경우만
                        //모두 체크 버튼 allCheck
                        if( index == 0 ){ 
                            if( $(this).is(':checked')  ){
                                $('.acceptChk').prop('checked', true).addClass('addAccCheck'); //모두체크 
                            }
                            else{
                                $('.acceptChk').prop('checked', false).removeClass('addAccCheck'); //모두체크 
                            }
                        }

                        //6번이 체크되면
                        //7번 8번 9번 10번이 모두 체크 / 해제 된다.(APP알림, SMS, 이메일, 카카오톡)
                        if( index == 6 ){
                            if( $(this).is(':checked')  ){
                                $(this).prop('checked', true).addClass('addAccCheck');
                                $('.acceptChk').eq(7).prop('checked', true).addClass('addAccCheck');
                                $('.acceptChk').eq(8).prop('checked', true).addClass('addAccCheck');
                                $('.acceptChk').eq(9).prop('checked', true).addClass('addAccCheck');
                                $('.acceptChk').eq(10).prop('checked', true).addClass('addAccCheck');
                            }
                            else{
                                $(this).prop('checked', false).removeClass('addAccCheck');
                                $('.acceptChk').eq(7).prop('checked', false).removeClass('addAccCheck');
                                $('.acceptChk').eq(8).prop('checked', false).removeClass('addAccCheck');
                                $('.acceptChk').eq(9).prop('checked', false).removeClass('addAccCheck');
                                $('.acceptChk').eq(10).prop('checked', false).removeClass('addAccCheck');
                            }
                        }

                        //전체선택된 상태에서 
                        //한개라도 선택이 해제되면 
                        //0번 모두체크버튼이 해제된다.
                        var cnt = 0;
                        for(var i=0; i<$('.acceptChk').length; i++){
                            if( !$('.acceptChk').eq(i).is(':checked') ){
                                cnt++;
                            }                                                                    
                        }
                        //체크해제된게 한개라도 있다면 그러면 첫번째를 해제 시킨다.
                        if( cnt>0 ){
                            $('.acceptChk').eq(0).prop('checked', false).removeClass('addAccCheck');
                        }    

                        //7번, 8번, 9번, 10번 중 하나라도 해제되면 6번 해제
                        if( !$('.acceptChk').eq(7).is(':checked') || !$('.acceptChk').eq(8).is(':checked') || !$('.acceptChk').eq(9).is(':checked') || !$('.acceptChk').eq(10).is(':checked')  ){
                            $('.acceptChk').eq(6).prop('checked', false).removeClass('addAccCheck');
                        }

                        //7번, 8번, 9번, 10번 모두 체크되면 6번 체크
                        if( $('.acceptChk').eq(7).is(':checked') && $('.acceptChk').eq(8).is(':checked') && $('.acceptChk').eq(9).is(':checked') && $('.acceptChk').eq(10).is(':checked')  ){
                            $('.acceptChk').eq(6).prop('checked', true).addClass('addAccCheck');
                        }

                        //첫번쩨(0)를 제외한 나머지(1 ~ 7) 모두가 체크되면
                        //첫번째를 체크해준다.
                        var cnt2 = 0;
                        for(var i=1; i<$('.acceptChk').length; i++){
                            if( $('.acceptChk').eq(i).is(':checked') ){
                                cnt2++;
                            }                                                                    
                        }
                        //체크가 7개 모두 되면 첫번째 체크
                        if( cnt2 == 10 ){
                            $('.acceptChk').eq(0).prop('checked', true).addClass('addAccCheck');
                        }


                    }
                })
            });

        }

    }
    join.init();

})(jQuery,window,document);