document.addEventListener('DOMContentLoaded', (event) => {
    var countDownDate = new Date("Aug 1, 2019 00:00:00").getTime();
    if (localStorage.getItem("current")) {
        document.getElementById("demo").innerHTML = localStorage.getItem("current");
    }
    var x = setInterval(function() {
        
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
        document.getElementById("demo").innerHTML = current;
        
        localStorage.setItem("current", current);

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);
    
});