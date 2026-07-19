const SUPABASE_URL = "https://aowiqjnrflackufrpdui.supabase.co";
const SUPABASE_KEY = "sb_publishable_IxX3UaHfipy8446_T9B6nQ_X80pX7o_";

const container = document.getElementById("articles-container");

const categories = {
    "btn-news": "news",
    "btn-articles": "articles",
    "btn-kings": "kings",
    "btn-documentaries": "documentaries",
    "btn-photos": "photos",
    "btn-archive": "archive"
};

async function loadPosts(category) {

    container.innerHTML = "<div class='loading'>جاري تحميل المحتوى...</div>";

    try {

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/posts?select=*&category=eq.${category}&order=created_at.desc`,
            {
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${SUPABASE_KEY}`
                }
            }
        );

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const posts = await response.json();

        container.innerHTML = "";

        if (posts.length === 0) {
            container.innerHTML = "<div class='loading'>لا توجد منشورات في هذا القسم.</div>";
            return;
        }

        posts.forEach(post => {

            const card = document.createElement("div");
            card.className = "post";

            let imagesHTML = "";
            let images = [];

            if (post.images) {

                if (Array.isArray(post.images)) {
                    images = post.images;
                }

                else if (
                    typeof post.images === "object" &&
                    post.images.images &&
                    Array.isArray(post.images.images)
                ) {
                    images = post.images.images;
                }

                else if (typeof post.images === "string") {

                    try {

                        const parsed = JSON.parse(post.images);

                        if (Array.isArray(parsed)) {
                            images = parsed;
                        } else if (parsed.images && Array.isArray(parsed.images)) {
                            images = parsed.images;
                        }

                    } catch {

                        images = post.images
                            .split(",")
                            .map(img => img.trim())
                            .filter(Boolean);

                    }

                }

            }

            if (images.length > 0) {

                imagesHTML = '<div class="gallery">';

                images.forEach(img => {
                    imagesHTML += `<img src="${img}" alt="${post.title}" class="clickable-image">`;
                });

                imagesHTML += "</div>";

            } else if (post.image_url) {

                imagesHTML = `<img src="${post.image_url}" alt="${post.title}" class="clickable-image">`;

            }

            card.innerHTML = `
                <h2>${post.title}</h2>
                ${imagesHTML}
                <p>${post.content}</p>
            `;

            container.appendChild(card);

        });

        setupImageViewer();

    } catch (err) {

        console.error(err);

        container.innerHTML = `
            <div class="loading" style="color:red">
                ${err.message}
            </div>
        `;

    }

}

Object.keys(categories).forEach(id => {

    const btn = document.getElementById(id);

    if (btn) {

        btn.onclick = () => {

            loadPosts(categories[id]);

        };

    }

});

window.onload = () => {

    loadPosts("news");

};

// ======================
// تكبير الصور
// ======================

function setupImageViewer(){

    let modal = document.getElementById("imageModal");

    if(!modal){

        modal = document.createElement("div");
        modal.id = "imageModal";
        modal.className = "image-modal";

        modal.innerHTML = `
            <img id="modalImage">
        `;

        document.body.appendChild(modal);

        modal.onclick = () => {
            modal.style.display = "none";
        };
    }

    document.querySelectorAll(".clickable-image").forEach(img=>{

        img.onclick = ()=>{

            document.getElementById("modalImage").src = img.src;
            modal.style.display = "flex";

        };

    });

}
