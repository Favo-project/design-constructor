import SolidButton from "@/components/form-elements/SolidButton";
import {
  CurrencyDollarIcon,
  UserIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  return (
    <div id="overview">
      <header>
        <h1 className="text-3xl font-bold text-slate-600 my-8">Overview</h1>
      </header>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-8">
          <div className="py-8 px-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <header className="flex items-center mb-8 justify-between">
              <h3 className="text-2xl font-semibold tracking-tight text-gray-600">
                Campaigns
              </h3>
              <button className="p-1 text-indigo-600 hover:text-indigo-400 transition text-sm">
                Start new
              </button>
            </header>
            <div className="campaign-list">
              <ul className="mb-8">
                <li className="flex items-center mb-4">
                  <span className="h-6 w-6 mr-2">
                    <UserIcon aria-hidden="true" />
                  </span>
                  Create your account
                </li>
                <li className="flex items-center mb-4">
                  <span className="h-6 w-6 mr-2">
                    <RocketLaunchIcon aria-hidden="true" />
                  </span>
                  Launch your first campaign
                </li>
                <li className="flex items-center mb-4">
                  <span className="h-6 w-6 mr-2">
                    <CurrencyDollarIcon aria-hidden="true" />
                  </span>
                  Get your first sale
                </li>
              </ul>
            </div>
            <SolidButton>Make your own campaign</SolidButton>
          </div>
        </div>
        <div>
          <div className="py-8 px-6 bg-white border border-gray-200 rounded-2xl shadow-lg h-min">
            <h5 className="mb-8 text-2xl font-medium tracking-tight text-gray-600 font-sans">
              Recent sales
            </h5>
            <p className="mb-3 font-normal text-gray-700">
              You don’t have any sales yet. After you get your first one, they
              will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
