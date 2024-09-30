import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'

const domNode = document.getElementById('app');
const root = createRoot(domNode!);
root.render(<App />);

// THIS LABEL IS USEFULL TO CSS HOT RELOAD AND IT WILL BE REMOVED IN PRODUCTION BUILD  
// noinspection UnnecessaryLabelJS
DEV: new EventSource('/esbuild').addEventListener('change', e => {
  const { added, removed, updated } = JSON.parse(e.data)

  if (!added.length && !removed.length && updated.length === 1) {
    for (const link of Array.from(document.getElementsByTagName("link"))) {
      const url = new URL(link.href)

      if (url.host === location.host && url.pathname === updated[0]) {
        const next = link.cloneNode() as HTMLLinkElement
        next.href = updated[0] + '?' + Math.random().toString(36).slice(2)
        next.onload = () => link.remove()
        link.parentNode!.insertBefore(next, link.nextSibling)
        return
      }
    }
  }

  location.reload()
})
