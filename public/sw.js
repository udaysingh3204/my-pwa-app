
const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

self.addEventListener('install', event => {
  console.log('[SW] Installed');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Activated');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Firebase Push Notifications - Background
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBVDCqqbUH7hc9xHXPUQfcOHUgyGhfcGao",
  authDomain: "push-noti-dcde7.firebaseapp.com",
  projectId: "push-noti-dcde7",
  messagingSenderId: "576625104547",
  appId: "1:576625104547:web:76db5e35b16b120f2a5116"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log('[SW] Background notification', payload);
  const { title, body } = payload.notification;
  const notificationOptions = {
    body: body,
    icon: '/icon-192.png'
  };
  self.registration.showNotification(title, notificationOptions);
});
