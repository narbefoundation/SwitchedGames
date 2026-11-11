/* Support dialog for NARBE Foundation and NARBE House. Shown once per browser session: closing it sets a session cookie
   (no expiry), so refreshes and other tabs skip it, and it returns after the browser is fully closed and reopened. */
(function () {
  'use strict';
  var cookieName = 'switchedgames-support-dialog-seen';
  var DONATE_URL = 'https://givebutter.com/donate-narbe';
  var SWITCH_KIT_URL = 'https://narbefoundation.org/switchkit.html#newsletter';
  var BUILD_URL = 'https://narbehouse.github.io/build-with-us/';
  var AWARD_URL = 'https://forms.gle/QhVt7WhoQKe6ozkp9';
  var NEW_TAB = '<span class="sr-only"> (opens in a new tab)</span>';
  var EXTERNAL = '<svg class="icon small" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="M14 4h6v6m0-6L9 15"/><path d="M10 4H4v16h16v-6"/></svg>';

  function seen() {
    try { return document.cookie.split('; ').indexOf(cookieName + '=1') !== -1; } catch (_) { return false; }
  }
  function remember() {
    // No Expires/Max-Age: the browser deletes this cookie when the browser session ends.
    try { document.cookie = cookieName + '=1; path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : ''); } catch (_) { /* Cookies may be blocked; the dialog still closes. */ }
  }

  function build() {
    if (seen() || document.getElementById('support-dialog')) return;
    if (typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;
    // Never stack on top of another open dialog (for example, game details).
    if (document.querySelector('dialog[open]')) return;

    var dialog = document.createElement('dialog');
    dialog.id = 'support-dialog';
    dialog.className = 'support-dialog';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'support-dialog-title');
    dialog.innerHTML =
      '<button type="button" class="icon-button dialog-close" data-support-close aria-label="Close and continue to games">' +
        '<svg class="icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>' +
      '</button>' +
      '<div class="support-body">' +
        '<section class="support-section" aria-labelledby="support-dialog-title">' +
          '<h2 id="support-dialog-title" tabindex="-1">Support NARBE Foundation</h2>' +
          '<p>NARBE Foundation is our nonprofit. Donations pay for the tools we use to build these free, open-source games, and for our switch kit program, which gives free switch kits and USB adapters to people who need them. Your gift sends free switch kits to people who need them and helps us keep building new free games.</p>' +
          '<div class="support-actions">' +
            '<a class="button" href="' + DONATE_URL + '" target="_blank" rel="noopener">Support Kits and Games' + NEW_TAB + EXTERNAL + '</a>' +
            '<a class="button secondary" href="' + SWITCH_KIT_URL + '" target="_blank" rel="noopener">Switch Kit Program' + NEW_TAB + EXTERNAL + '</a>' +
          '</div>' +
        '</section>' +
        '<section class="support-section" aria-labelledby="support-house-title">' +
          '<h2 id="support-house-title">Built by NARBE House</h2>' +
          '<p>Switched Games is made by NARBE House, our small family business. Want to learn to build games like these, or have us build one with you or your organization?</p>' +
          '<div class="support-actions">' +
            '<a class="button secondary" href="' + BUILD_URL + '" target="_blank" rel="noopener">Build With NARBE House' + NEW_TAB + EXTERNAL + '</a>' +
            '<a class="button secondary" href="' + AWARD_URL + '" target="_blank" rel="noopener">Apply for the Build for One Award' + NEW_TAB + EXTERNAL + '</a>' +
          '</div>' +
        '</section>' +
        '<button type="button" class="button support-continue" data-support-close>Continue to Games</button>' +
      '</div>';
    document.body.appendChild(dialog);

    var title = dialog.querySelector('#support-dialog-title');
    var returnFocus = document.activeElement;
    var previousOverflow = document.documentElement.style.overflow;

    function focusables() {
      return Array.prototype.filter.call(
        dialog.querySelectorAll('a[href], button:not([disabled])'),
        function (el) { return el.offsetWidth || el.offsetHeight || el.getClientRects().length; }
      );
    }

    dialog.querySelectorAll('[data-support-close]').forEach(function (button) {
      button.addEventListener('click', function () { remember(); dialog.close(); });
    });
    // Following a link counts as having seen the dialog, even if this tab is later closed.
    dialog.querySelectorAll('a[href]').forEach(function (link) {
      link.addEventListener('click', remember);
    });
    // Backdrop click: the dialog element itself receives clicks outside its box.
    dialog.addEventListener('click', function (event) {
      if (event.target !== dialog) return;
      var r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) { remember(); dialog.close(); }
    });
    // Escape closes the dialog natively; store the flag right away as well.
    dialog.addEventListener('cancel', remember);
    // Keep Tab and Shift+Tab inside the dialog while it is open.
    dialog.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab') return;
      var items = focusables();
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      var active = document.activeElement;
      if (event.shiftKey && (active === first || active === title || !dialog.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    });
    dialog.addEventListener('close', function () {
      remember();
      document.documentElement.style.overflow = previousOverflow;
      if (returnFocus && returnFocus.isConnected && returnFocus !== document.body && typeof returnFocus.focus === 'function') {
        returnFocus.focus({ preventScroll: true });
      } else if (document.activeElement && dialog.contains(document.activeElement)) {
        document.activeElement.blur();
      }
      dialog.remove();
    });

    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
    dialog.scrollTop = 0;
    title.focus({ preventScroll: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build, { once: true });
  else build();
})();
