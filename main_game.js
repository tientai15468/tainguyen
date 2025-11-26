function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.opacity = "1";

    setTimeout(() => {
        toast.style.opacity = "0";
    }, 1500);
}
const gameEmojis = [
    // Gaming chung
    "🎮","🕹️","👾","🧩","🔫","⚔️","🛡️","💣","💥","🔥","⭐","🌟","🏆","🎯","🚀","🎲","🎰",

    // Đua xe & tốc độ
    "🏍️","🏎️","🚗","🚙","🛵","🚦","🏁","💨","🔥",

    // Thể thao
    "⚽","🏀","🏈","🎾","🥊","🥋","🥅","⛳","🏓","🏸",

    // Phiêu lưu – Fantasy
    "🐉","🧙‍♂️","🧙‍♀️","🧝‍♂️","🧝‍♀️","🧟","🧛","🧚","👑","🗡️","🏹","🪄",

    // FPS / Bắn súng / Chiến đấu
    "🔫","💣","🎯","🪖","🛡️","🚁","🚓","🔪","🧨",

    // Sci-fi / Không gian
    "👽","🛸","🌌","🔭","🛰️",

    // Arcade / Retro
    "🟦","🟥","🟧","🟩","🟪","📼","💾",

    // Platformer / Jump game
    "🦘","🪜","🧗","🎈","🪂",

    // RPG / MMO
    "💠","💎","🔮","📜","🏺","⚱️","🧪","🗝️","🛒",

    // Animals – dùng cho game cute
    "🐱","🐶","🐻","🐧","🐰","🐸","🐵","🦊","🐼","🐮",

    // Horror / Dark game
    "👻","💀","🩸","🧟","🕸️","🕷️"
];
function getRandomEmoji() {
    return gameEmojis[Math.floor(Math.random() * gameEmojis.length)];
}

async function loadFolders(path, containerId) {
    const owner = "tientai15468";
    const repo = "tainguyen";
    const branch = "main";

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;

    const res = await fetch(url);
    const items = await res.json();

    if (!Array.isArray(items)) {
        console.error("API error:", items);
        return;
    }

    const container = document.getElementById(containerId);

    items.forEach(item => {
        if (item.type === "dir") {
            const div = document.createElement("div");
            div.className = "folder-item";
div.innerHTML =  `${getRandomEmoji()}<br>${item.name}`;;
            div.onclick = () => {
                navigator.clipboard.writeText("https://tientai15468.github.io/tainguyen/" + item.path);
                showToast("Đã copy tên folder!");
            };

            container.appendChild(div);
        }
    });
}

// GỌI HÀM
loadFolders("gameandroid", "folder-list");
