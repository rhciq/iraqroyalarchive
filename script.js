// استبدل الرابط أدناه برابط مشروعك الحقيقي من Supabase
const SUPABASE_URL = 'https://[your-project-id].supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_reshWJXjb9v6CRuxfUe2Pg_w-JLI7yU';

async function loadSectionContent(categoryName) {
    const container = document.getElementById('articles-container'); 
    if (!container) return;

    container.innerHTML = '<p style="color: #ffd700; text-align: center; font-size: 18px;">جاري جلب التاريخ...</p>';

    const apiUrl = `${SUPABASE_URL}/rest/v1/posts?category=eq.${categoryName}&select=title,content,image_url`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('فشل الاتصال');

        const posts = await response.json();
        console.log("البيانات المستلمة:", posts); // هذا السطر سيظهر لك النتائج في الـ Console
        
        container.innerHTML = '';
        if (posts.length === 0) {
            container.innerHTML = '<p style="color: #888; text-align: center;">لا توجد منشورات.</p>';
            return;
        }

        posts.forEach(post => {
            let imageHTML = post.image_url ? `
                <div style="margin-top: 15px; text-align: center;">
                    <img src="${post.image_url}" alt="${post.title}" 
                         style="max-width: 100%; border-radius: 8px;" 
                         onerror="this.style.display='none'; this.parentElement.style.display='none';" />
                </div>` : '';

            container.insertAdjacentHTML('beforeend', `
                <div class="main-card" style="background-color: #111; border: 1px solid #c5a059; padding: 20px; margin-bottom: 25px;">
                    <h2 style="color: #c5a059;">${post.title}</h2>
                    <p style="color: #fff;">${post.content}</p>
                    ${imageHTML}
                </div>
            `);
        });
    } catch (error) {
        console.error("خطأ:", error);
        container.innerHTML = '<p style="color: red; text-align: center;">حدث خطأ في الاتصال.</p>';
    }
}

// ربط الأزرار بالوظيفة
document.getElementById('btn-news').addEventListener('click', () => loadSectionContent('news'));
document.getElementById('btn-articles').addEventListener('click', () => loadSectionContent('articles'));
document.getElementById('btn-kings').addEventListener('click', () => loadSectionContent('kings'));
document.getElementById('btn-documentaries').addEventListener('click', () => loadSectionContent('documentaries'));
