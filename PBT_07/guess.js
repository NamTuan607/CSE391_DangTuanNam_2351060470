(function () {
    function startGuessGame() {
        const secretNumber = Math.floor(Math.random() * 100) + 1;
        const guessedNumbers = [];
        let attempts = 0;

        while (attempts < 7) {
            const input = prompt(`Lần ${attempts + 1}/7: Nhập số từ 1 đến 100`);

            if (input === null) {
                return;
            }

            const guess = Number(input);

            if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
                alert("Vui lòng nhập số nguyên từ 1 đến 100!");
                continue;
            }

            let hasGuessedBefore = false;
            for (let i = 0; i < guessedNumbers.length; i++) {
                if (guessedNumbers[i] === guess) {
                    hasGuessedBefore = true;
                    break;
                }
            }

            if (hasGuessedBefore) {
                alert("Bạn đã đoán số này rồi!");
                continue;
            }

            guessedNumbers.push(guess);
            attempts++;

            if (guess < secretNumber) {
                alert("Cao hơn");
                continue;
            }

            if (guess > secretNumber) {
                alert("Thấp hơn");
                continue;
            }

            alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
            return;
        }

        alert(`Bạn đã thua! Đáp án là ${secretNumber}.`);
    }

    if (typeof window !== "undefined") {
        window.startGuessGame = startGuessGame;
    }

    if (typeof module !== "undefined") {
        module.exports = { startGuessGame };
    }
})();