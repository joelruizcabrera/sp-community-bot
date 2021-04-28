$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var correct = urlParams.get('correct');

    var alert = '<div class="login_alert alert alert-danger" role="alert">' +
                '  Login was incorrect. Please try again' +
                '</div>';

    if (correct === "false") {
        $("body").prepend(alert);
    }
})