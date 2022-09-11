import axios from "axios";
import { toast } from "react-toastify";
import notificationIcon from "../../assets/img/notification-icon.svg";
import { BASE_URL } from "../../utils/request";
import "./styles.css";

// cria-se um tipo de dado para passar como uma propriedade do componente React
// o valor dessa propriedade deve ser informado no momento da chamada do componente, nesse caso no arquivo index.tsx de SalesCard
// nesse caso, esse tipo irá ter o id da venda para poder fazer a requisição de notificação para o backend, passando esse id
type Props = {
    saleId: number;
}

function handleClick(id : number){
    axios.get(`${BASE_URL}/sales/${id}/notification`)
        .then(response => {
            toast.info("SMS enviado com sucesso!");
        });
}

function NotificationButton(sale: Props) {
    return (
        // className é igual ao class do HTML. N pode usar o class, pois a palavra class é uma palavra reservada do javasrcipt
        <div className="dsmeta-red-btn" onClick={() => handleClick(sale.saleId)}>
            <img src={notificationIcon} alt="Notificar" />
        </div>
    )
}

export default NotificationButton;
