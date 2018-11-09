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
new Vue({
  el: '#detail_vue',
  data: {
    recipe: {},
    saved:[],
    favor:[],
  },
  methods:{
    save_item() {
      localStorage.setItem(this.recipe.recipe_id, JSON.stringify(this.recipe.ingredients));
    },
    like(title){
      this.favor = JSON.parse(localStorage.getItem("favor"));
      if (this.favor == null){
        this.favor = [];
      }
      this.favor.push(title);
      localStorage.setItem("favor", JSON.stringify(this.favor));
    },
    islike(title){
      this.favor = JSON.parse(localStorage.getItem("favor"));
      if (this.favor == null){
        return false;
      }
      for (var i = 0; i < this.favor.length; i++) {
        if (this.favor[i] == title) {
          return true;
        }
      }
      return false;
    },
    unlike(title){
      this.favor = JSON.parse(localStorage.getItem("favor"));
      for (var i = 0; i < this.favor.length; i++) {
        if (this.favor[i] == title) {
          this.favor.pop(i);
          localStorage.setItem("favor", JSON.stringify(this.favor));
          break;
        }
      }
      console.log(1);
    },
    itemUrl(){
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
