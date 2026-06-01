import { useForm } from "react-hook-form"
import { Titulo } from './components/Titulo'
import { useState } from "react"
import CardTime from "./components/CardFilme"

function Pesquisa() {
  const { register, handleSubmit } = useForm()
  const [times, setTimes] = useState([])

  async function pesquisaTimes(data) {
    try {
      const resposta = await fetch("http://localhost:3000/times")
      if (!resposta.ok) throw new Error("Erro ao consultar os times")
      const dados = await resposta.json()
      const dados2 = dados.filter(time => (
        time.nome.toUpperCase().includes(data.pesquisa.toUpperCase()) ||
        time.rival.toUpperCase().includes(data.pesquisa.toUpperCase()) ||
        time.estadio.toUpperCase().includes(data.pesquisa.toUpperCase())
      ))
      if (dados2.length == 0) {
        alert("Não há times com a palavra-chave no nome, rival ou estádio")
      } else {
        setTimes(dados2)
      }
    } catch (erro) {
      console.log("Erro: ", erro.message)
    }
  }

  const listaTimes = times.map(time => (
    <CardTime key={time.id} filme={time} />
  ))

  return (
    <>
      <Titulo />
      <h2 className="text-2xl my-2 p-3 font-bold">Pesquisa de Times</h2>
      <form className='text-center'
        onSubmit={handleSubmit(pesquisaTimes)}>
        <input type="text" className='text-sm w-96 rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-green-200' required
          placeholder="Nome do time, rival ou estádio"
          {...register("pesquisa")} />
        <input type="submit" value="Pesquisar"
          className='p-3 border-0 text-white text-sm font-bold cursor-pointer rounded-lg bg-green-700 ml-2' />
      </form>

      <section className='grid grid-cols-3 gap-x-5 gap-y-3 p-3'>
        {listaTimes}
      </section>
    </>
  )
}

export default Pesquisa
