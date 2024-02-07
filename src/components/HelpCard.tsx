import OutlineBtn from "./form-elements/OutlineBtn";

export default function HelpCard({ resources }) {
    return (
        <div>
            <h5 className="mb-8 text-2xl font-medium tracking-tight text-gray-600 font-sans">
                {resources.helpcard.title}?
            </h5>
            <p className="mb-6 font-normal text-gray-700">
                {resources.helpcard.paragraph}.
            </p>
            <OutlineBtn>{resources.helpcard.gethelp}</OutlineBtn>
        </div>
    )
}