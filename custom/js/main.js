

(function(){
    var endTime = new Date(2019, 3, 10, 10, 0, 0, 0);
    var countDownInterval;

    function countDownUntilStartTime(){
        start =  new Date().getTime();
        end = endTime.getTime();
        if(end - start >= 0){
            var span = Math.floor((end - start)/1000);
            var days = Math.floor(span/3600/24);
            var hours = Math.floor((span - days*3600*24)/3600);
            var minutes = Math.floor((span - days*24*3600 - hours*3600) / 60);
            var seconds = span - days*24*3600 - hours*3600 - minutes*60;
            if(days === 0){
                $('.unit-time .day').parent('.unit-time').hide(0);
            } else {
                $('.unit-time .day').text(days).parent('.unit-time').show(0).text(days);
            }
            $('.unit-time .hour').text(hours);
            $('.unit-time .minute').text(minutes);
            $('.unit-time .second').text(seconds);
        } else {
            clearInterval(countDownInterval)
            location.assign(location.href.replace('time_not_start.html', 'test_online.html'))
        } 
    }


    if(location.href.indexOf('time_not_start.html') > -1){
        countDownInterval = setInterval(countDownUntilStartTime, 1000);
    }
    
})();

(function(){

    if(location.href.indexOf('test_online.html') > -1){

        $('#btnSubmit').click(function(){
            swal({
                title: "Bạn có chắc muốn kết thúc bài thi của minh không?",
                text: "",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willSubmit) => {
                if (willSubmit) {
                  swal("Bài thi đã được nộp", {
                    icon: "success",
                  });
                  setTimeout(function(){
                    location.assign(location.href.replace('test_online.html', 'finish_test.html'))
                  }, 2000);
                } 
              });
        })

        var timeLimitForTest = 60*90;
        var timeLimitTestCountDownInterval;
        toastr.options.timeout = "7000";

        function countDownTestOnline(){
            timeLimitForTest--;
            if(timeLimitForTest >= 0){
                if(timeLimitForTest == 60*5){
                    toastr.warning('Thí sinh lưu ý, thời gian làm bài còn 5 phút');
                    $('#btnSubmit').removeClass('btn-success').addClass('btn-danger');
                }
                var hour = Math.floor(timeLimitForTest/3600);
                var min = Math.floor((timeLimitForTest - hour*3600)/60);
                var sec = timeLimitForTest - hour*3600 - min*60;
                hour = hour > 10 ? hour : '0' + hour;  
                min = min > 10 ? min : '0' + min;  
                sec = sec > 10 ? sec : '0' + sec;  

                $('.unit-time .hour').text(hour);
                $('.unit-time .minute').text(min);
                $('.unit-time .second').text(sec);
            } else {
                clearInterval(timeLimitTestCountDownInterval)
                toastr.info('Hết thòi gian làm bài!!')
                setTimeout(function(){
                    location.assign(location.href.replace('test_online.html', 'finish_test.html'))
                }, 3000)
            }
        }

        timeLimitTestCountDownInterval = setInterval(countDownTestOnline, 1000);
    }
    
})();

$('.scrollTop').fadeOut(0);

$(() => {

    $('.scrollTop').click(() => {
        $('html, body').animate({ scrollTop: 0 }, 300);
    })

    $(window).scroll(() => {
        if($(window).scrollTop() > 400) $('.scrollTop').fadeIn();
        else $('.scrollTop').fadeOut();
    })

    $('.navbar a, header a').click(function(){
        let hash = $(this).attr('href');
        if(hash[0] === '#'){
            let pos = $(hash).offset().top;
            $('body, html').animate({ scrollTop: pos })
            location.hash = hash;
        }
    })

})