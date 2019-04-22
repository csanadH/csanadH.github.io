document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("demo").innerHTML = fetchCurrent();
    var x = setInterval(function() {
        document.getElementById("demo").innerHTML = fetchCurrent();
        
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);
});

fetchCurrent = function() {
    var countDownDate = new Date("Aug 1, 2019 00:00:00").getTime();

    var now = new Date().getTime();
            
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (hours.toString().length === 1) {
        hours = "0" + hours;
    }
    
    if (minutes.toString().length === 1) {
        minutes = "0" + minutes;
    }

    if (seconds.toString().length === 1) {
        seconds = "0" + seconds;
    }

    var current = days + " days<br>+<br>" + hours + ":" + minutes + ":" + seconds;
    return current;
}