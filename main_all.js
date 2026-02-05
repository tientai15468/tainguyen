function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.opacity = "1";

    setTimeout(() => {
        toast.style.opacity = "0";
    }, 1500);
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

                thumb.src = "https://tientai15468.github.io/tainguyen/"+item.path+"/logo.webp";
         
            // Click để copy path
            card.onclick = () => {
                navigator.clipboard.writeText("https://tientai15468.github.io/tainguyen/" +item.path);
                showToast("Đã copy đường dẫn folder!");
            };

            container.appendChild(card);
        }
    }
}


async function loadFiles(path, containerId, type) {
    const owner = "tientai15468";
    const repo = "tainguyen";
    const branch = "main";

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;

    const res = await fetch(url);
    const files = await res.json();

    if (!Array.isArray(files)) {
        console.error("API error:", files);
        return;
    }

    const container = document.getElementById(containerId);

    files.forEach(file => {
        if (file.type === "file") {

            // LOAD ẢNH
            if (type === "image" && file.name.match(/\.(jpg|jpeg|png|webp)$/i)) {
                const img = document.createElement("img");
                img.src = file.download_url;

                img.onclick = () => {
                    navigator.clipboard.writeText(file.download_url);
                    showToast("Đã copy link ảnh!");
                };

                container.appendChild(img);
            }

            // LOAD VIDEO
            if (type === "video" && file.name.endsWith(".mp4")) {
                const video = document.createElement("video");
                video.src = file.download_url;
                video.controls = true;

                video.onclick = () => {
                    navigator.clipboard.writeText(file.download_url);
                    showToast("Đã copy link video!");
                };

                container.appendChild(video);
            }
        }
    });
} 
