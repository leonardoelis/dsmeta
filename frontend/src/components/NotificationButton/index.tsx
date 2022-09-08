import notificationIcon from "../../assets/img/notification-icon.svg";
import "./styles.css";

function NotificationButton() {
    return (
        // className é igual ao class do HTML. N pode usar o class, pois a palavra class é uma palavra reservada do javasrcipt
        <div className="dsmeta-red-btn">
            <img src={notificationIcon} alt="Notificar" />
        </div>
    )
}

export default NotificationButton;
