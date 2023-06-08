import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from 'components/Searchbar/Searchbar';
import Loader from 'components/Loader/Loader';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import { fetchImages } from 'services/fetchAPI';
import css from './App.module.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [isShowLoadMore, setIsShowLoadMore] = useState(false);

  const handleFormSubmit = newQuery => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
      setImages(null);
    }
  };

  const handleLoadMore = () => {
    setPage(state => state + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    setIsShowLoadMore(false);

    fetchImages(query, page)
      .then(data => {
        if (data.totalHits === 0) {
          toast.error(`There are no images with tag ${query}`);
          setIsLoading(false);
          setIsShowLoadMore(false);
          return;
        } else {
          setImages(state =>
            page === 1 ? data.hits : [...state, ...data.hits]
          );
          setIsShowLoadMore(page < Math.ceil(data.totalHits / 12));
          setIsLoading(false);
        }
      })
      .catch(error => {
        toast.error(`${error}`);
      });
  }, [query, page]);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {images && <ImageGallery images={images} />}
      {isShowLoadMore && <Button onCLick={handleLoadMore} />}
      {isLoading && <Loader />}
      <ToastContainer
        autoClose={2000}
        position="bottom-right"
        theme="colored"
      />
    </div>
  );
}

// class oldApp extends Component {
// state = {
//   imageName: '',
//   isLoading: false,
//   images: null,
//   page: 1,
//   isShowLoadMore: false,
// };
// async componentDidUpdate(prevProps, prevState) {
//   const { imageName, page } = this.state;
//   const prevPage = prevState.page;
//   const prevImageName = prevState.imageName;
//   const prevImages = prevState.images;
//   if (prevImageName !== imageName || prevPage !== page) {
//     try {
//       this.setState({ isLoading: true });
//       const { totalHits, hits } = await fetchImages(imageName, page);
//       if (totalHits === 0) {
//         toast.error(`There are no images with tag ${imageName}`);
//         this.setState({ isLoading: false, isShowLoadMore: false });
//         return;
//       } else {
//         this.setState(prevState => ({
//           images: page === 1 ? hits : [...prevImages, ...hits],
//           isShowLoadMore: page < Math.ceil(totalHits / 12),
//         }));
//         this.setState({ isLoading: false });
//       }
//     } catch (error) {
//       toast.error(`${error}`);
//     }
//   }
// }
// handleFormSubmit = imageName => {
//   if (imageName !== this.state.imageName) {
//     this.setState({ imageName, page: 1, images: null });
//   }
// };
// handleLoadMore = () => {
//   this.setState(prevState => ({ page: prevState.page + 1 }));
// };
// render() {
//   const { isLoading, images, isShowLoadMore } = this.state;
//   return (
//     <div className={css.App}>
//       <Searchbar onSubmit={this.handleFormSubmit} />
//       {images && <ImageGallery images={images} />}
//       {isShowLoadMore && <Button onCLick={this.handleLoadMore} />}
//       {isLoading && <Loader />}
//       <ToastContainer
//         autoClose={2000}
//         position="bottom-right"
//         theme="colored"
//       />
//     </div>
//   );
// }
// }
// export default App;
