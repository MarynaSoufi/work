export const sendPushNotification =  async (token, title, body,) => {
  return  await fetch('https://exp.host/--/api/v2/push/send', {
    body: JSON.stringify({
      to: token,
      title: title,
      body: body,
      data: { message: `${title} - ${body}` },
      sound: "default",
      icon: "./assets/icon.jpg",
      android:{
          icon: "./assets/icon.jpg",
          sound:"default"
      }
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }
      // navigation.navigate('Rooms')
  );
}