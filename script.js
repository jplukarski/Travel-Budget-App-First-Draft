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

/////////////////////////////////////////////////////////////////////////
/////////  Pushes new entry to Firebase  ////////////////////////////////
/////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
////////      Displaying data from Firebase     /////////////////////////
/////////////////////////////////////////////////////////////////////////


var totalinEuros = [];
function myFunction(item) {
    function getSum(total, num) {
        return total + num;
    };

    var currencyTotal = $("#total-currency").val();
    outputTotal = totalinEuros.reduce(getSum);

    if (currencyTotal === "EUR") {
        $("#total-spent").html(outputTotal);
    } else {
        var queryURL = "http://data.fixer.io/api/latest?access_key=0ed6f6268b1ac17ca8a1695ff2c8c153";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var convertedTotal = outputTotal / response.rates[currencyTotal];
            $("#total-spent").html(convertedTotal.toFixed(2));
        });


    }
};

database.ref().on("child_added", function (snapshot) {

    var data = snapshot.val();
    console.log(data)
    var spent = parseInt(data.amountSpent)
    var cash = data.currencyInput

    if (cash === "EUR") {
        totalinEuros.push(spent)
        myFunction();
    } else {
        var queryURL = "http://data.fixer.io/api/latest?access_key=0ed6f6268b1ac17ca8a1695ff2c8c153";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var convert = spent * response.rates[cash].toFixed(3);
            totalinEuros.push(convert);
            myFunction();
        });
    }

    $("#data-dump").append(
        `<tr>
        <td>${data.newCity}</td>
        <td>${data.nightsStayed}</td>
        <td class="amount-spent">${data.amountSpent}</td>
        <td class="currency-type">${data.currencyInput}</td>
    </tr>`
    );
});

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////





function getSum(total, num) {
    return total + num;
};
var a1 = [5, 1, 4, 4, 5, 1, 2, 5, 4, 1];
var a2 = [
    [3, 2, 6, 4, 5, 1, 2, 5, 4, 1],
    [5, 1, 4, 4, 5, 1, 2, 5, 4, 1],
    [4, 2, 6, 4, 5, 1, 2, 5, 4, 1]
];

var totalDifference = 0;
var diff = [];

for (index = 0; index < a2.length; index++) {
    for (i = 0; i < a1.length; i++) {

        diff.push(Math.abs(a1[i] - a2[index][i]));


    }
}

//
console.log("Difference between two arrays: " + a3.reduce(getSum))