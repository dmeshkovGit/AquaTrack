import clsx from 'clsx';
import css from './AdvantagesSection.module.css';

export default function AdvantagesSection() {
  const users = [
    {
      name: 'firstUser',
      avatarURL: '/public/images/firstUser-tablet.jpg',
      className: css.firstUser,
    },
    {
      name: 'secondUser',
      avatarURL: '/public/images/secondUser-tablet.jpg',
      className: css.secondUser,
    },
    {
      name: 'thirdUser',
      avatarURL: '/public/images/thirdUser-tablet.jpg',
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
          <p className={css.usersText}>
            Our <span className={css.textAccent}>happy</span> customers
          </p>
        </div>
        <div className={css.features}>
          <span className={clsx(css.habit, css.feature)}>Habit drive</span>
          <span className={clsx(css.view, css.feature)}>View statistics</span>
          <span className={clsx(css.personal, css.feature)}>
            Personal rate setting
          </span>
        </div>
      </div>
    </section>
  );
}
