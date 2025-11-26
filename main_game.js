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

            const folderDiv = document.createElement("div");
            folderDiv.className = "folder-item";

            // Mặc định emoji random
            let emoji = getRandomEmoji();

            // HTML ban đầu (emoji + tên folder)
            folderDiv.innerHTML = `
                <div class="folder-logo">${emoji}</div>
                <div class="folder-name">${item.name}</div>
            `;

            container.appendChild(folderDiv);

            // Kiểm tra xem folder có file logo.webp không
            const folderUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${item.path}?ref=${branch}`;
            const subRes = await fetch(folderUrl);
            const subItems = await subRes.json();

            const logoFile = subItems.find(f => f.name.toLowerCase() === "logo.webp");

            if (logoFile) {
                // Nếu có logo.webp thì thay emoji bằng ảnh
                folderDiv.querySelector(".folder-logo").innerHTML =
                    `<img src="${logoFile.download_url}" class="logo-img">`;
            }

            // Click để copy đường dẫn
            folderDiv.onclick = () => {
                navigator.clipboard.writeText("https://tientai15468.github.io/tainguyen/" +item.path);
                showToast("Đã copy tên folder!");
            };
        }
    }
}

// GỌI HÀM
loadFolders("gameandroid", "folder-list");
