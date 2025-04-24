import "./components-css/PWAAlert.css"
import { useState } from "react";
import shareIcon from "../assets/shareBtn.png";
import xIcon from "../assets/XIcon.png";

export function PWAAlert() {
    const [isAlertVisible, setIsAlertVisible] = useState(true);

    const handleInstallClick = () => {
        setIsAlertVisible(false);
    };

  return (
    <>
        { isAlertVisible ?
            <div className="pwa-alert" onClick={handleInstallClick}>
                <p>Install the app, tap on <img className="shareIcon" src={shareIcon} alt="share_button" /> then select Add to Home Screen</p>
                <button onClick={handleInstallClick}><img className="xIcon" src={xIcon} alt="x" /></button>
            </div> 
        : null }
    </>
  );
}