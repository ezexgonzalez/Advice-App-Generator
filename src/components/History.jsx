import s from "./History.module.css";

function History({ items = [], setHistoryOpen }) {

    function closeHistory() {
        setHistoryOpen(false);
    }

    function stopPropagation(e) {
        e.stopPropagation(); // evita que el click llegue al fondo
    }

    return (
        <div onClick={closeHistory} className={s.backgroundHystory}>
            <div className={s.historyCard} onClick={stopPropagation}>
                <div className={s.historyHeader}>
                    <span className={s.title}>History</span>
                    <button className={s.closeBtn} onClick={closeHistory}>✕</button>
                </div>
                <div className={s.advicesContainer}>
                    {
                        items.map((item) => (
                            <div key={item.id} className={s.adviceTextContainer}>
                                <span className={s.idContainer}><span className={s.idNumber}>#{item.id}</span> {item.advice}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )


}


export default History