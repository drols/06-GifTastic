var gifs = ["smh", "wtf", "doubt", "surprise"];

function renderGifs() {

    var giphyAPI = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphyAPI + "&api_key=FdchTceyQss2gwFLz7kOeCchi9gN9cA2&limit=10";

    $.ajax ({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var animatedGif = results[i].images.fixed_height.url;
            var pausedGif = results[i].images.fixed_height_still.url;

            if (results[i].rating !== "r") {
                var gifDisplayDiv = $('<div id="gif-window">');
                var gifRating = results[i].rating;
                var giphyGif = $("<img>");
                var p = $("<p>").text("This Gif is rated: " + gifRating);
                giphyGif.addClass("giphy-gif");
                giphyGif.attr("src", pausedGif);
                giphyGif.attr("gif-state", "paused-gif");
                giphyGif.attr("gif-state-paused", pausedGif);
                giphyGif.attr("gif-play", animatedGif);
                gifDisplayDiv.append(giphyGif);
                $("#appended-reactions").prepend(gifDisplayDiv);
            }
        }
    })
}

function renderButtons() {

    $("#render-gifs").empty();

    for (var i = 0; i < gifs.length; i++) {
        var gifButton = $("<button class='btn btn-secondary'>");
        gifButton.addClass("render-gif");
        gifButton.attr("data-name", gifs[i]);
        gifButton.text(gifs[i]);
        $("#render-gifs").append(gifButton);
    }
}

$("#add-reaction-btn").on("click", function (event) {
    event.preventDefault();

    var gif = $("#reaction-input").val().trim();
    gifs.push(gif);
    renderButtons();
    $("#reaction-input").val("");
});

$(document).on("click", ".render-gif", renderGifs);

function animateGifs() {
    var state = $(this).attr("gif-state");
    if (state === "paused-gif") {
        $(this).attr("src", $(this).attr("gif-play"));
        $(this).attr("gif-state", "gif-play");
    }
    else {
        $(this).attr("src", $(this).attr(".gif-state-paused"));
        $(this).attr("gif-state", "paused-gif")
    }
}

renderButtons();

$(document).on("click", ".giphy-gif", animateGifs);