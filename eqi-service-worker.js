var	CACHE_NAME	= 'static-cache';
var	urlsToCache	= [		
	'.',
	'index.html',
	'styles/main.css' 
	];
self.addEventListener('install', function(event) {	
	event.waitUntil(
		caches.open(CACHE_NAME)	
		.then(function(cache)	{						
			return	cache.addAll(urlsToCache);
		})
	);
});


self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {
				return response || fetchAndCache(event.request);
		})
	);
});
function fetchAndCache(url) {
	return fetch(url)
		.then(function(response) {
		// Check if we received a valid response
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return caches.open(CACHE_NAME)
		.then(function(cache) {
			cache.put(url, response.clone());
			return response;
		});
	})
	.catch(function(error) {
		console.log('Request failed:', error);
		// You could return a custom offline 404 page here
	});
}
//step 1: Pada bagian kode service worker dimulai dengan mendefinisikan sebuah cache dan daftar URL yang akan di-cache.
//cache disini yaitu jika caching diaktifkan, server menyimpan file HTML ini – biasanya dalam random access memory (atau RAM),
//yang sangat cepat. Saat berikutnya Anda, atau siapa pun, membuka kembali atau mengunjungi homepage website Anda, server tidak perlu melakukan pemrosesan dan konversi ke HTML.
//Sebaliknya, mereka hanya akan mengirimkan file HTML yang sudah disiapkan ke browser.