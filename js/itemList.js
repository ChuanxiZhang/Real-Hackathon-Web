new Vue({
  el: '#item_vue',
  data: {
    ilist: [],
    flist: [],
    ingredientList: [],
    favorList: [],
    historyList: []
  },
  methods: {
    getList() {
      this.ingredientList = [];
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) != "favor" && localStorage.key(i) != "history" && localStorage.key(i) != "serving") {
          var item = JSON.parse(localStorage.getItem(localStorage.key(i)));
          console.log(item);
          for (var i = 0; i < item.length - 1; i++) {
            var component = item[i].split(" ");
            if (!isNaN(component[0])) {
              var total = component.shift() * item[item.length - 1];
              var result = {
                "name": component.join(" "),
                "num": total
              };
              this.ingredientList.push(result);
            } else {
              var total = item[item.length - 1];
              var result = {
                "name": component.join(" "),
                "num": total
              };
              this.ingredientList.push(result);
            }
          }
        }
      }
    },
    getFavor() {
      this.favorList = [];
      this.flist = JSON.parse(localStorage.getItem("favor"));
      console.log(this.flist);
      for (var i = 0; i < this.flist.length; i++) {
        var item = this.flist[i].split("|");
        var result = {
          "name": item[0],
          "num": item[1]
        };
        this.favorList.push(result);
      }
    },
    getHistory() {
      this.historyList = JSON.parse(localStorage.getItem("history"));
    }
  },
  created() {

  }
});

$('#collapseOne_arrow').click(function() {
  $(this).find('i').toggleClass('fa fa-chevron-down').toggleClass('fa fa-chevron-right');
});

$('#collapseTwo_arrow').click(function() {
  $(this).find('i').toggleClass('fa fa-chevron-down').toggleClass('fa fa-chevron-right');
});

$('#collapseThree_arrow').click(function() {
  $(this).find('i').toggleClass('fa fa-chevron-down').toggleClass('fa fa-chevron-right');
});

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v3.2';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
