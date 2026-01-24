/**
 * Vite plugin to inject base tag at the very beginning of <head>
 * This ensures assets load from the correct origin (www or non-www)
 */
import type { Plugin } from 'vite';

export function injectBaseTag(): Plugin {
  return {
    name: 'inject-base-tag',
    transformIndexHtml(html) {
      // Inject base tag script at the VERY FIRST position in <head>
      // This must run before any asset loading
      const baseTagScript = `
    <script>
      (function() {
        // Set base tag IMMEDIATELY, before any other scripts run
        var currentOrigin = window.location.origin;
        var baseTag = document.createElement('base');
        baseTag.href = currentOrigin + '/';
        // Insert at the very beginning of head
        var head = document.head || document.getElementsByTagName('head')[0];
        if (head.firstChild) {
          head.insertBefore(baseTag, head.firstChild);
        } else {
          head.appendChild(baseTag);
        }
      })();
    </script>`;
      
      // Insert right after <head> tag
      return html.replace(
        /<head[^>]*>/i,
        `$&${baseTagScript}`
      );
    },
  };
}
