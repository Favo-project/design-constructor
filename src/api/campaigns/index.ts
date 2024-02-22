import { revalidationTime } from "@/constants";

export const getCampaigns = async () => await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/public`, {
    next: {
        revalidate: revalidationTime // revalidation time to refetch the data from the backend
    },
}).then(res => res.json()).then(({ data }) => data)