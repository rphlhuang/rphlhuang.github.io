import React, { useState, useEffect } from "react";
import "./MusicOverlay.css"

function MusicOverlay({ isVisible, postName, onClose, handleAnimationEnd }) {
    const [postData, setPostData] = useState(null);
    const [albumArt, setAlbumArt] = useState(null);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!postName) {
            setPostData(null);
            setAlbumArt(null);
            return;
        }

        try {
            const postsContext = require.context('./posts', false, /\.json$/);
            const postModule = postsContext(`./${postName}.json`);
            setPostData(postModule);

            if (postModule.tracks && postModule.tracks.length > 0) {
                setSelectedTrack(postModule.tracks[0]);
            }

            const imagesContext = require.context('./img/album_art', false, /\.(png|jpe?g|svg)$/);
            const imagePath = imagesContext(`./${postModule.albumArt}`);
            setAlbumArt(imagePath);

        } catch (err) {
            console.error(`Failed to load post data or image for: ${postName}.json`, err);
            setPostData(null);
            setAlbumArt(null);
        }

    }, [postName]);

    const handleTrackClick = (track) => {
        setSelectedTrack(track);
        setIsPlaying(true); // Auto-play on track selection
        console.log("Playing:", track.fileName);
    };

    const handlePlay = () => {
        if (selectedTrack) {
            setIsPlaying(true);
            console.log("Playing:", selectedTrack.fileName);
        }
    };

    const handlePause = () => {
        setIsPlaying(false);
        console.log("Paused:", selectedTrack.fileName);
    };

    const handleStop = () => {
        setIsPlaying(false);
        console.log("Stopped:", selectedTrack.fileName);
    };

    if (!isVisible || !postData || !albumArt) {
        return null;
    }

    return (
        <>
            <div className="overlay music-overlay" onAnimationEnd={handleAnimationEnd}>
                <div className="overlay-toolbar" onClick={onClose}>⋘</div>
                <div className="music-overlay-content">
                    <div className="record-player">
                        <div className="record">
                            <div
                                className="album-art"
                                style={{ backgroundImage: `url(${albumArt})` }}
                            ></div>
                        </div>
                    </div>
                    <div className="track-info">
                        <ul className="tracklist">
                            {postData.tracks.map((track, index) => (
                                <li
                                    key={index}
                                    className={`track-item ${selectedTrack && selectedTrack.title === track.title ? 'selected' : ''}`}
                                    onClick={() => handleTrackClick(track)}
                                >
                                    <span className="track-title">{track.title}</span>
                                    <span className="track-duration">{track.duration}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="media-controls">
                            <button onClick={handlePlay} aria-label="Play">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 5V19L19 12L8 5Z"/>
                                </svg>
                            </button>
                            <button onClick={handlePause} aria-label="Pause">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z"/>
                                </svg>
                            </button>
                            <button onClick={handleStop} aria-label="Stop">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 6H18V18H6V6Z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="album-info">
                            <h2 className="album-title">{postData.title}</h2>
                            <h3 className="artist-name">{postData.artist}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MusicOverlay;
