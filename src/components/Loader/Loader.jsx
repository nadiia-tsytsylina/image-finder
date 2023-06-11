import { MagnifyingGlass } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.LoaderBox}>
      <MagnifyingGlass
        visible={true}
        height="100"
        width="100"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="rgba(251, 247, 49, 0.8)"
        color="rgba(33, 110, 157, 1)"
      />
    </div>
  );
}
