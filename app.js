//get list of options for each criteria
//https://talent-backend.herokuapp.com/user/criteria

const redirect_uri = 'https://kxl4126.github.io';
const redirect_uri_encoded = 'https%3A%2F%2Fkxl4126.github.io';
const client_id = '860zh5czatlpnt';
const client_secret = 'KoYtnFvlSAHaSNWO';

const authUrl = "https://talent-backend.herokuapp.com/auth/linkedin"

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const gen_code = urlParams.get('code');
if (gen_code) { //authenticate user and pass to backend

    console.log("Code2: " + gen_code);

    // $.post(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code="${gen_code}"&redirect_uri=${redirect_uri_encoded}&client_id=${client_id}&client_secret=${client_secret}`,
    //   {
    //   },
    //   function(data, status){
    //     alert("Data: " + data + "\nStatus: " + status);
    // });

    $.ajax({
    url: 'https://www.linkedin.com/oauth/v2/accessToken',
    type: 'post',
    data: {
        grant_type: 'authorization_code',
        code: gen_code,
        redirect_uri: 'https://kxl4126.github.io',
        client_id: '860zh5czatlpnt',
        client_secret: 'KoYtnFvlSAHaSNWO',
    },
    headers: {
        contentType: 'x-www-form-urlencoded'
    },
    dataType: 'json',
    success: function (data) {
        console.log(data);
    },
})
        .done((data) => {
            console.log(data);
        });

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

        select = document.getElementById("companies-select")

        if (criteria['locations']) {
            criteria['locations'].forEach((item, index) => {
                var option = document.createElement("option");
                option.text = item;
                option.value = item;
                select.appendChild(option);
            })
        }

    });

var mostRecentUsers = [];

function createCards() {
    $('#cards').empty();
    console.log('create cards Called!')
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
}

$.post("https://talent-backend.herokuapp.com/user", function(data, status){
    // alert("Data: " + data["schools"] + "\nStatus: " + status);
    mostRecentUsers = data['users'];
    console.log(mostRecentUsers);
})
    .done(() => {
        createCards();
    });

var searchFields = document.getElementsByClassName("search-input");
console.log(searchFields)
const idToParam = {
    'college-search': 'collegeName',
    'company-search': 'lastCompanyName',
    'category-search': 'category',
    'location-search': 'location'
}

$('.search-input').change(() => {
    console.log("CHANGE")
    var paramDict = {};
    Array.from(searchFields).forEach((item, index) => {
        if (item.value) {
            paramDict[idToParam[item.id]] = item.value;
        }
    })
    // paramDict['collegeName'] = 'Stanford';
    console.log(paramDict);
    $.ajax('https://talent-backend.herokuapp.com/user',
        {
            type: 'POST',
            data: JSON.stringify(paramDict),
            contentType: 'application/json',
            success:
    // $.get('https://talent-backend.herokuapp.com/user', paramDict,
        function(data, status) {
            console.log(data);
            mostRecentUsers = data['users'];
            console.log(mostRecentUsers);
            createCards();
    }});
});

