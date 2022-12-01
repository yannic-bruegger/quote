const footer = `
  <footer>
    <div><a href="/impress/">Impress</a></div>
    <div><a href="/data-protection/">Data protection</a></div>
  </footer>
`;

const container = document.createElement(`div`);
container.innerHTML = footer;

document.querySelector('body').append(container);