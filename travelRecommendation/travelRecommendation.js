

let results = [];

async function getData(){
    response = await fetch('travel_recommendation_api.json');
    data = await response.json();
    console.log(data);
}

function search(){
    console.log('searching');
    const search_term = document.getElementById("search");
    console.log('searching term:', search_term.value);
    getData();
}

function reset(){
    console.log('reset');
    const search_term = document.getElementById("search");
    search_term.value = "";
}