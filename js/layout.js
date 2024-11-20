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

    // 모드 변경
    $('#mode').on('change', function() {
        if ($(this).is(':checked')) {
            $('html').attr('color-theme', 'light');
        } else {
            $('html').attr('color-theme', 'dark');
        }
    });

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

    // custom select 
    // .option-list .option 클릭시 해당 텍스트가 label텍스트로 바뀜
    // .option-list .option 클릭시 해당 data-value가 select의 data-value로 들어감
    // 다른 select 클릭시 기존 select 닫힘
    $('.select').on('click', function (e) {
        e.stopPropagation();

        $('.select').not(this).removeClass('open').children('.option-list').slideUp();

        $(this).toggleClass('open');
        $(this).children('.option-list').slideToggle(50);
    });

    $('.select .option-list .option').on('click', function (e) {
        e.stopPropagation();
        let selectText = $(this).text();
        let selectValue = $(this).attr('data-value');
        $(this).parents('.select').children('.label').text(selectText);

        $(this).parents('.select').removeClass('open');
        $(this).parents('.select').attr('data-value',selectValue);
        $(this).parents('.option-list').slideUp(50);
    });

    // filter button 
    $('.btn-filter').on('click',function(){
        $(this).toggleClass('active');
        $('#filterBox').toggleClass('open');
    });
});

// custom select 
// 셀렉트 영역이 아닌 다른 부분 클릭시 셀렉트 닫힘
$(document).on('click', function () {
    $('.select').removeClass('open');
    $('.option-list').slideUp(50);
});