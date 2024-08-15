 const apiKey = "a939f0da";

// Shared Module
const SharedModule = (function () {
  function fetchMovies(query, callback) {
    if (query.length > 2) {
      $.ajax({
        url: `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
        success: function (data) {
          if (data.Response === "True") {
            callback(data.Search);
            localStorage.setItem("query", query);
          } else {
            alert("Film Bulunamadı!");
          }
        },
      });
    }
  }

  return {
    fetchMovies,
  };
})();

const FavoritesModule = (function () {
  function renderFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const $favoritesList = $("#favorites-list").empty();

    if (favorites.length === 0) {
      $favoritesList.append(
        "<p class='no-records'>Favori Listenizde Kayıt Yok</p>"
      );
    } else {
      favorites.forEach((movie) => {
        const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
        const starIcon = isFavorite ? "★" : "☆";

        const movieCard = `
        <div class="movie-card">
   <div class="image-box">
       <img src="${movie.Poster}" width="200px" height="300px" alt="${
          movie.Title
        }">
       </div>
       <div class="content">
           <div class="head-area">  
               <h2 class="title">${movie.Title}</h2>
               <div class="head-sup">
                   <div class="rating">
                       <div class="star" data-id="${
                         movie.imdbID
                       }" data-movie='${JSON.stringify(
          movie
        )}'>${starIcon} </div>
                       <div>
                           <span class="rating-value">6.8</span>
                           <span class="rating-count">/10</span>
                       </div> 

                   </div>
                   <button class="watch-later" data-id="${
                     movie.imdbID
                   }">+</button>
               </div>
           </div>
       <div class="details">
           <div class="language"><span>Dil:</span><span> İngilizce </span>  </div>
           <div class="actors"><span> Oyuncular:</span> Jeff Bridges, Garrett Hedlund, Olivia Wilde | 
           <a href="#">Tüm listeyi gör 
            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20px" height="20px" viewBox="0 0 64.000000 78.000000" preserveAspectRatio="xMidYMid meet">
               <g transform="translate(0.000000,78.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
               <path d="M178 628 c49 -82 105 -184 105 -193 0 -9 -56 -111 -105 -192 l-20 -33 39 0 39 0 62 110 c34 60 62 112 62 115 0 3 -28 55 -62 115 l-62 110 -39 0 -39 0 20 -32z"/>
               <path d="M410 588 c22 -40 50 -92 62 -115 l21 -41 -58 -104 c-32 -56 -60 -106 -62 -110 -2 -5 13 -8 34 -8 38 0 38 0 97 107 33 58 59 112 59 118 0 6 -26 60 -59 118 l-59 107 -38 0 -39 0 42 -72z"/>
               </g>
               </svg>
           </a> 
          
       </div>
       </div>

       <div class="description">
          <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt   
           ut laoreet dolore magna aliquam erat volutpat. Ut wisi   
           enim ad... </p>
           <a href="#">Detaylar 
            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20px" height="20px" viewBox="0 0 64.000000 78.000000" preserveAspectRatio="xMidYMid meet">
               <g transform="translate(0.000000,78.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
               <path d="M178 628 c49 -82 105 -184 105 -193 0 -9 -56 -111 -105 -192 l-20 -33 39 0 39 0 62 110 c34 60 62 112 62 115 0 3 -28 55 -62 115 l-62 110 -39 0 -39 0 20 -32z"/>
               <path d="M410 588 c22 -40 50 -92 62 -115 l21 -41 -58 -104 c-32 -56 -60 -106 -62 -110 -2 -5 13 -8 34 -8 38 0 38 0 97 107 33 58 59 112 59 118 0 6 -26 60 -59 118 l-59 107 -38 0 -39 0 42 -72z"/>
               </g>
               </svg></a>
       </div>
   </div>
</div>
       `;
        $favoritesList.append(movieCard);
      });
    }
  }
  $("#openPopup").on("click", function () {
    $("#myPopup").removeClass("close");
    $("#myPopup").addClass("open");
    setTimeout(() => {
      $("#myPopup").show();
    }, 300);
    FavoritesModule.renderFavorites();  
  });

  $("#closePopup").on("click", function () {
    $("#myPopup").removeClass("open");
    $("#myPopup").addClass("close");
    setTimeout(() => {
      $("#myPopup").hide();
    }, 300);
  });

  $("#my-watch-list-button").on("click", function () {
    $("#watch-list-popup").removeClass("close");
    $("#watch-list-popup").addClass("open");
    setTimeout(() => {
      $("#watch-list-popup").show();
    }, 300);
    FavoritesModule.renderFavorites();  
  });

  $("#close-watch-list").on("click", function () {
    $("#watch-list-popup").removeClass("open");
    $("#watch-list-popup").addClass("close");
    setTimeout(() => {
      $("#watch-list-popup").hide();
    }, 300);
  });
  return {
    renderFavorites,
  };
})();

const MoviesModule = (function (SharedModule, FavoritesModule) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  function highlightQuery(text, query) {
     const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "gi");

     return text.replace(regex, "<strong>$1</strong>");
  }
  function renderMovies(movies, sliceElement) {
    const loadButton = `
    <div class="load-box">
        <button id="load-more">DAHA FAZLA SONUÇ
            <svg xmlns="http://www.w3.org/2000/svg" version="1.0"  width="24px" height="24px" viewBox="0 0 64.000000 78.000000" preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,78.000000) scale(0.100000,-0.100000)" fill="#349af9" stroke="none">
                    <path d="M178 628 c49 -82 105 -184 105 -193 0 -9 -56 -111 -105 -192 l-20 -33 39 0 39 0 62 110 c34 60 62 112 62 115 0 3 -28 55 -62 115 l-62 110 -39 0 -39 0 20 -32z"/>
                    <path d="M410 588 c22 -40 50 -92 62 -115 l21 -41 -58 -104 c-32 -56 -60 -106 -62 -110 -2 -5 13 -8 34 -8 38 0 38 0 97 107 33 58 59 112 59 118 0 6 -26 60 -59 118 l-59 107 -38 0 -39 0 42 -72z"/>
                    </g>
             </svg>
        </button>
    </div>`;

    $("#search-results").empty();
    (sliceElement ? movies.slice(0, sliceElement) : movies).forEach((movie) => {
      const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
      const starIcon = isFavorite ? "★" : "☆";
      const query = $("#movie-search").val();
      const title = highlightQuery(movie.Title, query);

      const movieCard = `
    <div class="movie-card">
    <div class="image-box">
        <img src="${movie.Poster}" width="200px" height="300px" alt="${
        movie.Title
      }">
        </div>
        <div class="content">
            <div class="head-area">  
                <h2 class="title">${title}</h2>
                <div class="head-sup">
                    <div class="rating">
                        <div class="star" data-id="${
                          movie.imdbID
                        }" data-movie='${JSON.stringify(
        movie
      )}'>${starIcon} </div>
                        <div>
                            <span class="rating-value">6.8</span>
                            <span class="rating-count">/10</span>
                        </div> 

                    </div>
                    <button class="watch-later" data-id="${
                      movie.imdbID
                    }">+</button>
                </div>
            </div>
        <div class="details">
            <div class="language"><span>Dil:</span><span> İngilizce </span>  </div>
            <div class="actors"><span> Oyuncular:</span> Jeff Bridges, Garrett Hedlund, Olivia Wilde | 
            <a href="#">Tüm listeyi gör 
             <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20px" height="20px" viewBox="0 0 64.000000 78.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,78.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M178 628 c49 -82 105 -184 105 -193 0 -9 -56 -111 -105 -192 l-20 -33 39 0 39 0 62 110 c34 60 62 112 62 115 0 3 -28 55 -62 115 l-62 110 -39 0 -39 0 20 -32z"/>
                <path d="M410 588 c22 -40 50 -92 62 -115 l21 -41 -58 -104 c-32 -56 -60 -106 -62 -110 -2 -5 13 -8 34 -8 38 0 38 0 97 107 33 58 59 112 59 118 0 6 -26 60 -59 118 l-59 107 -38 0 -39 0 42 -72z"/>
                </g>
                </svg>
            </a> 
           
        </div>
        </div>

        <div class="description">
           <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt   
            ut laoreet dolore magna aliquam erat volutpat. Ut wisi   
            enim ad... </p>
            <a href="#">Detaylar 
             <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20px" height="20px" viewBox="0 0 64.000000 78.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,78.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M178 628 c49 -82 105 -184 105 -193 0 -9 -56 -111 -105 -192 l-20 -33 39 0 39 0 62 110 c34 60 62 112 62 115 0 3 -28 55 -62 115 l-62 110 -39 0 -39 0 20 -32z"/>
                <path d="M410 588 c22 -40 50 -92 62 -115 l21 -41 -58 -104 c-32 -56 -60 -106 -62 -110 -2 -5 13 -8 34 -8 38 0 38 0 97 107 33 58 59 112 59 118 0 6 -26 60 -59 118 l-59 107 -38 0 -39 0 42 -72z"/>
                </g>
                </svg></a>
        </div>
    </div>
</div>
        `;
      $("#search-results").append(movieCard);
    });
    $("#search-results").append(loadButton);

    $("#search-results").css("height", "auto").addClass("visible");
  }

  function toggleFavorite(movie) {
    const movieIndex = favorites.findIndex(
      (fav) => fav.imdbID === movie.imdbID
    );

    if (movieIndex > -1) {
      favorites.splice(movieIndex, 1);
    } else {
      favorites.push(movie);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    FavoritesModule.renderFavorites();
    return movieIndex === -1;
  }

  function bindEvents() {
    $("#search-button").on("click", function () {
      const query = $("#movie-search").val();
      SharedModule.fetchMovies(query, (movies) => renderMovies(movies, 2));
    });

    $(document).on("click", ".star", function () {
      const movie = $(this).data("movie");
      const isFavorite = toggleFavorite(movie);
      $(this).text(isFavorite ? "★" : "☆");
    });
    $(document).on("click", "#load-more", function () {
      const query = $("#movie-search").val() || "";
      if (query.length > 2) {
        window.location.href = `list.html?query=${query}`;
      } else {
        alert("Please enter a movie name.");
      }
    });

    $("#movie-search").on("input", function () {
      const searchValue = $(this).val();
      if (searchValue.length >= 2) {
        $("#search-icon").hide();
        $("#search-arrow").show();
      } else {
        $("#search-icon").show();
        $("#search-arrow").hide();
      }
    });
  }

  return {
    init: function () {
      bindEvents();
      FavoritesModule.renderFavorites();  
    },
  };
})(SharedModule, FavoritesModule);

const CalendarModule = (function (SharedModule) {
  let currentStartDate = new Date();
  let updateInterval = 7;  
   function checkScreenSize() {
    if (window.innerWidth <= 768) {  
      updateInterval = 3; 
    } else {
      updateInterval = 7; 
    }
  }

   checkScreenSize();
 
  window.addEventListener('resize', checkScreenSize);

   function createCalendarHtml(date) {
    let daysHtml = "";
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const todayString = new Date(date).toDateString();
    for (let i = 0; i < updateInterval; i++) {
      const currentDate = new Date(date);
      currentDate.setDate(date.getDate() + i);

      const dayOfWeek = dayNames[currentDate.getDay()].slice(0, 3);
      const dayOfMonth = currentDate.getDate();
      const month = monthNames[currentDate.getMonth()].slice(0, 3);
      const isSelected =
        currentDate.toDateString() === todayString ? "selected" : "";

      daysHtml += `<div class="day ${isSelected}" data-date="${currentDate.toDateString()}">
                        <div class="day-text">${month}</div>
                        <div class="day-number">${dayOfMonth}</div>
                        <div class="month-text">${dayOfWeek}</div>
                     </div>`;
    }

    return `
        <div class="calendar">
            <button id="prev-week"><img src='./dist/images/back.png'></button>
            <div class="days">${daysHtml}</div>
            <button id="next-week"><img src='./dist/images/next.png'></button>
        </div>
        <div id="movie-list"></div>
        <div class="add-to-calendar-box">
        <button id="add-to-calendar" data-id=""><img src='./dist/images/accept.png'> Ekle</button>
        <button class="button-icon" id="close-calendar"><img src='./dist/images/close-button.png'></button>
        </div>
        `;
  }

   function openCalendarPopup(movieData) {
    currentStartDate = new Date();
    $(".calendar-popup").remove();
    renderCalendarPopup(movieData);
  }

  function renderCalendarPopup(movieData) {
    $(".container").append(`
              <div class="calendar-popup">
                  ${createCalendarHtml(currentStartDate)}
              </div>`);

    const addToCalendarButton = $("#add-to-calendar");
    addToCalendarButton.data("movieData", movieData);
    loadMoviesForSelectedDate(currentStartDate);

    addToCalendarButton.off("click").on("click", function () {
      const movieData = $(this).data("movieData");
      const selectedDate = $(".day.selected").data("date");
      addMovieToCalendar(movieData, selectedDate);
    });
  }

   function loadMoviesForSelectedDate(date) {
    const selectedDate = date.toDateString();
    const watchLaterList = JSON.parse(localStorage.getItem("watchLater")) || [];
    console.log(watchLaterList);
    const moviesForDate = watchLaterList.filter(
      (item) => item.date === selectedDate
    );

    const movieListHtml = moviesForDate
      .map(
        (movie) => `
           
                 <div class="movie-card">
    <div class="image-box">
        <img src="${movie.posterPath}" width="200px" height="300px" alt="${
          movie.Title
        }">
        </div>
        <div class="content">
            <div class="head-area">  
                <h2 class="title">  ${movie.title} 
</h2>
                <div class="head-sup">
                    <div class="rating">
                        <div class="star" data-id="${
                          movie.imdbID
                        }" data-movie='${JSON.stringify(movie)}'> </div>
                        <div>
                            <span class="rating-value">6.8</span>
                            <span class="rating-count">/10</span>
                        </div> 

                    </div>
                                     <button class="remove-movie" data-id="${
                                       movie.movieId
                                     }" data-date="${
          movie.date
        }"><img src="./dist/images/delete.png"></button>

                </div>
            </div>
        <div class="details">
            <div class="language"><span>Dil:</span><span> İngilizce </span>  </div>
            <div class="actors"><span> Oyuncular:</span> Jeff Bridges, Garrett Hedlund, Olivia Wilde | 
            <a href="#">Tüm listeyi gör 
             <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20px" height="20px" viewBox="0 0 64.000000 78.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,78.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M178 628 c49 -82 105 -184 105 -193 0 -9 -56 -111 -105 -192 l-20 -33 39 0 39 0 62 110 c34 60 62 112 62 115 0 3 -28 55 -62 115 l-62 110 -39 0 -39 0 20 -32z"/>
                <path d="M410 588 c22 -40 50 -92 62 -115 l21 -41 -58 -104 c-32 -56 -60 -106 -62 -110 -2 -5 13 -8 34 -8 38 0 38 0 97 107 33 58 59 112 59 118 0 6 -26 60 -59 118 l-59 107 -38 0 -39 0 42 -72z"/>
                </g>
                </svg>
            </a> 
           
        </div>
        </div>

        <div class="description">
           <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt   
            ut laoreet dolore magna aliquam erat volutpat. Ut wisi   
            enim ad... </p>
            <a href="#">Detaylar 
             <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20px" height="20px" viewBox="0 0 64.000000 78.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,78.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M178 628 c49 -82 105 -184 105 -193 0 -9 -56 -111 -105 -192 l-20 -33 39 0 39 0 62 110 c34 60 62 112 62 115 0 3 -28 55 -62 115 l-62 110 -39 0 -39 0 20 -32z"/>
                <path d="M410 588 c22 -40 50 -92 62 -115 l21 -41 -58 -104 c-32 -56 -60 -106 -62 -110 -2 -5 13 -8 34 -8 38 0 38 0 97 107 33 58 59 112 59 118 0 6 -26 60 -59 118 l-59 107 -38 0 -39 0 42 -72z"/>
                </g>
                </svg></a>
        </div>
    </div>
</div>
              
              `
      )
      .join("");
    $("#movie-list").html(movieListHtml || "<p class='no-records'>İzleme Listenizde Kayıt Yok</p>");
  }

   function addMovieToCalendar(movieData, date) {
    const watchLaterList = JSON.parse(localStorage.getItem("watchLater")) || [];

    watchLaterList.push({ ...movieData, date });
    console.log(movieData, watchLaterList);

    localStorage.setItem("watchLater", JSON.stringify(watchLaterList));
    loadMoviesForSelectedDate(new Date(date));
  }

   function removeMovieFromCalendar(movieId, date) {
    let watchLaterList = JSON.parse(localStorage.getItem("watchLater")) || [];
    watchLaterList = watchLaterList.filter(
      (movie) => !(movie.movieId === movieId && movie.date === date)
    );
    localStorage.setItem("watchLater", JSON.stringify(watchLaterList));
    loadMoviesForSelectedDate(new Date(date));
  }

   function bindEvents() {
    $(document).on("click", ".watch-later", function () {
      const movieData = {
        movieId: $(this).data("id"),
        title: $(this).closest(".movie-card").find(".title").text(),
        posterPath: $(this).closest(".movie-card").find("img").attr("src"),
      };
      openCalendarPopup(movieData);
     

    });

    $(document).on("click", "#prev-week", function () {
      currentStartDate.setDate(currentStartDate.getDate() - updateInterval);  
      const movieData = $("#add-to-calendar").data("movieData");
      $(".calendar-popup").remove();
      renderCalendarPopup(movieData);
    });

    $(document).on("click", "#next-week", function () {
      console.log(updateInterval);
      currentStartDate.setDate(currentStartDate.getDate() + updateInterval);  
      const movieData = $("#add-to-calendar").data("movieData");
      $(".calendar-popup").remove();
      renderCalendarPopup(movieData);
    });

    $(document).on("click", ".day", function () {
      $(".day").removeClass("selected");
      $(this).addClass("selected");
      loadMoviesForSelectedDate(new Date($(this).data("date")));
    });

    $(document).on("click", ".remove-movie", function () {
      const movieId = $(this).data("id");
      const date = $(this).data("date");
      removeMovieFromCalendar(movieId, date);
    });

    $(document).on("click", "#close-calendar", function () {
      $(".calendar-popup").remove();
    });

     $(document).on("click", "#my-watch-list-button", function () {
      openWatchListPopup();
    });

     $(document).on("click", "#close-watch-list", function () {
      $(".watch-list-popup").hide();
    });
  }

   function openWatchListPopup() {
    const watchLaterList = JSON.parse(localStorage.getItem("watchLater")) || [];

    const movieListHtml = watchLaterList
      .map(
        (movie) => `
    <div class="movie-card">
<div class="image-box">
   <img src="${movie.posterPath}" width="200px" height="300px" alt="${
          movie.title
        }">
   </div>
   <div class="content">
       <div class="head-area">  
           <h2 class="title">${movie.title}</h2>
           <div class="head-sup">
               <div class="rating">
                   <div class="star" data-id="${
                     movie.imdbID
                   }" data-movie='${JSON.stringify(movie)}'>  </div>
                   <div>
                       <span class="rating-value">6.8</span>
                       <span class="rating-count">/10</span>
                   </div> 

               </div>
               <button class="watch-later" data-id="${movie.imdbID}">+</button>
           </div>
       </div>
   <div class="details">
       <div class="language"><span>Dil:</span><span> İngilizce </span>  </div>
       <div class="actors"><span> Oyuncular:</span> Jeff Bridges, Garrett Hedlund, Olivia Wilde | 
       <a href="#">Tüm listeyi gör 
        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20px" height="20px" viewBox="0 0 64.000000 78.000000" preserveAspectRatio="xMidYMid meet">
           <g transform="translate(0.000000,78.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
           <path d="M178 628 c49 -82 105 -184 105 -193 0 -9 -56 -111 -105 -192 l-20 -33 39 0 39 0 62 110 c34 60 62 112 62 115 0 3 -28 55 -62 115 l-62 110 -39 0 -39 0 20 -32z"/>
           <path d="M410 588 c22 -40 50 -92 62 -115 l21 -41 -58 -104 c-32 -56 -60 -106 -62 -110 -2 -5 13 -8 34 -8 38 0 38 0 97 107 33 58 59 112 59 118 0 6 -26 60 -59 118 l-59 107 -38 0 -39 0 42 -72z"/>
           </g>
           </svg>
       </a> 
      
   </div>
   </div>

   <div class="description">
      <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt   
       ut laoreet dolore magna aliquam erat volutpat. Ut wisi   
       enim ad... </p>
       <a href="#">Detaylar 
        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20px" height="20px" viewBox="0 0 64.000000 78.000000" preserveAspectRatio="xMidYMid meet">
           <g transform="translate(0.000000,78.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
           <path d="M178 628 c49 -82 105 -184 105 -193 0 -9 -56 -111 -105 -192 l-20 -33 39 0 39 0 62 110 c34 60 62 112 62 115 0 3 -28 55 -62 115 l-62 110 -39 0 -39 0 20 -32z"/>
           <path d="M410 588 c22 -40 50 -92 62 -115 l21 -41 -58 -104 c-32 -56 -60 -106 -62 -110 -2 -5 13 -8 34 -8 38 0 38 0 97 107 33 58 59 112 59 118 0 6 -26 60 -59 118 l-59 107 -38 0 -39 0 42 -72z"/>
           </g>
           </svg></a>
   </div>
</div>
</div>
   `
      )
      .join("");

    $("#watch-list-content").html(
      movieListHtml || "<p class='no-records'>İzleme Listenizde Kayıt Yok</p>"
    );
    $(".watch-list-popup").show();
  }

  return { init: bindEvents };
})(SharedModule);

const ListModule = (function (SharedModule) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  let query = localStorage.getItem("query");

  const countMovie = (searchKey, count) => {
    searchKey = searchKey || "Aranan kelime";
    count = typeof count === "number" && count >= 0 ? count : 0;

    return `<div><span>${searchKey} için sonuçlar</span><span>${count} film bulundu</span></div><hr class="seperator-hr"> </hr>`;
  };

  const seperator = "<span id='seperator'></span>";

  function renderMovies(movies) {
    $("#movie-results").empty();
    movies.forEach((movie, index) => {
      const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
      const starIcon = isFavorite ? "★" : "☆";
      const movieCard = `
         <div class="movie-card">
    <div class="image-box">
        <img src="${movie.Poster}" width="200px" height="300px" alt="${
        movie.Title
      }">
        </div>
        <div class="content">
            <div class="head-area">  
                <h2 class="title">${movie.Title}</h2>
                <div class="head-sup">
                    <div class="rating">
                        <div class="star" data-id="${
                          movie.imdbID
                        }" data-movie='${JSON.stringify(
        movie
      )}'>${starIcon} </div>
                        <div>
                            <span class="rating-value">6.8</span>
                            <span class="rating-count">/10</span>
                        </div> 

                    </div>
                    <button class="watch-later" data-id="${
                      movie.imdbID
                    }">+</button>
                </div>
            </div>
        <div class="details">
            <div class="language"><span>Dil:</span><span> İngilizce </span>  </div>
            <div class="actors"><span> Oyuncular:</span> Jeff Bridges, Garrett Hedlund, Olivia Wilde | 
            <a href="#">Tüm listeyi gör 
             <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20px" height="20px" viewBox="0 0 64.000000 78.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,78.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M178 628 c49 -82 105 -184 105 -193 0 -9 -56 -111 -105 -192 l-20 -33 39 0 39 0 62 110 c34 60 62 112 62 115 0 3 -28 55 -62 115 l-62 110 -39 0 -39 0 20 -32z"/>
                <path d="M410 588 c22 -40 50 -92 62 -115 l21 -41 -58 -104 c-32 -56 -60 -106 -62 -110 -2 -5 13 -8 34 -8 38 0 38 0 97 107 33 58 59 112 59 118 0 6 -26 60 -59 118 l-59 107 -38 0 -39 0 42 -72z"/>
                </g>
                </svg>
            </a> 
           
        </div>
        </div>

        <div class="description">
           <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt   
            ut laoreet dolore magna aliquam erat volutpat. Ut wisi   
            enim ad... </p>
            <a href="#">Detaylar 
             <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20px" height="20px" viewBox="0 0 64.000000 78.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,78.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M178 628 c49 -82 105 -184 105 -193 0 -9 -56 -111 -105 -192 l-20 -33 39 0 39 0 62 110 c34 60 62 112 62 115 0 3 -28 55 -62 115 l-62 110 -39 0 -39 0 20 -32z"/>
                <path d="M410 588 c22 -40 50 -92 62 -115 l21 -41 -58 -104 c-32 -56 -60 -106 -62 -110 -2 -5 13 -8 34 -8 38 0 38 0 97 107 33 58 59 112 59 118 0 6 -26 60 -59 118 l-59 107 -38 0 -39 0 42 -72z"/>
                </g>
                </svg></a>
        </div>
    </div>
</div>
        `;
      index > 0 && index % 2 == 0 && $("#movie-results").append(seperator);
      $("#movie-results").append(movieCard);
    });
    $("#count-movie").append(countMovie(query, movies.length));
  }

  return {
    init: function () {
      const query = new URLSearchParams(window.location.search).get("query");
      if (query) {
        SharedModule.fetchMovies(query, renderMovies);
      }
    },
  };
})(SharedModule);

const CookieConsentModule = (function () {
  function showConsentPopup() {
    const consentHtml = `
        <div class="cookie-consent-popup">
          Bu site çerezleri kullanmaktadır. Kabul ediyor musun?
          <button id="accept-cookies"><img src='./dist/images/accept.png'></button>
          <button id="decline-cookies"><img src='./dist/images/delete.png'></button>
        </div>
      `;
    $(".container").append(consentHtml);
  }

  function handleConsent(response) {
    document.cookie = `cookieConsent=${response}; path=/; max-age=${
      60 * 60 * 24 * 365
    }`;
    $(".cookie-consent-popup").remove();
  }

  function bindEvents() {
    $(document).on("click", "#accept-cookies", function () {
      handleConsent("accepted");
    });

    $(document).on("click", "#decline-cookies", function () {
      handleConsent("declined");
    });
  }

  function checkConsent() {
    if (
      !document.cookie
        .split("; ")
        .find((row) => row.startsWith("cookieConsent"))
    ) {
      showConsentPopup();
    }
  }

  return {
    init: function () {
      bindEvents();
      checkConsent();
    },
  };
})();
$(document).ready(function () {
  MoviesModule.init();
  CalendarModule.init();
  ListModule.init();
  CookieConsentModule.init();
  FavoritesModule.renderFavorites();
});
