import SolidButton from "@/components/form-elements/SolidButton";
import {
  CurrencyDollarIcon,
  UserIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  return (
    <div id="overview">
      <div className="p-4 sm:ml-56">
        <h1 className="text-3xl font-semibold text-slate-700 my-6">Overview</h1>
        <div className="grid grid-cols-2 gap-8">
          <div className="max-w-sm p-10 bg-white border border-gray-200 rounded-lg shadow">
            <h5 className="mb-8 text-2xl font-medium tracking-tight text-gray-600 font-sans">
              Campaign
            </h5>
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
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow h-min">
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
