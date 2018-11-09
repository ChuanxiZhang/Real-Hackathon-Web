new Vue({
  el: '#item_vue',
  data: {
    list:[],
    favorList:[]
  },
  methods:{
  getList(){
    for(var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) != "favor") {
          this.list.push(...JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
    }
  },
  getFavor(){
    this.favorList = JSON.parse(localStorage.getItem("favor"));
  },
  },
  created() {

  }
});
