export const sendPushNotification = (token, title, body, currentUser) => {
  return fetch('https://exp.host/--/api/v2/push/send', {
    body: JSON.stringify({
      to: token,
      title: title,
      body: body,
      data: { message: `${title} - ${body}`, chat: currentUser },
      sound: 'default',
      icon: './app/assets/icon.png',
      android: {
        icon: './app/assets/icon.png',
        sound: 'default',
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
};
