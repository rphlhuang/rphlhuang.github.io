import photosIndex from './index/jrnl_index.json';
import musicIndex from './index/music_index.json';
import etcIndex from './index/etc_index.json';

export const IMAGE_CONTEXTS = {
  jrnl: require.context('./img/photos', false, /\.(png|jpe?g|svg)$/),
  music: require.context('./img/album_art', false, /\.(png|jpe?g|svg)$/),
  etc: require.context('./img/etc', false, /\.(png|jpe?g|svg)$/)
};

export const INDEX_MAP = {
  jrnl: photosIndex,
  music: musicIndex,
  etc: etcIndex,
};
