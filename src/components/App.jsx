import { Component } from 'react';
import { searchImg } from 'services/getFetch';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner';
import css from './app.module.css';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    total: null,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { search } = this.state;
    if (prevState.search !== search) {
      this.setState({
        images: [],
        page: 1,
        total: null,
      });
      this.getFetch();
    }
  }

  getFormData = data => {
    this.setState({ search: data });
  };

  handleBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.getFetch();
  };

  async getFetch() {
    try {
      const { search, page } = this.state;
      this.setState({ isLoading: true });
      // console.log('page', page);
      const { data } = await searchImg(search, page);
      console.log('data', data);
      if (data.total === 0) {
        this.setState({error: 'Input valid query.'})
        Promise.reject(new Error());
      }
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
        total: data.total,
      }));
    } catch ({ error }) {
      this.setState({ error: 'Cannot fetch images.' });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { search, images, isLoading, error } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.getFormData} />
        {isLoading && <InfinitySpin width="200" color="#3f51b5" />}
        {/* {error && toast.error(`${error}`)} */}
        {search && <ImageGallery images={images} />}
        {Boolean(images?.length) && <Button onClick={this.handleBtnClick} />}
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}
