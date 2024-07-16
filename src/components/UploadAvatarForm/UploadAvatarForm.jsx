import css from './UploadAvatarForm.module.css';
import { useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { RxAvatar } from 'react-icons/rx';
import { selectUser } from '../../redux/user/selectors';
import { updateUser } from '../../redux/user/operations';

export default function UploadAvatarForm() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const user = useSelector(selectUser);
  const dispacth = useDispatch();

  const onChange = ({ target: { files } }) => {
    files[0] && setFileName(files[0].name);
    if (files) {
      setImage(URL.createObjectURL(files[0]));
    }
  };
  const onSubmit = () => {
    dispacth(updateUser({ _id: user._id, avatarURL: image }));
  };
  return (
    <>
      <div className={css.container}>
        {user.avatarURL || image ? (
          <img
            src={user.avatarURL || image}
            width={60}
            className={css.img}
            alt={fileName}
          />
        ) : (
          <RxAvatar size={38} className={css.iconAvatar} />
        )}
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
                accept="image/*, .png, .jpg, .jpeg, .web, .webp"
                onChange={onChange}
                hidden
                id="avatarInput"
              />
              <MdOutlineFileUpload className={css.icon} />
              <p className={css.text}>Upload avatar</p>
            </div>
          </form>
          <div className={css.btnWrap}>
            <button type="button" className={css.btn} onClick={onSubmit}>
              <IoIosSend className={css.icon} />
            </button>
            <button
              type="button"
              className={css.btn}
              onClick={() => {
                setFileName('');
                setImage(null);
              }}
            >
              <MdDelete className={css.icon} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
