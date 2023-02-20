import {Component} from 'react';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    search: '',
  }

  getFormData = (data) => {
    this.setState({search: data});
  }

  render() {
    const {search} = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.getFormData}/>
        <ImageGallery search={search}/>
      </div>
    );
  }
};
