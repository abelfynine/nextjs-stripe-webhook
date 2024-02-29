// Importa la función headers de next/headers y NextResponse de next/server para manejar las respuestas de la API.
import { headers } from "next/headers";
import { NextResponse } from "next/server";
// Importa la librería Stripe para manejar pagos con Stripe.
import Stripe from "stripe";
// Crea una instancia de Stripe con la clave secreta proporcionada.
const stripe = new Stripe("sk_test_51Ooz0NKKNDJrcPeqeyVszq8Pw9zGbwIoGUKjpVglcXuCKgChKbu1QefgFU40D5YcCUlKeZ2qJrVebbHnOxCxjxEx00wjNwEqEZ")
// Define el EndPointSecret del webhook de Stripe.
const endpointSecret = "whsec_VCOj9KRbVvrWyCNVqIuKn2mQsrzEhZLx"
// Declara una función POST que toma una solicitud como argumento y es una función asíncrona.
export async function POST(request) {
// Lee el cuerpo de la solicitud y obtiene la firma de Stripe de los encabezados.
    const body = await request.text()
    const headerList = headers()
    const sig = headerList.get("stripe-signature")
// Intenta construir un evento webhook de Stripe a partir del cuerpo de la solicitud y la firma. 
// Si hay un error, devuelve un mensaje de error con un estado de 400.
    let event
    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (error) {
        return NextResponse.json({ error: error.message}, {status: 400})
    }
// Maneja diferentes tipos de eventos webhook de Stripe. 
// En este caso, se maneja el evento checkout.session.completed, que se activa cuando se completa una sesión de pago en Stripe. 
// Se pueden realizar acciones como guardar la información en una base de datos o enviar un correo electrónico de notificación.
    switch (event.type) {
        case "checkout.session.completed":
            const checkoutSessionCompleted = event.data.object
            // Lo que se puede hacer aqui es guardar la informacion en una base de datos
            // Tambien se puede enviar un correo notificando el pago se ha realizado
            console.log({checkoutSessionCompleted})
            break;
    
        default:
            console.log(`Evento no manejado: ${event.type}`)
    }
// Devuelve un mensaje indicando que se están recibiendo los webhooks.
    return NextResponse.json("Recibiendo webhooks")
}
