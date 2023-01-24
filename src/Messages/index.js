import Snackbar from 'react-native-snackbar';

function showError(message) {
  Snackbar.show({
    backgroundColor: 'red',
    textColor: 'white',
    text: message,
    duration: Snackbar.LENGTH_SHORT,
  });
}
function showSuccess(message) {
  Snackbar.show({
    backgroundColor: 'green',
    textColor: 'white',
    text: message,
    duration: Snackbar.LENGTH_SHORT,
  });
}
function showWarning(message) {
  Snackbar.show({
    backgroundColor: 'orange',
    textColor: 'white',
    text: message,
    duration: Snackbar.LENGTH_SHORT,
  });
}
export {showError, showSuccess, showWarning};
