import { MdCheck } from "react-icons/md";
import SaveLoader from "./SaveLoader";

export default function SaveButton({ resources, loaded, onSave, loading, isSaved }) {
    if (!loaded) {
        return null
    }

    if (loading) {
        return <div className="mr-1">
            <SaveLoader color={'#444'} />
        </div>
    }

    if (isSaved) {
        return (
            <button disabled className="text-sm text-slate-700 font-sans font-semibold mr-1 flex items-center disabled:cursor-not-allowed">
                <span className="text text-green-600 mr-1 text-lg"><MdCheck /></span> {resources.designnavbar.saved}
            </button>
        )
    }

    return (
        <button onClick={onSave} className="text-magenta font-sans font-semibold mr-1">
            {resources.designnavbar.save}
        </button>
    )
}