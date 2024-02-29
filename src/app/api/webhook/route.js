import { headers } from "next/headers";
import { NextResponse } from "next/server";

import Stripe from "stripe";

const stripe = new Stripe("sk_test_51Ooz0NKKNDJrcPeqeyVszq8Pw9zGbwIoGUKjpVglcXuCKgChKbu1QefgFU40D5YcCUlKeZ2qJrVebbHnOxCxjxEx00wjNwEqEZ")

const endpointSecret = "whsec_VCOj9KRbVvrWyCNVqIuKn2mQsrzEhZLx"

export async function POST(request) {
    const body = await request.text()
    const headerList = headers()
    const sig = headerList.get("stripe-signature")

    let event
    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (error) {
        return NextResponse.json({ error: error.message}, {status: 400})
    }

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
    return NextResponse.json("Recibiendo webhooks")
}