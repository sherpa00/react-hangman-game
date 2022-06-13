const WORDS = [
    "computer",
    "plane",
    "laptop",
    "coin",
    "money",
    "python",
    "swift",
    "golang",
    "rice",
    "chair"
];

function getRandom() {
    let randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    return randomWord;
};

export { getRandom };