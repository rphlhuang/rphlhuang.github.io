import "./ImageOverlay.css";

function ImageOverlay({ isVisible, imageSrc, onClose }) {
    if (!isVisible) return null;

    return (
        <div className="overlay" onClick={onClose}>
            <div className="overlay-content">
                <img src={imageSrc} alt="fullres"/>
            </div>
        </div>
    );
}

export default ImageOverlay;