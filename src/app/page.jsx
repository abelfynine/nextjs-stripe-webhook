"use client"
// Importa la variable products desde un archivo llamado products en el mismo directorio.
import { products } from "./products"
// Declara un componente funcional llamado App.
function App() {
// Declara una función handlePay que toma un product como argumento y es una función asíncrona.
  const handlePay = async (product) => {
    // Hace una solicitud POST a la ruta /api/checkout, enviando el product como JSON en el cuerpo de la solicitud.
    const res = await fetch('/api/checkout', {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json"
      }
    })
    // Espera la respuesta de la solicitud como JSON y la asigna a la variable session.
    const session = await res.json()
    // Redirige la ventana del navegador a la URL proporcionada en session.
    window.location = session.url
  }
  // Devuelve el JSX que representa la interfaz de usuario. Se renderiza un encabezado "Productos" 
  // seguido de una cuadrícula de productos, donde cada producto se muestra en una tarjeta con su nombre, precio, imagen 
  // y un botón "Pagar" que, al hacer clic, llama a la función handlePay con el producto correspondiente.
  return(
    <div className="px-44">
      <h1 className="text-3xl font-bold text-center my-10">Productos</h1>

      <div className="grid grid-cols-3 gap-10">
        {products.map((product, i) => (
          <div key={i} className="bg-slate-800 text-center p-4 rounded-md text-white">
            <h2 className="font-bold text-lg">{product.name}</h2>
            <p className="text-3xl font-bold">${product.price / 100}</p>
            <img src={product.image} alt="" className="w-full" />
            <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full"
            onClick={() => handlePay(product)}>Pagar</button>
            </div>
        ))}

      </div>
    </div>
  )
}

// Exporta el componente App como la exportación predeterminada del archivo, haciéndolo disponible para ser importado en otros archivos.
export default App
