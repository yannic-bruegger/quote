export function successMessage(message) {
    const success = `
        <div id="success-message">
            <h2>${message}</h2>
        </div>
  `;
  document.querySelector('body').innerHTML = success + document.querySelector('body').innerHTML;
}