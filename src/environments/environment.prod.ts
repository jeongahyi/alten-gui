export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyC68ycb45AuaGQhDqpL-gJ6D69M-bwu7es',
    authDomain: 'alten-tool.firebaseapp.com',
    databaseURL: 'https://alten-tool.firebaseio.com',
    projectId: 'alten-tool',
    storageBucket: 'alten-tool.appspot.com',
    messagingSenderId: '142662079311',
    appId: '1:142662079311:web:6b4ed6f2effe6b0ed56b3a',
    measurementId: 'G-NTB2VKEMPK'
  },
  config: {
    pollingIntervalTime: 60000, // milliSeconds
  },
  url: {
    get: {
      vehicles: 'https://us-central1-alten-tool.cloudfunctions.net/getVehiclesInfo',
      simulator: 'https://us-central1-alten-tool.cloudfunctions.net/simulator'
    }
  }
};
