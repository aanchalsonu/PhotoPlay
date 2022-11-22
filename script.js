const main = document.getElementById('main')
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3aa79bcaccfa3a15f30191a9baf734ad&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w500'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3aa79bcaccfa3a15f30191a9baf734ad&query="'
const open_btn = document.querySelector('.open-btn')
const close_btn = document.querySelector('.close-btn')
const nav = document.querySelectorAll('.nav')
const form = document.getElementById('form')
const search = document.getElementById('search')
getMovies(API_URL)

// open_btn.addEventListener('click', ()=>{
//     nav.forEach(nav_el => nav_el.classList.add('visible'))
// }
// )
// function search(query) {
//     if (query.slice(0, 7) == "http://") {
//       // window.location.href = query
//       window.open(query, '_blank');
//     } else {
//       // window.location.href = "https://www.google.com/search?q=" + query
//       debugger;
//       window.open("https://www.google.com/search?q=" + query, '_blank');
//     }
// }

// close_btn.addEventListener('click', ()=>{
//     nav.forEach(nav_el => nav_el.classList.remove('visible'))
// }
// )


async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()
    
    showmovies(data.results)
}

function showmovies(movies){
    main.innerHTML = ''

    movies.forEach((movie) =>{
        const { title, poster_path , vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = ` 
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movieinfo">
            <h3>${title}</h3>
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

