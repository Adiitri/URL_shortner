import UrlListItem from './UrlListItem';

export default function UrlList({ urls, onDelete }) {
  if (urls.length === 0) {
    return <p className="empty-text">You haven't shortened any links yet.</p>;
  }

  return (
    <ul className="url-list">
      {urls.map((item) => (
        <UrlListItem key={item.id} item={item} onDelete={onDelete} />
      ))}
    </ul>
  );
}
