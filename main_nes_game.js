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

    if (!Array.isArray(items)) return;

    const container = document.getElementById(containerId);

    for (const item of items) {
        if (item.type === "dir") {

            // Card container
            const card = document.createElement("div");
            card.className = "folder-card";

            // Default thumb (fallback emoji)
            card.innerHTML = `
                <img class="folder-thumb" src="" alt="">
                <div class="folder-name">${item.name}</div>
            `;

            const thumb = card.querySelector(".folder-thumb");

            // Load logo.webp trong folder
            const folderUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${item.path}?ref=${branch}`;
            const subRes = await fetch(folderUrl);
            const subItems = await subRes.json();

            const logo = subItems.find(f => f.name.toLowerCase() === "logo.webp");

            if (logo) {
                thumb.src = logo.download_url;
            } else {
                // Nếu không có logo.webp → emoji random
                thumb.style.display = "flex";
                thumb.style.alignItems = "center";
                thumb.style.justifyContent = "center";
                thumb.style.fontSize = "40px";
                thumb.style.background = "#555";
                thumb.src = "";
                thumb.outerHTML = `<div class="folder-thumb">${getRandomEmoji()}</div>`;
            }

            // Click để copy path
            card.onclick = () => {
                navigator.clipboard.writeText("https://tientai15468.github.io/tainguyen/" +item.path);
                showToast("Đã copy đường dẫn folder!");
            };

            container.appendChild(card);
        }
    }
}

// GỌI HÀM
loadFolders("nes_game", "folder-list");
