// 초기진입시 aside active-ball의 위치를 설정
function activeBallPosition(){
    let thisButton = $('aside nav .menu-item.active')
    let buttonTop = thisButton.position().top;
    let buttonHeight = thisButton.outerHeight();
    let activeBallTop = buttonTop + (buttonHeight / 2) - ($('.active-ball').outerHeight() / 2);

    $('aside nav .active-ball').css('top', activeBallTop + "px");
} 

$(document).ready(function() {
    // icon lucide
    lucide.createIcons();

    if($('aside nav .menu-item').length > 0 ){
        activeBallPosition();
    }

    // datepicker 
    $( "#datepicker01" ).datepicker({
        changeMonth: true,
        changeYear: true
    });
    $( "#datepicker02" ).datepicker({
        changeMonth: true,
        changeYear: true
    });
    $( "#datepicker03" ).datepicker({
        changeMonth: true,
        changeYear: true
    });
    $( "#datepicker04" ).datepicker({
        changeMonth: true,
        changeYear: true
    });

    // 모드 변경
    $('#mode').on('change', function() {
        if ($(this).is(':checked')) {
            $('html').attr('color-theme', 'light');
        } else {
            $('html').attr('color-theme', 'dark');
        }
    });

    // modal 
    $('.modal-open').on('click',function(){
        let thisName = $(this).attr('data-name');
        $('#'+thisName).addClass('open');
        $('#'+thisName).children('.overlay').show();
    });

    // tab 
    $('.tab .item').on('click',function(){
        let thisName = $(this).attr('data-name');

        $('.tab .item').removeClass('active');
        $('.tab-content').removeClass('active');

        $(this).addClass('active');
        $('#' + thisName).addClass('active');

        $(this).siblings('.active-ball').css({
            'left': $(this).position().left + 'px',
            'width': $(this).outerWidth() + 'px'
        });
    });

    // overlay,close버튼들 클릭 시 data-name과 동일한 id의 요소를 close
    $('.overlay, .side-close, .modal-close').on('click',function(){
        let thisName = $(this).attr('data-name');
        $('#' + thisName).removeClass('open');
    });

    // menu-item 클릭시 메뉴 열림 
    $('.menu-item').on('click',function(){
        $(this).parents('aside').addClass('open');
        $(this).parents('aside').children('.overlay').show();
    });

    // btn-close 클릭시 해당요소의 data-name과 같은 id의 요소에 open클래스를 제거함
    $('.btn-close').on('click',function(){
        let thisName = $(this).attr('data-name');
        $('#' + thisName).removeClass('open');
    })

    // 메뉴 열렸을때 메뉴명을 클릭하면 하위메뉴가 열림(다른 메뉴는 닫힘)
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

    // file custom (파일첨부, 드래그해서 첨부, 삭제)
    $('.file-wrap').each(function () {
        const fileInput = $(this).find('input[type="file"]');
        const uploadName = $(this).find('.upload-name');
        const btnDelete = $(this).find('.btn-delete');

        fileInput.on('change', function () {
            const fileName = this.files[0]?.name || '첨부파일';
            uploadName.val(fileName);
        });

        uploadName.on('dragover', function (e) {
            e.preventDefault();
            $(this).parents('.file-wrap').addClass('drageover')
        });

        uploadName.on('dragleave drop', function (e) {
            e.preventDefault();
            $(this).parents('.file-wrap').removeClass('drageover')
            if (e.type === 'drop') {
                const files = e.originalEvent.dataTransfer.files;
                if (files.length > 0) {
                    fileInput.prop('files', files);
                    console.log(files[0])
                    uploadName.val(files[0].name);
                }
            }
        });

        btnDelete.on('click', function () {
            fileInput.val('');
            uploadName.val('첨부파일');
        });

        uploadName.on('click', function () {
            fileInput.click(); 
        });
    });
});

// custom select 
// 셀렉트 영역이 아닌 다른 부분 클릭시 셀렉트 닫힘
$(document).on('click', function () {
    $('.select').removeClass('open');
    $('.option-list').slideUp(50);
});