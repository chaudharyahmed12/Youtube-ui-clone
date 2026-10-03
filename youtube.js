// ================= VIDEO DATA =================

const videos = [
    {
        id: 1,
        title: "JavaScript Full Course",
        channel: "Bro Code",
        category: "JavaScript",
        views: "5.7M views",
        time: "2 days ago",
        duration: "12:00:00",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900",
        description: "Complete JavaScript course for beginners covering variables, functions, objects, arrays, DOM and more."
    },
    {
        id: 2,
        title: "Best Music Mix 2026",
        channel: "Music World",
        category: "Music",
        views: "8.3M views",
        time: "5 days ago",
        duration: "16:18",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=900",
        description: "Relaxing music mix for studying, coding and working."
    },
    {
        id: 3,
        title: "Programming Roadmap",
        channel: "Code Academy",
        category: "Programming",
        views: "2.1M views",
        time: "1 week ago",
        duration: "18:42",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900",
        description: "A complete roadmap for beginners who want to start programming."
    },
    {
        id: 4,
        title: "Learn Data Science",
        channel: "Data World",
        category: "Data Science",
        views: "1.4M views",
        time: "3 days ago",
        duration: "20:04",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900",
        description: "Start your data science journey with Python, statistics, visualization and machine learning."
    },
    {
        id: 5,
        title: "Gaming Setup You Need in 2026",
        channel: "Gaming Zone",
        category: "Gaming",
        views: "3.2M views",
        time: "2 weeks ago",
        duration: "10:32",
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=900",
        description: "Gaming setup ideas, accessories and equipment for 2026."
    },
    {
        id: 6,
        title: "AI Engineer VS Software Engineer",
        channel: "Tech Talks",
        category: "AI",
        views: "850K views",
        time: "1 month ago",
        duration: "8:32",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900",
        description: "A comparison of skills, tools and career paths in AI engineering and software engineering."
    },
    {
        id: 7,
        title: "ReactJS Complete Course",
        channel: "Web Dev Academy",
        category: "Programming",
        views: "4.2M views",
        time: "1 month ago",
        duration: "9:20:15",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=900",
        description: "Learn React components, props, state, hooks and modern React development."
    },
    {
        id: 8,
        title: "JavaScript ES6+ Full Tutorial",
        channel: "JavaScript Hub",
        category: "JavaScript",
        views: "2.7M views",
        time: "3 weeks ago",
        duration: "5:44:20",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900",
        description: "Learn modern JavaScript including let, const, arrow functions, modules and more."
    },
    {
        id: 9,
        title: "Latest Tech News",
        channel: "Tech Daily",
        category: "News",
        views: "900K views",
        time: "1 day ago",
        duration: "12:22",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900", // same image as video 1, change if you want
        description: "The latest technology news and developments."
    },
    {
        id: 10,
        title: "Comedy Compilation",
        channel: "Comedy Central",
        category: "Comedy",
        views: "6.8M views",
        time: "6 days ago",
        duration: "15:40",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900",
        description: "A collection of funny moments and comedy clips."
    }
];


// ================= GET ELEMENTS =================

const menuBtn = document.querySelector("#menuBtn");
const sideBar = document.querySelector("#sidebar");
const sidebarOverlay = document.querySelector("#sidebarOverlay");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const clearSearchBtn = document.querySelector("#clearSearchBtn");
const videoGrid = document.querySelector("#videoGrid");
const emptyState = document.querySelector("#emptyState");
const videoCount = document.querySelector("#videoCount");
const pageHeading = document.querySelector("#pageHeading");
const categoryBar = document.querySelector("#categoryBar");

const defaultHeading = pageHeading.textContent;


// ================= LOCAL STORAGE =================

function loadList(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {
        return [];
    }
}

function loadObject(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || {};
    } catch (error) {
        return {};
    }
}

// Video lists store video IDs. Subscription stores channel names.
let likedVideos = loadList("likedVideos");
let dislikedVideos = loadList("dislikedVideos");
let savedVideos = loadList("savedVideos");
let watchLaterVideos = loadList("watchLaterVideos");
let downloadedVideos = loadList("downloadedVideos");
let watchHistory = loadList("history");
let subscription = loadList("subscription");
let comments = loadObject("comments");   // { videoId: [{ text, time }] }

function saveData() {
    localStorage.setItem("likedVideos", JSON.stringify(likedVideos));
    localStorage.setItem("dislikedVideos", JSON.stringify(dislikedVideos));
    localStorage.setItem("savedVideos", JSON.stringify(savedVideos));
    localStorage.setItem("watchLaterVideos", JSON.stringify(watchLaterVideos));
    localStorage.setItem("downloadedVideos", JSON.stringify(downloadedVideos));
    localStorage.setItem("history", JSON.stringify(watchHistory));
    localStorage.setItem("subscription", JSON.stringify(subscription));
    localStorage.setItem("comments", JSON.stringify(comments));
}

function removeFromList(list, value) {
    const index = list.indexOf(value);
    if (index !== -1) {
        list.splice(index, 1);
    }
}

// Adds the value if missing, removes it if already there. Returns true if added.
function toggleInList(list, value) {
    const index = list.indexOf(value);

    if (index === -1) {
        list.push(value);
        saveData();
        return true;
    }

    list.splice(index, 1);
    saveData();
    return false;
}


// ================= STATE =================

let currentPage = "home";
let currentQuery = "";
let currentCategory = "All";
let hiddenIds = [];        // "Not interested" videos (this session)
let currentVideo = null;   // video open in the player popup

const pageTitles = {
    home: defaultHeading,
    subscriptions: "Subscriptions",
    history: "Watch history",
    watchlater: "Watch later",
    liked: "Liked videos",
    downloads: "Downloads",
    saved: "Saved videos"
};

const listPages = ["history", "watchlater", "liked", "saved", "downloads"];


// ================= FILTERING =================

function idsToVideos(ids) {
    return ids
        .map(id => videos.find(video => video.id === id))
        .filter(Boolean);
}

function getPageVideos() {
    if (currentPage === "history") return idsToVideos(watchHistory);
    if (currentPage === "watchlater") return idsToVideos(watchLaterVideos);
    if (currentPage === "liked") return idsToVideos(likedVideos);
    if (currentPage === "saved") return idsToVideos(savedVideos);
    if (currentPage === "downloads") return idsToVideos(downloadedVideos);

    if (currentPage === "subscriptions") {
        return videos.filter(video => subscription.includes(video.channel));
    }

    return videos.filter(video => !hiddenIds.includes(video.id));
}

function getFilteredVideos() {
    return getPageVideos().filter(video => {

        const matchesCategory =
            currentPage !== "home" ||
            currentCategory === "All" ||
            video.category.toLowerCase() === currentCategory.toLowerCase();

        const matchesQuery =
            currentQuery === "" ||
            video.title.toLowerCase().includes(currentQuery) ||
            video.channel.toLowerCase().includes(currentQuery) ||
            video.category.toLowerCase().includes(currentQuery);

        return matchesCategory && matchesQuery;
    });
}

function updateHeading() {
    let title = pageTitles[currentPage];

    if (currentPage === "home" && currentCategory !== "All") {
        title = currentCategory;
    }

    if (currentQuery !== "") {
        title = currentPage === "home"
            ? `Search results for "${currentQuery}"`
            : `${title} - search: "${currentQuery}"`;
    }

    pageHeading.textContent = title;
}

function refresh() {
    updateHeading();
    displayVideos(getFilteredVideos());

    if (categoryBar) {
        categoryBar.style.display = currentPage === "home" ? "" : "none";
    }
}


// ================= DISPLAY VIDEOS =================

function displayVideos(videoList) {

    videoGrid.innerHTML = "";

    videoCount.textContent =
        `${videoList.length} ${videoList.length === 1 ? "video" : "videos"}`;

    if (videoList.length === 0) {
        emptyState.classList.add("show");
        return;
    }

    emptyState.classList.remove("show");

    const onListPage = listPages.includes(currentPage);

    videoList.forEach(video => {

        const card = document.createElement("article");
        card.classList.add("video-card");
        card.dataset.id = video.id;

        const firstLetter = video.channel.charAt(0);

        const lastButton = onListPage
            ? `<button data-action="remove">🗑 Remove from this list</button>`
            : `<button data-action="notinterested">❌ Not interested</button>`;

        card.innerHTML = `
            <div class="thumbnail">
                <img src="${video.image}" alt="${video.title}" loading="lazy">
                <span class="duration">${video.duration}</span>
            </div>

            <div class="video-info">
                <div class="channel-avatar">${firstLetter}</div>

                <div class="video-detail">
                    <h3 class="video-title">${video.title}</h3>
                    <p class="channel-name">${video.channel}</p>
                    <p class="video-meta">${video.views} • ${video.time}</p>
                </div>

                <button class="video-menu-btn" data-menu-button="${video.id}">⋮</button>
            </div>

            <div class="video-menu" data-video-menu="${video.id}">
                <button data-action="watch">▶️ Play</button>
                <button data-action="watchlater">🕐 Watch later</button>
                <button data-action="save">💾 Save</button>
                <button data-action="download">⬇️ Download</button>
                <button data-action="share">🔗 Share</button>
                ${lastButton}
            </div>
        `;

        videoGrid.appendChild(card);
    });
}


// ================= TOAST (small message) =================

let toastTimer;

function showToast(message) {
    let toast = document.querySelector(".yt-toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.className = "yt-toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
}


// ================= VIDEO ACTIONS =================

function saveVideo(video) {
    const added = toggleInList(savedVideos, video.id);
    showToast(added ? "Saved to Saved videos" : "Removed from Saved videos");
    refresh();
}

function watchLater(video) {
    const added = toggleInList(watchLaterVideos, video.id);
    showToast(added ? "Added to Watch later" : "Removed from Watch later");
    refresh();
}

function downloadVideo(video) {
    const added = toggleInList(downloadedVideos, video.id);
    showToast(added ? "Downloaded. Find it in Downloads" : "Removed from Downloads");
    refresh();
}

async function shareVideo(video) {
    const url = new URL(window.location.href);
    url.search = `?video=${video.id}`;
    url.hash = "";

    try {
        if (navigator.share) {
            await navigator.share({ title: video.title, url: url.href });
        } else {
            await navigator.clipboard.writeText(url.href);
            showToast("Link copied");
        }
    } catch (error) {
        // Clipboard can fail on file:// pages, so show the link instead
        prompt("Copy this link:", url.href);
    }
}

function removeFromCurrentPage(video) {
    const lists = {
        history: watchHistory,
        watchlater: watchLaterVideos,
        liked: likedVideos,
        saved: savedVideos,
        downloads: downloadedVideos
    };

    const list = lists[currentPage];

    if (list) {
        removeFromList(list, video.id);
        saveData();
        refresh();
        showToast("Removed");
    }
}

function handleAction(action, video) {
    if (action === "watch") {
        openVideo(video);
    } else if (action === "watchlater") {
        watchLater(video);
    } else if (action === "save") {
        saveVideo(video);
    } else if (action === "download") {
        downloadVideo(video);
    } else if (action === "share") {
        shareVideo(video);
    } else if (action === "remove") {
        removeFromCurrentPage(video);
    } else if (action === "notinterested") {
        hiddenIds.push(video.id);
        refresh();
    }
}


// ================= PLAYER POPUP =================

const playerStyles = `
.yt-modal {
    position: fixed; inset: 0; z-index: 1000;
    display: none; align-items: center; justify-content: center;
    background: rgba(0, 0, 0, 0.75); padding: 16px;
}
.yt-modal.show { display: flex; }
.yt-box {
    position: relative; width: min(720px, 100%); max-height: 92vh; overflow-y: auto;
    background: #1f1f1f; color: #fff; border-radius: 16px;
    font-family: inherit;
}
.yt-close {
    position: absolute; top: 10px; right: 10px; z-index: 2;
    width: 36px; height: 36px; border: none; border-radius: 50%;
    background: rgba(0, 0, 0, 0.6); color: #fff; font-size: 18px; cursor: pointer;
}
.yt-screen { position: relative; aspect-ratio: 16 / 9; background: #000; border-radius: 16px 16px 0 0; overflow: hidden; }
.yt-screen img { width: 100%; height: 100%; object-fit: cover; display: block; }
.yt-play {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 68px; height: 68px; border: none; border-radius: 50%;
    background: rgba(255, 0, 0, 0.9); color: #fff; font-size: 28px; cursor: pointer;
}
.yt-duration {
    position: absolute; right: 10px; bottom: 10px; padding: 2px 6px;
    background: rgba(0, 0, 0, 0.8); border-radius: 4px; font-size: 12px;
}
.yt-body { padding: 16px; }
.yt-title { margin: 0 0 6px; font-size: 20px; }
.yt-meta { margin: 0 0 14px; color: #aaa; font-size: 13px; }
.yt-channel-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.yt-avatar {
    width: 40px; height: 40px; border-radius: 50%; background: #c00;
    display: flex; align-items: center; justify-content: center; font-weight: bold;
}
.yt-channel { flex: 1; font-weight: 600; }
.yt-btn {
    border: none; border-radius: 999px; padding: 9px 16px; cursor: pointer;
    background: #2f2f2f; color: #fff; font-size: 14px;
}
.yt-btn:hover { background: #3d3d3d; }
.yt-btn.active { background: #fff; color: #111; }
.yt-subscribe { background: #fff; color: #111; font-weight: 600; }
.yt-subscribe.active { background: #2f2f2f; color: #fff; }
.yt-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
.yt-desc { background: #2a2a2a; border-radius: 12px; padding: 12px; font-size: 14px; line-height: 1.5; margin: 0 0 18px; }
.yt-comments h3 { margin: 0 0 12px; font-size: 16px; }
.yt-comment-form { display: flex; gap: 8px; margin-bottom: 16px; }
.yt-comment-form input {
    flex: 1; padding: 9px 12px; border-radius: 999px; border: 1px solid #444;
    background: #121212; color: #fff; font-size: 14px;
}
.yt-comment { display: flex; gap: 10px; margin-bottom: 14px; }
.yt-comment-avatar {
    width: 32px; height: 32px; border-radius: 50%; background: #555; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 13px;
}
.yt-comment-name { font-size: 13px; font-weight: 600; }
.yt-comment-time { color: #aaa; font-weight: 400; margin-left: 6px; }
.yt-comment-text { margin: 4px 0 0; font-size: 14px; word-break: break-word; }
.yt-toast {
    position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%) translateY(20px);
    background: #323232; color: #fff; padding: 10px 18px; border-radius: 8px;
    font-size: 14px; opacity: 0; pointer-events: none; transition: 0.25s; z-index: 2000;
}
.yt-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.yt-no-scroll { overflow: hidden; }
#sideBar .active { background: rgba(128, 128, 128, 0.25); border-radius: 10px; }
`;

const styleTag = document.createElement("style");
styleTag.textContent = playerStyles;
document.head.appendChild(styleTag);

const playerModal = document.createElement("div");
playerModal.className = "yt-modal";
playerModal.innerHTML = `
    <div class="yt-box">
        <button class="yt-close" id="ytClose">✕</button>

        <div class="yt-screen">
            <img id="ytThumb" src="" alt="">
            <button class="yt-play" id="ytPlay">▶</button>
            <span class="yt-duration" id="ytDuration"></span>
        </div>

        <div class="yt-body">
            <h2 class="yt-title" id="ytTitle"></h2>
            <p class="yt-meta" id="ytMeta"></p>

            <div class="yt-channel-row">
                <div class="yt-avatar" id="ytAvatar"></div>
                <div class="yt-channel" id="ytChannel"></div>
                <button class="yt-btn yt-subscribe" id="ytSubscribe">Subscribe</button>
            </div>

            <div class="yt-actions">
                <button class="yt-btn" id="ytLike">👍 Like</button>
                <button class="yt-btn" id="ytDislike">👎 Dislike</button>
                <button class="yt-btn" id="ytCommentBtn">💬 Comment</button>
                <button class="yt-btn" id="ytShare">🔗 Share</button>
            </div>

            <p class="yt-desc" id="ytDesc"></p>

            <div class="yt-comments">
                <h3 id="ytCommentCount">0 Comments</h3>

                <div class="yt-comment-form">
                    <input type="text" id="ytCommentInput" placeholder="Add a comment...">
                    <button class="yt-btn" id="ytCommentPost">Comment</button>
                </div>

                <div id="ytCommentList"></div>
            </div>
        </div>
    </div>
`;
document.body.appendChild(playerModal);

const ytThumb = playerModal.querySelector("#ytThumb");
const ytDuration = playerModal.querySelector("#ytDuration");
const ytTitle = playerModal.querySelector("#ytTitle");
const ytMeta = playerModal.querySelector("#ytMeta");
const ytAvatar = playerModal.querySelector("#ytAvatar");
const ytChannel = playerModal.querySelector("#ytChannel");
const ytSubscribe = playerModal.querySelector("#ytSubscribe");
const ytLike = playerModal.querySelector("#ytLike");
const ytDislike = playerModal.querySelector("#ytDislike");
const ytCommentBtn = playerModal.querySelector("#ytCommentBtn");
const ytShare = playerModal.querySelector("#ytShare");
const ytDesc = playerModal.querySelector("#ytDesc");
const ytCommentCount = playerModal.querySelector("#ytCommentCount");
const ytCommentInput = playerModal.querySelector("#ytCommentInput");
const ytCommentPost = playerModal.querySelector("#ytCommentPost");
const ytCommentList = playerModal.querySelector("#ytCommentList");


function openVideo(video) {
    currentVideo = video;

    // Newest first, no duplicates
    removeFromList(watchHistory, video.id);
    watchHistory.unshift(video.id);
    saveData();

    ytThumb.src = video.image;
    ytThumb.alt = video.title;
    ytDuration.textContent = video.duration;
    ytTitle.textContent = video.title;
    ytMeta.textContent = `${video.views} • ${video.time}`;
    ytAvatar.textContent = video.channel.charAt(0);
    ytChannel.textContent = video.channel;
    ytDesc.textContent = video.description;
    ytCommentInput.value = "";

    updatePlayerButtons();
    renderComments();

    playerModal.classList.add("show");
    document.body.classList.add("yt-no-scroll");

    refresh();   // history page updates behind the popup
}

function closeVideo() {
    playerModal.classList.remove("show");
    document.body.classList.remove("yt-no-scroll");
    currentVideo = null;

    // Remove ?video=ID from the address bar (if it was there)
    if (window.location.search) {
        window.history.replaceState(null, "", window.location.pathname);
    }
}

function updatePlayerButtons() {
    if (!currentVideo) return;

    const isLiked = likedVideos.includes(currentVideo.id);
    const isDisliked = dislikedVideos.includes(currentVideo.id);
    const isSubscribed = subscription.includes(currentVideo.channel);
    const commentTotal = (comments[currentVideo.id] || []).length;

    ytLike.textContent = isLiked ? "👍 Liked" : "👍 Like";
    ytLike.classList.toggle("active", isLiked);

    ytDislike.textContent = isDisliked ? "👎 Disliked" : "👎 Dislike";
    ytDislike.classList.toggle("active", isDisliked);

    ytSubscribe.textContent = isSubscribed ? "Subscribed ✓" : "Subscribe";
    ytSubscribe.classList.toggle("active", isSubscribed);

    ytCommentBtn.textContent = `💬 Comment (${commentTotal})`;
}

function renderComments() {
    if (!currentVideo) return;

    const list = comments[currentVideo.id] || [];

    ytCommentCount.textContent =
        `${list.length} ${list.length === 1 ? "Comment" : "Comments"}`;

    ytCommentList.innerHTML = "";

    // Newest comment on top. textContent is used so typed HTML can't run.
    list.slice().reverse().forEach(item => {
        const row = document.createElement("div");
        row.className = "yt-comment";

        const avatar = document.createElement("div");
        avatar.className = "yt-comment-avatar";
        avatar.textContent = "Y";

        const content = document.createElement("div");

        const name = document.createElement("div");
        name.className = "yt-comment-name";
        name.textContent = "You";

        const time = document.createElement("span");
        time.className = "yt-comment-time";
        time.textContent = new Date(item.time).toLocaleDateString();
        name.appendChild(time);

        const text = document.createElement("p");
        text.className = "yt-comment-text";
        text.textContent = item.text;

        content.appendChild(name);
        content.appendChild(text);
        row.appendChild(avatar);
        row.appendChild(content);
        ytCommentList.appendChild(row);
    });
}

function postComment() {
    const text = ytCommentInput.value.trim();

    if (text === "" || !currentVideo) return;

    if (!comments[currentVideo.id]) {
        comments[currentVideo.id] = [];
    }

    comments[currentVideo.id].push({ text: text, time: Date.now() });
    saveData();

    ytCommentInput.value = "";
    renderComments();
    updatePlayerButtons();
}

function toggleLike() {
    const added = toggleInList(likedVideos, currentVideo.id);

    if (added) {
        removeFromList(dislikedVideos, currentVideo.id);   // like cancels dislike
        saveData();
    }

    updatePlayerButtons();
    refresh();
}

function toggleDislike() {
    const added = toggleInList(dislikedVideos, currentVideo.id);

    if (added) {
        removeFromList(likedVideos, currentVideo.id);      // dislike cancels like
        saveData();
    }

    updatePlayerButtons();
    refresh();
}

function toggleSubscribe() {
    const added = toggleInList(subscription, currentVideo.channel);
    showToast(added
        ? `Subscribed to ${currentVideo.channel}`
        : `Unsubscribed from ${currentVideo.channel}`);

    updatePlayerButtons();
    refresh();
}

// Popup events
playerModal.querySelector("#ytClose").addEventListener("click", closeVideo);

playerModal.addEventListener("click", function (event) {
    if (event.target === playerModal) {
        closeVideo();      // click on dark background closes the popup
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && currentVideo) {
        closeVideo();
    }
});

// The play button is only for looks: it does nothing (as requested)
playerModal.querySelector("#ytPlay").addEventListener("click", function (event) {
    event.stopPropagation();
});

ytLike.addEventListener("click", toggleLike);
ytDislike.addEventListener("click", toggleDislike);
ytSubscribe.addEventListener("click", toggleSubscribe);
ytShare.addEventListener("click", () => shareVideo(currentVideo));

ytCommentBtn.addEventListener("click", function () {
    ytCommentInput.scrollIntoView({ behavior: "smooth", block: "center" });
    ytCommentInput.focus();
});

ytCommentPost.addEventListener("click", postComment);

ytCommentInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        postComment();
    }
});


// ================= VIDEO MENU =================

function closeAllMenus() {
    document.querySelectorAll(".video-menu.show").forEach(menu => {
        menu.classList.remove("show");
    });
}

function toggleMenu(id) {
    const menu = document.querySelector(`[data-video-menu="${id}"]`);

    document.querySelectorAll(".video-menu.show").forEach(item => {
        if (item !== menu) {
            item.classList.remove("show");
        }
    });

    menu.classList.toggle("show");
}


// ================= GRID EVENTS =================

// One listener on the grid handles every card, menu button and action button.
// It keeps working after search/filter/sidebar pages re-render the cards.
videoGrid.addEventListener("click", function (event) {

    const card = event.target.closest(".video-card");
    if (!card) return;

    const id = Number(card.dataset.id);
    const video = videos.find(item => item.id === id);

    const menuButton = event.target.closest(".video-menu-btn");
    const actionButton = event.target.closest(".video-menu button");

    if (menuButton) {
        toggleMenu(id);
        return;
    }

    if (actionButton) {
        closeAllMenus();
        handleAction(actionButton.dataset.action, video);
        return;
    }

    if (event.target.closest(".video-menu")) {
        return;
    }

    openVideo(video);
});

// Click anywhere outside a menu closes it
document.addEventListener("click", function (event) {
    if (!event.target.closest(".video-menu") &&
        !event.target.closest(".video-menu-btn")) {
        closeAllMenus();
    }
});


// ================= SEARCH =================

function searchVideos() {
    currentQuery = searchInput.value.toLowerCase().trim();
    refresh();
}

searchBtn?.addEventListener("click", searchVideos);

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchVideos();
    }
});

clearSearchBtn?.addEventListener("click", function () {
    searchInput.value = "";
    currentQuery = "";
    searchInput.focus();
    refresh();
});


// ================= CATEGORY BAR =================
// Uses data-category on the button if present, otherwise the button text ("All", "Music", ...)

categoryBar?.addEventListener("click", function (event) {
    const button = event.target.closest("button");
    if (!button) return;

    categoryBar.querySelectorAll("button").forEach(item => {
        item.classList.remove("active");
    });
    button.classList.add("active");

    currentCategory = (button.dataset.category || button.textContent).trim();
    refresh();
});


// ================= SIDEBAR =================
// Each sidebar item is matched by its data-page attribute if it has one,
// otherwise by its text (Home, Subscriptions, History, Watch later, Liked videos, Downloads, Saved).

const sidebarPages = [
    { keys: ["home"], page: "home" },
    { keys: ["subscription"], page: "subscriptions" },
    { keys: ["history"], page: "history" },
    { keys: ["watch later"], page: "watchlater" },
    { keys: ["liked"], page: "liked" },
    { keys: ["download"], page: "downloads" },
    { keys: ["saved", "playlist"], page: "saved" }
];

function resolvePage(item) {
    if (item.dataset.page) {
        return item.dataset.page;
    }

    const text = item.textContent.toLowerCase().replace(/\s+/g, " ").trim();

    for (const entry of sidebarPages) {
        if (entry.keys.some(key => text.includes(key))) {
            return entry.page;
        }
    }

    return null;
}

function closeSidebar() {
    sideBar?.classList.remove("show");
    sidebarOverlay?.classList.remove("show");
}

function setPage(page) {
    currentPage = page;
    currentCategory = "All";

    categoryBar?.querySelectorAll("button").forEach((button, index) => {
        button.classList.toggle("active", index === 0);
    });

    refresh();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

sideBar?.addEventListener("click", function (event) {
    const item = event.target.closest("a, button, li");
    if (!item) return;

    const page = resolvePage(item);
    if (!page || !pageTitles[page]) return;

    event.preventDefault();

    sideBar.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    item.classList.add("active");

    setPage(page);

    if (sidebarOverlay?.classList.contains("show")) {
        closeSidebar();   // on mobile the sidebar closes after choosing
    }
});

menuBtn?.addEventListener("click", function () {
    sideBar?.classList.toggle("show");
    sidebarOverlay?.classList.toggle("show");
});

sidebarOverlay?.addEventListener("click", closeSidebar);


// ================= START =================

refresh();

// Shared link support: index.html?video=3 opens that video's popup
const sharedId = Number(new URLSearchParams(window.location.search).get("video"));
const sharedVideo = videos.find(item => item.id === sharedId);

if (sharedVideo) {
    openVideo(sharedVideo);
}

