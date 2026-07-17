// ضع بيانات مشروعك هنا
const SUPABASE_URL = 'https://aowiqjnrflackufrpdui.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_reshWJXjb9v6CRuxfUe2Pg_w-JLI7yU';

async function loadContent(category) {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = '<p style="color: #c5a059;">جاري استحضار تاريخ المملكة...</p>';

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/posts?category=eq.${category}&select=title,content,image_url`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.length === 0) {
            contentArea.innerHTML = '<p>لا يوجد محتوى في هذا القسم حالياً.</p>';
            return;
        }

        contentArea.innerHTML = ''; // تفريغ المكان
        data.forEach(item => {
            contentArea.innerHTML += `
                <div class="card" style="border: 1px solid #c5a059; padding: 20px; margin: 15px auto; max-width: 600px; border-radius: 10px;">
                    <h2 style="color: #c5a059;">${item.title}</h2>
                    <p style="color: #fff; line-height: 1.8;">${item.content}</p>
                    ${item.image_url ? `<img src="${item.image_url}" style="max-width: 100%; border-radius: 5px;">` : ''}
                </div>
            `;
        });
    } catch (error) {
        contentArea.innerHTML = '<p style="color: red;">خطأ في الاتصال بالسيرفر.</p>';
    }
}
