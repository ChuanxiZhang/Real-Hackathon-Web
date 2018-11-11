function GetRequest() {
  var url = location.search;
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
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


function copy(array) {
  let newArray = []
  for (let item of array) {
    newArray.push(item);
  }
  return newArray;
}

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
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
    " " + date.getHours() + seperator2 + date.getMinutes() +
    seperator2 + date.getSeconds();
  return currentdate;
}

new Vue({
  el: '#detail_vue',
  data: {
    recipe: {},
    saved: [],
    favor: [],
    history: [],
    showloading: true,
    serving: 1,
  },
  computed: {
    getPublisher() {
      return this.recipe.publisher ? this.recipe.publisher : "No publisher";
    },
    getF2fUrl() {
      return this.recipe.f2f_url ? this.recipe.f2f_url : "error_page.html";
    },
    getTitle() {
      return this.recipe.title ? this.recipe.title : "No title";
    },
    getSourceUrl() {
      return this.recipe.source_url ? this.recipe.source_url : "error_page.html";
    },
    getRecipe_id() {
      return this.recipe.recipe_id ? this.recipe.recipe_id : 0;
    },
    getImageUrl() {
      return this.recipe.image_url ? this.recipe.image_url : "img/noImage.jpg";
    },
    getSocialRank() {
      return this.recipe.social_rank ? this.recipe.social_rank : 0;
    },
    getPublisherUrl() {
      return this.recipe.publisher_url ? this.recipe.publisher_url : "error_page.html";
    }
  },
  methods: {
    save_item() {
      if (localStorage.getItem('history') != null) {
        this.history = JSON.parse(localStorage.getItem("history"));
      }
      this.history.push(getNowFormatDate() + ",detail,save,ingredients of " + "\"" + this.recipe.title + "\"");
      localStorage.setItem("history", JSON.stringify(this.history));
      var ingredients = copy(this.recipe.ingredients);
      ingredients.push(this.serving);
      localStorage.setItem(this.recipe.recipe_id, JSON.stringify(ingredients));
    },
    like(title) {
      if (localStorage.getItem('history') != null) {
        this.history = JSON.parse(localStorage.getItem("history"));
      }
      this.history.push(getNowFormatDate() + ",detail,like, the recipe" + "\"" + title + "\"");
      localStorage.setItem("history", JSON.stringify(this.history));
      if (localStorage.getItem('favor') != null) {
        this.favor = JSON.parse(localStorage.getItem("favor"));
        var found = false;
        for (var i = 0; i < this.favor.length; i++) {
          var item = this.favor[i].split("|");
          console.log(item[0]);
          if (item[0] == title) {
            item[1] = this.serving;
            this.favor[i] = item.join("|");
            found = true;
          }
        }
        if (!found) {
          this.favor.push(title + "|" + this.serving);
        }
      } else {
        this.favor.push(title + "|" + this.serving);
      }
      console.log(this.favor);

      localStorage.setItem("favor", JSON.stringify(this.favor));
    },
    islike(title) {
      if (localStorage.getItem('favor') != null) {
        this.favor = JSON.parse(localStorage.getItem("favor"));
      }
      for (var i = 0; i < this.favor.length; i++) {
        if (this.favor[i].split("|")[0] == title) {
          return true;
        }
      }
      return false;
    },
    unlike(title) {
      if (localStorage.getItem('favor') != null) {
        this.favor = JSON.parse(localStorage.getItem("favor"));
      }
      for (var i = 0; i < this.favor.length; i++) {
        if (this.favor[i].split("|")[0] == title) {
          this.favor.pop(i);
          localStorage.setItem("favor", JSON.stringify(this.favor));
          break;
        }
      }
      if (localStorage.getItem('history') != null) {
        this.history = JSON.parse(localStorage.getItem("history"));
      }
      this.history.push(getNowFormatDate() + ",detail,cancel, the recipe" + "\"" + title + "\"");
      localStorage.setItem("history", JSON.stringify(this.history));
    },
    itemUrl() {
      return "itemList.html";
    },
  },
  created() {
    var self = this;
    var Request = GetRequest();
    id = Request['id']
    var obj = AJAX([id], "get");
    self.recipe = obj.recipe;
  },
});

$('#ingredients').click(function() {
  $(this).find('i').toggleClass('fa fa-chevron-right').toggleClass('fa fa-chevron-down');
});

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v3.2';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
