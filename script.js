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
console.log('الأخبار المجلوبة:', posts);
} catch (error) {
console.error('خطأ:', error);
}
}
window.onload = fetchPosts;
