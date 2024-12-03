var array_user = ["admin", "user", "other"]
var array_password = ["admin", "user", "other"]

function filterCards(category) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        };
    });
};
filterCards('all');


function registor(){
    window.location.href = "registor.html";
};

function checkForm(element) {
    var name = element.name.value;
    var pass = element.pass.value;
    var return_pass = element.return_pass.value;

    const reg = document.querySelectorAll(".registor");
    
    if (name == "" || pass == "" || return_pass == "") {
        
        alert("not work");        

    } else {
        for (var i = 0; i < array_user.length; i++){
            if (name == array_user[i] && pass == array_password[i] && return_pass == array_password[i]) {
                alert("yes");
                reg.forEach(button => button.remove());
                    
                break;
            } else {
                alert("no");
                reg.style.display = "block";
            }
        }
    }

    return false;
};

