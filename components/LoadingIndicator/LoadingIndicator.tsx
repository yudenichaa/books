import styles from './loading-indicator.module.scss';
import cn from 'classnames';

export default function LoadingIndicator(): JSX.Element {
  return (
    <section className={cn(styles['loading-indicator'])}>
      <img
        className={styles['loading-indicator__image']}
        src="/ball.svg"
        alt="Loading"
      />
    </section>
  );
}
