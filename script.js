const main = document.getElementById('main')
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3aa79bcaccfa3a15f30191a9baf734ad&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w500'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3aa79bcaccfa3a15f30191a9baf734ad&query="'

const search = document.getElementById('search')
getMovies(API_URL)

async function getMovies(url){
    // Send request to the endpoint and await is to stop 
    //execution until the promise is resolved.
    const res = await fetch(url) // fetch() will fetch the data
    const data = await res.json()
    //Convert the received data into json format
    //send the data to the showMovies function where it will be displayed
    showmovies(data.results)
}

function showmovies(movies){
    main.innerHTML = ''

    movies.forEach((movie) =>{
        const { title, poster_path , vote_average, overview } = movie
        //The above statement is Object destructuring , where the data from movies is assisgned to 
        //the variables
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = ` 
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movieinfo">
            <h3>${title}</h3>
            // Here to get the color on the rating we call function getClassbyRate
            <span class="${getclassbyrate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>`
    
    main.appendChild(movieEl)
    })

}

function getclassbyrate(vote)
{
    if(vote >= 8){
        return'green'
    }else if(vote >= 5 ){
        return 'orange'
    }
    else{
        return 'red'
    }
}



form.addEventListener('submit',(e) =>{
    e.preventDefault()
    //to prevent default form submission
    const searchterm = search.value
    if(searchterm ){
        getMovies(SEARCH_API + searchterm)
        search.value = ''
    }
    else
    {
        // window.location.href = "./index.html"
        window.location.reload()
    }

})

