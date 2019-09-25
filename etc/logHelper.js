function logToken(token) {
  console.log(token);
  console.log('*'.repeat(80));
  console.log('Getting All Alerts');
  console.log('*'.repeat(80));
}

function logAlerts(alerts) {
  console.log(`Received ${alerts.value.length} alerts`);
  console.log('*'.repeat(80));
  console.log('Getting the First Alert in the Value Array');
  console.log('*'.repeat(80));
}

function logAlert(alert) {
  console.log(alert);
  console.log('*'.repeat(80));
  console.log('Updating the First Alert');
  console.log('*'.repeat(80));
}

function logUpdate(alert) {
  console.log('See Updated Alert Below');
  console.log('*'.repeat(80));
  console.log(alert);
}

module.exports = {
  logToken,
  logAlerts,
  logAlert,
  logUpdate
};