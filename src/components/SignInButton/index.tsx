import { FaGithub } from 'react-icons/fa';
import {FiX} from 'react-icons/fi'

import styles from './styles.module.scss';

export function SignInButton() {

    const isUserLoggedIn = false;

    return isUserLoggedIn ? 
    (
        <button type="button" className={styles.signInButton}>
            <FaGithub color="#04d261" />
            Gabriel Beltrame
            <FiX color='#737380' className={styles.closeIcon} ></FiX>
        </button>
    ) : (
        <button type="button" className={styles.signInButton}>
            <FaGithub color="#eba417" />
            Sign in with Github
        </button>
    )
}