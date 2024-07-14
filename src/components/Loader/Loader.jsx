import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

import {
  selectIsLoading,
  selectIsRefreshing,
  selectIsUpdating,
} from '../../redux/user/selectors.js';

const override = {
  position: 'absolute',
  top: '3px',
  right: '-20px',
};

export const Loader = () => {
  const isLoading = useSelector(selectIsLoading);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isUpdating = useSelector(selectIsUpdating);

  return (
    <ClipLoader
      color="#1f1f1f"
      cssOverride={override}
      size={14}
      loading={isLoading || isRefreshing || isUpdating}
    />
  );
};
