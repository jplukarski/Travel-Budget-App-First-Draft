var submitButton = $("#submit");
var cityInput = $("#new-city");
var database = firebase.database();
var nightsInput = $("#nights-stayed");
var amountInput = $("#amount-spent");


var mysql = require("mysql");


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

var transactions = []

database.ref().on("child_added", function (snapshot) {
    var data = snapshot.val();

    $("#data-dump").append(
        `<tr>
        <td>${data.newCity}</td>
        <td>${data.nightsStayed}</td>
        <td class="amount-spent">${data.amountSpent}</td>
        <td class="currency-type">${data.currencyInput}</td>
    </tr>`
    );
    var x = {};
    x[data.currencyInput] = data.amountSpent;
    transactions.push(x);
    // transactions.push(x[data.currencyInput] = data.amountSpent)
    // console.log();
});

