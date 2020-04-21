var countDownDate = new Date(dl).getTime();
console.log(dl);
var x = setInterval(() => {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    if (distance < 0) { 
        clearInterval(x); 
        $("#progressBar").html('<div id="myProgress" ><div id="myBar"></div></div>'); 
        $("#thongdz").submit();
        move();
    } 
    else {
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        $("#days").text(days);
        $("#hours").text(hours);
        $("#minutes").text(minutes);
        $("#seconds").text(seconds);
    }
}, 1000);

var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } 
      else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}