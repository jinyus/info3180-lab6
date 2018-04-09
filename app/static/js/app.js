/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
              <a class="navbar-brand" href="#">VueJS App</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">News</a>
                  </li>
                </ul>
              </div>
            </nav>
        </header>    
    `,
    data: function() {}
});

Vue.component('app-footer', {
    template: `
        <footer>
            <div class="container">
                <p>Copyright &copy {{ year }} Flask Inc.</p>
            </div>
        </footer>
    `,
    data: function() {
        return {
            year: (new Date).getFullYear()
        }
    }
})

Vue.component('news-list',{
    template: `
    <div>
        <div class="form-inline d-flex justify-content-center">
            <div class="form-group mx-sm-3 mb-2">
                <label class="sr-only" for="search">Search</label>
                <input type="search" name="search" v-model="searchTerm"
                id="search" class="form-control mb-2 mr-sm-2" placeholder="Enter search term here" />
                <button class="btn btn-primary mb-2" @click="searchNews">Search</button>
            </div>
        </div>
        <div class="card-columns">
          <div v-for="item in articles" class="card">
            <img class="card-img-top" :src="item.urlToImage" :alt="item.title">
            <div class="card-body">
              <h5 class="card-title">{{item.title}}</h5>
              <p class="card-text">{{item.description}}</p>
              <p class="card-text"><small class="text-muted">Date: {{item.publishedAt}}</small></p>
            </div>
          </div>
        </div>
    </div>
    `
    ,
    created: function() {
        let self = this;
        fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=0670071154df49e09322ed8a5d1bd6f7')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            self.articles = data.articles;
            });
        },
        data : function(){
            return  {
                articles:[],
                searchTerm : ''
            }
        },
        methods : {
            searchNews : function () {
                let self = this;
                fetch('https://newsapi.org/v2/everything?q='+self.searchTerm + '&language=en&apiKey=0670071154df49e09322ed8a5d1bd6f7')
                .then(function(response) {
                return response.json();
                })
                .then(function(data) {
                console.log(data);
                self.articles = data.articles;
                });
            }
        }
    })


let app = new Vue({
    el: '#app',
    data: function(){
        return {
            welcome: 'Hello World! Welcome to VueJS'
    }
        }
        
});

