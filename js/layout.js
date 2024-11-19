// 초기진입시 aside active-ball의 위치를 설정
function activeBallPosition(){
    let thisButton = $('aside nav .menu-item.active')
    let buttonTop = thisButton.position().top;
    let buttonHeight = thisButton.outerHeight();
    let activeBallTop = buttonTop + (buttonHeight / 2) - ($('.active-ball').outerHeight() / 2);

    $('aside nav .active-ball').css('top', activeBallTop + "px");
} 

$(document).ready(function() {

    activeBallPosition();

    // icon lucide
    lucide.createIcons();

    // overlay 클릭시 data-name과 동일한 id의 요소를 close
    $('.overlay,.side-close').on('click',function(){
        let thisName = $(this).attr('data-name');
        $('#' + thisName).removeClass('open');

        console.log(this)

        if (!$(this).hasClass('side-close')) {
            $(this).hide();
        }
    });

    $('.menu-item').on('click',function(){
        $(this).parents('aside').addClass('open');
        $(this).parents('aside').children('.overlay').show();
    });

    $('.btn-close').on('click',function(){
        let thisName = $(this).attr('data-name');
        $('#' + thisName).removeClass('open');
    })

    $('.side-menu .menu-item').on('click',function(){
        $('.side-menu .menu-item').removeClass('active');
        $('.side-menu .menu-item .depth2 li').removeClass('active');

        $(this).addClass('active')
    })

    // aside nav 버튼 클릭시 active-ball의 위치를 변경
    // $('aside nav .menu-item').on('click', function() {
    //     $('aside nav .menu-item').removeClass('active');
    //     $(this).addClass('active');
    
    //     let buttonTop = $(this).position().top;
    //     let buttonHeight = $(this).outerHeight();
    //     let activeBallTop = buttonTop + (buttonHeight / 2) - ($('.active-ball').outerHeight() / 2);
    
    //     $('aside nav .active-ball').css('top', activeBallTop + "px");
    // });
});