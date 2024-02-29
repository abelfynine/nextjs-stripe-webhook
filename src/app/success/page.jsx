// Declara un componente funcional llamado Page.
function Page() {
    // Devuelve el JSX que representa la interfaz de usuario. 
    // Se muestra un mensaje de agradecimiento por la compra, junto con un emoji de celebración, y un enlace para volver a la tienda.
    return(
        <div className="text-3xl font-bold text-center py-10 h-screen flex itmes-center justify-center">
            <div>
                <span className="text-7xl">🎉</span>
            <h1>Gracias por tu compra</h1>
            <a href="/" className="text-blue-500 block mt-4">Volver a la tienda</a>
            </div>
        </div>
    )
}
// Exporta el componente Page como la exportación predeterminada del archivo, haciéndolo disponible para ser importado en otros archivos.
export default Page
