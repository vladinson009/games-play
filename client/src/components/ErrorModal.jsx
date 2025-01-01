

export default function ErrorModal({ error }) {
    return (
        <div className="error-modal">
            <div className="backdrop" onClick={error.onClose}></div>
            <div className="modal-content">
                <header className="modal-header">
                    <h2>{error.error}</h2>
                </header>
                <main className="modal-body">
                    <p>{error.error}</p>
                </main>
                <footer className="modal-footer">
                    <button onClick={error.onClose} className="btn-close">
                        Close
                    </button>
                </footer>
            </div>
        </div>
    );
}



