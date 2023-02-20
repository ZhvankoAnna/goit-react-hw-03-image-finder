const ImageGalleryItem = ({ smallImg, tags }) => {
  return (
    <li className="gallery-item">
      <img src={smallImg} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
