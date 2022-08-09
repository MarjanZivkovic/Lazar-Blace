//Map embeed 
const myMap = L.map("map",{
    attributionControl: false
})

myMap.setView([43.2955, 21.2900], 15)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(myMap);

const mainMarker = L.marker([43.2959, 21.2965]).addTo(myMap)
mainMarker.bindTooltip(`<img src="img/logo.png" alt="logo" width="30"> <br> <b>Mlekara Lazar d.o.o.</b> <br> Kralja Petra I  br.6 <br> 18420 Blace <hr>
                        Proizvodnja <br> Uprava <br> Magacin`)


//Go to top
const goToTopBtn = document.querySelector(".go-to-top")  

function goToTop(){
    if( (document.body.scrollTop > 700) || (document.documentElement.scrollTop > 700 )){
        goToTopBtn.style.display = "block"
    } else {
        goToTopBtn.style.display = "none"
    }
}

window.addEventListener("scroll", goToTop)

//Navigation menu
const hamburgerBtn = document.querySelector(".hamburger")
const sideNav = document.querySelector(".side-nav") 
const hamburgerIcon = document.querySelector(".ham-toggle")

hamburgerBtn.addEventListener("click", () =>{
    sideNav.classList.toggle("shown")
    if ( hamburgerIcon.childNodes[0].classList.contains("fa-bars")){
        hamburgerIcon.childNodes[0].classList.remove("fa-bars")
        hamburgerIcon.childNodes[0].classList.add("fa-times")
    } else {
        if ( hamburgerIcon.childNodes[0].classList.contains("fa-times") ){
            hamburgerIcon.childNodes[0].classList.remove("fa-times")
            hamburgerIcon.childNodes[0].classList.add("fa-bars")
        }
    }
})

//Current year
const currentYear = document.querySelectorAll(".current-year")
const date = new Date()
const year = date.getFullYear()

for (let i of currentYear) {
    i.innerText = year
}

//Counting numbers
const countNumbers = document.querySelectorAll(".big-num")
const bigNums1 = document.querySelector(".in-numbers-1")
const clickDownText = document.querySelectorAll(".click-text") 

function updateNumbers(){
    countNumbers.forEach((number) =>{
        const targets = +number.getAttribute("data-targetNum")
        const currentNum = +number.innerText

        let increment = 0.005
        if ( (targets > 900) && (targets < 10000) ){
            increment = 0.5
        } else {
            if ( targets >= 10000 ){
                increment = 30
            }
        }

        if ( currentNum < targets ){
            number.innerText = Math.ceil( currentNum + increment )
            setTimeout( updateNumbers , 2)
        } else {
            number.innerText = targets
        }
    })
}

bigNums1.addEventListener("mouseenter", () => {
    updateNumbers()
    clickDownText.forEach((text) => text.remove())
})


//Select language
const srbItems = document.querySelectorAll(".srb-item")
const engItems = document.querySelectorAll(".eng-item")
const selectButtons = document.querySelectorAll(".language")

engItems.forEach((item) =>{
    item.setAttribute("lang" , "en")
})

function showSerbian(){
    engItems.forEach((item) =>{
        item.classList.add("d-none")
    })
    srbItems.forEach((item) =>{
        item.classList.remove("d-none")
    })
}

function showEnglish(){
    srbItems.forEach((item) =>{
        item.classList.add("d-none")
    })
    engItems.forEach((item) =>{
        item.classList.remove("d-none")
    })
}

selectButtons.forEach((button) => {
    button.addEventListener("change", () =>{
        if ( button.value == "eng" ){
            showEnglish()
            localStorage.setItem("chosen-lang", button.value)
            button.children[1].selected = true
        } else {
            showSerbian()
            localStorage.setItem("chosen-lang", button.value )
        }
    })
})

//getting lnguage from LS
let chosenLang = localStorage.getItem("chosen-lang")
if( chosenLang === "eng"){
    showEnglish()
    selectButtons.forEach((button) =>{
        button.children[1].selected = true
    })
} else {
    showSerbian()
}
