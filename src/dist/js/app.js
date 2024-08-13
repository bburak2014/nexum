let apiKey="a939f0da",SharedModule={fetchMovies:function(t,a){2<t.length&&$.ajax({url:`http://www.omdbapi.com/?apikey=${apiKey}&s=`+t,success:function(e){"True"===e.Response?(a(e.Search),localStorage.setItem("query",t)):alert("Film Bulunamadı!")}})}},FavoritesModule=($("#openPopup").on("click",function(){$("#myPopup").removeClass("close"),$("#myPopup").addClass("open"),setTimeout(()=>{$("#myPopup").show()},300),FavoritesModule.renderFavorites()}),$("#closePopup").on("click",function(){$("#myPopup").removeClass("open"),$("#myPopup").addClass("close"),setTimeout(()=>{$("#myPopup").hide()},300)}),$("#my-watch-list-button").on("click",function(){$("#watch-list-popup").removeClass("close"),$("#watch-list-popup").addClass("open"),setTimeout(()=>{$("#watch-list-popup").show()},300),FavoritesModule.renderFavorites()}),$("#close-watch-list").on("click",function(){$("#watch-list-popup").removeClass("open"),$("#watch-list-popup").addClass("close"),setTimeout(()=>{$("#watch-list-popup").hide()},300)}),{renderFavorites:function(){let a=JSON.parse(localStorage.getItem("favorites"))||[],i=$("#favorites-list").empty();0===a.length?i.append("<p class='no-records'>Favori Listenizde Kayıt Yok</p>"):a.forEach(t=>{var e=a.some(e=>e.imdbID===t.imdbID)?"★":"☆",e=`
        <div class="movie-card">
   <div class="image-box">
       <img src="${t.Poster}" width="200px" height="300px" alt="${t.Title}">
       </div>
       <div class="content">
           <div class="head-area">  
               <h2 class="title">${t.Title}</h2>
               <div class="head-sup">
                   <div class="rating">
                       <div class="star" data-id="${t.imdbID}" data-movie='${JSON.stringify(t)}'>${e} </div>
                       <div>
                           <span class="rating-value">6.8</span>
                           <span class="rating-count">/10</span>
                       </div> 

                   </div>
                   <button class="watch-later" data-id="${t.imdbID}">+</button>
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
       `;i.append(e)})}}),MoviesModule=function(t,a){let s=JSON.parse(localStorage.getItem("favorites"))||[];function i(e,t){$("#search-results").empty(),(t?e.slice(0,t):e).forEach(t=>{var e=s.some(e=>e.imdbID===t.imdbID)?"★":"☆",a=$("#movie-search").val(),i=(i=t.Title,a=(a=a).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),a=new RegExp(`(${a})`,"gi"),i.replace(a,"<strong>$1</strong>")),a=`
    <div class="movie-card">
    <div class="image-box">
        <img src="${t.Poster}" width="200px" height="300px" alt="${t.Title}">
        </div>
        <div class="content">
            <div class="head-area">  
                <h2 class="title">${i}</h2>
                <div class="head-sup">
                    <div class="rating">
                        <div class="star" data-id="${t.imdbID}" data-movie='${JSON.stringify(t)}'>${e} </div>
                        <div>
                            <span class="rating-value">6.8</span>
                            <span class="rating-count">/10</span>
                        </div> 

                    </div>
                    <button class="watch-later" data-id="${t.imdbID}">+</button>
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
        `;$("#search-results").append(a)}),$("#search-results").append(`
    <div class="load-box">
        <button id="load-more">DAHA FAZLA SONUÇ
            <svg xmlns="http://www.w3.org/2000/svg" version="1.0"  width="24px" height="24px" viewBox="0 0 64.000000 78.000000" preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,78.000000) scale(0.100000,-0.100000)" fill="#349af9" stroke="none">
                    <path d="M178 628 c49 -82 105 -184 105 -193 0 -9 -56 -111 -105 -192 l-20 -33 39 0 39 0 62 110 c34 60 62 112 62 115 0 3 -28 55 -62 115 l-62 110 -39 0 -39 0 20 -32z"/>
                    <path d="M410 588 c22 -40 50 -92 62 -115 l21 -41 -58 -104 c-32 -56 -60 -106 -62 -110 -2 -5 13 -8 34 -8 38 0 38 0 97 107 33 58 59 112 59 118 0 6 -26 60 -59 118 l-59 107 -38 0 -39 0 42 -72z"/>
                    </g>
             </svg>
        </button>
    </div>`),$("#search-results").css("height","auto").addClass("visible")}function e(){$("#search-button").on("click",function(){var e=$("#movie-search").val();t.fetchMovies(e,e=>i(e,2))}),$(document).on("click",".star",function(){var t,e=$(this).data("movie"),e=(t=e,-1<(e=s.findIndex(e=>e.imdbID===t.imdbID))?s.splice(e,1):s.push(t),localStorage.setItem("favorites",JSON.stringify(s)),a.renderFavorites(),-1===e);$(this).text(e?"★":"☆")}),$(document).on("click","#load-more",function(){var e=$("#movie-search").val()||"";2<e.length?window.location.href="list.html?query="+e:alert("Please enter a movie name.")}),$("#movie-search").on("input",function(){2<=$(this).val().length?($("#search-icon").hide(),$("#search-arrow").show()):($("#search-icon").show(),$("#search-arrow").hide())})}return{init:function(){e(),a.renderFavorites()}}}(SharedModule,FavoritesModule),CalendarModule=function(){let a=new Date,v=7;function e(){v=window.innerWidth<=768?3:7}function t(e){$(".container").append(`
              <div class="calendar-popup">
                  ${function(t){let a="";var i=["January","February","March","April","May","June","July","August","September","October","November","December"],s=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],o=new Date(t).toDateString();for(let e=0;e<v;e++){var d=new Date(t),n=(d.setDate(t.getDate()+e),s[d.getDay()].slice(0,3)),l=d.getDate(),c=i[d.getMonth()].slice(0,3),r=d.toDateString()===o?"selected":"";a+=`<div class="day ${r}" data-date="${d.toDateString()}">
                        <div class="day-text">${c}</div>
                        <div class="day-number">${l}</div>
                        <div class="month-text">${n}</div>
                     </div>`}return`
        <div class="calendar">
            <button id="prev-week"><img src='./dist/images/back.png'></button>
            <div class="days">${a}</div>
            <button id="next-week"><img src='./dist/images/next.png'></button>
        </div>
        <div id="movie-list"></div>
        <div class="add-to-calendar-box">
        <button id="add-to-calendar" data-id=""><img src='./dist/images/accept.png'> Ekle</button>
        <button class="button-icon" id="close-calendar"><img src='./dist/images/close-button.png'></button>
        </div>
        `}(a)}
              </div>`);var t=$("#add-to-calendar");t.data("movieData",e),o(a),t.off("click").on("click",function(){var e,t=$(this).data("movieData"),a=$(".day.selected").data("date");t=t,a=a,(e=JSON.parse(localStorage.getItem("watchLater"))||[]).push({...t,date:a}),console.log(t,e),localStorage.setItem("watchLater",JSON.stringify(e)),o(new Date(a))})}function o(e){let t=e.toDateString();e=JSON.parse(localStorage.getItem("watchLater"))||[];console.log(e);e=e.filter(e=>e.date===t).map(e=>`
           
                 <div class="movie-card">
    <div class="image-box">
        <img src="${e.posterPath}" width="200px" height="300px" alt="${e.Title}">
        </div>
        <div class="content">
            <div class="head-area">  
                <h2 class="title">  ${e.title} 
</h2>
                <div class="head-sup">
                    <div class="rating">
                        <div class="star" data-id="${e.imdbID}" data-movie='${JSON.stringify(e)}'> </div>
                        <div>
                            <span class="rating-value">6.8</span>
                            <span class="rating-count">/10</span>
                        </div> 

                    </div>
                                     <button class="remove-movie" data-id="${e.movieId}" data-date="${e.date}"><img src="./dist/images/delete.png"></button>

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
              
              `).join("");$("#movie-list").html(e||"<p class='no-records'>İzleme Listenizde Kayıt Yok</p>")}return e(),console.log(v),window.addEventListener("resize",e),{init:function(){$(document).on("click",".watch-later",function(){var e={movieId:$(this).data("id"),title:$(this).closest(".movie-card").find(".title").text(),posterPath:$(this).closest(".movie-card").find("img").attr("src")};e=e,a=new Date,$(".calendar-popup").remove(),t(e)}),$(document).on("click","#prev-week",function(){a.setDate(a.getDate()-v);var e=$("#add-to-calendar").data("movieData");$(".calendar-popup").remove(),t(e)}),$(document).on("click","#next-week",function(){console.log(v),a.setDate(a.getDate()+v);var e=$("#add-to-calendar").data("movieData");$(".calendar-popup").remove(),t(e)}),$(document).on("click",".day",function(){$(".day").removeClass("selected"),$(this).addClass("selected"),o(new Date($(this).data("date")))}),$(document).on("click",".remove-movie",function(){var t=$(this).data("id"),a=$(this).data("date");{var i=t,s=a;let e=JSON.parse(localStorage.getItem("watchLater"))||[];e=e.filter(e=>!(e.movieId===i&&e.date===s)),localStorage.setItem("watchLater",JSON.stringify(e)),o(new Date(s))}}),$(document).on("click","#close-calendar",function(){$(".calendar-popup").remove()}),$(document).on("click","#my-watch-list-button",function(){var e;e=(e=JSON.parse(localStorage.getItem("watchLater"))||[]).map(e=>`
    <div class="movie-card">
<div class="image-box">
   <img src="${e.posterPath}" width="200px" height="300px" alt="${e.title}">
   </div>
   <div class="content">
       <div class="head-area">  
           <h2 class="title">${e.title}</h2>
           <div class="head-sup">
               <div class="rating">
                   <div class="star" data-id="${e.imdbID}" data-movie='${JSON.stringify(e)}'>  </div>
                   <div>
                       <span class="rating-value">6.8</span>
                       <span class="rating-count">/10</span>
                   </div> 

               </div>
               <button class="watch-later" data-id="${e.imdbID}">+</button>
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
   `).join(""),$("#watch-list-content").html(e||"<p class='no-records'>İzleme Listenizde Kayıt Yok</p>"),$(".watch-list-popup").show()}),$(document).on("click","#close-watch-list",function(){$(".watch-list-popup").hide()})}}}(SharedModule),ListModule=function(t){let i=JSON.parse(localStorage.getItem("favorites"))||[],a=localStorage.getItem("query");function s(e){var t;$("#movie-results").empty(),e.forEach((t,e)=>{var a=i.some(e=>e.imdbID===t.imdbID)?"★":"☆",a=`
         <div class="movie-card">
    <div class="image-box">
        <img src="${t.Poster}" width="200px" height="300px" alt="${t.Title}">
        </div>
        <div class="content">
            <div class="head-area">  
                <h2 class="title">${t.Title}</h2>
                <div class="head-sup">
                    <div class="rating">
                        <div class="star" data-id="${t.imdbID}" data-movie='${JSON.stringify(t)}'>${a} </div>
                        <div>
                            <span class="rating-value">6.8</span>
                            <span class="rating-count">/10</span>
                        </div> 

                    </div>
                    <button class="watch-later" data-id="${t.imdbID}">+</button>
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
        `;0<e&&e%2==0&&$("#movie-results").append("<span id='seperator'></span>"),$("#movie-results").append(a)}),$("#count-movie").append((t=a,e=e.length,`<div><span>${t=t||"Aranan kelime"} için sonuçlar</span><span>${e="number"==typeof e&&0<=e?e:0} film bulundu</span></div><hr class="seperator-hr"> </hr>`))}return{init:function(){var e=new URLSearchParams(window.location.search).get("query");e&&t.fetchMovies(e,s)}}}(SharedModule),CookieConsentModule=function(){function e(e){document.cookie=`cookieConsent=${e}; path=/; max-age=31536000`,$(".cookie-consent-popup").remove()}function t(){document.cookie.split("; ").find(e=>e.startsWith("cookieConsent"))||$(".container").append(`
        <div class="cookie-consent-popup">
          Bu site çerezleri kullanmaktadır. Kabul ediyor musun?
          <button id="accept-cookies"><img src='./dist/images/accept.png'></button>
          <button id="decline-cookies"><img src='./dist/images/delete.png'></button>
        </div>
      `)}return{init:function(){$(document).on("click","#accept-cookies",function(){e("accepted")}),$(document).on("click","#decline-cookies",function(){e("declined")}),t()}}}();$(document).ready(function(){MoviesModule.init(),CalendarModule.init(),ListModule.init(),CookieConsentModule.init(),FavoritesModule.renderFavorites()});