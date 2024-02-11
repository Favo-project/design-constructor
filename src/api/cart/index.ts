export async function fetchCart(cartList) {
    return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart`, {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cartList),
        method: "PATCH"
    }).then(res => res.json()).then(
        result => result.data || undefined
    )
}