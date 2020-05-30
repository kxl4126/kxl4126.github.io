





var cookie = getCookie('savedPeople')
var savedPeople;
if (cookie) {
    savedPeople = JSON.parse(cookie)
}
else {
    console.log("you dont have anyone saved")
}
var mostRecentUsers = savedPeople;
console.log(savedPeople)

const iconSources = {
    'GitHub' : 'https://cdn.iconscout.com/icon/free/png-512/github-153-675523.png',
    'LinkedIn' : 'https://image.flaticon.com/icons/png/512/61/61109.png',
    'Website': 'https://cdn4.iconfinder.com/data/icons/software-line/32/software-line-02-512.png',
    'Resume': 'https://static.thenounproject.com/png/202530-200.png',
    'email': 'envelope.png',
}


createCards()










function createCards() {
    $('#cards').empty();
    console.log('create cards Called!')
    var cards = document.getElementById("cards");

        if (mostRecentUsers) {

            mostRecentUsers.forEach((item, index) => {
                var card = document.createElement("div");
                card.setAttribute("class", "card");

                var name = document.createElement("div");
                name.innerHTML = item["firstName"] + " " + item["lastName"];
                name.setAttribute("class", "employee-names");
                card.appendChild(name);


                var prevJob;
                if (item['lastJob']) {
                    prevJob = document.createElement("div");
                    prevJob.innerHTML = "Previous Position: " + item["lastJob"]['company'] + ", " + item["lastJob"]['position'];
                    prevJob.setAttribute("class", "employee-prev-jobs");
                    card.appendChild(prevJob);
                }

                if (item['category']) {
                    var category = document.createElement("span");
                    category.innerHTML = '(' + item["category"] + ')';
                    category.setAttribute("class", "employee-category");


                    if (item['lastJob']) {
                        category.innerHTML = ' (' + item["category"] + ')';
                        prevJob.appendChild(category);
                    }
                    else {
                        card.appendChild(category);
                    }
                }

                if (item['searchingPosition']) {
                    var searchingPosition = document.createElement("div");
                    searchingPosition.innerHTML = "Looking for: " + item["searchingPosition"]['name'] + ', ' + item["searchingPosition"]['duration'];
                    searchingPosition.setAttribute("class", "employee-searching-position");
                    card.appendChild(searchingPosition);
                }

                if (item['college']) {
                    var education = document.createElement("div");
                    education.innerHTML = item["college"]['name'] + ", " + item["college"]['degree'];
                    education.setAttribute("class", "employee-education");
                    card.appendChild(education);
                }

                var location;
                if(item['state']) {
                    location = document.createElement("div");
                    location.innerHTML = (item['city'] ? item['city'] + ', ' : '') + item["state"];
                    location.setAttribute("class", "employee-location");
                    card.appendChild(location);
                }

                if (item['relocation'] == 'true') {
                    var relocation = document.createElement("span");
                    relocation.innerHTML = '(Open to relocation)';
                    relocation.setAttribute("class", "employee-relocation");
                    if (item['state']) {
                        relocation.innerHTML = ' (Open to relocation)';
                        location.appendChild(relocation)
                    }
                    else {
                        card.appendChild(relocation);
                    }
                }

                // card.appendChild(document.createElement('br'))

                if (item['links']) {
                    item['links'].forEach((linkItem, index) => {
                        var link = document.createElement("div");

                        //put icon stuff here
                        var icon = document.createElement('img')
                        icon.setAttribute("src", iconSources[linkItem['name']]);
                        icon.setAttribute("class", 'icons');
                        link.append(icon)

                        var anchorTag =  document.createElement("a");
                        anchorTag.setAttribute("href", linkItem['link']);
                        anchorTag.innerHTML = linkItem['name'];
                        link.appendChild(anchorTag);

                        link.setAttribute("class", linkItem['name'] + "-link");
                        card.appendChild(link);
                    })
                }




                var email = document.createElement("div");
                var icon = document.createElement('img')
                email.setAttribute('class', 'email')
                icon.setAttribute("src", iconSources['email']);
                icon.setAttribute("class", 'icons');
                email.append(icon)

                var emailText =  document.createElement("span");
                emailText.innerHTML = item['email'];
                email.appendChild(emailText);
                card.appendChild(email)

                var description = document.createElement("div");
                description.innerHTML = item['description'];
                description.setAttribute("class", "employee-description");
                card.appendChild(description);


                var bookmark = document.createElement("div");
                var bookmarkImg = document.createElement('img')
                var savedText =  document.createElement('span')
                if (savedPeople.filter(person => person['_id'] == item['_id']).length == 0) {
                    savedText.innerHTML = 'Save to list'
                    bookmarkImg.setAttribute('src', 'bookmark.png')
                    bookmark.style.backgroundColor = 'white'
                    bookmark.style.color = 'black'
                    bookmark.style.border = '0.1em solid black'
                }
                else {
                    savedText.innerHTML = 'Saved'
                    bookmarkImg.setAttribute('src', 'bookmark-white.png')
                    bookmark.style.backgroundColor = 'black'
                    bookmark.style.color = 'white'
                    bookmark.style.border = '0.1em solid black'
                }
                bookmark.appendChild(bookmarkImg)
                bookmark.appendChild(savedText)
                bookmark.setAttribute('class', 'bookmark')
                bookmark.style.borderRadius = '2em'
                bookmark.id = index;
                card.append(bookmark)

                // $('.bookmark').click( function() {
                //     console.log("BOOKMARK CLICKED")
                //     if (savedPeople.filter(person => person['_id'] == item['_id']).length == 0) {
                //         savedPeople.push(item)
                //         savedText.innerHTML = 'Saved'
                //         bookmarkImg.setAttribute('src', 'bookmark-white.png')
                //         bookmark.style.backgroundColor = 'black'
                //         bookmark.style.color = 'white'
                //         bookmark.style.border = '0.1em solid black'
                //     }
                //     else {
                //         savedPeople = savedPeople.filter(person => person['_id'] != item['_id'])
                //         savedText.innerHTML = 'Save to list'
                //         bookmarkImg.setAttribute('src', 'bookmark.png')
                //         bookmark.style.backgroundColor = 'white'
                //         bookmark.style.color = 'black'
                //         bookmark.style.border = '0.1em solid black'
                //     }
                //     createCookie('savedPeople', JSON.stringify(savedPeople), 10000);
                // })



                cards.appendChild(card);
            })
        }
        $('.bookmark').click( function() {
                    console.log("BOOKMARK CLICKED")
                    if ($(this).attr('id') > mostRecentUsers.length) {
                        return false;
                    }

                    var item = mostRecentUsers[$(this).attr('id')]
                    var bookmark = document.getElementById($(this).attr('id'))
                    var savedText = document.getElementById($(this).attr('id')).getElementsByTagName('span')[0]
                    var bookmarkImg = document.getElementById($(this).attr('id')).getElementsByTagName('img')[0]
                    if (savedPeople.filter(person => person['_id'] == item['_id']).length == 0) {
                        savedPeople.push(item)
                        savedText.innerHTML = 'Saved'
                        bookmarkImg.setAttribute('src', 'bookmark-white.png')
                        bookmark.style.backgroundColor = 'black'
                        bookmark.style.color = 'white'
                        bookmark.style.border = '0.1em solid black'
                    }
                    else {
                        savedPeople = savedPeople.filter(person => person['_id'] != item['_id'])
                        savedText.innerHTML = 'Save to list'
                        bookmarkImg.setAttribute('src', 'bookmark.png')
                        bookmark.style.backgroundColor = 'white'
                        bookmark.style.color = 'black'
                        bookmark.style.border = '0.1em solid black'
                    }
                    createCookie('savedPeople', JSON.stringify(savedPeople), 10000);
                })
}



function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}