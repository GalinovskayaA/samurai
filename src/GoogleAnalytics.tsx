import React, {useEffect} from 'react';
import {useHistory, withRouter} from "react-router-dom"
import {compose} from "redux";

type PropsLocationType = {
    selectedPage: string
}

const GoogleAnalytics = (props: PropsLocationType) => {
    const history = useHistory();
    const currentLocation = history.location.pathname // запись просмотров
    useEffect(() => {
        //@ts-ignore
        const gtag = window.gtag;
        if (currentLocation === props.selectedPage) {
            return;
        }

        if (history.action === 'PUSH' &&
            typeof(gtag) === 'function') {
            gtag('config', 'G-PLD8EZQCMZ', {
                'page_title': document.title,
                'page_location': window.location.href,
                'page_path': currentLocation
            });
        }
    })
    console.log(window)
    console.log( 'History: ' + history.action)
    console.log( 'SelectedPage: ' + props.selectedPage)
    console.log( 'CurrentLocation: ' + currentLocation)

    return (
        <></>
    );
}

export default compose<React.ComponentType<PropsLocationType>>(withRouter)(GoogleAnalytics);