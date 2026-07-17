// دالة رئيسية لجلب البيانات وتوزيعها (كل قسم يروح بمكانه الصحيح)
async function loadSectionContent(categoryName) {
    // تحديد الحاوية التي تعرض المحتوى في الـ HTML
    const container = document.getElementById('articles-container'); 
    
    if (!container) {
        console.error("خطأ: لم يتم العثور على عنصر 'articles-container' في الـ HTML");
        return;
    }

    // إظهار نص مؤقت أثناء تحميل البيانات
    container.innerHTML = '<p style="color: #ffd700; text-align: center; font-size: 18px;">جاري تحميل المحتوى...</p>';

    // جلب البيانات من جدول posts وتصفيتها بناءً على الـ category
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', categoryName);

    if (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
        container.innerHTML = '<p style="color: red; text-align: center;">فشل في تحميل البيانات. تأكد من إعدادات الـ RLS.</p>';
        return;
    }

    // تفريغ المكان تماماً لعرض البيانات الجديدة
    container.innerHTML = '';

    // إذا كان القسم الذي ضغطت عليه فارغاً حالياً
    if (posts.length === 0) {
        container.innerHTML = '<p style="color: #888; text-align: center; margin-top: 20px;">لا توجد منشورات في هذا القسم حالياً.</p>';
        return;
    }

    // عرض المنشورات وتوزيعها
    posts.forEach(post => {
        let imageHTML = '';
        
        // تعديل الحقل هنا لقراءة اسم العمود الجديد image_url بنجاح
        if (post.image_url && post.image_url.trim() !== '') {
            imageHTML = `
                <div style="margin-top: 15px; text-align: center;">
                    <img src="${post.image_url}" alt="${post.title}" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid #333;" />
                </div>
            `;
        }

        // بناء الكرت الخاص بالمنشور
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

// --- ربط الأزرار العلوية للموقع بالخانات المخصصة لها ---
document.getElementById('btn-news').addEventListener('click', (e) => {
    e.preventDefault();
    loadSectionContent('news'); 
});

document.getElementById('btn-articles').addEventListener('click', (e) => {
    e.preventDefault();
    loadSectionContent('articles'); 
});

document.getElementById('btn-photos').addEventListener('click', (e) => {
    e.preventDefault();
    loadSectionContent('photos'); 
});

// تشغيل تلقائي لقسم الأخبار بمجرد فتح الموقع لأول مرة
window.addEventListener('DOMContentLoaded', () => {
    loadSectionContent('news');
});
