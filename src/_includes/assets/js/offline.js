if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/serviceworker.js')
  .then( function (registration) {
    console.log('Success!', registration.scope);
  })
  .catch( function (error) {
    console.error('Failure!', error);
  });
  console.log('All done.');
}
