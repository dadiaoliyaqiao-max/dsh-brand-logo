// DSH client bundle — Action Formula brand logo
// Replaces the sidebar brand lockup (top-left "deepseek HARNESS") with the
// Action Formula logo. Nothing else is touched: the official brand package
// row is disabled by this bundle's patch, and this module fills the same two
// sidebar slots with the logo image.
window.__ModuleLoader__.load({
  id: 'dsh-brand-logo',
  factory(require) {
    const jsxRuntime = require('react/jsx-runtime');
    const LOGO = 'data:image/png;base64,__LOGO_B64__';
    const LOGO_HEIGHT = __LOGO_HEIGHT__;
    const STYLE_ID = 'dsh-action-brand-style';
    const HTML_ATTR = 'data-dsh-action-brand';

    const CSS = `
html[${HTML_ATTR}] [class*="logoRow"] {
  height: auto !important;
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}
html[${HTML_ATTR}] [class*="brandIdentity"] {
  height: auto !important;
  gap: 0 !important;
}
html[${HTML_ATTR}] [class*="brandName"] {
  display: none !important;
}
html[${HTML_ATTR}] button[class*="brand"] {
  overflow: visible !important;
  align-items: center !important;
}
html[${HTML_ATTR}] .dsh-action-brand-logo {
  display: block;
  height: ${LOGO_HEIGHT}px;
  width: auto;
  max-width: 100%;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
}
/* Collapsed rail (non-Windows surfaces): keep the mark square inside the rail. */
html[${HTML_ATTR}] [class*="railMark"] .dsh-action-brand-logo {
  height: 24px;
  width: 24px;
  object-fit: cover;
  object-position: left center;
}
`;

    function BrandLogo() {
      return jsxRuntime.jsx('img', {
        src: LOGO,
        alt: '言动方程',
        className: 'dsh-action-brand-logo',
        draggable: false,
      });
    }

    // The lockup already contains the wordmark, so the name slot stays empty
    // (occupying it suppresses the shell's local-build label fallback).
    function BrandName() {
      return null;
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.effect(() => {
          const style = document.createElement('style');
          style.id = STYLE_ID;
          style.textContent = CSS;
          document.head.appendChild(style);
          document.documentElement.setAttribute(HTML_ATTR, '');
          return () => {
            style.remove();
            document.documentElement.removeAttribute(HTML_ATTR);
          };
        });

        ctx.slots.inject('sidebar.brand.mark', () =>
          ctx.slots.inject('sidebar.brand.name', function* () {
            yield ctx.slots.register({ name: 'sidebar.brand.mark' }, BrandLogo);
            yield ctx.slots.register({ name: 'sidebar.brand.name' }, BrandName);
          }),
        );
      },
    };
  },
});
