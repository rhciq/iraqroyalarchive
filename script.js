const SUPABASE_URL = 'https://aowiqjnrflackufrpdui.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvd2lxam5yZmxhY2t1ZnJwZHVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyOTIwMzQsImV4cCI6MjA5OTg2ODAzNH0.H_y_QgSbaz3YRY_dO_0HNlLrAoLSnGvb-iMjgvqT94g';
async function fetchPosts() {
try {
const response = await fetch(SUPABASE_URL + '/rest/v1/posts?select=*', {
method: 'GET',
headers: {
'apikey': SUPABASE_KEY,
'Authorization': 'Bearer ' + SUPABASE_KEY
}
});
if (!response.ok) { throw new Error('فشل جلب البيانات'); }
const posts = await response.json();
displayPosts(posts);
} catch (error) {
console.error('خطأ:', error);
document.getElementById('news-container').innerHTML = '<p style="color:red; text-align:center;">عذراً، فشل تحميل الأخبار حالياً.</p>';
}
}
function displayPosts(posts) {
const container = document.getElementById('news-container');
container.innerHTML = '';
if (posts.length === 0) {
container.innerHTML = '<p style="text-align:center; color:#888; width:100%;">لا توجد أخبار منشورة حالياً في الأرشيف.</p>';
return;
}
posts.forEach(post => {
const card = document.createElement('div');
card.className = 'card';
card.innerHTML = '<img src="' + (post.image_url || 'images/news1.jpg') + '" alt="' + post.title + '"><h3>' + post.title + '</h3><p>' + post.content + '</p>';
container.appendChild(card);
});
}
window.onload = fetchPosts;
