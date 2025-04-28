
import { useEffect } from 'react';
import { requestPermission, onMessageListener } from './firebase';

function App() {
  useEffect(() => {
    requestPermission().then(token => {
      if (token) {
        console.log('User FCM Token:', token);
      }
    });
  }, []);

  useEffect(() => {
    onMessageListener().then(payload => {
      console.log('Received in foreground:', payload);
      const { title, body } = payload.notification;
      alert(`Notification: ${title}\n${body}`);
    }).catch(err => console.log('Foreground message error:', err));
  }, []);

  return (
    <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
      <h1>My Progressive Web App</h1>
      <p>✓ Works offline</p>
      <p>✓ Push Notifications</p>
      <p>✓ Installable via manifest</p>
    </div>
  );
}

export default App;
