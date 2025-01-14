const nums = [
    document.getElementById("num-0"),
    document.getElementById("num-1"),
    document.getElementById("num-2"),
    document.getElementById("num-3"),
    document.getElementById("num-4"),
    document.getElementById("num-5"),
    document.getElementById("num-6"),
    document.getElementById("num-7"),
    document.getElementById("num-8"),
    document.getElementById("num-9"),
]

const percentageCalculationBtn = document.querySelector("#percentage-calculation-btn")
const multiplicationBtn = document.querySelector("#multiplication-btn")
const subtractionBtn = document.querySelector("#subtraction-btn")
const additionBtn = document.querySelector("#addition-btn")
const floatingPointBtn = document.querySelector("#floating-point-btn")
const equalToBtn = document.querySelector("#equal-to-btn")
const divitionBtn = document.querySelector("#divition-btn")

const deletBtn = document.querySelector("#delet-btn")
const toneTransitionBtn= document.querySelector("#tone-transition-btn")

const precentDisPlay = document.querySelector("#precent-display")
const pastDisPlay = document.querySelector("#past-display")

deletBtn.addEventListener("click",removeFromExpration)
nums.forEach( (num)=>{
    num.addEventListener("click",()=>{
        addToPrecentDisPlay(Number(num.innerText))
    })
} )

percentageCalculationBtn.addEventListener("click",()=>{
    addToPrecentDisPlay("%")
})
multiplicationBtn.addEventListener("click",()=>{
    addToPrecentDisPlay("*")
})
subtractionBtn.addEventListener("click",()=>{
    addToPrecentDisPlay("-")
})
additionBtn.addEventListener("click",()=>{
    addToPrecentDisPlay("+")
})
divitionBtn.addEventListener("click",()=>{
    addToPrecentDisPlay("/")
})
floatingPointBtn.addEventListener("click",()=>{
    addToPrecentDisPlay(".")
})
toneTransitionBtn.addEventListener("click",()=>{
    toneTransition()
})
equalToBtn.addEventListener("click",()=>{
    pasExpration = expration.slice()
    pastDotIndicationArray = dotIndicationArray.slice()
    expras()
    randerExpration(pasExpration, pastDisPlay)

})
pastDisPlay.addEventListener("click",()=>{
    let ex = pasExpration
    let dotArray = pastDotIndicationArray

    reset()

    expration = ex
    dotIndicationArray = dotArray
    randerExpration(expration, precentDisPlay)
})




let expration = [0]
let pasExpration = [0]
let dotIndicationArray = [false]
let pastDotIndicationArray = [false]


randerExpration(expration, precentDisPlay)
function addToPrecentDisPlay(inputValue){

    if(pastDisPlay.textContent != "") {
        deletBtn.textContent="⬅️"
        deletBtn.removeEventListener("click",reset)
        deletBtn.addEventListener("click", removeFromExpration)
   
        pastDisPlay.textContent = ""
        pasExpration = []
        pastDotIndicationArray=[]
        if(!isNaN(inputValue)){
            reset()
        }
    }

    addToExpration(inputValue)
    randerExpration(expration, precentDisPlay)
    precentDisPlay.scrollLeft = precentDisPlay.scrollWidth

}
function addToExpration(inputValue){

    if(!isNaN(inputValue)){
        //input is number 
        if( !isNaN(expration[expration.length-1])  ){
            //last value is also a number
            expration[expration.length-1] = (expration[expration.length-1]*10)+inputValue

        }else{
            //last value is not a number
            expration.push(inputValue)
            dotIndicationArray.push(dotIndicationArray[dotIndicationArray.length-1])
        }
    }else{
         //input is not a number 
        if( !isNaN(expration[expration.length-1])  ){
            //last value is  a number
             //input is not a number 
            if(inputValue == "."){

                if(dotIndicationArray[dotIndicationArray.length-1] == true){
                    //already floting point added we can't add secound
                    
                
                }else{
                    // ad first floting point 
                    expration.push(inputValue)
                    dotIndicationArray.push(true)
                }

            }else{
                    expration.push(inputValue)
                    dotIndicationArray.push(false) // new value start
                
            }
            
        }else{
            //last value not a number
            //input is not a number 

            if(inputValue == "."){

                if( expration[expration.length-1] =="." ){

                }else{
                    expration.push(0)
                    dotIndicationArray.push(false)
                    expration.push(inputValue)
                    dotIndicationArray.push(true)
                }

            }else if(inputValue == "%"  ){
                //last value not a number
                //input is %
                if(expration[expration.length-1]=="%"){
                    //last value  is %
                    //input is %
                    expration.push(inputValue)
                    dotIndicationArray.push(false)
                }else{
                    //last value  is not % not number
                    //input is %

                    expration[expration.length-1]=inputValue
                }

            }else{
                  //last value not a number
                //input is % not a number
                 expration[expration.length-1]=inputValue
            }
            
            
        }
    }

   
}
function reset(){
    expration = [0]
    pasExpration = [0]
    pastDotIndicationArray=[]
    dotIndicationArray = [false]
    pastDisPlay.textContent = ""
    precentDisPlay.textContent = "0"

    deletBtn.textContent="⬅️"
    deletBtn.removeEventListener("click",reset)
    deletBtn.addEventListener("click", removeFromExpration)
   

}
function removeFromExpration(){
    
    if( !isNaN(expration[expration.length-1])  ){
        //last value is number
        if(expration[expration.length-1] < 0  ){
            //last velu is nagative
            expration[expration.length-1] =  -(Math.floor( (-expration[expration.length-1])/10))

        }else{
            //last velu is positive
            expration[expration.length-1] =  Math.floor(expration[expration.length-1]/10)
        }
        if(expration[expration.length-1] == 0){
            expration.pop()
            dotIndicationArray.pop()
        }
    
        

    }else{
        expration.pop()
        dotIndicationArray.pop()

    }

    if(expration.length == 0 ){
        expration.push(0)
        dotIndicationArray.push(false)

    }
    randerExpration(expration, precentDisPlay)
    
}
function randerExpration(expra,display){
    display.textContent = ""
    // expration.forEach( (value)=>{

    //     if(!isNaN(value) && value < 0){
    //         precentDisPlay.textContent += `(${value})`
    //     }else{

    //         precentDisPlay.textContent += value
    //     }
        

    // } )

    for( let i = expra.length-1 ; i>=0; --i){
        
        if(!isNaN(expra[i]) && expra[i] < 0){
            //nagtive number
            display.textContent = `(${expra[i]})`+display.textContent
        }else{
            //not a number
            if( expra[i] == "%" ){
                if( i == expra.length-1 ||  isNaN(expra[i+1])   ){
                    //after  element is not number
                    let  j= i, count = 0 
                    while(expra[j]=="%"){
                        ++count;
                        --j;

                    }
                    
                    let count1  = count, count2 = 0 
                    while(count1 != 1 ){
                        display.textContent = `)${expra[i]}` + display.textContent
                        ++count2
                        --count1
                        --i
                    }
                    --i
                    display.textContent = `${expra[i]}%` + display.textContent
                   
                    while(count2 !=0){
                        display.textContent = `(` + display.textContent
                        --count2
                    }

                }

            }else{
                display.textContent = expra[i] + display.textContent

            }
        } 
    }
}
function toneTransition(){

    if(isNaN(expration[expration.length-1])){
        return 
    }

    expration[expration.length-1] *= -1
    randerExpration(expration, precentDisPlay)


}
function  expras(){
    
    deletBtn.textContent="AC"
    deletBtn.removeEventListener("click",removeFromExpration)
    deletBtn.addEventListener("click",reset)

    for(let i = 1 ; i < expration.length ; ++i){
        if( expration[i] == "%" && ( (i == expration.length-1) || (isNaN(expration[i+1])) ) ){
            let answer = evel(expration[i-1],expration[i],expration[i])
            expration.splice( i-1, 2, answer )
            --i
        }
    }

    for(let i = 1 ; i < expration.length ; ++i){
        if( expration[i] == "*" || expration[i] == "/" || expration[i] == "%" ){
            if(i == expration.length-1){
                break
            }

            let answer = evel(expration[i-1],expration[i],expration[i+1])
            console.log(`answer: ${answer}`)
           expration.splice( i-1, 3, answer )
            // expration.slice( i-1, 3, answer 
            --i

        }
    }

    for(let i = 1 ; i < expration.length ; ++i){
        if( expration[i] == "+" || expration[i] == "-" ){
            if(i == expration.length-1){
                break
            }

            let answer = evel(expration[i-1],expration[i],expration[i+1])
            expration.splice( i-1, 3, answer )
            --i

        }
    }
    
   randerExpration(expration, precentDisPlay)
}


const sumation = (val1, val2) => val1+val2
const subtraction = (val1, val2) => val1-val2
const multiplication = (val1, val2) => val1*val2
const divition = (val1, val2) => val1/val2
const percentageCalculation = (val1, val2) => val1%val2
const percentage = (val1) => val1/100


function evel(value1, operator, value2){
    let answer 
    switch(operator){
        case '+':
        answer = sumation(value1, value2)
        break
           
        case '-':
        answer = subtraction(value1, value2)
        break

        case '*':
        answer = multiplication(value1, value2)
        break

        case '/':
        answer = divition(value1, value2)
        break

        case '%':
            if(value2=="%"){
                answer= percentage(value1)
            }else{
                answer = percentageCalculation(value1, value2)
            }
        
        break


    }

    return answer
}
