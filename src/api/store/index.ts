export const createStore = async (authToken, title, subtitle) => await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
        title: title,
        subtitle
    })
}).then(res => res.json())

export const getStore = async (authToken) => await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store`, {
    headers: {
        Authorization: `Bearer ${authToken}`
    }
}).then(res => res.json())