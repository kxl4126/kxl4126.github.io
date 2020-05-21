//get list of options for each criteria
//https://talent-backend.herokuapp.com/user/criteria

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const code = urlParams.get('code');
if (code) { //authenticate user and pass to backend
    console.log("Code: " + code);
}

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

        select = document.getElementById("companies-select")
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
    mostRecentUsers = data['users'];
    console.log(mostRecentUsers);
})
    .done(() => { //create cards
        var cards = document.getElementById("cards");
        if (mostRecentUsers) {
            mostRecentUsers.forEach((item, index) => {
                var card = document.createElement("div");
                card.setAttribute("class", "card");

                var name = document.createElement("p");
                name.innerHTML = item["firstName"] + " " + item["lastName"];
                name.setAttribute("class", "employee-names");
                card.appendChild(name);

                var email = document.createElement("p");
                email.innerHTML = "Email" + ": " + item["email"];
                email.setAttribute("class", "employee-email");
                card.appendChild(email);

                if (item['college']) {
                    var education = document.createElement("p");
                    education.innerHTML = item["college"]['name'] + ", " + item["college"]['degree'];
                    education.setAttribute("class", "employee-education");
                    card.appendChild(education);
                }

                if (item['lastJob']) {
                    var prevJob = document.createElement("p");
                    prevJob.innerHTML = item["lastJob"]['company'] + ", " + item["lastJob"]['position'];
                    prevJob.setAttribute("class", "employee-prev-jobs");
                    card.appendChild(prevJob);
                }

                cards.appendChild(card);

            })
        }
    });



