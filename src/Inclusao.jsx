import { useForm } from "react-hook-form"
import { Titulo } from './components/Titulo'
import { useEffect } from "react"

function Inclusao() {
  const { register, handleSubmit, reset, setFocus } = useForm()

  async function cadastraTime(data) {
    const nome = data.nome
    const brasao = data.brasao
    const fundacao = data.fundacao
    const titulos = data.titulos
    const rival = data.rival
    const estadio = data.estadio

    try {
      const resposta = await fetch("http://localhost:3000/times", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome, brasao, fundacao, titulos, rival, estadio
        })
      })
      if (!resposta.ok) throw new Error("Erro ao incluir o time")
      const novoTime = await resposta.json()
      alert(`Ok! Time cadastrado com o código: ${novoTime.id}`)
    } catch (erro) {
      console.log(`Erro: ${erro.message}`)
    }
    reset()
  }

  useEffect(() => {
    setFocus("nome")
  }, [])

  return (
    <>
      <Titulo />

      <div className="max-w-4xl mx-auto p-4">
        <div className="shadow-lg rounded-2xl p-6">

          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Inclusão de Times de Futebol
          </h2>

          <form className="space-y-5"
            onSubmit={handleSubmit(cadastraTime)} >
            <div>
              <label htmlFor="nome"
                className="block text-sm font-semibold mb-1">
                Nome do Time:
              </label>
              <input type="text" id="nome" required
                className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-4 focus:ring-green-200"
                {...register("nome")} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="fundacao"
                  className="block text-sm font-semibold mb-1">
                  Ano de Fundação:
                </label>
                <input type="number" id="fundacao" required
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-4 focus:ring-green-200"
                  {...register("fundacao")} />
              </div>

              <div>
                <label htmlFor="titulos"
                  className="block text-sm font-semibold mb-1">
                  Quantidade de Títulos:
                </label>
                <input type="number" id="titulos" required
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-4 focus:ring-green-200"
                  {...register("titulos")} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="rival"
                  className="block text-sm font-semibold mb-1">
                  Principal Rival:
                </label>
                <input type="text" id="rival" required
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-4 focus:ring-green-200"
                  {...register("rival")} />
              </div>

              <div>
                <label htmlFor="estadio"
                  className="block text-sm font-semibold mb-1">
                  Nome do Estádio:
                </label>
                <input type="text" id="estadio" required
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-4 focus:ring-green-200"
                  {...register("estadio")} />
              </div>
            </div>

            <div>
              <label htmlFor="brasao"
                className="block text-sm font-semibold mb-1">
                URL do Brasão do Time:
              </label>
              <input type="url" id="brasao" required
                className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-4 focus:ring-green-200"
                {...register("brasao")} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <input type="submit" value="Cadastrar"
                className="bg-green-600 hover:bg-green-700 text-white font-bold text-sm p-3 rounded-lg cursor-pointer transition"/>
              <input type="reset" value="Limpar"
                className="bg-red-500 hover:bg-red-600 text-white font-bold text-sm p-3 rounded-lg cursor-pointer transition"/>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Inclusao
