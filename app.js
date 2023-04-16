(async function () {
    const response = await fetch('./data.json');
    const movies = await response.json();

    const genreElem = document.getElementById('genre');
    const langElem = document.getElementById('language');
    const yearElem = document.getElementById('year');
    const ratingElem = document.getElementById('rating');
    const btnElem = document.getElementById('search');
    const tableElem = document.getElementById('tableBody')


    function show(toShow) {
        tableElem.innerHTML = "";
        let count = 1;
        toShow.forEach(movie => {

            const row = document.createElement('tr');

            const td1 = document.createElement('td');
            td1.textContent = movie.id;
            const td2 = document.createElement('td');
            duration = movie.runtime / 60;
            duration = duration.toFixed(2)
            td2.innerHTML = `
                    <div class="row">
                    <div class="col col-1 poster"> <img src="https://image.tmdb.org/t/p/w45${movie.poster_path}" alt="Movie Poster" class="poster"></div>
                    <div class="col align-self-center">
                    <div class="title"> ${movie.title}</div>
                    <div class="description"> <span class="certification"> ${movie.certification}</span> 
                    ${movie.genres}  .  ${duration.substring(0, 1)}h ${duration.substring(2, 3)}min</div>
                    </div>
                    </div>
                     
            `;
            const td3 = document.createElement('td');
            td3.textContent = movie.release_date.substring(0, 4);
            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);

            tableElem.appendChild(row);

        });
    }
    let copyMovies = [...movies]

    function search() {
        

        const genreQuery = genreElem.value;
        if (genreQuery == 'genreAll') {
            copyMovies = movies
            console.log(copyMovies);
        }
        else {
            let results = copyMovies.filter(function (movie) {
                return (movie.genres.includes(genreQuery))
            });
            copyMovies = results;
            console.log(copyMovies)
        }
 
        const yearQuery = yearElem.value;
        if (yearQuery == 'yearAll') {
            console.log(copyMovies);
        }
        else {
            let results2 = copyMovies.filter(function (movie) {
                return (movie.release_date.includes(yearQuery))
            });
            copyMovies = results2
            console.log(results2)
        }


        const langQuery = langElem.value;
        // console.log(langQuery)
        if (langQuery == 'languageAll') {
            console.log(copyMovies);
        }
        else {
            let results1 = copyMovies.filter(function (movie) {
                return (movie.original_language.includes(langQuery))
            });
            copyMovies = results1
            console.log(copyMovies)

        }


        const ratingQuery = ratingElem.value;
        if (ratingQuery == 'ratingAll') {
          console.log(copyMovies);
        } else {
          const results3 = copyMovies.filter(function(movie) {
            const rate = (movie.vote_average).toFixed(1);
            console.log(rate);
            return (rate.includes(ratingQuery));
          });
          console.log(results3);
        }




        show(copyMovies)

        copyMovies = [...movies]
    }




    btnElem.addEventListener("click", search);

})()
