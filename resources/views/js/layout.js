function setActiveTab(index) {
    $('.tab .item').removeClass('active');
    $('.tab-content').removeClass('active');

    $('.tab .item').eq(index).addClass('active');
    $('.tab-content').eq(index).addClass('active');

    const activeTab = $('.tab .item.active');
    $('.tab .active-ball').css({
        'width': activeTab.outerWidth() + 'px',
        'left': activeTab.position().left + 'px'
    });
}
function tabWidth() {
    setActiveTab(0); // 첫 번째 탭 활성화
}

function activeBallPosition(){
    let thisButton = $('aside nav .menu-item.active')
    let buttonTop = thisButton.position().top;
    let buttonHeight = thisButton.outerHeight();
    let activeBallTop = buttonTop + (buttonHeight / 2) - ($('.active-ball').outerHeight() / 2);

    $('aside nav .active-ball').css('top', activeBallTop + "px");
}

// html 컬러모드 - 세션스토리지에서 현재 colorTheme값을 가져와서 사용
function htmlMode(){
    let htmlTheme = sessionStorage.getItem('colorTheme') ||  sessionStorage.setItem('colorTheme','light');
    $('html').attr('color-theme',htmlTheme);
}
htmlMode();

$(document).ready(function() {
    htmlMode();

    if ($('.tab').length > 0) {
        tabWidth();
    }

    activeBallPosition();
    
    // icon lucide
    lucide.createIcons();

    // time
    let hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0")); // 00 ~ 23
    let minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")); // 00 ~ 59

    let populateList = (selector, values, type) => {
        let list = $(selector);
        let items = "";

        values.forEach(value => {
            items += `<li><button data-type="${type}">${value}</button></li>`;
        });
        list.html(items);
    };

    populateList(".hour-list", hours, "Hour");
    populateList(".minute-list", minutes, "Minute");
    populateList(".second-list", minutes, "Second");

    $('.time-result').on('click',function(e){
        e.stopPropagation();

        $('.time-select').not($(this).siblings('.time-select')).fadeOut(150);
        $(this).siblings('.time-select').fadeToggle(150);
    });

    $('.time-wrap .select-list button').on('click',function(){
        let selectTime = $(this).parents('.time-select').attr('data-name');
        let changeValue = $(this).parents('.time-wrap').children('.time-result');

        let timeValue =  $('#'+selectTime).val();
        let Hour = timeValue.substr(0,2);
        let Minute = timeValue.substr(3,2);
        let Second = timeValue.substr(6,2);

        let thisType = $(this).attr('data-type');
        let thisValue = $(this).text();

        if(thisType === "Hour") {
            Hour = thisValue;
        } else if (thisType === "Minute") {
            Minute = thisValue;
        } else if (thisType === "Second") {
            Second = thisValue;
        }

        $('#'+selectTime).val(Hour+":"+Minute+":"+Second);

        $(changeValue).text($('#'+selectTime).val());
        $(changeValue).attr('data-value',$('#'+selectTime).val())

        $(this).parents('.select-list').find('.active').removeClass('active');
        $(this).addClass('active');
    });

    // html color-theme값에 따라 #mode switch의 체크여부를 수정
    if($('html').attr('color-theme') == 'light') {
        $('#mode').prop("checked",true)
    } else {
        $('#mode').prop("checked",false)
    }

    // 모드 변경
    $('#mode').on('change', function() {
        if ($(this).is(':checked')) {
            $('html').attr('color-theme', 'light');
            sessionStorage.setItem('colorTheme', 'light');
        } else {
            $('html').attr('color-theme', 'dark');
            sessionStorage.setItem('colorTheme', 'dark');
        }
    });

    // modal
    $('.modal-open').on('click',function(){
        const modalId = $(this).attr('data-name');
        const modal = $('#' + modalId);

        modal.toggleClass('open');
        modal.children('.overlay').show();

        if (modal.find('.tab').length > 0) {
            tabWidth();
        }
    });

    // tab
    $('.tab .item').on('click',function(){
        let thisName = $(this).attr('data-name');

        $('.tab .item').removeClass('active');
        $('.tab-content').removeClass('active');

        $(this).addClass('active');
        $('#' + thisName).addClass('active');

        const index = $(this).index(); // 클릭된 탭의 인덱스
        setActiveTab(index);
    });

    // overlay,close버튼들 클릭 시 data-name과 동일한 id의 요소를 close
    $('.overlay, .side-close, .modal-close').on('click',function(){
        let thisName = $(this).attr('data-name');
        $('#' + thisName).removeClass('open');
    });

    // menu-item 클릭시 메뉴 열림
    $('#sideMenu').on('click','.menu-item',function(){
        $(this).parents('aside').addClass('open');
        $(this).parents('aside').children('.overlay').show();
    });

    // btn-close 클릭시 해당요소의 data-name과 같은 id의 요소에 open클래스를 제거함
    $('.btn-close').on('click',function(){
        let thisName = $(this).attr('data-name');
        $('#' + thisName).removeClass('open');
    })

    // 메뉴 열렸을때 메뉴명을 클릭하면 하위메뉴가 열림(다른 메뉴는 닫힘)
    $('.side-menu').on('click','.menu-item', function(){
        const isActive = $(this).hasClass('active');
        $('.side-menu .menu-item').removeClass('active');
        $('.side-menu .menu-item .depth2 li').removeClass('active');

        if (!isActive) {
            $(this).addClass('active');
        }
    })

    // custom select
    $(document).on('click','.select', function (e) {
        e.stopPropagation();

        $('.select').not(this).removeClass('open').children('.option-list').slideUp();

        $(this).toggleClass('open');
        $(this).children('.option-list').slideToggle(50);
    });

    $(document).on('click', '.select .option-list .option', function (e) {
        e.stopPropagation();

        let selectText = $(this).text();
        let thisParents = $(this).parents('.select')
        let selectValue = $(this).attr('data-value');

        if ($(this).closest('.profile').length > 0) {
            return false;
        }

        thisParents.removeClass('open');
        thisParents.attr('data-value',selectValue);
        thisParents.children('.select-value').val(selectValue).trigger('change');
        $(this).parents('.option-list').slideUp(50);

        if ($(this).closest('.function-box').length > 0) {
            return false;
        }

        $(this).parents('.select').children('.label').text(selectText);
    });

    $(document).on('change','.select-value',function(){
        let currentVal = $(this).val();
        let activeOption = $(this).siblings('.option-list').children('.option')
        activeOption.removeClass('active');
        activeOption.addClass('active');

        $(this).siblings('.label').text(currentVal);
        $(this).parents('.select').attr('data-value',currentVal);
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


$(document).on('click', function (e) {
    // 셀렉트 영역이 아닌 다른 부분 클릭시 셀렉트 닫힘
    $('.select').removeClass('open');
    $('.option-list').slideUp(50);

    if ($(e.target).closest('.time-wrap').length) {
        return;
    }
    $('.time-select').fadeOut(150);
});