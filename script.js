// الدالة المحدثة للتعامل مع الصور التالفة
async function loadSectionContent(categoryName) {
    const container = document.getElementById('articles-container'); 
    if (!container) return;

    container.innerHTML = '<p style="color: #ffd700; text-align: center; font-size: 18px;">جاري جلب التاريخ العراقي العريق...</p>';

// تأكد أن هذه الأسماء (title, content, image_url, category) تطابق تماماً أسماء الأعمدة في جدولك
const apiUrl = `${SUPABASE_URL}/rest/v1/posts?category=eq.${categoryName}&select=title,content,image_url`;


    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('فشل الاتصال بالسيرفر');

        const posts = await response.json();
        container.innerHTML = '';

        if (posts.length === 0) {
            container.innerHTML = '<p style="color: #888; text-align: center; margin-top: 20px;">لا توجد منشورات في هذا القسم حالياً.</p>';
            return;
        }

        posts.forEach(post => {
            let imageHTML = '';
            // التعديل هنا: إضافة خاصية onerror لإخفاء الصورة فوراً إذا كانت تالفة
            if (post.image_url && post.image_url.trim() !== '') {
                imageHTML = `
                    <div style="margin-top: 15px; text-align: center;">
                        <img src="${post.image_url}" 
                             alt="${post.title}" 
                             style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid #333;" 
                             onerror="this.style.display='none'; this.parentElement.style.display='none';" />
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
        container.innerHTML = '<p style="color: red; text-align: center;">عذراً، حدث خطأ أثناء جلب البيانات.</p>';
    }
}
