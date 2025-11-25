function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.opacity = "1";

    setTimeout(() => {
        toast.style.opacity = "0";
    }, 1500);
}

async function loadFiles(path, containerId) {
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
            const img = document.createElement("img");
            img.src = file.download_url;

            // Khi bấm vào ảnh → copy link
            img.onclick = () => {
                navigator.clipboard.writeText(file.download_url);
                showToast("Đã copy link ảnh!");
            };

            container.appendChild(img);
        }
    });
}

loadFiles("image", "image-list");
