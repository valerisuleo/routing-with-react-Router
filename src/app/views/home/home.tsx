import styles from './home.module.scss';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to Home!</h1>
        </div>
    );
}

export default Home;
