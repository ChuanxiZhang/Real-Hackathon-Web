new Vue({
  el: '#item_vue',
  data: {
    list:[],
    favorList:[],
    historyList:[]
  },
  methods:{
    getList(){
      for(var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) != "favor" && localStorage.key(i) != "history") {
            this.list.push(...JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    },
    getFavor(){
      this.favorList = JSON.parse(localStorage.getItem("favor"));
    },
    getHistory(){
      this.historyList = JSON.parse(localStorage.getItem("history"));
    }
  },
  created() {

  }
});

$('#collapseOne').click(function() {
  $(this).find('i').toggleClass('fa fa-chevron-right').toggleClass('fa fa-chevron-down');
});