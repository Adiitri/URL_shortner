import { useState } from 'react';

export default function UrlListItem({ item, onDelete }) {
  const [copied, setCopied] = useState(false);

  // The redirect route lives on the backend, not the frontend.
  const shortUrl = `${import.meta.env.VITE_API_BASE_URL}/${item.shortCode}`;

  function handleCopy() {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <li className="url-item">
      <div className="url-info">
        <a href={shortUrl} target="_blank" rel="noreferrer" className="short-link">
          {shortUrl}
        </a>
        <span className="target-link" title={item.targetURL}>
          {item.targetURL}
        </span>
      </div>
      <div className="url-actions">
        <button onClick={handleCopy}>{copied ? 'Copied!' : 'Copy'}</button>
        <button onClick={() => onDelete(item.id)} className="danger">
          Delete
        </button>
      </div>
    </li>
  );
}
