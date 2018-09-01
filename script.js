var submitButton = $("#submit");
var cityInput = $("#new-city");
var database = firebase.database();
var nightsInput = $("#nights-stayed");
var amountInput = $("#amount-spent");
var newCurrency = $("#current");
// var mysql = require("mysql");

// var keys = require("./keys");
// var fixerAPI = keys.fixer.api_key
// console.log("Fixer API Key" + process.env.fixer_api)

var queryURL = "http://data.fixer.io/api/latest?access_key=0ed6f6268b1ac17ca8a1695ff2c8c153";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
})

submitButton.on("click", function () {

    var newCity = cityInput.val();
    var nightsStayed = nightsInput.val();
    var amountSpent = amountInput.val();
    var currencyInput = newCurrency.val();


    database.ref().push({
        newCity,
        nightsStayed,
        amountSpent,
        currencyInput,
    });

});


var transactions = [];
database.ref().on("child_added", function (snapshot) {
    var data = snapshot.val();
    var spent = parseInt(data.amountSpent)
    var cash = data.currencyInput

    transactions.push(
        spent
    );

    $("#data-dump").append(
        `<tr>
        <td>${data.newCity}</td>
        <td>${data.nightsStayed}</td>
        <td class="amount-spent">${data.amountSpent}</td>
        <td class="currency-type">${data.currencyInput}</td>
    </tr>`
    );



    function myFunction(item) {
        function getSum(total, num) {
            return total + num;
        };
        outputTotal = transactions.reduce(getSum)
        console.log("Hm... " + outputTotal);
        $("#total-spent").html(outputTotal);
    };






    myFunction();




});

