import { Component } from 'react';
import { searchImg } from 'services/getFetch';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner';
import Modal from './Modal/Modal';
import css from './app.module.css';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    total: null,
    isLoading: false,
    error: null,
    showModal: false,
    imageProps: {},
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.getFetch();
    }
  }

  getFormData = data => {
    const { search } = this.state;
    if (search !== data) {
      this.setState({ search: data, images: [], page: 1, total: null });
    }
  };

  async getFetch() {
    try {
      const { search, page } = this.state;
      this.setState({ isLoading: true });
      console.log('page', page);
      const { data } = await searchImg(search, page);
      console.log('data', data);
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
        total: data.total,
      }));
    } catch ({ error }) {
      this.setState({ error: error.data.message || 'Cannot fetch images.' });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  notifyError = message => {
    toast.error(message);
  };

  showModal = ({ largeImageURL, tags }) => {
    console.log(largeImageURL, tags)
    this.setState({
      showModal: true,
      imageProps: {
        largeImageURL,
        tags,
      },
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, imageProps: {} });
  };

  render() {
    const { search, images, isLoading, error, total, showModal, imageProps } = this.state;

    return (
      <div className={css.app}>
        {showModal && <Modal onClose={this.closeModal}>
          <img src={imageProps.largeImageURL} alt={imageProps.tags} />
        </Modal>}
        <Searchbar onSubmit={this.getFormData} />
        {isLoading && <InfinitySpin width="200" color="#3f51b5" />}
        {error && this.notifyError(error)}
        {total === 0 && this.notifyError('Cannot find images')}
        {search && <ImageGallery images={images} showModal={this.showModal} />}
        {Boolean(images?.length) && (
          <Button onClick={this.handleLoadMoreClick} />
        )}
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}
