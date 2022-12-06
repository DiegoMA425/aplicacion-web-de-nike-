self.addEventListener('install', e=>{
    caches.open('cache-v1')
    .then(cache =>{
        cache.addAll([
            './',
            'css/style.css',
            'images/facebook.png',
            'images/instagram.png',
            'images/twiter.png',
            'main.js',
            'images/logo.jpg',
            'images/nike1.jpg',
            'images/nike2.jpg',
            'images/nike3.jpg',
            'images/video1.mp4',
            'images/video2.mp4',
            'images/video3.mp4',
            
        ])
    });
    e.waitUntil(cacheProm);
});

self.addEventListener('fetch', e =>{
    //cache with network fallback
    const respuesta = caches.match( e.request )
        .then ( res => {
            if ( res ) return res;
            //no existe el archivo
            //tengo que ir a la web
            console.log('No existe', e.request.url);
            return fetch( e.request ).then ( newResp => {
                caches.open('cache-v1')
                    .then( cache => {
                        cache.put( e.request, newResp);
                    }

                    )
                return newResp.clone;
            });
        });
        e.respondWith(respuesta);
    //only cache
    //e.respondWith( caches.match(e.request));
});