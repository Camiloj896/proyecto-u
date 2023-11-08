import { useState } from 'react'

import './App.css'

function App() {
  const [creditos, setCreditos] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = {
      dias_mora_credito: 0,
    };
    document.forms[0].querySelectorAll("input").forEach((element) => {
      let value;
      if (element.getAttribute('type') == 'date') {
        let hoy = new Date()
        let fechaInicio = new Date(element.value)
        value = hoy.getFullYear() - fechaInicio.getFullYear()
      } else {
        value = element.value;
      }
      data = {
        ...data,
        [element.getAttribute('name')]: value,
      }
    })

    const url = 'http://bohorquez.xyz/api/apiBanco.php';

    const data2 = {
      function_name: 'consulta_aprobacion',
      parameter: data,
    }

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data2),
    });
    
    const responde = await response.json();

    console.log(responde)

    return false;
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="document_number" className="block text-sm font-medium leading-6 text-gray-900">
                Número de Documento:
              </label>
              <div className="mt-2">
                <input
                  name="document_number"
                  type="number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Correo Electrónico:
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="edad_anios" className="block text-sm font-medium leading-6 text-gray-900">
                Fecha de Nacimiento:
              </label>
              <div className="mt-2">
                <input
                  name="edad_anios"
                  type="date"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                Genero:
              </label>
              <div className="mt-2">
                <select
                  name="gender"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-orange-600 sm:text-sm sm:leading-6"
                >
                  <option>Masculino</option>
                  <option>Femenino</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="nombre_ciudad_residencia" className="block text-sm font-medium leading-6 text-gray-900">
                Ciudad de Residencia:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="nombre_ciudad_residencia"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="comments"
                    name="comments"
                    type="checkbox"
                    value={creditos}
                    onClick={() => setCreditos(!creditos)}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="comments" className="font-medium text-gray-900">
                    Tiene Creditos con otras entidades?
                  </label>
                </div>
              </div>
            </div>
          </div>

          {creditos && (
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="nro_prestamos_recibidos" className="block text-sm font-medium leading-6 text-gray-900">
                  Número de Prestamos:
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="nro_prestamos_recibidos"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-orange-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="saldo_creditos" className="block text-sm font-medium leading-6 text-gray-900">
                  Cual es su saldo total de sus credtios?
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="saldo_creditos"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-orange-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>)
          }

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="saldo_ahorro" className="block text-sm font-medium leading-6 text-gray-900">
                Total de ahorros?
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="saldo_ahorro"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="antiguedad_laboral_anios" className="block text-sm font-medium leading-6 text-gray-900">
                Fecha de Ingreso a la Empresa:
              </label>
              <div className="mt-2">
                <input
                  name="antiguedad_laboral_anios"
                  type="date"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
             <label htmlFor="integrantes_hogar" className="block text-sm font-medium leading-6 text-gray-900">
                Número de integrantes en su hogar:
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="integrantes_hogar"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Sign in</button>
        </div>
      </form>
    </section>
  )
}

export default App
