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
    
    // API lấy lịch sử commit của folder này
    const commitUrl = `https://api.github.com/repos/${owner}/${repo}/commits?path=${path}`;

    try {
        const res = await fetch(commitUrl);
        const commits = await res.json();

        if (!Array.isArray(commits)) return;

        // Dùng Set để tránh trùng lặp nếu một file được sửa nhiều lần
        const seenFiles = new Set();
        const container = document.getElementById(containerId);
        container.innerHTML = "";

        // Duyệt qua các commit (GitHub đã sắp xếp commit mới nhất lên đầu)
        for (const commit of commits) {
            // Lấy chi tiết từng commit để biết file nào đã thay đổi
            const detailRes = await fetch(commit.url);
            const detail = await detailRes.json();

            detail.files.forEach(file => {
                // Kiểm tra nếu file thuộc folder đang tìm và chưa hiển thị
                if (file.filename.startsWith(path) && !seenFiles.has(file.filename)) {
                    
                    const fileName = file.filename.split('/').pop();
                    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${file.filename}`;

                    // Lọc theo định dạng ảnh
                    if (type === "image" && fileName.match(/\.(jpg|jpeg|png|webp)$/i)) {
                        renderImage(container, rawUrl);
                        seenFiles.add(file.filename);
                    }
                    
                    // Lọc theo định dạng video
                    if (type === "video" && fileName.endsWith(".mp4")) {
                        renderVideo(container, rawUrl);
                        seenFiles.add(file.filename);
                    }
                }
            });
            
            // Giới hạn số lượng file hiển thị để tránh load quá lâu (ví dụ: 10 file mới nhất)
            if (seenFiles.size >= 15) break;
        }
    } catch (e) {
        console.error("Lỗi:", e);
    }
}

// Hàm bổ trợ để vẽ giao diện
function renderImage(container, url) {
    const img = document.createElement("img");
    img.src = url;
    img.onclick = () => {
        navigator.clipboard.writeText(url);
        showToast("Đã copy link ảnh!");
    };
    container.appendChild(img);
}

function renderVideo(container, url) {
    const video = document.createElement("video");
    video.src = url;
    video.controls = true;
    video.onclick = () => {
        navigator.clipboard.writeText(url);
        showToast("Đã copy link video!");
    };
    container.appendChild(video);
}