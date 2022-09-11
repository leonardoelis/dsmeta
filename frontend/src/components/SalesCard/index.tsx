import NotificationButton from "../NotificationButton";
import "./styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import axios from "axios"
import { BASE_URL } from "../../utils/request";
import { Sale } from "../../models/Sale";

function SalesCard() {
    // Data mínima é a data de 1 ano atrás (-365) e Data máxima é a data de hj
    const min = new Date();
    min.setDate(min.getDate() - 365);
    const max = new Date();

    // useState permite criar estados em um componente
    // useState cria uma variável (minDate) que controlará o estado do componente
    // então passamos o valor inicial do estado (min = data de 1 ano atrás)
    // como retorno temos a variável que controla o estado do componente (minDate) e uma função que atualiza o valor da variável
    // essa função (setMinDate) é chamada no evento onChange do DatePicker, passando o novo valor de data
    const [minDate, setMinDate] = useState(min);
    const [maxDate, setMaxDate] = useState(max); // o mesmo raciocínio se aplica para o useState do maxDate

    // cria um useState para a lista de vendas que será retornada pela API do backend
    // esse useState é tipado como uma lista de vendas (list de Sale => tipo de dado definido no arquivo models/sale.ts)
    // o valor inicial nesse caso será uma lista vazia
    const [sales, setSale] = useState<Sale[]>([]);

    // useEffect = hook do react que executa uma função logo após a renderização da página
    // o segundo parâmetro é um array e quando ele é vazio [], a função do 1º parâmetro será executada apenas uma vez
    // se houver algo dentro do array, o useEffect deve ser executado toda vez q as variáveis dentro do array forem atualizadas
    useEffect(() => {
        // converte a data para o formato usado no backend (yyyy-mm-dd)
        // .slice(0, 10) -> recorta a string resultante, partindo do 1º caractere até o décimo
        const dmin = minDate.toISOString().slice(0, 10);
        const dmax = maxDate.toISOString().slice(0,10);

        axios.get(`${BASE_URL}/sales?minDate=${dmin}&maxDate=${dmax}`)
            .then(response => {
                // atualiza a variável (lista) sales definida no useState acima
                setSale(response.data.content);
            });
    }, [minDate, maxDate]);

    return (
        <div className="dsmeta-card">
            <h2 className="dsmeta-sales-title">Vendas</h2>
            <div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={minDate}
                        onChange={(date: Date) => setMinDate(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={maxDate}
                        onChange={(date: Date) => setMaxDate(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
            </div>

            <div>
                <table className="dsmeta-sales-table">
                    <thead>
                        <tr>
                            <th className="show992">ID</th>
                            <th className="show576">Data</th>
                            <th>Vendedor</th>
                            <th className="show992">Visitas</th>
                            <th className="show992">Vendas</th>
                            <th>Total</th>
                            <th>Notificar</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            // função map irá mapear cada item da lista
                            // ou seja, para cada item da lista (sale) uma função será executada
                            // essa função irá renderizar uma <tr> com as informações contidas dentro do objeto sale
                            // ********OBS: para renderizar algum conteúdo baseado numa lista
                            // o react exige que seja adicionado o atributo key na tag e a key deve ter um valor único
                            // nesse caso o valor único usado foi o próprio id da sale********
                            sales.map(sale => {
                                return (
                                    <tr key={sale.id}>
                                        <td className="show992">{sale.id}</td>
                                        <td className="show576">
                                            { // Formatação da data
                                            new Date(sale.date).toLocaleDateString()
                                            }
                                        </td>
                                        <td>{sale.sellerName}</td>
                                        <td className="show992">{sale.visited}</td>
                                        <td className="show992">{sale.deals}</td>
                                        <td>R$
                                            { // toFixed(2) formata o número com 2 casas decimais
                                            sale.amount.toFixed(2)
                                            }
                                        </td>
                                        <td>
                                            <div className="dsmeta-red-btn-container">
                                                <NotificationButton saleId={sale.id}/>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SalesCard;
