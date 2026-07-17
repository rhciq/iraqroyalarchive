// تم تحديث الرابط والمفتاح ليعمل مع مشروعك
const SUPABASE_URL = 'https://aowiqjnrflackufrpdui.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_reshWJXjb9v6CRuxfUe2Pg_w-JLI7yU';

async function loadSectionContent(categoryName) {
    const container = document.getElementById('articles-container'); 
    if (!container) return;

    container.innerHTML = '<p style="color: #ffd700; text-align: center; font-size: 18px;">جاري جلب التاريخ...</p>';

    // الرابط الآن يحتوي على مشروعك الصحيح
    const apiUrl = `${SUPABASE_URL}/rest/v1/posts?category=eq.${categoryName}&select=title,content,image_url`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            }
        });

        if (!response.ok) {
            console.error("خطأ في الاستجابة:", await response.text());
            throw new Error('فشل الاتصال بالسيرفر');
        }

        const posts = await response.json();
        
        container.innerHTML = '';
        if (posts.length === 0) {
            container.innerHTML = '<p style="color: #888; text-align: center;">لا توجد منشورات في هذا القسم حالياً.</p>';
            return;
        }

        posts.forEach(post => {
            let imageHTML = (post.image_url && post.image_url.trim() !== '') ? `
                <div style="margin-top: 15px; text-align: center;">
                    <img src="${post.image_url}" alt="${post.title}" 
                         style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid #333;" 
                         onerror="this.style.display='none'; this.parentElement.style.display='none';" />
                </div>` : '';

            container.insertAdjacentHTML('beforeend', `
                <div class="main-card" style="background-color: #111; border: 1px solid #c5a059; padding: 20px; margin-bottom: 25px; border-radius: 8px;">
                    <h2 style="color: #c5a059; text-align: right;">${post.title}</h2>
                    <p style="color: #fff; line-height: 1.8; text-align: justify; direction: rtl;">${post.content}</p>
                    ${imageHTML}
                </div>
            `);
        });
    } catch (error) {
        console.error("خطأ:", error);
        container.innerHTML = '<p style="color: red; text-align: center;">عذراً، حدث خطأ أثناء جلب البيانات. تأكد من اتصالك.</p>';
    }
}

// التأكد من أن الأزرار موجودة قبل إضافة الحدث
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('btn-news')) document.getElementById('btn-news').addEventListener('click', () => loadSectionContent('news'));
    if(document.getElementById('btn-articles')) document.getElementById('btn-articles').addEventListener('click', () => loadSectionContent('articles'));
    if(document.getElementById('btn-kings')) document.getElementById('btn-kings').addEventListener('click', () => loadSectionContent('kings'));
    if(document.getElementById('btn-documentaries')) document.getElementById('btn-documentaries').addEventListener('click', () => loadSectionContent('documentaries'));
});
