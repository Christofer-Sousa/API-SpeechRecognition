let btn = document.querySelector(".btn");
let textarea = document.querySelector(".textarea");

const recognition = creatRecognition() 
let listening = false;

btn.addEventListener("click", e => {
    if(!recognition) return;

    listening ? recognition.stop() : recognition.start();

    btn.innerHTML = listening ? 'Aperte para falar' : 'Parar de escutar'

    btn.classList.toggle("btn")
    btn.classList.toggle("btnHover")
})


function creatRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition != undefined ? new SpeechRecognition() : null

    if(!recognition) {
        textarea.innerHTML = "Speech Recognition is no found!"
        return
    }

    recognition.lang = "pt_BR"

    recognition.onstart = () => listening = true;
    recognition.onend = () => listening = false;
    recognition.onerror = e => console.log("error", e)
    recognition.onresult = e => textarea.innerHTML = e.results[0][0].transcript
    
    return recognition
}