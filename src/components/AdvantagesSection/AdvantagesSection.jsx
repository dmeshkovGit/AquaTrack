import clsx from 'clsx';
import css from './AdvantagesSection.module.css';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import { FaLanguage } from 'react-icons/fa';

export default function AdvantagesSection() {
  const { t, i18n } = useTranslation();
  const users = [
    {
      name: 'firstUser',
      avatarURL: 'images/firstUser-tablet.jpg',
      className: css.firstUser,
    },
    {
      name: 'secondUser',
      avatarURL: 'images/secondUser-tablet.jpg',
      className: css.secondUser,
    },
    {
      name: 'thirdUser',
      avatarURL: 'images/thirdUser-tablet.jpg',
      className: css.thirdUser,
    },
  ];
  return (
    <section className={css.container}>
      <div className={css.wrapper}>
        <div className={css.customersWrapper}>
          <ul className={css.usersList}>
            {users.map(user => {
              return (
                <li
                  key={user.name}
                  className={clsx(css.usersItem, user.className)}
                >
                  <img src={user.avatarURL} alt="user" />
                </li>
              );
            })}
          </ul>
          <p
            className={clsx(css.usersText, {
              [css.usersTextUk]: i18n.language === 'uk',
            })}
          >
            {t('Our 1')}{' '}
            <span
              className={clsx(css.textAccent, {
                [css.textAccentUk]: i18n.language === 'uk',
              })}
            >
              {t('Happy customers')}
            </span>{' '}
            {t('Our 2')}
          </p>
        </div>
        <div className={css.features}>
          <span
            className={clsx(css.habit, css.feature, {
              [css.featureUk]: i18n.language === 'uk',
            })}
          >
            {t('Habit drive')}
          </span>
          <span
            className={clsx(css.view, css.feature, {
              [css.featureUk]: i18n.language === 'uk',
            })}
          >
            {t('View statistics')}
          </span>
          <span
            className={clsx(css.personal, css.feature, {
              [css.featureUk]: i18n.language === 'uk',
            })}
          >
            {t('Personal rate')}
          </span>
        </div>
      </div>
    </section>
  );
}
