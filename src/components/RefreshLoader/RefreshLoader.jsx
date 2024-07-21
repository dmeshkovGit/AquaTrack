import Logo from '../../shared/components/Logo/Logo';
import css from '../RefreshLoader/RefreshLoader.module.css';
import { IoIosArrowDown } from 'react-icons/io';
import { RxAvatar } from 'react-icons/rx';
import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import clsx from 'clsx';
import Icon from '../../shared/components/Icon/Icon';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { dayList } from './calendarData.js';
export default function RefreshLoader() {
  const { t, i18n } = useTranslation();
  const monthNames = [
    t('Month january'),
    t('Month february'),
    t('Month march'),
    t('Month april'),
    t('Month may'),
    t('Month june'),
    t('Month july'),
    t('Month august'),
    t('Month september'),
    t('Month october'),
    t('Month november'),
    t('Month december'),
  ];

  return (
    <div className={css.trackerContainer}>
      <div className={css.WaterMainInfoContainer}>
        <div className={css.logoWraper}>
          <Logo />
        </div>
        <div className={css.container}>
          <p
            className={clsx(css.waterCount, {
              [css.waterCountUk]: i18n.language === 'uk',
            })}
          >
            1,5 {t('Count water')}
          </p>
          <p
            className={clsx(css.text, { [css.textUk]: i18n.language === 'uk' })}
          >
            {t('Daily norma')}
          </p>
        </div>
        <div className={css.wrapper}>
          <h6
            className={clsx(css.header, {
              [css.headerUk]: i18n.language === 'uk',
            })}
          >
            {t('Today water')}
          </h6>
          <div className={css.bar}>
            <div
              className={css.progressLine}
              style={{
                minWidth: `12px`,
                maxWidth: `0%`,
              }}
            ></div>
          </div>
          <div className={css.textContainer}>
            <p className={css.text}>0%</p>
            <p className={css.text}>50%</p>
            <p className={css.text}>100%</p>
          </div>
        </div>
        <div
          className={clsx(css.btn, {
            [css.btnUk]: i18n.language === 'uk',
          })}
        >
          <Icon className={css.icon} width="16" height="16" id="icon-plus" />
          {t('Add water')}
        </div>
      </div>
      <div className={css.WaterDetailedInfoContainer}>
        <div className={css.wrap}>
          <p className={css.title}>{t('Hello user')}!</p>
          <div className={css.Userbtn}>
            <RxAvatar className={css.iconAvatar} />
            <IoIosArrowDown className={css.Usericon} />
          </div>
        </div>
        <div className={css.Dailycontainer}>
          <div className={css.container_top_daily_info}>
            <h2
              className={clsx(css.currentDate, {
                [css.currentDateUk]: i18n.language === 'uk',
              })}
            >
              {t('Today water')}
            </h2>
            <div
              className={clsx(css.btn, css.addBtnStyle, {
                [css.btnUk]: i18n.language === 'uk',
              })}
            >
              <Icon
                className={clsx(css.icon, css.addIconStyle)}
                width="16"
                height="16"
                id="icon-plus"
              />
              {t('Add water')}
            </div>
          </div>
          <div className={css.daily_info_container}>
            <div className={css.container_without_water}>
              <Icon
                className={css.icon_glass_water}
                width={44}
                height={45}
                id="icon-water-glass"
              />
              <p className={css.text_}>Loading ...</p>
            </div>
          </div>
        </div>
        <div className={css.monthInfoContainer}>
          <div className={css.monthInfoPaginationContainer}>
            <h2
              className={clsx(css.title, {
                [css.titleUk]: i18n.language === 'uk',
              })}
            >
              {t('Month water')}
            </h2>
            <div className={css.paginationContainer}>
              <div className={css.buttonsContainer}>
                <div className={css.button}>
                  <FaAngleLeft />
                </div>
                <p
                  className={clsx(css.Pagtitle, {
                    [css.titleUk]: i18n.language === 'uk',
                  })}
                >
                  {monthNames[new Date().getMonth()]},{' '}
                  {new Date().getFullYear()}
                </p>
                <div className={css.Pagbutton}>
                  <FaAngleRight />
                </div>
              </div>
              <Icon className={css.icon} id="pieChart" height={20} width={20} />
            </div>
          </div>
          <ul className={css.calendar}>
            {dayList.map((i, index) => (
              <li key={i.dateParam}>
                <div className={css.Daycontainer}>
                  <button className={css.Daybutton}>{index + 1}</button>
                  <span className={css.label}>0%</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
