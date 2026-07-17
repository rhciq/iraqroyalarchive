// 1. إعداد الاتصال بقاعدة بيانات Supabase
const SUPABASE_URL = 'https://aowiqjnrflackufrpdui.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvd2lxam5yZmxhY2t1ZnJwZHVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyOTIwMzQsImV4cCI6MjA5OTg2ODAzNH0.H_y_QgSbaz3YRY_dO_0HNlLrAoLSnGvb-iMjgvqT94g';

// إنشاء عميل Supabase للاتصال
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. دالة رئيسية لجلب البيانات وتوزيعها حسب القسم المختار
async function loadSectionContent(categoryName) {
    const container = document.getElementById('articles-container'); 
    
    if (!container) {
        console.error("خطأ: لم يتم العثور على عنصر 'articles-container' في الـ HTML");
        return;
    }

    // إظهار نص مؤقت أثناء تحميل البيانات
    container.innerHTML = '<p style="color: #ffd700; text-align: center; font-size: 18px;">جاري تحميل المحتوى التاريخي...</p>';

    // جلب البيانات وتصفيتها بناءً على الـ category
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', categoryName);

    if (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
        container.innerHTML = '<p style="color: red; text-align: center;">فشل في تحميل البيانات. تأكد من إعدادات الـ RLS.</p>';
        return;
    }

    container.innerHTML = '';

    if (posts.length === 0) {
        container.innerHTML = '<p style="color: #888; text-align: center; margin-top: 20px;">لا توجد منشورات في هذا القسم حالياً.</p>';
        return;
    }

    // عرض وتنسيق المنشورات
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
                <h2 style="color: #c5a059; font-size: 22px; margin-top: 0; border-bottom: 1px solid #222; padding-bottom: 10px;">${post.title}</h2>
                <p style="color: #fff; line-height: 1.8; font-size: 16px; text-align: justify;">${post.content}</p>
                ${imageHTML}
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', postCard);
    });
}

// --- ربط جميع أزرار الأقسام بالدالة البرمجية ---
if(document.getElementById('btn-news')) {
    document.getElementById('btn-news').addEventListener('click', (e) => { e.preventDefault(); loadSectionContent('news'); });
}

if(document.getElementById('btn-articles')) {
    document.getElementById('btn-articles').addEventListener('click', (e) => { e.preventDefault(); loadSectionContent('articles'); });
}

if(document.getElementById('btn-kings')) {
    document.getElementById('btn-kings').addEventListener('click', (e) => { e.preventDefault(); loadSectionContent('kings'); });
}

if(document.getElementById('btn-documentaries')) {
    document.getElementById('btn-documentaries').addEventListener('click', (e) => { e.preventDefault(); loadSectionContent('documentaries'); });
}

if(document.getElementById('btn-photos')) {
    document.getElementById('btn-photos').addEventListener('click', (e) => { e.preventDefault(); loadSectionContent('photos'); });
}

if(document.getElementById('btn-archive')) {
    document.getElementById('btn-archive').addEventListener('click', (e) => { e.preventDefault(); loadSectionContent('archive'); });
}

// تشغيل تلقائي لقسم الأخبار (الرئيسية) عند فتح الموقع لأول مرة
window.addEventListener('DOMContentLoaded', () => {
    loadSectionContent('news');
});
