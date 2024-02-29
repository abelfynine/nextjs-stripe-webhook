import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51Ooz0NKKNDJrcPeqeyVszq8Pw9zGbwIoGUKjpVglcXuCKgChKbu1QefgFU40D5YcCUlKeZ2qJrVebbHnOxCxjxEx00wjNwEqEZ")

export async function POST(request) {

    const body = await request.json()

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

    return NextResponse.json(session)
}