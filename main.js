async function loadFiles(path, containerId) {
    const owner = "tientai15468";
    const repo = "tainguyen";
    const branch = "main"; // quan trọng

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
            container.appendChild(img);
        }
    });
}

loadFiles("image", "image-list");
