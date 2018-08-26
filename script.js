var submitButton = $("#submit");
var cityInput = $("#new-city");
var database = firebase.database();
var nightsInput = $("#nights-stayed");
var amountInput = $("#amount-spent");





submitButton.on("click", function () {

    var newCity = cityInput.val();
    var nightsStayed = nightsInput.val();
    var amountSpent = amountInput.val();
    function getselectedCurrency() {
        var newCurrency = $("#current").val();
        currencyInput = newCurrency
    };
    getselectedCurrency();

    database.ref().push({
        newCity,
        nightsStayed,
        amountSpent,
        currencyInput,
    });

});

database.ref().on("child_added", function (snapshot) {
    var data = snapshot.val();

    $("#data-dump").append(
        `<tr>
        <td>${data.newCity}</td>
        <td>${data.nightsStayed}</td>
        <td>${data.amountSpent}</td>
        <td>${data.currencyInput}</td>
    <tr>`
    )
});