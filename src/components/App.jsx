import { Component } from 'react';
import { searchImg } from 'services/API';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import css from './app.module.css'

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
  };

  getFormData = data => {
    this.setState({ search: data });
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search) {
      searchImg(search, page).then(response =>
        this.setState(({ images }) => ({
          images: [...images, ...response.data.hits],
        }))
      );
    }
  }

  render() {
    const { search, images } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.getFormData} />
        {search && <ImageGallery images={images} />}
        {Boolean(images?.length) && <Button/>}
      </div>
    );
  }
}
