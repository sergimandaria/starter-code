const jselements = document.querySelectorAll(".js-el")
const contents = document.querySelectorAll(".contents")
const assets = document.querySelectorAll(".jschild")

const jschild = document.querySelector(".child-2")
const jschild1 = document.querySelector(".child-1")
const hidden = document.querySelector(".hidden")
const button1 = document.querySelector(".jsel5")
const button2 = document.querySelector(".jsel6")
const question = document.querySelector(".question")
const count = document.querySelector(".count")
const  switchs = document.querySelector(".switch")
const htmel = document.querySelector ("[data-theme]")
const progress  = document.getElementById("file")
const finish = document.querySelector(".finish")
const correct = document.querySelector(".correct")
const restartBt = document.querySelector(".restart")

const finalscore = document.querySelector(".finalscore")

let correctAnswers = 0;
 
let getinfo = localStorage.getItem("theme")
  if (getinfo === 'dark') { 
     htmel.setAttribute(`data-theme`,"dark") 
      
  }
switchs.addEventListener ("change", () => {
  const currentTheme = htmel.getAttribute("data-theme")
  if (currentTheme === "light") {
   htmel.setAttribute(`data-theme`,"dark")
  } else [
     htmel.setAttribute(`data-theme`,"light")
  ]
  
  const gettheme =  currentTheme === "dark" ? "light" :"dark"
   localStorage.setItem("theme",  gettheme)
})


const apiurl = "https://quiz-api-topaz.vercel.app/api/v1/questions"
const getData = async () => {
  try {
    
  
 const responce = await fetch (apiurl);
 const user = await responce.json();
 let   click = 0;
 let   prev = null;
 let   qwcount = 0;
 let   choice = null;
  for (let i = 0; i < jselements.length; i++) {   
   jselements[i].addEventListener ("click", () => {
    
    
  
    
    if (click === 0) {    
    click ++;
    choice = i;
    firstclick(user[i])
    allLogo()
    }else {
      if (i < 4) {
        if (prev !== null) {
         jselements[prev].style.border = "none"
        }
        prev = i;
        jselements[i].style.border = "solid 4px #a729f5";
      
        
        
      }
      else if (i === 5) {
      console.log(prev);
    checkAnswers(prev,user[choice].questions[qwcount])
    qwcount++;
    
    }  else if (i === 4) {
     nextQuestion(qwcount,user[choice],prev)
     count.textContent = qwcount + 1
     progress.value = parseInt(progress.value) +1
    }
    }
   }) 
  
 }
} catch (error) {   
    console.error(error)
  }
}
getData()

const firstclick = (opinionk) => {
question.textContent=opinionk.questions[0].question
contents[0].textContent=opinionk.questions[0].options[0]
contents[1].textContent=opinionk.questions[0].options[1]
contents[2].textContent=opinionk.questions[0].options[2]
contents[3].textContent=opinionk.questions[0].options[3]
jschild1.style.display = "none"
hidden.style.display = "block"
button2.style.display = "block"
}




const checkAnswers = (last,question) => {
  if (question.options[last] === question.answer) {
    correctAnswers++;
     jselements[last].style.border = "solid 4px rgb(30, 220, 12)";
  } else {
     jselements[last].style.border = "solid 4px rgb(220, 30, 12)";
  }
  if (progress.value === 10) {
      result()
      return;
    }
  checkButtons()
}

const checkButtons = () => {
  if (button2.style.display === "block") {
    button2.style.display = "none"
    button1.style.display = "block"
  } else {
     button1.style.display = "none"
     button2.style.display = "block"
     
  }
}

const nextQuestion = (count,opinionk,lastBorder) => {
question.textContent=opinionk.questions[count].question
contents[0].textContent=opinionk.questions[count].options[0]
contents[1].textContent=opinionk.questions[count].options[1]
contents[2].textContent=opinionk.questions[count].options[2]
contents[3].textContent=opinionk.questions[count].options[3]
jselements[lastBorder].style.border = "none"
checkButtons()
}

const result = () => {
hidden.style.display = "none"
finish.style.display = "block"
jschild .style.display = "none"
correct.style.display = "block"
finalscore.textContent = `${correctAnswers}/10`;
restartBt.addEventListener("click", () => {
 window.location.href = "index.html"
})
}

const allLogo = () => {
  for (let index = 0; index < assets.length; index++) {
    assets[index].children[0].style.display = "none"
     assets[index].style.backgroundColor = "#babfbc"
     
        
  }
     assets[0].innerHTML = "A"
     assets[1].innerHTML = "B"
     assets[2].innerHTML = "C"
     assets[3].innerHTML = "D"
}





