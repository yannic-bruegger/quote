function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

class CookieNotification extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <dialog>
        <p>Did you know? We only use three cookies on this website. One for keeping you logged in, one for remembering that you have read this message and one is just for you to enjoy. </p>
        <form method="dialog">
          <button>OK, now let me see this website</button>
        </form>
      </dialog>
    `;
    const dialog = this.querySelector('dialog');
    if(!getCookie('cookie-info-seen')) dialog.showModal();
    dialog.addEventListener('close', () => {
      this.registerVisitorsCookie();
    })
  }

  registerVisitorsCookie() {
    document.cookie = "Your 🍪=Mhhh, delicious!;path=/";
    document.cookie = "cookie-info-seen=true;path=/";
  }
}

customElements.define('cookie-notification', CookieNotification);