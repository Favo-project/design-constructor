import Image from "next/image";

export default function CampaignCreator({ resources, creator }) {
    return (
        <div className="text-slate-700 font-sans flex items-center gap-1.5">
            <Image className="rounded-full w-7 h-7" priority src={`${process.env.NEXT_PUBLIC_BASE_URL}/files${creator?.photo}`} alt="profile-img" width={24} height={24} />
            by
            <p className="font-medium">{creator.name}</p>
        </div>
    )
}