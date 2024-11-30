function inputButton(set){
  var setting = set.value
  if (setting == "admin")
    window.location.href = "admin.html"
}


function filterNews(category) {
  const newsItems = document.querySelectorAll('.news-item');
  newsItems.forEach(item => {
    if (category === 'all' || item.classList.contains(category)){
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  })
}
filterNews('all')




