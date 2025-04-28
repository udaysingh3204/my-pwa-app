// src/firebase.js

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBVDCqqbUH7hc9xHXPUQfcOHUgyGhfcGao",
  authDomain: "push-noti-dcde7.firebaseapp.com",
  projectId: "push-noti-dcde7",
  storageBucket: "push-noti-dcde7.firebasestorage.app",
  messagingSenderId: "576625104547",
  appId: "1:576625104547:web:76db5e35b16b120f2a5116"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'BJWratGomB_lZxo_gHQLnJ7xh27_uF7l7rvloThjujuj5AsuQS0Ya8Jmq8Gaj4ZyIut-BQ9l-RLhdHCYdcvqUVk',
      });
      console.log('FCM Token:', token);
      return token;
    } else {
      console.log('Notification permission denied');
    }
  } catch (error) {
    console.error('An error occurred while retrieving token.', error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
