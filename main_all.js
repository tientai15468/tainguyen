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

    try {
        const res = await fetch(url);
        let files = await res.json();

        if (!Array.isArray(files)) {
            console.error("API error:", files);
            return;
        }

        // --- BẮT ĐẦU SẮP XẾP ---
        // Nếu bạn đặt tên file có chứa ngày tháng hoặc số tăng dần, 
        // dùng reverse() là cách tối ưu nhất về hiệu suất.
        files.reverse(); 
        // -----------------------

        const container = document.getElementById(containerId);
        container.innerHTML = ""; // Xóa nội dung cũ nếu cần

        files.forEach(file => {
            if (file.type === "file") {
                // Xử lý LOAD ẢNH
                if (type === "image" && file.name.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
                    const img = document.createElement("img");
                    img.src = file.download_url;
                    img.loading = "lazy"; // Tối ưu tốc độ tải trang

                    img.onclick = () => {
                        navigator.clipboard.writeText(file.download_url);
                        showToast("Đã copy link ảnh!");
                    };
                    container.appendChild(img);
                }

                // Xử lý LOAD VIDEO
                if (type === "video" && file.name.endsWith(".mp4")) {
                    const video = document.createElement("video");
                    video.src = file.download_url;
                    video.controls = true;

                    // Đối với video, thường dùng nút copy riêng hoặc click phải, 
                    // vì click vào video thường là để Play.
                    video.onplay = () => {
                         navigator.clipboard.writeText(file.download_url);
                         showToast("Đã copy link video!");
                    };
                    container.appendChild(video);
                }
            }
        });
    } catch (error) {
        console.error("Fetch error:", error);
    }
}