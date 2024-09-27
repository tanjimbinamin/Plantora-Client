import PhotoAlbum, { Photo } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useState } from "react";
import SectionTitle from "@/components/sectionTitle/SectionTitle";

const ImageGallery = ({ photos }: { photos: Photo[] }) => {
  const [index, setIndex] = useState(-1);

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle text="Image Gallery" />
      <div >
        <PhotoAlbum
          photos={photos.slice(0, 15)}
          layout="masonry"
          targetRowHeight={200}
          onClick={({ index }) => setIndex(index)}
          renderPhoto={(data) => (
            <img
              {...data.imageProps}
              className="object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
            />
          )}
        />
      </div>
      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </div>
  );
};

export default ImageGallery;
