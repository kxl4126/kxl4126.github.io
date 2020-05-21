//get list of options for each criteria
//https://talent-backend.herokuapp.com/user/criteria
var criteria = {};
$.get("https://talent-backend.herokuapp.com/user/criteria", function(data, status){
    // alert("Data: " + data["schools"] + "\nStatus: " + status);
    criteria['colleges'] = data["schools"];
    criteria['companies'] = data['companies'];
})
    .done(() => {
        console.log(criteria['colleges']);
        var select = document.getElementById("colleges-select")

        if (criteria['colleges']) {
            criteria['colleges'].forEach((item, index) => {
                var option = document.createElement("option");
                option.text = item;
                option.value = item;
                select.appendChild(option);
            })
        }

        var select = document.getElementById("companies-select")
        if (criteria['companies']) {
            criteria['companies'].forEach((item, index) => {
                var option = document.createElement("option");
                option.text = item;
                option.value = item;
                select.appendChild(option);
            })
        }
    });

var mostRecentUsers = {};

$.get("https://talent-backend.herokuapp.com/user", function(data, status){
    // alert("Data: " + data["schools"] + "\nStatus: " + status);
    mostRecentUsers = data;
    console.log(data);
})
    .done(() => { //create cards

        var cards = document.getElementById("cards");
        if (mostRecentUsers) {
            mostRecentUsers.forEach((item, index) => {
                var card = document.createElement("div");
                card.setAttribute("class", "card");
                var name = document.createElement("p");
                name.innerHTML = item["firstName"] + " " + item["lastName"];
                card.appendChild(name);
                cards.appendChild(card);
            })
        }
    });



