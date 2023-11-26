import React from 'react';
import styles from '../../styles/hero.module.scss';
import { IHero } from '../../model/hero';
import Link from 'next/link';

interface IHeroProps extends IHero {
  key: string;
}

const Hero: React.FC<IHeroProps> = ({ id, name, thumbnail }) => {
  return (
    <>
      <div className={styles.hero} key={id}>
        <div className={styles.hero__wrapper}>
          <img
            className={styles.hero__image}
            src={thumbnail.path + '/portrait_xlarge.jpg'}
            alt={name}
          />
        </div>
        <div className={styles.hero__wrapper}>
          <h4 className={styles.hero__title}>{name}</h4>
          <Link className={styles.hero__link} href={`/comics/:${id}`}>
            Show comics
          </Link>
        </div>
      </div>
    </>
  );
};
export default Hero;
