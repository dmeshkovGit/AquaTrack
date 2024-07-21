import clsx from 'clsx';
import css from './AppSettingsForm.module.css';
import Icon from '../../shared/components/Icon/Icon';
import { selectUser } from '../../redux/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { updateUser } from '../../redux/user/operations';

export default function AppSettingsForm() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const language = localStorage.getItem('i18nextLng');

  const { register } = useForm({
    mode: 'onChange',
    defaultValues: {
      theme: user.theme,
      language: language,
      // notify: 'checked',
    },
  });
  // const onChangeNotify = e => {
  //   console.log(e.target.value);
  // };

  const onChangeTheme = e => {
    dispatch(updateUser({ _id: user._id, theme: e.target.value }));
  };

  const onChangeLang = e => {
    i18n.changeLanguage(e.target.value);
  };
  return (
    <form className={css.form}>
      <fieldset
        {...register('theme')}
        className={css.fieldset}
        onChange={onChangeTheme}
        name="theme"
      >
        <legend className={css.legend}>Choose your theme color</legend>
        <div className={css.radioWrapper}>
          <label className={css.labelsRadioWrap}>
            <input
              {...register('theme')}
              className={css.radioInput}
              type="radio"
              name="theme"
              value="light"
            />
            <span className={css.fakeRadio}></span>
            <span className={clsx(css.label)}>Ligth</span>
          </label>
          <label className={css.labelsRadioWrap}>
            <input
              {...register('theme')}
              autoComplete="off"
              className={css.radioInput}
              type="radio"
              name="theme"
              value="dark"
            />
            <span className={css.fakeRadio}></span>
            <span className={clsx(css.label)}>Dark</span>
          </label>
          <label className={css.labelsRadioWrap}>
            <input
              autoComplete="off"
              className={css.radioInput}
              type="radio"
              name="theme"
              value="pink"
            />
            <span className={css.fakeRadio}></span>
            <span className={clsx(css.label)}>Pink</span>
          </label>
        </div>
      </fieldset>
      <fieldset
        {...register('language')}
        className={css.fieldset}
        onChange={onChangeLang}
        name="language"
      >
        <legend className={css.legend}>Choose your app language</legend>
        <div className={css.radioWrapper}>
          <label className={css.labelsRadioWrap}>
            <input
              {...register('language')}
              className={css.radioInput}
              type="radio"
              name="lang"
              value="en"
            />
            <span className={css.fakeRadio}></span>
            <span className={css.label}>English</span>
            <Icon width="25" height="25" id="icon-england" />
          </label>
          <label className={css.labelsRadioWrap}>
            <input
              {...register('language')}
              autoComplete="off"
              className={css.radioInput}
              type="radio"
              name="lang"
              value="uk"
            />
            <span className={css.fakeRadio}></span>
            <span className={css.label}>Ukrainian</span>
            <Icon width="20" height="20" id="icon-ukraine" />
          </label>
        </div>
      </fieldset>
      {/* <div className={css.switchWrap}>
        <span className={css.switchLabel}>
          Do you want to get notifications on your email?
        </span>
        <label className={css.switch}>
          <input
            type="checkbox"
            className={css.switchInput}
            name="notify"
            {...register('notify')}
            onChange={onChangeNotify}
            value="on"
          />
          <span className={css.switchSlider}></span>
        </label>
      </div> */}
    </form>
  );
}