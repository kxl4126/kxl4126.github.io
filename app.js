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
const gen_code = urlParams.get('_ijt');
console.log("firstName: " + urlParams);
console.log("color: " + urlParams.get('color'));
var currPage = 1;
var criteria = {};

var paginationItems;

$.ajax({url: "https://talent-backend.herokuapp.com/user/criteria",
        type: "GET",
        // contentType: 'application/json',
        // xhrFields: {
        //      withCredentials: true
        // },
        success: function(data, status) {
            // alert("Data: " + data["schools"] + "\nStatus: " + status);
            criteria['colleges'] = data["schools"];
            criteria['companies'] = data['companies'];
            criteria['authenticated'] = data['authenticated'];
            console.log(data);
            // }})
            // .done(() => {
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

            select = document.getElementById("locations-select")

            if (criteria['locations']) {
                criteria['locations'].forEach((item, index) => {
                    var option = document.createElement("option");
                    option.text = item;
                    option.value = item;
                    select.appendChild(option);
                })
            }

            //add linkedin/edit profile button

            console.log('authenticated:' + criteria['authenticated']);
            if (criteria['authenticated']) {
                var linkedinBtn = document.getElementById('linkedin-btn');
                // linkedinBtn.style.display = 'inline';
            } else {
                var editButton = document.getElementById('edit-btn');
                editButton.style.display = 'inline';
            }


            // var div = document.getElementById("college-div");
            // var select = document.getElementById("colleges-select")
            // if (select) {
            //     console.log("REMOVED");
            //     div.removeChild(select);
            // }
            // if (criteria['colleges']) {
            //     var newSelect = document.createElement('span');
            //     newSelect.className = 'input-dropdown';
            //     newSelect.id = 'colleges-select';
            //     criteria['colleges'].forEach((item, index) => {
            //         console.log(item);
            //         var option = document.createElement("input");
            //         option.type = 'radio';
            //         // option.name = 'sortType';
            //         option.text = item;
            //         option.value = item;
            //         option.className = 'criteria-option';
            //         option.id = item;
            //         newSelect.appendChild(option);
            //         var label = document.createElement('label');
            //         label.htmlFor = item;
            //         label.innerText = item;
            //         newSelect.append(label);
            //
            //     })
            //     div.appendChild(newSelect);
            //     console.log(newSelect);
            // }
            // console.log(document.getElementsByClassName("criteria-option"));
            // console.log(div)

        }});

var mostRecentUsers = [];
const PEOPLE_PER_PAGE = 50;
var numPages = -1;
var savedPeople = getCookie('savedPeople')
if (!savedPeople) {
    savedPeople = []
}
else {
    savedPeople = JSON.parse(savedPeople)
}
const iconSources = {
    'GitHub' : 'https://cdn.iconscout.com/icon/free/png-512/github-153-675523.png',
    'LinkedIn' : 'https://image.flaticon.com/icons/png/512/61/61109.png',
    'Website': 'https://cdn4.iconfinder.com/data/icons/software-line/32/software-line-02-512.png',
    'Resume': 'https://static.thenounproject.com/png/202530-200.png',
    'email': 'envelope.png',
}

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

$.post("https://talent-backend.herokuapp.com/user", function(data, status){
    // alert("Data: " + data["schools"] + "\nStatus: " + status);
    mostRecentUsers = data['users'];
    // console.log("count" + data['count'])
    numPages = Math.ceil(data['count']/PEOPLE_PER_PAGE);
    console.log("numPages: " + numPages)
    console.log(mostRecentUsers);
    document.getElementById('load-spinner').style.display = 'flex'
})
    .done(() => {

        document.getElementById('load-spinner').style.display = 'none'
        createCards();
        renderPagination();
    });

var searchFields = document.getElementsByClassName("search-input");
console.log(searchFields)
const idToParam = {
    'colleges-select': 'collegeName',
    'companies-select': 'lastCompanyName',
    'categories-select': 'category',
    'locations-select': 'location'
}

const defaultValues = {
    'colleges-select': 'All colleges',
    'companies-select': 'All companies',
    'categories-select': 'All categories',
    'locations-select': 'All locations'
}

$('.search-input').change(() => {
    currPage = 1;
    console.log("CHANGE")
    // console.log("FSAFAFA" + $(this));
    var paramDict = {};
    Array.from(searchFields).forEach((item, index) => {
        // console.log("FSAFAFAF");
        console.log(item.id);
        if (item.value && item.value != defaultValues[item.id]) {
            paramDict[idToParam[item.id]] = item.value;
        }
        document.getElementById('load-spinner').style.display = 'flex'
    })
    console.log(paramDict);
    $.ajax('https://talent-backend.herokuapp.com/user',
        {
            type: 'POST',
            data: JSON.stringify(paramDict),
            // dataType: 'json',
            contentType: 'application/json',
            success:
    // $.get('https://talent-backend.herokuapp.com/user', paramDict,
        function(data, status) {
            document.getElementById('load-spinner').style.display = 'none'
            console.log(data);
            mostRecentUsers = data['users'];
            numPages = Math.ceil(data['count']/PEOPLE_PER_PAGE);
            console.log(mostRecentUsers);
            createCards();
            renderPagination();
    }});
});

// console.log($(".test-link"));
// $("a.test-link").on('click', (e) => {
//     console.log($(this));
// });








$('.input-dropdown').click(function(e) {
  e.preventDefault();
  e.stopPropagation();
  $(this).toggleClass('expanded');
  $('#'+$(e.target).attr('for')).prop('checked',true);
});
$(document).click(function() {
  $('.input-dropdown').removeClass('expanded');
});





// let pages = numPages;

function renderPagination() {
    console.log("NUM PAGES: " + numPages);
    document.getElementById('pagination').innerHTML = createPagination(numPages, currPage);
    paginationItems = $(".pagination-item");

    paginationItems.click(function () {
        document.getElementById('load-spinner').style.display = 'flex'
        var paramDict = {};
        Array.from(searchFields).forEach((item, index) => {
            console.log(item.id);
            if (item.value && item.value != defaultValues[item.id]) {
                paramDict[idToParam[item.id]] = item.value;
            }
        })
        console.log("this object:" );
        console.log($(this));
        var paginationText = $(this).text();
        var paginationId = $(this).attr('id')
        if (paginationText == 'Next') {
            currPage += 1;
        }
        else if (paginationText == 'Previous') {
            currPage -= 1;
        }
        else if (paginationId) {
            console.log("pagination ID: " + paginationId    );
            if (paginationId == 'out-of-range-less') {
                currPage -= 2;
            }
            else if (paginationId == 'out-of-range-greater') {
                currPage += 2;
            }
        }
        else {
            currPage = parseInt(paginationText);
        }
        paramDict['skip'] = (currPage - 1) * PEOPLE_PER_PAGE;
        // currPage = parseInt($(this).text())
        console.log("paramDict: ");
        console.log(paramDict);

        // Array.from(paginationItems).forEach((item, index) => {
        //     if (item.className == 'active'
        // });
    $.ajax('https://talent-backend.herokuapp.com/user',
        {
            type: 'POST',
            data: JSON.stringify(paramDict),
            // dataType: 'json',
            contentType: 'application/json',
            success:
            // $.get('https://talent-backend.herokuapp.com/user', paramDict,
                function (data, status) {
                    document.getElementById('load-spinner').style.display = 'none'
                    console.log(data);
                    mostRecentUsers = data['users'];
                    numPages = Math.ceil(data['count'] / PEOPLE_PER_PAGE);
                    console.log(mostRecentUsers);
                    createCards();
                    renderPagination();
                }
        });

});
}



function createPagination(pages, page) {
  let str = '<ul>';
  let active;
  let pageCutLow = page - 1;
  let pageCutHigh = page + 1;
  console.log("CURR PAGE: " + page);
  // Show the Previous button only if you are on a page other than the first
  // if (page > 1) {
  //   str += '<li class="page-item previous no"><a class = "pagination-item" onclick="createPagination(numPages, '+(page-1)+')">Previous</a></li>';
  // }
  // Show all the pagination elements if there are less than 6 pages total
  if (pages < 6) {
    for (let p = 1; p <= pages; p++) {
      active = page == p ? "active" : "no";
      str += '<li class="'+active+'"><a class = "pagination-item" onclick="createPagination(numPages, '+p+')">'+ p +'</a></li>';
    }
  }
  // Use "..." to collapse pages outside of a certain range
  else {
    // Show the very first page followed by a "..." at the beginning of the
    // pagination section (after the Previous button)
    if (page > 2) {
      str += '<li class="no page-item"><a class = "pagination-item" onclick="createPagination(numPages, 1)">1</a></li>';
      if (page > 3) {
          str += '<li class="out-of-range" ><a class = "pagination-item" id = "out-of-range-less" onclick="createPagination(numPages,'+(page-2)+')">...</a></li>';
      }
    }
    // Determine how many pages to show after the current page index
    if (page === 1) {
      pageCutHigh += 2;
    } else if (page === 2) {
      pageCutHigh += 1;
    }
    // Determine how many pages to show before the current page index
    if (page === pages) {
      pageCutLow -= 2;
    } else if (page === pages-1) {
      pageCutLow -= 1;
    }
    // Output the indexes for pages that fall inside the range of pageCutLow
    // and pageCutHigh
    for (let p = pageCutLow; p <= pageCutHigh; p++) {
      if (p === 0) {
        p += 1;
      }
      if (p > pages) {
        continue
      }
      active = page == p ? "active" : "no";
      str += '<li class="page-item '+active+'"><a class = "pagination-item" onclick="createPagination(numPages, '+p+')">'+ p +'</a></li>';
    }
    // Show the very last page preceded by a "..." at the end of the pagination
    // section (before the Next button)
    if (page < pages-1) {
      if (page < pages-2) {
        str += '<li class="out-of-range" ><a class = "pagination-item" id = "out-of-range-greater" onclick="createPagination(numPages,'+(page+2)+')">...</a></li>';
      }
      str += '<li class="page-item no"><a class = "pagination-item" onclick="createPagination(numPages, numPages)">'+pages+'</a></li>';
    }
  }
  // Show the Next button only if you are on a page other than the last
  // if (page < pages) {
  //   str += '<li class="page-item next no"><a class = "pagination-item" onclick="createPagination(numPages, '+(page+1)+')">Next</a></li>';
  // }
  str += '</ul>';
  // Return the pagination string to be outputted in the pug templates
  document.getElementById('pagination').innerHTML = str;
  return str;
}









// // DEBOUNCE HELPER
//
// const debounce = (callback, time) => {
//     let timeout;
//
//     return function(...args) {
//         const fnCall = () => callback.apply(this, args);
//         clearTimeout(timeout);
//         timeout = setTimeout(fnCall, time);
//     };
// };
//
//
// /**
//  * Pagination
//  *
//  * @component
//  * @example
//  * {
//  *   data: {
//  *     page: 4,
//  *   },
//  *   template: `
//  *     <app-pagination :length="24" :total-visible="7" v-model="page">
//  *       <template #prev-icon>
//  *         <i class="fa fa-chevron-left"></i>
//  *       </template>
//  *       <template #next-icon>
//  *         <i class="fa fa-chevron-right"></i>
//  *       </template>
//  *     </app-pagination>
//  *   `,
//  * }
//  */
// const AppPagination = {
//     name: 'app-pagination',
//     props: {
//         // v-model value
//         value: {
//             type: Number,
//             required: true,
//         },
//         length: {
//             type: Number,
//             default: 0,
//             validator: (val) => val % 1 === 0,
//         },
//         // when number of page buttons exceeds the parent container,
//         // it will truncate the buttons automatically
//         totalVisible: Number,
//         disabled: Boolean,
//     },
//
//     data: () => ({
//         maxButtons: 0,
//     }),
//
//     computed: {
//         isValueLast() {
//             return this.value >= this.length;
//         },
//
//         isValueFirst() {
//             return this.value <= 1;
//         },
//
//         items() {
//             console.log("mostrecentusers length: " + mostRecentUsers.length);
//             const maxLength = this.totalVisible > this.maxButtons
//                 ? this.maxButtons
//                 : this.totalVisible || this.maxButtons;
//
//             if (this.length <= maxLength || maxLength < 1) {
//                 return this.getRange(1, this.length);
//             }
//
//             const even = maxLength % 2 === 0 ? 1 : 0;
//             const left = Math.floor(maxLength / 2);
//             const right = this.length - left + 1 + even;
//
//             if (this.value > left && this.value < right) {
//                 const start = this.value - left + 2;
//                 const end = this.value + left - 2 - even;
//
//                 return [1, '...', ...this.getRange(start, end), '...', this.length];
//             }
//             else if (this.value === left) {
//                 const end = this.value + left - 1 - even;
//
//                 return [...this.getRange(1, end), '...', this.length];
//             }
//             else if (this.value === right) {
//                 const start = this.value - left + 1;
//
//                 return [1, '...', ...this.getRange(start, this.length)];
//             }
//             else {
//                 return [...this.getRange(1, left), '...', ...this.getRange(right, this.length)];
//             }
//         },
//     },
//
//     mounted() {
//         this.setMaxButtons();
//
//         window.addEventListener('resize', this.debouncedOnResize);
//     },
//
//     beforeDestory() {
//         window.removeEventListener('resize', this.debouncedOnResize);
//     },
//
//     methods: {
//         goNext(e) {
//             e.preventDefault();
//             this.$emit('input', this.value + 1);
//             this.$emit('next');
//         },
//
//         goPrevious(e) {
//             e.preventDefault();
//             this.$emit('input', this.value - 1);
//             this.$emit('previous');
//         },
//
//         getRange(from, to) {
//             const range = [];
//
//             from = from > 0 ? from : 1;
//
//             for (let i = from; i <= to; i++) {
//                 range.push(i);
//             }
//
//             return range;
//         },
//
//         setMaxButtons() {
//             const containerWidth = this.$el && this.$el.parentElement
//                 ? this.$el.parentElement.clientWidth
//                 : window.innerWidth;
//
//             const navButton = this.$refs.navNext.getBoundingClientRect();
//
//             // const containerWidth = navButton.width * 2;
//
//             // width of the items considering navItem.height = item.width
//             const itemWidth = navButton.height;
//             const navItemsWidth = navButton.width * 2;
//
//             this.maxButtons = Math.floor(
//                 (containerWidth - navItemsWidth) / itemWidth
//             );
//         },
//
//         debouncedOnResize: debounce(function() {
//             this.setMaxButtons();
//         }, 200),
//     },
//
//     template: `
//         <ul :class="['pagination', { disabled: disabled }]" id="pagination-list">
//             <li ref="navPrev">
//                 <button
//                     :class="['pagination-navigation', { disabled: isValueFirst }]"
//                     v-on="isValueFirst ? {} : { click: goPrevious }"
//                 >
//                     <slot name="prev-icon">$prev</slot>
//                 </button>
//             </li>
//
//             <li v-for="(item, index) in items" :key="'paging_' + index">
//                 <span
//                     v-if="isNaN(Number(item))"
//                     class="pagination-more"
//                 >{{ item }}</span>
//
//                 <button
//                     v-else
//                     type="button"
//                     :class="['pagination-item', { active: item === value }]"
//                     @click="$emit('input', item)"
//                 >{{ item }}</button>
//             </li>
//
//             <li ref="navNext">
//                 <button
//                     type="button"
//                     :class="['pagination-navigation', { disabled: isValueLast }]"
//                     v-on="isValueLast ? {} : { click: goNext }"
//                 >
//                     <slot name="next-icon">$next</slot>
//                 </button>
//             </li>
//         </ul>
//     `,
// };
//
// // new Vue({
// //         el: '#app',
// //         data: {
// //             page: 1,
// //             length: 20,
// //             totalVisible: 7,
// //             containerWidth: numPages > 7 ? 700 : numPages * 100, // for resizing example
// //         },
// //         watch: {
// //             containerWidth() {
// //                 // trigger pagination resize
// //                 this.$nextTick(() => {
// //                     window.dispatchEvent(new Event('resize'));
// //                 });
// //             },
// //         },
// //         components: {
// //             AppPagination,
// //         },
// //     });
//
// function renderPagination() {
//     // var elem = document.querySelector('#pagination-list');
//     // if (elem) {
//     //     elem.parentNode.removeChild(elem);
//     // }
//     // this.$forceUpdate();
//     new Vue({
//         el: '#app',
//         data: {
//             page: 1,
//             length: mostRecentUsers.length,
//             totalVisible: 7,
//             containerWidth: numPages > 7 ? 700 : numPages * 100, // for resizing example
//         },
//         watch: {
//             containerWidth() {
//                 // trigger pagination resize
//                 this.$nextTick(() => {
//                     window.dispatchEvent(new Event('resize'));
//                 });
//             },
//         },
//         components: {
//             AppPagination,
//         },
//     });
// }





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

