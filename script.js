// روابط الاتصال المباشر والمفاتيح الخاصة بمشروعك
const SUPABASE_URL = 'https://aowiqjnrflackufrpdui.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvd2lxam5yZmxhY2t1ZnJwZHVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyOTIwMzQsImV4cCI6MjA5OTg2ODAzNH0.H_y_QgSbaz3YRY_dO_0HNlLrAoLSnGvb-iMjgvqT94g';

// الدالة السحرية لجلب البيانات مباشرة عبر الـ API وبدون مكتبات خارجية
async function loadSectionContent(categoryName) {
    const container = document.getElementById('articles-container'); 
    if (!container) return;

    // نص التحميل المؤقت
    container.innerHTML = '<p style="color: #ffd700; text-align: center; font-size: 18px;">جاري جلب التاريخ العراقي العريق...</p>';

    // رابط الـ API المباشر لجدول posts مع الفلتر الخاص بالـ category
    const apiUrl = `${SUPABASE_URL}/rest/v1/posts?category=eq.${categoryName}&select=*`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('فشل الاتصال بالسيرفر');
        }

        const posts = await response.json();
        container.innerHTML = '';

        if (posts.length === 0) {
            container.innerHTML = '<p style="color: #888; text-align: center; margin-top: 20px;">لا توجد منشورات في هذا القسم حالياً.</p>';
            return;
        }

        // عرض وتنسيق المنشورات التاريخية
        posts.forEach(post => {
            let imageHTML = '';
            if (post.image_url && post.image_url.trim() !== '') {
                imageHTML = `
                    <div style="margin-top: 15px; text-align: center;">
                        <img src="${post.image_url}" alt="${post.title}" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid #333;" />
                    </div>
                `;
            }

            const postCard = `
                <div class="main-card" style="background-color: #111; border: 1px solid #c5a059; border-radius: 8px; padding: 20px; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
                    <h2 style="color: #c5a059; font-size: 22px; margin-top: 0; border-bottom: 1px solid #222; padding-bottom: 10px; text-align: right;">${post.title}</h2>
                    <p style="color: #fff; line-height: 1.8; font-size: 16px; text-align: justify; direction: rtl;">${post.content}</p>
                    ${imageHTML}
                </div>
            `;
            container.insertAdjacentHTML('beforeend', postCard);
        });

    } catch (error) {
        console.error("خطأ:", error);
        container.innerHTML = '<p style="color: red; text-align: center;">عذراً، حدث خطأ أثناء جلب البيانات. يرجى التحقق من إعدادات الـ RLS.</p>';
    }
}

// --- ربط أزرار التحكم بالأقسام ---
const buttonsMap = {
    'btn-news': 'news',
    'btn-articles': 'articles',
    'btn-kings': 'kings',
    'btn-documentaries': 'documentaries',
    'btn-photos': 'photos',
    'btn-archive': 'archive'
};

Object.keys(buttonsMap).forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            loadSectionContent(buttonsMap[btnId]);
        });
    }
});

// تشغيل قسم الأخبار تلقائياً عند فتح الموقع
window.addEventListener('DOMContentLoaded', () => {
    loadSectionContent('news');
});
