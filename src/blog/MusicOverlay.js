import React, { useState, useEffect } from "react";
import "./MusicOverlay.css"

function MusicOverlay({ isVisible, postName, onClose, handleAnimationEnd }) {
    const [postData, setPostData] = useState(null);

    // Effect to load the correct music post JSON when postName changes
    useEffect(() => {
        if (!postName) {
            setPostData(null);
            return;
        }

        // Using require.context to dynamically import
        try {
            const postsContext = require.context('./posts', false, /\.json$/);
            const postModule = postsContext(`./${postName}.json`);
            setPostData(postModule);
        } catch (err) {
            console.error(`Failed to load post data for: ${postName}.json`, err);
            setPostData(null); // Reset on error
        }

    }, [postName]);

    if (!isVisible || !postData) {
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
                                style={{ backgroundImage: `url(${require(`./img/album_art/${postData.albumArt}`)})` }}
                            ></div>
                        </div>
                    </div>
                    <div className="track-info">
                        <h2 className="album-title">{postData.title}</h2>
                        <h3 className="artist-name">{postData.artist}</h3>
                        <ul className="tracklist">
                            {postData.tracks.map((track, index) => (
                                <li key={index} className="track-item">
                                    <span className="track-title">{track.title}</span>
                                    <span className="track-duration">{track.duration}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MusicOverlay;

