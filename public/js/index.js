let send = $("#send");
let santacard = $('#santacard');

santacard.hide();

send.on('click', function () {
    console.log("something");
    santacard.show(800);
    send.addClass("rainbow");
});