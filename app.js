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

//     // $.post(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code="${gen_code}"&redirect_uri=${redirect_uri_encoded}&client_id=${client_id}&client_secret=${client_secret}`,
//     //   {
//     //   },
//     //   function(data, status){
//     //     alert("Data: " + data + "\nStatus: " + status);
//     // });
//
//     $.ajax({
//     url: 'https://www.linkedin.com/oauth/v2/accessToken',
//     type: 'post',
//     data: {
//         grant_type: 'authorization_code',
//         code: gen_code,
//         redirect_uri: 'https://kxl4126.github.io',
//         client_id: '860zh5czatlpnt',
//         client_secret: 'KoYtnFvlSAHaSNWO',
//     },
//     headers: {
//         contentType: 'x-www-form-urlencoded'
//     },
//     dataType: 'json',
//     success: function (data) {
//         console.log(data);
//     },
// })
//         .done((data) => {
//             console.log(data);
//         });

}

// var test = ['UT', 'Berkeley']
// var div = document.getElementById("college-div");
//         var select = document.getElementById("colleges-select")
//         if (select) {
//             console.log("REMOVED");
//             console.log(div.removeChild(select));
//         }
//         if (true) {
//             var newSelect = document.createElement('span');
//             newSelect.className = 'input-dropdown';
//             newSelect.id = 'colleges-select';
//             test.forEach((item, index) => {
//                 console.log(item);
//                 var option = document.createElement("input");
//                 option.type = 'radio';
//                 // option.name = 'sortType';
//                 option.text = item;
//                 option.value = item;
//                 option.className = 'criteria-option';
//                 option.id = item;
//                 newSelect.appendChild(option);
//                 var label = document.createElement('label');
//                 label.htmlFor = item;
//                 label.innerText = item;
//                 newSelect.append(label);
//
//             })
//             div.appendChild(newSelect);
//             console.log(newSelect);
//             $('college-div').hide().show(0);
//         }

var criteria = {};
$.get("https://talent-backend.herokuapp.com/user/criteria", function(data, status){
    // alert("Data: " + data["schools"] + "\nStatus: " + status);
    criteria['colleges'] = data["schools"];
    criteria['companies'] = data['companies'];
    criteria['authenticated'] = data['authenticated'];
    console.log(data);
})
    .done(() => {
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

        // console.log(criteria['authenticated']);
        // if (criteria['authenticated']) {
        //     var linkedinBtn = document.getElementById('linkedin-btn');
        //     linkedinBtn.style.display = 'inline';
        // }
        // else {
        //     var editButton = document.getElementById('edit-btn');
        //     editButton.style.display = 'inline';
        // }






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

    });

var mostRecentUsers = [];
const PEOPLE_PER_PAGE = 50;
var numPages = -1;

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
    numPages = Math.ceil(data['count']/PEOPLE_PER_PAGE);
    console.log(numPages)
    console.log(mostRecentUsers);
})
    .done(() => {
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
    console.log("CHANGE")
    // console.log("FSAFAFA" + $(this));
    var paramDict = {};
    Array.from(searchFields).forEach((item, index) => {
        // console.log("FSAFAFAF");
        console.log(item.id);
        if (item.value && item.value != defaultValues[item.id]) {
            paramDict[idToParam[item.id]] = item.value;
        }
    })
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
            numPages = Math.ceil(data['count']/25);
            console.log(mostRecentUsers);
            createCards();
            renderPagination();
    }});
});


$(".pagination-item").click(() => {

    var paramDict = {};
    Array.from(searchFields).forEach((item, index) => {
        if (item.value) {
            paramDict[idToParam[item.id]] = item.value;
        }
    })
    paramDict['skip'] = ($(this).val() - 1) * PEOPLE_PER_PAGE;
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
            numPages = Math.ceil(data['count']/25);
            console.log(mostRecentUsers);
            createCards();
            renderPagination();
    }});


});


$('.input-dropdown').click(function(e) {
  e.preventDefault();
  e.stopPropagation();
  $(this).toggleClass('expanded');
  $('#'+$(e.target).attr('for')).prop('checked',true);
});
$(document).click(function() {
  $('.input-dropdown').removeClass('expanded');
});
















// DEBOUNCE HELPER

const debounce = (callback, time) => {
    let timeout;

    return function(...args) {
        const fnCall = () => callback.apply(this, args);
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, time);
    };
};


/**
 * Pagination
 *
 * @component
 * @example
 * {
 *   data: {
 *     page: 4,
 *   },
 *   template: `
 *     <app-pagination :length="24" :total-visible="7" v-model="page">
 *       <template #prev-icon>
 *         <i class="fa fa-chevron-left"></i>
 *       </template>
 *       <template #next-icon>
 *         <i class="fa fa-chevron-right"></i>
 *       </template>
 *     </app-pagination>
 *   `,
 * }
 */
const AppPagination = {
    name: 'app-pagination',
    props: {
        // v-model value
        value: {
            type: Number,
            required: true,
        },
        length: {
            type: Number,
            default: 0,
            validator: (val) => val % 1 === 0,
        },
        // when number of page buttons exceeds the parent container,
        // it will truncate the buttons automatically
        totalVisible: Number,
        disabled: Boolean,
    },

    data: () => ({
        maxButtons: 0,
    }),

    computed: {
        isValueLast() {
            return this.value >= this.length;
        },

        isValueFirst() {
            return this.value <= 1;
        },

        items() {
            console.log("mostrecentusers length: " + mostRecentUsers.length);
            const maxLength = this.totalVisible > this.maxButtons
                ? this.maxButtons
                : this.totalVisible || this.maxButtons;

            if (this.length <= maxLength || maxLength < 1) {
                return this.getRange(1, this.length);
            }

            const even = maxLength % 2 === 0 ? 1 : 0;
            const left = Math.floor(maxLength / 2);
            const right = this.length - left + 1 + even;

            if (this.value > left && this.value < right) {
                const start = this.value - left + 2;
                const end = this.value + left - 2 - even;

                return [1, '...', ...this.getRange(start, end), '...', this.length];
            }
            else if (this.value === left) {
                const end = this.value + left - 1 - even;

                return [...this.getRange(1, end), '...', this.length];
            }
            else if (this.value === right) {
                const start = this.value - left + 1;

                return [1, '...', ...this.getRange(start, this.length)];
            }
            else {
                return [...this.getRange(1, left), '...', ...this.getRange(right, this.length)];
            }
        },
    },

    mounted() {
        this.setMaxButtons();

        window.addEventListener('resize', this.debouncedOnResize);
    },

    beforeDestory() {
        window.removeEventListener('resize', this.debouncedOnResize);
    },

    methods: {
        goNext(e) {
            e.preventDefault();
            this.$emit('input', this.value + 1);
            this.$emit('next');
        },

        goPrevious(e) {
            e.preventDefault();
            this.$emit('input', this.value - 1);
            this.$emit('previous');
        },

        getRange(from, to) {
            const range = [];

            from = from > 0 ? from : 1;

            for (let i = from; i <= to; i++) {
                range.push(i);
            }

            return range;
        },

        setMaxButtons() {
            const containerWidth = this.$el && this.$el.parentElement
                ? this.$el.parentElement.clientWidth
                : window.innerWidth;

            const navButton = this.$refs.navNext.getBoundingClientRect();

            // const containerWidth = navButton.width * 2;

            // width of the items considering navItem.height = item.width
            const itemWidth = navButton.height;
            const navItemsWidth = navButton.width * 2;

            this.maxButtons = Math.floor(
                (containerWidth - navItemsWidth) / itemWidth
            );
        },

        debouncedOnResize: debounce(function() {
            this.setMaxButtons();
        }, 200),
    },

    template: `
        <ul :class="['pagination', { disabled: disabled }]" id="pagination-list">
            <li ref="navPrev">
                <button
                    :class="['pagination-navigation', { disabled: isValueFirst }]"
                    v-on="isValueFirst ? {} : { click: goPrevious }"
                >
                    <slot name="prev-icon">$prev</slot>
                </button>
            </li>

            <li v-for="(item, index) in items" :key="'paging_' + index"> 
                <span
                    v-if="isNaN(Number(item))"
                    class="pagination-more"
                >{{ item }}</span>

                <button
                    v-else
                    type="button"
                    :class="['pagination-item', { active: item === value }]"
                    @click="$emit('input', item)"
                >{{ item }}</button>
            </li>

            <li ref="navNext">
                <button
                    type="button"
                    :class="['pagination-navigation', { disabled: isValueLast }]"
                    v-on="isValueLast ? {} : { click: goNext }"
                >
                    <slot name="next-icon">$next</slot>
                </button>
            </li>
        </ul>
    `,
};

// new Vue({
//         el: '#app',
//         data: {
//             page: 1,
//             length: 20,
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

function renderPagination() {
    // var elem = document.querySelector('#pagination-list');
    // if (elem) {
    //     elem.parentNode.removeChild(elem);
    // }
    // this.$forceUpdate();
    new Vue({
        el: '#app',
        data: {
            page: 1,
            length: mostRecentUsers.length,
            totalVisible: 7,
            containerWidth: numPages > 7 ? 700 : numPages * 100, // for resizing example
        },
        watch: {
            containerWidth() {
                // trigger pagination resize
                this.$nextTick(() => {
                    window.dispatchEvent(new Event('resize'));
                });
            },
        },
        components: {
            AppPagination,
        },
    });
}