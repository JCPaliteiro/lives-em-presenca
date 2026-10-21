/* Meta Pixel com consentimento (RGPD). Só carrega depois de "Aceitar".
   Eventos: PageView em todas as páginas; InitiateCheckout ao clicar num link do Stripe;
   Purchase ao abrir /obrigado/; CompleteRegistration ao enviar o formulário do /obrigado/. */
(function () {
  var PIXEL_ID = "1471878896288549";
  var KEY = "jcp_cookies";
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadPixel() {
    if (window.fbq) return;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
    if (/\/obrigado\/?$/.test(location.pathname)) {
      fbq('track', 'Purchase', { currency: 'EUR', value: 0, content_name: 'Inteireza Divina' });
    }
  }
  function track(ev, data) { if (window.fbq) fbq('track', ev, data || {}); }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="buy.stripe.com"], a.buy-btn');
    if (a) track('InitiateCheckout', { currency: 'EUR', content_name: 'Inteireza Divina' });
  }, true);
  document.addEventListener('submit', function () { track('CompleteRegistration', { content_name: 'Inteireza Divina' }); }, true);

  function banner() {
    var css = document.createElement('style');
    css.textContent = '#jcp-ck{position:fixed;left:12px;right:12px;bottom:12px;z-index:9999;max-width:560px;margin:0 auto;background:#fffdf8;border:1px solid #e6d9be;border-radius:16px;box-shadow:0 12px 32px rgba(46,36,84,.18);padding:16px 18px;font:16px/1.5 "Jost","Segoe UI",system-ui,sans-serif;color:#2a2018}#jcp-ck p{margin:0 0 12px}#jcp-ck div{display:flex;gap:10px;flex-wrap:wrap}#jcp-ck button{font:inherit;font-weight:600;border-radius:999px;padding:10px 20px;cursor:pointer}#jcp-ck .ok{border:0;color:#fffdf7;background:linear-gradient(100deg,#4a3b7a,#2e2454)}#jcp-ck .no{border:1px solid #d9cdb3;background:transparent;color:#5f5446}';
    document.head.appendChild(css);
    var d = document.createElement('div');
    d.id = 'jcp-ck'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Cookies');
    d.innerHTML = '<p>Uso cookies da Meta para saber se a divulgação chega a quem precisa. Só os ativo com a tua autorização. 🤍</p><div><button class="ok" type="button">Aceitar</button><button class="no" type="button">Recusar</button></div>';
    document.body.appendChild(d);
    d.querySelector('.ok').onclick = function () { set('sim'); d.remove(); loadPixel(); };
    d.querySelector('.no').onclick = function () { set('nao'); d.remove(); };
  }

  var c = get();
  if (c === 'sim') loadPixel();
  else if (c !== 'nao') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', banner); else banner();
  }
})();
