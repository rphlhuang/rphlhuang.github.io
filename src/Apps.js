import React from 'react';
import CustomNavbar from './CustomNavbar';
import './Apps.css';

// Auto-discover apps: drop a .json in src/apps/ and an image in src/apps/img/.
const appsContext = require.context('./apps', false, /\.json$/);
const imageContext = require.context('./apps/img', false, /\.(png|jpe?g|svg)$/);

const apps = appsContext
    .keys()
    .map((key) => appsContext(key))
    .sort(
        (a, b) =>
            (a.order ?? 999) - (b.order ?? 999) ||
            a.title.localeCompare(b.title)
    );

function resolveImage(name) {
    try {
        return imageContext('./' + name);
    } catch (e) {
        return null;
    }
}

function Apps() {
    return (
        <div className="App">
            <CustomNavbar />
            <div className="apps-page">
                <h1 className="apps-heading">apps</h1>
                <div className="apps-grid">
                    {apps.map((app, index) => {
                        const img = resolveImage(app.image);
                        return (
                            <a
                                key={index}
                                className="app-card"
                                href={app.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {img && (
                                    <img
                                        className="app-card-img"
                                        src={img}
                                        alt={app.title}
                                        draggable={false}
                                    />
                                )}
                                <div className="app-card-title">{app.title}</div>
                                <div className="app-card-desc">{app.description}</div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Apps;
