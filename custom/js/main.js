$('.scrollTop').fadeOut(0);

var endTime = new Date(2019, 2, 30, 10, 0, 0, 0);

function countDown(){
    start =  new Date().getTime();
    end = endTime.getTime();
    if(end - start > 0){
        var span = end - start;
        span = Math.floor(span/1000);
        var days = Math.floor(span/3600/24);
        var hours = Math.floor((span - days*3600*24)/3600);
        var minutes = Math.floor((span - days*24*3600 - hours*3600) / 60);
        var seconds = span - - days*24*3600 - hours*3600 - minutes*60;
        if(days === 0){
            $('.unit-time .day').parent('.unit-time').hide(0);
            
        } else {
            $('.unit-time .day').text(days).parent('.unit-time').show(0).text(days);
        }
        $('.unit-time .hour').text(hours);
        $('.unit-time .minute').text(minutes);
        $('.unit-time .second').text(seconds);
    } else {
        $('.unit-time .hour').text('2');
        $('.unit-time .minute').text('20');
        $('.unit-time .second').text('30');
    } 
}

var countDownInterval = setInterval(countDown, 1000);

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