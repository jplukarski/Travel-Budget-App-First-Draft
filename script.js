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
/////////       API Call       //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

var queryURL = "http://data.fixer.io/api/latest?access_key=0ed6f6268b1ac17ca8a1695ff2c8c153";
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {

    var xyz = "USD"
    console.log(response.rates[xyz]);
});
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////



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
////////      Displaying data from Firebase     ///////////////// ///////
/////////////////////////////////////////////////////////////////////////

var transactions = [];
var totalinEuros = [];

database.ref().on("child_added", function (snapshot) {
    var data = snapshot.val();
    var spent = parseInt(data.amountSpent)
    var cash = data.currencyInput

    transactions.push(
        {
            amountSpent: spent,
            currencyUsed: cash
        }
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
        console.log("Output total: " + JSON.stringify(outputTotal));
        $("#total-spent").html(outputTotal);
    };
    myFunction();

});

function addToEuroTotalArray() {
    for (i = 0; i < transactions.length; i++) {
        if (transactions[i].currencyUsed === "EUR") {
            totalinEuros.push(transactions[i].amountSpent);
        }
    }
};


console.log(totalinEuros);
console.log(transactions);

addToEuroTotalArray();
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


