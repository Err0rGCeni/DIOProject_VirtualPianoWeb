const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.getElementById("volume-range")
const keysCheck = document.getElementById("keys-check")
let mapedKeys = []
let audio = new Audio();

const getRandomPosition = (max) => {
    return Math.floor((Math.random() * max) - (max / 2));
}

const floatingNote = async (refNode) => {
    const rect = refNode.getBoundingClientRect();
    console.log(rect)

    // Cria o elemento da nota musical
    const floating = document.createElement("span");
    floating.style.position = "absolute";
    floating.style.zIndex = 99;
    floating.style.height = "40px";
    floating.style.width = "40px";
    floating.style.fontSize = "2rem";
    floating.style.lineHeight = "40px";
    floating.style.textAlign = "center"
    floating.style.color = getComputedStyle(refNode).color;
    floating.style.transition = "all 1s ease";
    floating.style.top = `${rect.y + (rect.height / 2) - 20}px`;
    floating.style.left = `${rect.x + (rect.width / 2) - 20}px`;
    floating.textContent = "♪";

    // Adiciona a nota musical ao body
    document.body.appendChild(floating);

    // Movimenta a nota para uma nova posição aleatória
    setTimeout(() => {
        floating.style.top = `${rect.top + getRandomPosition(refNode.offsetHeight * 2)}px`;
        floating.style.left = `${rect.left + getRandomPosition(refNode.offsetWidth * 2)}px`;
        floating.style.transform = "scale(2)";
        floating.style.opacity = "0";
    }, 100);

    // Remove a nota após 1 segundo
    setTimeout(() => {
        document.body.removeChild(floating);
    }, 1000);
};

const playTune = async (key) => {
    try {
        audio.src = `src/tunes/${key}.wav`;
        await audio.play();
        const clicked = document.querySelector(`[data-key="${key}"]`);
        clicked.classList.add("active")
        setTimeout(()=>{
            clicked.classList.remove("active")
        },150)
        floatingNote(clicked);
    } catch (error) {
        console.warn(error)
    }
};

const handleVolume = (e) => {
    audio.volume = e.target.value;
}

const toggleKeys = () => {
    pianoKeys.forEach((key) => {
        key.classList.toggle("hide")
    })
}

pianoKeys.forEach((key) => {
    key.addEventListener("click", async () => playTune(key.dataset.key));
    mapedKeys.push(key.dataset.key)
});

document.addEventListener("keydown", (e) => {
    if(mapedKeys.includes(e.key)) {
        playTune(e.key)
    }
});

volumeSlider.addEventListener("input", handleVolume)

keysCheck.addEventListener("click", toggleKeys)