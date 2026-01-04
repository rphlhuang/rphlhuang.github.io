import React, { useState, useEffect } from "react";
import "./MusicOverlay.css"

function MusicOverlay({ isVisible, postName, onClose, handleAnimationEnd }) {
    const [postData, setPostData] = useState(null);
    const [albumArt, setAlbumArt] = useState(null);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = React.useRef(new Audio());

    // Printer Animation State
    const [printerText, setPrinterText] = useState("");
    const [printerState, setPrinterState] = useState("idle"); // idle, printing, falling

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

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

            // Set initial album description
            if (postModule.description) {
                setPrinterText(postModule.description);
                setPrinterState("printing");
            }

            // Do not select track 0 by default to show album info initially
            // if (postModule.tracks && postModule.tracks.length > 0) {
            //     setSelectedTrack(postModule.tracks[0]);
            // }

            const imagesContext = require.context('./img/album_art', false, /\.(png|jpe?g|svg)$/);
            const imagePath = imagesContext(`./${postModule.albumArt}`);
            setAlbumArt(imagePath);

        } catch (err) {
            console.error(`Failed to load post data or image for: ${postName}.json`, err);
            setPostData(null);
            setAlbumArt(null);
        }

    }, [postName]);

    const isPlayingRef = React.useRef(isPlaying);
    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    // Printer Effect for Track selection
    // We need to detect when selectedTrack changes and trigger animation
    useEffect(() => {
        if (!selectedTrack) return;

        // If it's the very first load, we might want to skip "falling"
        // But the previous effect handles the initial album text.
        // If we want track text on click, we update here.

        const newText = selectedTrack.description || postData?.description || "";

        if (newText !== printerText) {
            setPrinterState("falling");

            const timeout = setTimeout(() => {
                setPrinterText(newText);
                setPrinterState("printing");
            }, 500); // Wait for fall animation

            return () => clearTimeout(timeout);
        }
    }, [selectedTrack, postData, printerText]);



    // Audio Playback Effect
    useEffect(() => {
        const audio = audioRef.current;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleEnded = () => {
            // Auto-advance logic
            const currentIdx = postData?.tracks?.findIndex(t => t.title === selectedTrack.title);
            if (currentIdx !== -1 && currentIdx < postData.tracks.length - 1) {
                const nextTrack = postData.tracks[currentIdx + 1];
                setSelectedTrack(nextTrack);
                // isPlaying is already true, so the effect will load and play
            } else {
                // End of album
                setIsPlaying(false);
                setCurrentTime(0);
                setSelectedTrack(null); // Revert to album state

                // Trigger printer reset
                setPrinterState("falling");
                setTimeout(() => {
                    setPrinterText(postData.description);
                    setPrinterState("printing");
                }, 500);
            }
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    // Load and Play Track Effect
    useEffect(() => {
        if (!selectedTrack) return;

        try {
            const audioContext = require.context('./audio', false, /\.(mp3|wav)$/);
            const audioSrc = audioContext(`./${selectedTrack.fileName}`);

            const audio = audioRef.current;

            // Only change source if it's different to prevent reload on play/pause re-render (which shouldn't happen here as selectedTrack triggers dependecy)
            // But we must be careful not to reload if we are just seeking or doing other things. 
            // Here, dependency is [selectedTrack], so it only runs on track switch.

            // However, audioSrc might be a resolved URL. 
            // We'll pause, set src, loading it.
            const wasPlaying = isPlayingRef.current; // Use ref to avoid dependency
            audio.src = audioSrc;

            if (wasPlaying) {
                audio.play().catch(e => console.error("Playback failed:", e));
            } else {
                audio.pause(); // Should be default but safe
                setCurrentTime(0);
            }

        } catch (err) {
            console.error(`Failed to load audio for: ${selectedTrack.fileName}`, err);
        }
    }, [selectedTrack]);

    // Cleanup on unmount or close
    useEffect(() => {
        if (!isVisible) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
            setPrinterState("idle");
        }
    }, [isVisible]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play().catch(e => console.error("Play failed", e));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);


    const handleTrackClick = (track) => {
        if (selectedTrack && selectedTrack.title === track.title) {
            // Toggle play/pause if clicking same track
            setIsPlaying(!isPlaying);
        } else {
            setSelectedTrack(track);
            setIsPlaying(true); // Auto-play on new track
            // Trigger printer logic is handled by effect
        }
    };

    const handlePlay = () => {
        if (selectedTrack) {
            setIsPlaying(true);
        } else if (postData && postData.tracks && postData.tracks.length > 0) {
            // Play first track if nothing selected
            setSelectedTrack(postData.tracks[0]);
            setIsPlaying(true);
        }
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleStop = () => {
        setIsPlaying(false);
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
        setSelectedTrack(null); // Deselect to show album info

        if (postData && postData.description) {
            setPrinterState("falling");
            setTimeout(() => {
                setPrinterText(postData.description);
                setPrinterState("printing");
            }, 500);
        }
    };

    const handleSeek = (e) => {
        const time = parseFloat(e.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    if (!isVisible || !postData || !albumArt) {
        return null;
    }

    return (
        <>
            <div className="overlay music-overlay" onAnimationEnd={handleAnimationEnd}>
                <div className="overlay-toolbar" onClick={onClose}>⋘</div>
                <div className="music-overlay-content">
                    <div className={`record-player ${isPlaying ? 'playing' : ''}`}>
                        <div className="record-slide-wrapper">
                            <div className="record">
                                <div
                                    className="album-art"
                                    style={{ backgroundImage: `url(${albumArt})` }}
                                ></div>
                            </div>
                        </div>
                        {/* Playhead Arm Structure */}
                        <div className="playhead-container">
                            <div
                                className="playhead-arm"
                                style={{
                                    transform: isPlaying && selectedTrack
                                        ? `rotate(${-30 + ((postData.tracks.findIndex(t => t.title === selectedTrack.title) + (duration > 0 ? currentTime / duration : 0)) / postData.tracks.length) * 25}deg)`
                                        : null
                                }}
                            >
                                <div className="playhead-pivot"></div>
                                <div className="playhead-body">
                                    <div className="playhead-upper-arm"></div>
                                    <div className="playhead-elbow">
                                        <div className="playhead-lower-arm">
                                            <div className="playhead-head"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="right-column">
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
                            {/* Progress Bar & Time */}
                            <div className="progress-container" style={{ padding: '0 20px', marginBottom: '10px' }}>
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 0}
                                    step="0.1"
                                    value={currentTime}
                                    onChange={handleSeek}
                                    className="progress-bar"
                                />
                                <div className="time-display">
                                    <span className="current-time">{formatTime(currentTime)}</span>
                                    <span className="remaining-time">-{formatTime(duration - currentTime)}</span>
                                </div>
                            </div>
                            <div className="media-controls">
                                <button onClick={handlePlay} aria-label="Play">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 5V19L19 12L8 5Z" />
                                    </svg>
                                </button>
                                <button onClick={handlePause} aria-label="Pause">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" />
                                    </svg>
                                </button>
                                <button onClick={handleStop} aria-label="Stop">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 6H18V18H6V6Z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="album-info">
                                <h2 className="album-title">{postData.title}</h2>
                                <h3 className="artist-name">{postData.artist}</h3>
                            </div>
                        </div>

                        {/* Printer Card */}
                        <div className={`printer-card ${printerState}`}>
                            <div className="printer-text">
                                {printerText}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MusicOverlay;
