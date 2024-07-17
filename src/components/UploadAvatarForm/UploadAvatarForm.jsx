import css from './UploadAvatarForm.module.css';
import { useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/user/selectors';
import { updateUser } from '../../redux/user/operations';
import toast from 'react-hot-toast';

export default function UploadAvatarForm() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const user = useSelector(selectUser);
  const dispacth = useDispatch();

  const onChange = ({ target: { files } }) => {
    files[0] && setFileName(files[0].name);
    if (!files) return;
    setImage(URL.createObjectURL(files[0]));
    dispacth(
      updateUser({ _id: user._id, avatarURL: URL.createObjectURL(files[0]) }),
    )
      .unwrap()
      .then(() => toast.success('Avatar updated'))
      .catch(() => toast.error('Sorry, try again later'));
  };

  const onDelete = () => {
    setFileName('');
    setImage(null);
    dispacth(updateUser({ _id: user._id, avatarURL: null }))
      .unwrap()
      .then(() => toast.success('Avatar deleted'))
      .catch(() => toast.error('Sorry, try again later'));
  };
  return (
    <>
      <div className={css.container}>
        <img
          src={image || user.avatarURL}
          width={60}
          className={css.img}
          alt={fileName}
        />

        <div className={css.formWrapper}>
          <form
            className={css.form}
            onClick={() => document.querySelector('#avatarInput').click()}
          >
            <div className={css.wrapInput}>
              <input
                type="file"
                name="avatarURL"
                className={css.avatarInput}
                accept="image/*, .png, .jpg, .jpeg, .web, .webp, .gif, .svg"
                onChange={onChange}
                hidden
                id="avatarInput"
              />

              <p className={css.text}>
                <MdOutlineFileUpload className={css.icon} />
                Upload avatar
              </p>
            </div>
          </form>

          <button type="button" className={css.btn} onClick={onDelete}>
            <MdDelete className={css.icon} />
          </button>
        </div>
      </div>
    </>
  );
}
