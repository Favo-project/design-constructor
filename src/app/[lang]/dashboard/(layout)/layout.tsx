import { Locale } from "@/i18n.config"
import { getDictionary } from "@/lib/dictionary"
import DashboardSidebar from "@/components/DashboardSidebar";

export default async function Layout({ children, params: { lang }
}: {
    children: React.ReactNode, params: { lang: Locale }
}) {
    const dict = await getDictionary(lang)

    return (
        <div id="dash-layout">
            <DashboardSidebar resources={dict} />
            <div className="lg:p-6 xl:p-8 p-4 lg:ml-56 bg-[#fff] lg:h-[100vh] h-[90vh] overflow-y-auto">
                {children}
            </div>
        </div>
    )
}