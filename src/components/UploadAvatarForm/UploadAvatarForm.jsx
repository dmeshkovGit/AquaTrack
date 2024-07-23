import css from './UploadAvatarForm.module.css';
import { useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/user/selectors';
import { updateAvatar, updateUser } from '../../redux/user/operations';
import toastMaker from '../../shared/helpers/toastMaker/toastMaker.jsx';
import { useTranslation } from 'react-i18next';
import { RxAvatar } from 'react-icons/rx';
import '../../translate/index.js';
import clsx from 'clsx';

const validFileExtensions = ['jpg', 'png'];

function isValidFileType(fileName) {
  return validFileExtensions.includes(fileName.split('.').pop());
}

export default function UploadAvatarForm() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('avatar');
  const user = useSelector(selectUser);
  const dispacth = useDispatch();
  const { t, i18n } = useTranslation();

  const onChange = ({ target: { files } }) => {
    files[0] && setFileName(files[0].name);
    if (!files) return;
    const isValid = isValidFileType(files[0].name);
    if (!isValid) {
      toastMaker('Invalid extension. Only .jpg, .png are available', 'error');
      return;
    }
    setImage(URL.createObjectURL(files[0]));
    dispacth(updateAvatar({ avatar: files[0] }))
      .unwrap()
      .then(() => toastMaker('Avatar updated', 'succes'))
      .catch(() => toastMaker('Sorry, try again later', 'error'));
  };

  const onDelete = () => {
    setFileName('');
    setImage(null);
    dispacth(updateUser({ _id: user._id, avatarURL: null }))
      .unwrap()
      .then(() => toastMaker('Avatar deleted', 'succes'))
      .catch(() => toastMaker('Sorry, try again later', 'error'));
  };
  return (
    <>
      <div className={css.container}>
        {user.avatarURL || image ? (
          <img
            src={image || user.avatarURL}
            width={60}
            className={css.img}
            alt={fileName}
          />
        ) : (
          <RxAvatar className={css.iconAvatar} />
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
                accept="image/*, .png, .jpg"
                onChange={onChange}
                hidden
                id="avatarInput"
              />
              <div className={css.avatarSetWrapp}>
                <p
                  className={clsx(css.text, {
                    [css.textUk]: i18n.language === 'uk',
                  })}
                >
                  <MdOutlineFileUpload className={css.icon} />
                  {t('Upload avatar')}
                </p>
              </div>
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
