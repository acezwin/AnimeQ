const api = "https://api.jikan.moe/v3";


//take userinput and uses api to retrieve the anime list (unsorted)
function searchAnime(){
    //user input selected
    var input = $("#animeID").val();
    //buttonevent
    var button = document.getElementById("searchButton");
    //api
    const settings = {
        "async": true,
        "crossDomain": true,
        //syntax works
        "url": `${api}/search/anime?q=${input}&page=1`,
        "method": "GET",
        "type": "anime",
    };
    //logging to see progress
    console.log(input);

    //progress + display result function called
    $.ajax(settings).done(function (response) {
        console.log(response);
        updateDom(response);
        console.log("logged");
        });
}

//same as searchAnime(), type = mange
function searchManga(){

    //TODO: needs a reference <> after html #input for manga 
    var input = $("#animeID").val();
    
    var button = document.getElementById("searchButton");

    const settings = {
        "async": true,
        "crossDomain": true,
        //syntax works
        "url": `${api}/search/manga?q=${input}&page=1`,
        "method": "GET",
        "type": "manga",
    };
    console.log(input);

    
    $.ajax(settings).done(function (response) {
        console.log(response);
        updateDom(response);
        console.log("logged");
        });
}

//displaying result 
function updateDom(data){

    const searchResults = document.getElementById('search-results');

    searchResults.innerHTML = data.results
        .map(anime=>{
            return `
            </div>
            <div class="card-content">
            <div class="card-title"> <br> <br>
                <b href="">.............................</b>
                ${anime.title}
            </div>
            <table>
                <td>...................................................</td>
                <td><img src="${anime.image_url}" width ="150" height="200"></td>
                <td>............</td>
                <div class="card-synopsis">
                    <td> ${anime.synopsis} <br>
                    <a href="${anime.url}"><br>Find out more</a></td>
                </div>
                <td>...................................................</td>
            </table>
            `
        }).join("");
    }

    //pulling top anime sorted by ranked 1-x
    function topAnime(){
        var settings = {
            "url": "https://api.jikan.moe/v3/top/anime/1/bypopularity",
            "method": "GET",
            "timeout": 0,
              "type": "anime",
              "page":1,
              "subtype": "upcoming",
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
            showTopAnime(response);
          });
    }
    //pulling top anime sorted by ranked 1-x

    function topManga(){
        var settings = {
            "url": "https://api.jikan.moe/v3/top/manga/1/bypopularity",
            "method": "GET",
            "timeout": 0,
              "type": "manga",
              "page":1,
              "subtype": "upcoming",
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
            showTopAnime(response);
          });
    }
    //display as previous functions
    function showTopAnime(data){
        const searchResults = document.getElementById('top-results');

        //card layouts from https://materializecss.com/cards.html but it makes it too big         
        searchResults.innerHTML = data.top
            .map(anime=>{
                return `
                <div class="card-content">
               <div class="card-title"> <br> <br>
                   <b href="">.............................</b>
                   ${anime.rank}. ${anime.title}
               </div>
               <table>
                   <td>...................................................</td>
                   <td><img src="${anime.image_url}" width ="150" height="200"></td>
                   <td>............</td>
                   <div class="card-synopsis">
                       <td> Members: ${anime.members}<br>Start Date: ${anime.start_date}<br>Type: ${anime.type}
                       <a href="${anime.url}"><br><br>Find out more</a></td>
                   </div>
                   <td>...................................................</td>
               </table>
       `
            }).join("");


        }