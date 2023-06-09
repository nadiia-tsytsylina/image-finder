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
    if (query === '') {
      return;
    }

    setIsLoading(true);
    setIsShowLoadMore(false);

    fetchImages(query, page)
      .then(data => {
        const { totalHits, hits } = data;

        if (totalHits === 0) {
          toast.error(`There are no images with tag ${query}`);
          setIsLoading(false);
          setIsShowLoadMore(false);
          return;
        } else {
          setImages(state => (page === 1 ? hits : [...state, ...hits]));
          setIsShowLoadMore(page < Math.ceil(totalHits / 12));
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
