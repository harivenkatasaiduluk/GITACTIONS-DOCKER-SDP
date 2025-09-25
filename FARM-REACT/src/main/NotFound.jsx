import NotFoundImage from './notfound.png';
import './style.css'

export default function NotFound() {
  return (
    <div align="center" className="not-found-container">
      <h1>Page Not Found</h1>
      <img src={NotFoundImage} alt="Page Not Found" height={500} className="not-found-image" />
    </div>
  );
}
