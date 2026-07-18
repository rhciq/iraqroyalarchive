// دالة جلب شريط الأخبار من قاعدة بياناتك (Supabase)
async function loadNewsTicker() {
    const tickerContainer = document.getElementById('ticker-content');
    if (!tickerContainer) return;

    // جلب المنشورات التي تصنيفها 'ticker' فقط
    const tickerApiUrl = `${SUPABASE_URL}/rest/v1/posts?category=eq.ticker&select=title`;

    try {
        const response = await fetch(tickerApiUrl, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        const posts = await response.json();
        
        if (posts && posts.length > 0) {
            // دمج عناوين الأخبار في سطر واحد يفصل بينها علامة |
            let titles = posts.map(post => post.title).join(" | ");
            tickerContainer.innerHTML = titles;
        } else {
            // رسالة تظهر إذا كان الجدول فارغاً
            tickerContainer.innerHTML = "أهلاً بك في منصة المملكة العراقية التاريخية.";
        }
    } catch (error) {
        console.error("خطأ في جلب الأخبار:", error);
        tickerContainer.innerHTML = "أهلاً بك في منصة المملكة العراقية التاريخية.";
    }
}
