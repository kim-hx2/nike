$(function(){
  let winWidth;
  $(window).resize(function () { // 창 크기 변경되면
    winWidth=$(this).width(); //변수에 창 크기를 대입
    if(winWidth <= 1024) { //만일 창 크기가 1024 이하일 경우(태블릿, 모바일일 경우)
      $('.main-menu').off('mouseenter'); //mouseenter, mouseleave 이벤트 제거
      $('.main-menu').off('mouseleave');
      $('nav').prependTo('.h-top'); //nave를 h-top클래스의 앞으로 보냄
      $('.jordan-logo').find('img').attr('src','images/AIR-JORDAN-LOGO-b.svg');//jordan-logo 클래스의 이미지를 찾아서 src 경로의 이미지로 적용(흰색 이미지)
    } else { // 창 크기가 1024보다 클 경우(데스크탑 사이즈일 경우)
      $('.main-menu').on({
        mouseenter: function () { //메인메뉴에 마우스가 있으면 서브메뉴와 그 배경를 보여주고
          $('.sub-menu, .sub-bg').stop().show();
        },
        mouseleave: function () { //메인메뉴에 마우스가 떠나면 서브메뉴와 그 배경를 숨김
          $('.sub-menu, .sub-bg').stop().hide();
        }
      });
      $('nav').appendTo('header'); //nav를 header 끝에 넣기
      $('.jordan-logo').find('img').attr('src','images/AIR-JORDAN-LOGO.svg'); //jordan-logo 클래스의 이미지를 찾아서 src 경로의 이미지로 적용(검정이미지)
    }
  }); //resize 이벤트 종료
  $(window).trigger('resize'); //강제 이벤트 발생 (사이즈 수동 조정이 없어도 사이트가 처음 실행 될 때부터 강제로 리사이즈 실행되게 하는 것)

  $('.menu-btn').click(function(event){ //메뉴버튼을 클릭하면(태블릿, 모바일)
    event.stopPropagation(); //현재 이벤트가 다른 부모 영역으로 전달되지 못하게 함
    $('.index-wrap').css('filter','blur(10px)'); //인덱스랩=메인 페이지 부분에 블러 효과
    $('body, html').css({
      height:'100vh',
      overflow: 'hidden'
    }); //높이를 100vh로 고정, 더 넘어가는 영역은 숨김(메뉴가 열려있을때 메인페이지 스크롤이 안되게 하는 것)
    $('.menu-area').show(); //메뉴 영역이 보이고
    $('.h-top').animate({
      right: '0%' //메뉴가 -100%에서(css에서 설정해둠) 0%로 이동
    }, 'fast');
  }); //태블릿, 모바일에서 사용하는 메뉴 종료

  $('.main-menu>li>a').click(function(event){
    event.stopPropagation(); //menu-area에 속한 main-menu를 클릭하더라도 메뉴가 들어가도록 하는 것을 막아줌(menu-area(부모)영역에 main-menu(나=자식)이 속해있기 때문에 아래 다른 곳 클릭하면 메뉴가 들어가는 함수가 적용되어버림. 이를 막아줌)
    $(this).siblings('.sub-menu').animate({ //하위메뉴가 아닌 동급을 찾을 때는 find가 아닌 sibling를 사용
      left: '0%'
    }, 'fast') ;
  });
  $('.all>a').click(function(event){
    event.stopPropagation(); //menu-area에 속한 main-menu를 클릭하더라도 메뉴가 들어가도록 하는 것을 막아줌(menu-area(부모)영역에 main-menu(나=자식)이 속해있기 때문에 아래 다른 곳 클릭하면 메뉴가 들어가는 함수가 적용되어버림. 이를 막아줌)
    $(this).parents('.sub-menu').animate({ //parent => 바로 위의 부모가 아닌 상위 부모 모두를 뜻하기때문에 부모 중 .sub-menu라는 것을 써줘야함
      left:'150%'
    }, 'fast');
  });

  //다른 곳을 클릭하면 메뉴가 들어가도록
  $('.menu-area').click(function(){ //menu-area를 클릭하면
    $('.index-wrap').css('filter','blur(0px)'); //위에서 적용시켰던 블러 처리를 없애고
    $('body, html').css({ //높이 고정시켰던거 해제
      height: 'auto',
      overflow: 'visible'
    });
    $('.h-top').animate({ //h-top 메뉴를 오른쪽으로 밀어넣어서 안보이게하고
      right:'-100%'
    }, 'fast', function() {
      $('.menu-area').hide(); //menu-area를 숨김
      //힝 어려움ㅠㅅㅠ
    });
  });

  if(winWidth<=480) { //창 사이즈가 480 이하일 경우 아래 이미지 적용
    $('.main-01 img').attr('src', 'images/M-01-mobile.png');
    $('.main-02 img').attr('src', 'images/M-02-mobile.png');
    $('.main-03 img').attr('src', 'images/M-03-mobile.png');
  }else { //480보다 클 경우 아래 이미지 적용
    $('.main-01 img').attr('src', 'images/M-01.png');
    $('.main-02 img').attr('src', 'images/M-02.png');
    $('.main-03 img').attr('src', 'images/M-03.png');
  }

  // swiper 플러그인
  let swiperSlide=new Swiper('.Featured-slide', { //Featured-slide를 
    //모바일 기준 (모바일이 디폴트=먼저 작성)
    slidesPerView: 'auto', //속성 slidesPerView => 
    spaceBetween:8, //슬라이드 간의 간격
    pagination: {
      el:'.f-pager', //총 페이지 중 몇 페이지인지 보여줌
      clickable: true, //클릭으로 이동 가능하게해줌
      type: 'fraction' //이걸로 아래 네비게이션이 가능하게 해줌
    },
    navigation: {
      prevEl:'.f-prev', //.f-prev를 누르면 이전 슬라이드 보임
      nextEl:'.f-next' //.f-next를 누르면 다음 슬라이드 보임
    },
    //반응형(데스크탑 화면 넓이에 따라 레이아웃 자동 변경)
    breakpoints:{
      1025: { //1025px 이상에서는
        slidesPerView:3,
        spaceBetween:24
      },
      480: { //480px 이상에서는
        slidesPerView:'auto',
        spaceBetween:16
      }
    }
  });
});