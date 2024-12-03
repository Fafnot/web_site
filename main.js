function inputButton(set){
  var setting = set.value
  if (setting == "admin")
    window.location.href = "admin.html"
}

function filterCards(category) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
filterCards('all')


function registor(){
    window.location.href = "registor.html"
}


