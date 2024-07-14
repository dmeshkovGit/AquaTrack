import { useForm } from 'react-hook-form';
import css from './UploadAvatarForm.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';

export default function UploadAvatarForm() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');

  const onChange = ({ target: { files } }) => {
    files[0] && setFileName(files[0].name);
    if (files) {
      setImage(URL.createObjectURL(files[0]));
    }
  };
  const onSubmit = () => {
    console.log(fileName.toLocaleLowerCase());
  };
  return (
    <div className={css.container}>
      {image && (
        <img src={image} width={60} className={css.img} alt={fileName} />
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
  );
}
