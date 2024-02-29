// Importa NextResponse de next/server y la librería Stripe para manejar pagos con Stripe.
import { NextResponse } from "next/server";
import Stripe from "stripe";
// Crea una instancia de Stripe con la clave secreta proporcionada.
const stripe = new Stripe("sk_test_51Ooz0NKKNDJrcPeqeyVszq8Pw9zGbwIoGUKjpVglcXuCKgChKbu1QefgFU40D5YcCUlKeZ2qJrVebbHnOxCxjxEx00wjNwEqEZ")
// Declara una función POST que toma una solicitud como argumento y es una función asíncrona.
export async function POST(request) {
// Lee el cuerpo de la solicitud como JSON y lo asigna a la variable body.
    const body = await request.json()
// Crea una sesión de checkout de Stripe con la información proporcionada en body, 
// incluyendo el nombre, imagen y precio del producto, así como un identificador único del producto. 
// Define el éxito de la URL y el modo de la sesión como "pago".
    const session = await stripe.checkout.sessions.create({
        success_url: "http://localhost:3000/success",
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: body.name,
                        images: [body.image],
                    },
                    unit_amount: body.price
                },
                quantity: 1
            }
        ],
        metadata: {
            productId: body.id
        },
        mode: "payment"
    })
// Devuelve la sesión de checkout de Stripe como JSON en la respuesta.
    return NextResponse.json(session)
}
