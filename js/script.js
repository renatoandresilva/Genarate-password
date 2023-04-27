// seleção de elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatePasswordElemente = document.querySelector("#generated-password");

// novas funcionalidades
const openCloseGeneratorPassword = document.querySelector("#open-generate-password")
const generatePasswordContainer = document.querySelector("#generate-options")
const lengthInput = document.querySelector("#length")
const lettersInput = document.querySelector("#letters")
const numbersInput = document.querySelector("#numbers")
const symbolInput = document.querySelector("#symbol")
const copyPasswordBtn = document.querySelector("#copy-password")

// funções
const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
    
    const symbol = "(){}[]=<>/,.:;*+-#@$%¨&_-§!'°?ºª°₢";
    
    return symbol[Math.floor(Math.random() * symbol.length)];
};

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {
    
    let password = "";

    // Segunda versão
    const passwordLength = +lengthInput.value;
    
    const generators = [];

    if(lettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase);
    }

    if(numbersInput.checked) {
        generators.push(getNumber);
    }

    if(symbolInput.checked) {
        generators.push(getSymbol);
    }

    if(generators.length === 0){
        return;
    }

    for(i = 0; i < passwordLength; i = i + generators.length) {

        generators.forEach(() => {
            
            const randomValue = generators[Math.floor(Math.random() * generators.length)]();

            password += randomValue;
        });
    }   

    password = password.slice(0, passwordLength);

    console.log(password)

    generatePasswordElemente.style.display = "block";
    generatePasswordElemente.querySelector("h4").innerText = password;

}


// eventos
generatePasswordButton.addEventListener("click", () => {
    
   generatePassword(
    getLetterLowerCase, 
    getLetterUpperCase,
    getNumber, getSymbol);
});

openCloseGeneratorPassword.addEventListener("click", () => {
    
    generatePasswordContainer.classList.toggle("hide");
});

copyPasswordBtn.addEventListener("click", (e) => {
    e.preventDefault;

   const password = generatePasswordElemente.querySelector("h4").innerText;

    navigator.clipboard.writeText(password).then(() => {
        copyPasswordBtn.innerText = "senha copiada com sucesso!"; 

        setTimeout(() => {
            copyPasswordBtn.innerText = "Copiar";
        }, 1000); 
   });   
   
});