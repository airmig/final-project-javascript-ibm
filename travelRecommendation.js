

let cities = [];
let beaches = [];
let temples = [];
let all_data = []
let results = [];
const API_URL = 'travel_recommendation_api.json';
async function getData(search_term_value){
    let response;
    let data;
    if (all_data == 0){
        response = await fetch(API_URL);
        data = await response.json();
        if (cities.length == 0){
            for(let item in data.countries){
                for(let city in data.countries[item].cities){
                    data.countries[item].cities[city].term = '';
                    cities.push(data.countries[item].cities[city]);
                }
            }
        }

        if (beaches.length == 0){
            for(let item in data.beaches){
                data.beaches[item].term = 'beaches';
                beaches.push(data.beaches[item]);
            }
        }

        if (temples.length == 0){
            for(let item in data.temples){
                data.temples[item].term = 'temples';
                temples.push(data.temples[item]);
            }
        }

        all_data = all_data.concat(temples).concat(beaches).concat(cities);
    }
    results = all_data.filter(item=>
        item.description.toLowerCase().indexOf(search_term_value) >= 0 ||
        item.name.toLowerCase().indexOf(search_term_value) >= 0 ||
        item.term.toLowerCase().indexOf(search_term_value) >= 0
    )
    resultContainer = document.getElementById('results');
    resultContainer.innerHTML = '';
    if (results.length == 0){
        var nothing_found = document.createElement('p');
        nothing_found.textContent = 'No results found for ' + search_term_value ;
        resultContainer.appendChild(nothing_found);
    }
    else {
        let raw_html = '<h1>Search Results</h1>';
        for(item in results){
            console.log(item);
            const item_text = `<div class="card" style="width: 30rem;">
            <img src="${results[item].imageUrl}" class="card-img-top" alt="${results[item].name}">
            <div class="card-body">
              <h5 class="card-title">${results[item].name}</h5>
              <p class="card-text card-search">${results[item].description}</p>
              <a href="#" class="btn btn-primary">VISIT</a>
            </div>
          </div><br/>`;
            raw_html += item_text;
        }
        resultContainer.innerHTML = raw_html;
    }
    console.log('result', results);
}

function search(){
    console.log('searching');
    const search_term = document.getElementById("search");
    const search_term_value = search_term.value.toLowerCase();
    console.log('searching term:', search_term.value);
    getData(search_term_value);
}

function reset(){
    console.log('reset');
    const search_term = document.getElementById("search");
    search_term.value = '';
    resultContainer = document.getElementById('results');
    resultContainer.innerHTML = '';
}