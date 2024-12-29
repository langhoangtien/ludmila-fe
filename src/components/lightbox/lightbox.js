import PropTypes from 'prop-types';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Video from 'yet-another-react-lightbox/plugins/video';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import ReactLightbox, { useLightboxState } from 'yet-another-react-lightbox';

import Box from '@mui/material/Box';

import Iconify from '../iconify';
import StyledLightbox from './styles';

// ----------------------------------------------------------------------

export default function Lightbox({
  slides,
  disabledZoom,
  disabledVideo,
  disabledTotal,
  disabledCaptions,
  disabledSlideshow,
  disabledThumbnails,
  disabledFullscreen,
  onGetCurrentIndex,
  ...other
}) {
  const totalItems = slides ? slides.length : 0;

  return (
    <>
      <StyledLightbox />

      <ReactLightbox
        slides={slides}
        animation={{ swipe: 240 }}
        carousel={{ finite: totalItems < 5 }}
        controller={{ closeOnBackdropClick: true }}
        plugins={getPlugins({
          disabledZoom,
          disabledVideo,
          disabledCaptions,
          disabledSlideshow,
          disabledThumbnails,
          disabledFullscreen,
        })}
        on={{
          view: ({ index }) => {
            if (onGetCurrentIndex) {
              onGetCurrentIndex(index);
            }
          },
        }}
        toolbar={{
          buttons: [
            <DisplayTotal key={0} totalItems={totalItems} disabledTotal={disabledTotal} />,
            'close',
          ],
        }}
        render={{
          iconClose: () => <Iconify width={24} icon="fluent:dismiss-20-regular" />,
          iconZoomIn: () => <Iconify width={24} icon="fluent:zoom-in-20-regular" />,
          iconZoomOut: () => <Iconify width={24} icon="fluent:zoom-out-20-regular" />,
          iconSlideshowPlay: () => <Iconify width={24} icon="fluent:play-20-regular" />,
          iconSlideshowPause: () => <Iconify width={24} icon="fluent:pause-20-regular" />,
          iconPrev: () => <Iconify width={32} icon="fluent:chevron-left-20-regular" />,
          iconNext: () => <Iconify width={32} icon="fluent:chevron-right-20-regular" />,
          iconExitFullscreen: () => <Iconify width={24} icon="fluent:square-multiple-20-regular" />,
          iconEnterFullscreen: () => <Iconify width={24} icon="fluent:square-20-regular" />,
        }}
        {...other}
      />
    </>
  );
}

Lightbox.propTypes = {
  disabledCaptions: PropTypes.bool,
  disabledFullscreen: PropTypes.bool,
  disabledSlideshow: PropTypes.bool,
  disabledThumbnails: PropTypes.bool,
  disabledTotal: PropTypes.bool,
  disabledVideo: PropTypes.bool,
  disabledZoom: PropTypes.bool,
  onGetCurrentIndex: PropTypes.func,
  slides: PropTypes.array,
};

// ----------------------------------------------------------------------

export function getPlugins({
  disabledZoom,
  disabledVideo,
  disabledCaptions,
  disabledSlideshow,
  disabledThumbnails,
  disabledFullscreen,
}) {
  let plugins = [Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom];

  if (disabledThumbnails) {
    plugins = plugins.filter((plugin) => plugin !== Thumbnails);
  }
  if (disabledCaptions) {
    plugins = plugins.filter((plugin) => plugin !== Captions);
  }
  if (disabledFullscreen) {
    plugins = plugins.filter((plugin) => plugin !== Fullscreen);
  }
  if (disabledSlideshow) {
    plugins = plugins.filter((plugin) => plugin !== Slideshow);
  }
  if (disabledZoom) {
    plugins = plugins.filter((plugin) => plugin !== Zoom);
  }
  if (disabledVideo) {
    plugins = plugins.filter((plugin) => plugin !== Video);
  }

  return plugins;
}

// ----------------------------------------------------------------------

export function DisplayTotal({ totalItems, disabledTotal }) {
  const { currentIndex } = useLightboxState();

  if (disabledTotal) {
    return null;
  }

  return (
    <Box
      component="span"
      className="yarl__button"
      sx={{
        typography: 'body2',
        alignItems: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
      }}
    >
      <strong> {currentIndex + 1} </strong> / {totalItems}
    </Box>
  );
}

DisplayTotal.propTypes = {
  disabledTotal: PropTypes.bool,
  totalItems: PropTypes.number,
};
