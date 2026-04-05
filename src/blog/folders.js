import photosIndex from './index/jrnl_index.json';
import musicIndex from './index/music_index.json';
import etcIndex from './index/etc_index.json';
import anthropoceneReviewedIndex from './index/anthropocene_reviewed_index.json';

export const FOLDER_CONFIGS = {
  jrnl: {
    label: 'jrnl',
    windowTitle: 'jrnl',
    overlayType: 'image',
  },
  music: {
    label: 'music',
    windowTitle: 'music',
    overlayType: 'music',
  },
  etc: {
    label: 'etc',
    windowTitle: 'etc',
    overlayType: 'image',
  },
  anthropocene_reviewed: {
    label: 'anthropocene\nreviewed',
    windowTitle: 'anthropocene reviewed',
    overlayType: 'image',
  },
};

export const DESKTOP_FOLDERS = Object.entries(FOLDER_CONFIGS).map(([key, config]) => ({
  key,
  ...config,
}));

export const IMAGE_CONTEXTS = {
  jrnl: require.context('./img/photos', false, /\.(png|jpe?g|svg)$/),
  music: require.context('./img/album_art', false, /\.(png|jpe?g|svg)$/),
  etc: require.context('./img/etc', false, /\.(png|jpe?g|svg)$/),
  anthropocene_reviewed: require.context('./img/anthropocene_reviewed', false, /\.(png|jpe?g|svg)$/),
};

export const INDEX_MAP = {
  jrnl: photosIndex,
  music: musicIndex,
  etc: etcIndex,
  anthropocene_reviewed: anthropoceneReviewedIndex,
};
