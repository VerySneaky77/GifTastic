const colStart = 1;
const colSize = 3;
const colMax = (12 / colSize);

var rowCount = 0;
var colCount = colStart;

var $currRow;

var topics = ["Mario", "Donkey Kong",
    "Luigi", "Samus", "Kirby",
    "Megaman", "Captain Falcon"
];

$(document).ready(function (e) {
    var $buttonStage = $("#button-stage");
    var $gifsStage = $("#gif-showcase");

    generateButtons();

    $(document).on("click", ".btn-secondary", function (e) {
        var searchTarget = $(this).val();
        console.log(searchTarget);
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=CFgWIxxF7zVwZz4l4CxarFlSJ7pG4dgj&q=" + searchTarget + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            spawnGifs(response.data);
        });
    });

    $(document).on("click", ".gif-image", function (e) {
        var state = $(this).attr("animation-state");
        var animURL = $(this).attr("anim-url");
        var stillURL = $(this).attr("still-url");

        if (state === "no") {
            $(this).attr("src", animURL);
            $(this).attr("animation-state", "yes");
        }
        else {
            $(this).attr("src", stillURL);
            $(this).attr("animation-state", "no");
        }
    })

    function generateButtons() {
        $buttonStage.empty();
        rowCount = 0;
        colCount = colMax;

        topics.forEach(function (item) {
            var $buttonBox = $("<div>");
            var $button = $("<button>");

            $buttonBox.addClass("col-3 button-col");
            $button.addClass("btn btn-secondary btn-block text-truncate");

            $button.attr("value", item);
            $button.text(item);

            if (colCount < colMax) {
                colCount++;
            }
            else {
                rowCount++;
                $currRow = $("<div>");
                $currRow.addClass("row button-row");
                $currRow.attr("id", "button-row-" + rowCount)

                colCount = colStart;
            }

            $buttonStage.append($currRow);
            $currRow.append($buttonBox);
            $buttonBox.append($button);
        });
    }

    function spawnGifs(results) {
        $gifsStage.empty();
        rowCount = 0;
        colCount = colMax;

        for (let i = 0; i < results.length; i++) {
            var $imageBox = $("<div>");
            var $image = $("<img>");

            $imageBox.addClass("col-3");
            $image.addClass("gif-image");
            $image.attr("alt", results[i].title);
            $image.attr("anim-url", results[i].images.fixed_height_small.url);
            $image.attr("still-url", results[i].images.fixed_height_small_still.url);
            $image.attr("animation-state", "no");
            $image.attr("src", results[i].images.fixed_height_small_still.url);

            if (colCount < colMax) {
                colCount++;
            }
            else {
                rowCount++;
                $currRow = $("<div>");
                $currRow.addClass("row");
                $currRow.attr("id", "gifs-row-" + rowCount)

                colCount = colStart;
            }

            $gifsStage.append($currRow);
            $currRow.prepend($imageBox);
            $imageBox.append($image);

            console.log($currRow);
        }
    }
});
