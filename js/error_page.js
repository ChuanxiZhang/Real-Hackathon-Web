function dosearch() {
  var sf = document.searchform;
  var submitto = sf.sengine.value + escape(sf.searchterms.value);
  window.location.href = submitto;
  return false;
}
