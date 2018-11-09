$('#ingredients').click(function() {
  $(this).find('i').toggleClass('fa fa-heart').toggleClass('fa fa-heart');
});

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
      nameList: ["apple", "pear", "chicken", "artichoke","asparagus","beetroot","pepper","broccoli","brussels","sprouts",
          "cabbage","carrot","cauliflower","celery","cucumber","eggplant","garlic","lettuce","mushroom","onion","peas","potato",
          "pumpkin","spinach","turnip","yam","zucchini","salad","apricot","avocado","banana","blackberry","muskmelon","cherry",
          "fig","grapes","olive","kiwi","lemon","lime","mango","mangosteen","orange","papaya","peach","pineapple","plum","raisin",
          "strawberry","tomato","watermelon","almonds","bread","cereal","nuts","cashew","chickpeas","chestnut","coconut","beans","corn",
          "maize","flour","legumes","lentils","lima","oatmeal","milk","peanuts","pinto","pistachios","rice","tortilla","walnuts",
          "wheat","taco","hamburger","sandwich","bacon","beef","ribs","breast","drumsticks","wings","meat","goat","lamb","duck","fillet",
          "ham","liver","pork","mutton","tongue","heart","ox","leg","sausages","T-bone","tripe","turkey","carp","caviar","cod","crab",
          "crayfish","eel","snapper","lobster","mussels","octopus","oysters","periwinkles","winkles","prawn","salmon","roe","sardines",
          "scallop","shrimp","fish","squid","trout","tuna","steak","cheese","butter","camembert","cream","ice-cream","yogurt","gelato",
          "milk","chips","noodles","dumplings","hotpot","pho","barbecue"],
      maxCount: 8,
      matchList: [],
      matchListIndex: null,
      saved:[],
      like_flag:false,
    },
    computed:{

    },
    methods: {
      handleSubmit() {
        var obj = AJAX([this.name, this.page], "search");
        this.recipes = obj.recipes;
      },
      url(id) {
        return "detail.html?id=" + id;
      },
      itemUrl(){
        return "itemList.html";
      },
      like(title){
        this.saved = JSON.parse(localStorage.getItem("favor"));
        if (this.saved == null){
          this.saved = [];
        }
        this.saved.push(title);
        localStorage.setItem("favor", JSON.stringify(this.saved));
      },
      islike(title){
        this.saved = JSON.parse(localStorage.getItem("favor"));
        if (this.saved == null){
          return false;
        }
        for (var i = 0; i < this.saved.length; i++) {
          if (this.saved[i] == title) {
            return true;
          }
        }
        return false;
      },
      unlike(title){
        this.saved = JSON.parse(localStorage.getItem("favor"));
        for (var i = 0; i < this.saved.length; i++) {
          if (this.saved[i] == title) {
            this.saved.pop(i);
            localStorage.setItem("favor", JSON.stringify(this.saved));
            break;
          }
        }
        console.log(1);
      },
      prior() {
        this.page--;
        var obj = AJAX([this.name, this.page], "search");
        this.recipes = obj.recipes;
      },
      next() {
        this.page++;
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
  created() {
    var self = this;
    var obj = AJAX(["chicken", "1"], "search");
    self.count = obj.count;
    self.recipes = obj.recipes;
  },
  });
