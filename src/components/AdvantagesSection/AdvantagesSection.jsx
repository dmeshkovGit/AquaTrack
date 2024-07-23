import clsx from 'clsx';
import css from './AdvantagesSection.module.css';
import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import { useEffect, useState } from 'react';
import { getUsers } from '../../API/apiOperations.js';

export default function AdvantagesSection() {
  const { t, i18n } = useTranslation();
  const users = [
    'images/firstUser-tablet.jpg',
    'images/secondUser-tablet.jpg',
    'images/thirdUser-tablet.jpg',
  ];
  const [usersAmount, setUsersAmount] = useState('...');
  const [usersAvatars, setUsersAvatars] = useState(users);

  useEffect(() => {
    getUsers().then(response => {
      setUsersAmount(response.length);
      const usersAvatars = [];
      let i = 0;
      response.reverse().forEach(user => {
        if (i < 3) {
          if (user.avatarURL) {
            i++;
            usersAvatars.push(user.avatarURL);
          }
        }
      });
      setUsersAvatars(usersAvatars);
    });
  }, []);

  return (
    <section className={css.container}>
      <div className={css.wrapper}>
        <div className={css.customersWrapper}>
          <ul className={css.usersList}>
            {usersAvatars.map(userAvatar => {
              return (
                <li key={userAvatar} className={css.usersItem}>
                  <img className={css.avatar} src={userAvatar} alt="user" />
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
              {t('Happy customers')} {usersAmount}
            </span>
            <br /> {t('Our 2')}
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
