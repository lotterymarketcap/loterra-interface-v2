
import styles from '../styles/components/SmallBackground.module.scss';
import HeroBg from '../images/smallbg.js';
import { renderToStaticMarkup } from 'react-dom/server';

export default function SmallBackground(){

    
    const svgString = encodeURIComponent(renderToStaticMarkup(<HeroBg />));
    const dataUri = `url("data:image/svg+xml,${svgString}")`;


    return(
        <div className={styles.main} style={{backgroundImage: dataUri, backgroundSize:'cover', backgroundPosition:'bottom'}}>

        </div>
    )
}