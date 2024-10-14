import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Buffer } from 'buffer';
const global = globalThis;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <div className="custom-cursor"></div>
  </React.StrictMode>,
)

// Custom cursor movement
document.addEventListener('mousemove', (e) => {
  const cursor = document.querySelector('.custom-cursor') as HTMLElement;
  if (cursor) {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  }
});

// Custom cursor size change on hover
document.body.addEventListener('mouseover', (e) => {
  const cursor = document.querySelector('.custom-cursor') as HTMLElement;
  if (cursor && e.target instanceof HTMLElement) {
    const isHoverable = e.target.matches('a, button, input, select, textarea, .hoverable');
    cursor.style.width = isHoverable ? '40px' : '20px';
    cursor.style.height = isHoverable ? '40px' : '20px';
  }
});

document.body.addEventListener('mouseout', () => {
  const cursor = document.querySelector('.custom-cursor') as HTMLElement;
  if (cursor) {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
  }
});
