const CACHE_NAME = 'food-cache';

function put(key: string, value: any): void {
  caches.open(CACHE_NAME)
    .then(cache => {
      cache.put(key, new Response(JSON.stringify(value)));
    })
}

function get(key: string): Promise<any> {
  return caches.open(CACHE_NAME)
    .then(cache => {
      return cache.match(key)
        .then(response => {
          if (response) {
            return response.json()
          }
        })
    })
}

function remove(key: string): void {
  caches.open(CACHE_NAME)
    .then(cache => {
      cache.delete(key);
    })
}

const cacheStorage = {
  put,
  get,
  remove
}

export default cacheStorage