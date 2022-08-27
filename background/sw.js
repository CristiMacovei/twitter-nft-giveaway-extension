chrome.alarms.create('whatdadogdoin', {
  delayInMinutes: 0,
  periodInMinutes: 5
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== 'whatdadogdoin') {
    return;
  }

  const url = 'https://us-central1-alphaintel.cloudfunctions.net/get_data';

  const payload = {
    psk: 'W5f4$%YBVv7w34tce@1342Dagw',
    key: 'Y'
  };

  // fetch(url, {
  //   body: JSON.stringify(payload),
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  //   .then((res) => res.text())
  //   .then((text) => {
  //     if (text === 'None') {
  //       chrome.notifications.create('cefacedomnulcaine', {
  //         type: 'basic',
  //         title: 'Nothing found',
  //         message: '',
  //         iconUrl:
  //           'https://lh3.googleusercontent.com/ykuq3KjWWVgwt9fV1zh1ZzAhXJF6pKV5tbUGH0BZIBBP5yIICcavfO-knvLifR1rv0uBiEnlngw=w640-h400-e365'
  //       });
  //     } else {
  //       //todo
  //       chrome.notifications.create('cefacedomnulcaine', {
  //         type: 'basic',
  //         title: 'Ce face domnul caine',
  //         message: 'SPUNE-MI CE FACE CAINELE',
  //         iconUrl:
  //           'https://lh3.googleusercontent.com/ykuq3KjWWVgwt9fV1zh1ZzAhXJF6pKV5tbUGH0BZIBBP5yIICcavfO-knvLifR1rv0uBiEnlngw=w640-h400-e365'
  //       });
  //     }
  //   });
});

chrome.notifications.onClicked.addListener(function (notificationId, byUser) {
  if (notificationId !== 'cefacedomnulcaine') {
    return;
  }

  chrome.tabs.create({ url: 'http://www.google.com', active: true });
});
