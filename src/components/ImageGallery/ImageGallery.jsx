import { Component } from 'react';
import axios from 'axios';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    images: [],
  };

  async componentDidMount() {
    const response = await axios.get(
      'https://pixabay.com/api/?q=cat&page=1&key=32975717-e5ee65230820405f183c875ea&image_type=photo&orientation=horizontal&per_page=12'
    );
    this.setState({ images: response.data.hits });
  }

  render() {
    const { images } = this.state;
    return (
      <ul className="gallery">
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            smallImg={webformatURL}
            largeImg={largeImageURL}
            tags={tags}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
