import styles from './Button.module.css'
import clsx from 'clsx';

const cleanStyle = arr => arr.filter(item => !!item).join(' ')

const Button = (props) => {
    return (
    <button 
    className={clsx(
        styles.root,
        props.size === 'small' && styles.small,
        props.size === 'big' && styles.big,
    )}>
        {props.children}
    </button>);
};

export default Button;