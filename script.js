var submitButton = $("#submit");
var cityInput = $("#new-city");
var database = firebase.database();
var nightsInput = $("#nights-stayed");

submitButton.on("click", function () {

    var newCity = cityInput.val();
    var nightsStayed = nightsInput.val();
    database.ref().push({
        newCity,
        nightsStayed,
    });

});

database.ref().on("child_added", function (snapshot) {
    var data = snapshot.val();




    $("#data-dump").append(
        `<tr>
        <td>${data.newCity}</td>
        <td>${data.nightsStayed}</td>
    <tr>`
    )
});