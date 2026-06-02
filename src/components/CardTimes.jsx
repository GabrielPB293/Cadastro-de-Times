import { useState } from "react"

function CardTimes({ time, onExcluir }) {
    const [aberto, setAberto] = useState(false)
    const [comentario, setComentario] = useState("")
    const [avaliacao, setAvaliacao] = useState(0)
    const [hover, setHover] = useState(0)
    const [comentarios, setComentarios] = useState([])

    async function abrirFechar() {
        if (!aberto) {
            try {
                const resposta = await fetch(`http://localhost:3000/comentarios?timeId=${time.id}`)
                const dados = await resposta.json()
                setComentarios(dados)
            } catch (erro) {
                console.log("Erro ao buscar comentários:", erro.message)
            }
        }
        setAberto(!aberto)
    }

    async function enviarComentario() {
        if (!comentario.trim() || avaliacao === 0) {
            alert("Preencha o comentário e selecione uma avaliação!")
            return
        }

        const novoComentario = { timeId: time.id, comentario, avaliacao }

        try {
            const resposta = await fetch("http://localhost:3000/comentarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novoComentario)
            })
            if (!resposta.ok) throw new Error("Erro ao salvar comentário")
            const salvo = await resposta.json()
            setComentarios([...comentarios, salvo])
            setComentario("")
            setAvaliacao(0)
        } catch (erro) {
            console.log("Erro:", erro.message)
        }
    }

    const media = comentarios.length > 0
        ? (comentarios.reduce((acc, c) => acc + Number(c.avaliacao), 0) / comentarios.length).toFixed(1)
        : null

    return (
        <div className="border-2 border-gray-500 rounded-lg p-3">
            <div className="flex">
                    <img src={time.brasao} alt="Brasão"
                    className="w-32 h-32 mr-3 object-contain" />
                <div className="flex-1">
                    <h2 className="text-2xl font-bold">{time.nome}</h2>
                    <p className="font-bold text-lg my-1">
                        📅 Fundado em: {time.fundacao}
                    </p>
                    <p className="font-bold text-lg my-1">
                        🏆 Títulos: {time.titulos}
                    </p>
                    <p className="font-bold text-lg my-1">
                        ⚔️ Principal Rival: {time.rival}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                        🏟️ Estádio: {time.estadio}
                    </p>
                    {media && (
                        <p className="text-sm mt-1 font-bold text-yellow-600">
                            ⭐ Média: {media} ({comentarios.length})
                        </p>
                    )}
                    <div className="flex gap-2 mt-3">
                        <button
                            type="button"
                            onClick={abrirFechar}
                            className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition">
                            💬 {aberto ? "Fechar" : "Comentar & Avaliar"}
                        </button>
                        <button
                            type="button"
                            onClick={() => onExcluir(time.id)}
                            className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition">
                            🗑️ Excluir
                        </button>
                    </div>
                </div>
            </div>

            {aberto && (
                <div className="mt-3 border-t border-gray-300 pt-3 space-y-2">
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(estrela => (
                            <span
                                key={estrela}
                                className="text-2xl cursor-pointer"
                                onClick={() => setAvaliacao(estrela)}
                                onMouseEnter={() => setHover(estrela)}
                                onMouseLeave={() => setHover(0)}>
                                {estrela <= (hover || avaliacao) ? "⭐" : "☆"}
                            </span>
                        ))}
                        <span className="text-sm text-gray-500 ml-2 self-center">
                            {avaliacao > 0 ? `${avaliacao}/5` : "Selecione"}
                        </span>
                    </div>

                    <textarea
                        rows={3}
                        placeholder="Escreva seu comentário sobre o time..."
                        value={comentario}
                        onChange={e => setComentario(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-2 text-sm resize-none focus:outline-none focus:ring-4 focus:ring-green-200"
                    />

                    <button
                        type="button"
                        onClick={enviarComentario}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition">
                        Enviar
                    </button>

                    {comentarios.length > 0 && (
                        <div className="mt-2 space-y-1">
                            <p className="text-sm font-bold text-gray-600">Comentários:</p>
                            {comentarios.map((c, i) => (
                                <div key={i} className="text-sm bg-gray-100 rounded p-2">
                                    {"⭐".repeat(c.avaliacao)} — {c.comentario}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CardTimes
