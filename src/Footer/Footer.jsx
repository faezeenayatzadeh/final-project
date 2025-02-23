import styles from './Footer.module.css'

const Footer = () => {
    console.log(styles);
    
    return (
        <footer className={styles.root }>
            فوتر سایت
        </footer>
    )
}

export default Footer;