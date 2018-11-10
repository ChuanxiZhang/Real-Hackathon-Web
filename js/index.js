$('#ingredients').click(function() {
  $(this).find('i').toggleClass('fa fa-heart').toggleClass('fa fa-heart');
});

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

Vue.component('five-star', {
  template: '<span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></span>'
})

Vue.component('fourhalf-star', {
  template: '<span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star-half checked"></span></span>'
})

Vue.component('four-star', {
  template: '<span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></span>'
})

Vue.component('threehalf-star', {
  template: '<span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star-half checked"></span></span>'
})

Vue.component('three-star', {
  template: '<span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>'
})

Vue.component('twohalf-star', {
  template: '<span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star-half checked"></span></span>'
})

Vue.component('two-star', {
  template: '<span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></span>'
})
new Vue({
  el: '#index_vue',
  data: {
    count: 0,
    recipes: [],
    name: "",
    page: 1,
    nameList: ["apple", "pear", "chicken", "artichoke", "asparagus", "beetroot", "pepper", "broccoli", "brussels", "sprouts",
      "cabbage", "carrot", "cauliflower", "celery", "cucumber", "eggplant", "garlic", "lettuce", "mushroom", "onion", "peas", "potato",
      "pumpkin", "spinach", "turnip", "yam", "zucchini", "salad", "apricot", "avocado", "banana", "blackberry", "muskmelon", "cherry",
      "fig", "grapes", "olive", "kiwi", "lemon", "lime", "mango", "mangosteen", "orange", "papaya", "peach", "pineapple", "plum", "raisin",
      "strawberry", "tomato", "watermelon", "almonds", "bread", "cereal", "nuts", "cashew", "chickpeas", "chestnut", "coconut", "beans", "corn",
      "maize", "flour", "legumes", "lentils", "lima", "oatmeal", "milk", "peanuts", "pinto", "pistachios", "rice", "tortilla", "walnuts",
      "wheat", "taco", "hamburger", "sandwich", "bacon", "beef", "ribs", "breast", "drumsticks", "wings", "meat", "goat", "lamb", "duck", "fillet",
      "ham", "liver", "pork", "mutton", "tongue", "heart", "ox", "leg", "sausages", "T-bone", "tripe", "turkey", "carp", "caviar", "cod", "crab",
      "crayfish", "eel", "snapper", "lobster", "mussels", "octopus", "oysters", "periwinkles", "winkles", "prawn", "salmon", "roe", "sardines",
      "scallop", "shrimp", "fish", "squid", "trout", "tuna", "steak", "cheese", "butter", "camembert", "cream", "ice-cream", "yogurt", "gelato",
      "milk", "chips", "noodles", "dumplings", "hotpot", "pho", "barbecue"
    ],
    maxCount: 8,
    matchList: [],
    matchListIndex: null,
    saved: [],
    like_flag: false,
    history:[],
    showloading:true,
    serving:1,
  },
  computed: {
    getPublisher() {
      return function(recipe) {
        return recipe.publisher ? recipe.publisher : "No publisher";
      }
    },
    getF2fUrl() {
      return function(recipe) {
        return recipe.f2f_url ? recipe.f2f_url : "error_page.html";
      }
    },
    getTitle() {
      return function(recipe) {
        return recipe.title ? recipe.title : "No title";
      }
    },
    getSourceUrl() {
      return function(recipe) {
        return recipe.source_url ? recipe.source_url : "error_page.html";
      }
    },
    getRecipe_id() {
      return function(recipe) {
        return recipe.recipe_id ? recipe.recipe_id : 0;
      }
    },
    getImageUrl() {
      return function(recipe) {
        return recipe.image_url ? recipe.image_url : "img/noImage.jpg";
      }
    },
    getSocialRank() {
      return function(recipe) {
        return recipe.social_rank ? recipe.social_rank : 0;
      }
    },
    getPublisherUrl() {
      return function(recipe) {
        return recipe.publisher_url ? recipe.publisher_url : "error_page.html";
      }
    }
  },
  methods: {
    getData(page){
      this.showloading = true;
      var obj = AJAX([this.name, page], "search");
      this.count = obj.count;

      for (var i = 0; i < obj.recipes.length; i++) {
        this.recipes.push(obj.recipes[i]);
      }
      console.log(this.recipes.length);
      this.showloading = false;
    },
    handleSubmit() {
      if (localStorage.getItem('history') != null){
        this.history = JSON.parse(localStorage.getItem("history"));
      }
      this.history.push(getNowFormatDate()+" [home page]searched " + "\"" +this.name + "\"");
      localStorage.setItem("history", JSON.stringify(this.history));
      var obj = AJAX([this.name, this.page], "search");
      this.recipes = obj.recipes;
    },
    url(id) {
      return "detail.html?id=" + id;
    },
    click_url(title){
      if (localStorage.getItem('history') != null){
        this.history = JSON.parse(localStorage.getItem("history"));
      }
      this.history.push(getNowFormatDate()+" [home page]scan detials of recipe" + "\"" + title + "\"");
      localStorage.setItem("history", JSON.stringify(this.history));
    },
    itemUrl() {
      return "itemList.html";
    },
    like(title) {
      if (localStorage.getItem('history') != null){
        this.history = JSON.parse(localStorage.getItem("history"));
      }
      this.history.push(getNowFormatDate()+" [home page]like the recipe" + "\"" + title + "\"");
      localStorage.setItem("history", JSON.stringify(this.history));
      if (localStorage.getItem('favor') != null){
        this.saved = JSON.parse(localStorage.getItem("favor"));
        var found = false;
        for(var i = 0; i< this.saved.length;i++){
          var item = this.saved[i].split("|");
          console.log(item[0]);
          if (item[0] == title){
            item[1] = this.serving;
            this.saved[i] = item.join("|");
            found = true;
          }
        }
        if(!found){
          this.saved.push(title+"|"+this.serving);
        }
      } else{
        this.saved.push(title+"|"+this.serving);
      }
      console.log(this.saved);

      localStorage.setItem("favor", JSON.stringify(this.saved));
    },
    islike(title) {
      if (localStorage.getItem('favor') != null){
        this.saved = JSON.parse(localStorage.getItem("favor"));
      }
      for (var i = 0; i < this.saved.length; i++) {
        if (this.saved[i].split("|")[0] == title) {
          return true;
        }
      }
      return false;
    },
    unlike(title) {
      if (localStorage.getItem('favor') != null){
        this.saved = JSON.parse(localStorage.getItem("favor"));
      }
      for (var i = 0; i < this.saved.length; i++) {
        if (this.saved[i].split("|")[0] == title) {
          this.saved.pop(i);
          localStorage.setItem("favor", JSON.stringify(this.saved));
          break;
        }
      }
      if (localStorage.getItem('history') != null){
        this.history = JSON.parse(localStorage.getItem("history"));
      }
      this.history.push(getNowFormatDate()+" [home page]cancel like the recipe" + "\"" + title + "\"");
      localStorage.setItem("history", JSON.stringify(this.history));
    },
    prior() {
      this.page--;
      if (localStorage.getItem('history') != null){
        this.history = JSON.parse(localStorage.getItem("history"));
      }
      this.history.push(getNowFormatDate()+" [home page]click \"prior page\" and transfer to " + "\"" + this.page + "\"");
      localStorage.setItem("history", JSON.stringify(this.history));
      var obj = AJAX([this.name, this.page], "search");
      this.recipes = obj.recipes;
    },
    next() {
      this.page++;
      if (localStorage.getItem('history') != null){
        this.history = JSON.parse(localStorage.getItem("history"));
      }
      this.history.push(getNowFormatDate()+" [home page]click \"next page\" and transfer to " + "\"" + this.page + "\"");
      localStorage.setItem("history", JSON.stringify(this.history));
      var obj = AJAX([this.name, this.page], "search");
      this.recipes = obj.recipes;
    },
    scaleData(num) {
      return num.toFixed(2) + "%";
    },
    setMatchList() {
      if (this.matchListIndex === null) {
        if (this.name === '') {
          this.matchList = []
          return
        }
        let matchData = this.nameList.filter(v => v.indexOf(this.name) > -1)
        this.matchList = matchData.slice(0, this.maxCount)
      }
    },
    setMatchListIndex(index) {
      this.matchListIndex = index
    },
    calMatchListIndex(param) {
      if (this.matchListIndex === null) {
        this.matchListIndex = 0
        return
      }
      if (this.matchListIndex + param >= this.matchList.length) {
        this.matchListIndex = null
        return
      }
      if (this.matchListIndex + param < 0) {
        this.matchListIndex = 0
        return
      }
      this.matchListIndex = this.matchListIndex + param
    },
    isSelected(index) {
      return index === this.matchListIndex
    },
    resetMatchList() {
      this.matchListIndex = null
      this.matchList = []
      this.setMatchList()
    },
    clearMatchList() {
      this.matchList = []
    },
  },
  watch: {
    name() {
      if (this.matchList[this.matchListIndex] !== this.name) {
        this.resetMatchList()
      }
    },
    matchListIndex() {
      if (this.matchListIndex !== null) {
        this.name = this.matchList[this.matchListIndex]
      }
    },
  },
  mounted() {
    this.getData(this.page)
    window.addEventListener('scroll', () => {
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if (scrollTop + window.innerHeight + 3000>= document.body.offsetHeight) {
        if (!this.showloading) {
          this.getData(this.page += 1)
        }
      }
    })

  },
  created() {
    var self = this;
  },
});
