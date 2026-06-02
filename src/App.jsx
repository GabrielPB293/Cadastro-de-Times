import { useEffect, useState } from "react"
import { Titulo } from "./components/Titulo"
import CardTimes from "./components/CardTimes"

function App() {
  const [times, setTimes] = useState([])

  useEffect(() => {
    async function buscaTimes() {
      const resposta = await fetch("http://localhost:3000/times")
      const dados = await resposta.json()
      setTimes(dados)
    }
    buscaTimes()
  }, [])

  async function excluirTime(id) {
    if (!confirm("Tem certeza que deseja excluir este time?")) return
    try {
      const resposta = await fetch(`http://localhost:3000/times/${id}`, {
        method: "DELETE"
      })
      if (!resposta.ok) throw new Error("Erro ao excluir")
      setTimes(times.filter(t => t.id !== id))
    } catch (erro) {
      console.log("Erro:", erro.message)
    }
  }

  const listaTimes = times.map(time => (
    <CardTimes time={time} key={time.id} onExcluir={excluirTime} />
  ))

  return (
    <div>
      <Titulo />
      <h2 className="text-2xl my-2 p-3 font-bold">Lista dos Times Cadastrados</h2>
      <div className="grid grid-cols-3 gap-x-5 gap-y-3 p-3">
        {listaTimes}
      </div>
    </div>
  )
}

export default App
