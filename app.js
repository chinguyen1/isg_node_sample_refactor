'use strict'
const GraphSecurityAPI = require('./GraphController');
const config = require('./config');
const print = require('./etc/logHelper');

Run();

function Run() {
  const GraphSecurity = new GraphSecurityAPI(config);
  GraphSecurity.getAuthenticationToken()
    .then(token => {
      print.logToken(token);
      GraphSecurity.storeToken(token);
      return GraphSecurity.getAlerts();
    })
    .then(alerts => { 
      print.logAlerts(alerts);
      return GraphSecurity.getOneAlert(alerts.value[0].id)
    })
    .then(alertData => {
      print.logAlert(alertData);
      return GraphSecurity.updateAlert(alertData.id);
    })
    .then(updatedAlert => {
      print.logUpdate(updatedAlert);
    })
    .catch(err => console.log(err.message));
}