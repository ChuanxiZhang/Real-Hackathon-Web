<?php
  header('Content-type: text/json; charset=utf-8');
  header("Access-Control-Allow-Origin: *");
  $site = 'https://www.food2fork.com/api/';

  function url_strs(){
    $key = 'c7750344bf3167cd778f59f96ac4a5d0';
    if (isset($_GET['search'])) {
      $query = $_GET['search'];
      return "search?key=".$key."&q=".$query[0]."&page=".$query[1];
    }
    if (isset($_GET['get'])) {
      $query = $_GET['get'];
      return "get?key=".$key."&rId=".$query[0]."&usertype=".$query[1]."&sort=".$query[2];
    }
  }

  $site.=url_strs();

  echo file_get_contents($site);
?>
