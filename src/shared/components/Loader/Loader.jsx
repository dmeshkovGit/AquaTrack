import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

import { selectIsLoading } from '../../../redux/user/selectors.js';

export const Loader = ({ position = 'absolute', top = 0, right = 0 }) => {
  const isLoading = useSelector(selectIsLoading);

  const override = {
    position: position,
    top: top,
    right: right,
  };

  return (
    <ClipLoader
      color="#1f1f1f"
      cssOverride={override}
      size={14}
      loading={isLoading}
    />
  );
};
