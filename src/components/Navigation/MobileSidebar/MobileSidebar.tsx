// Components
import NavItem from "../common/NavItem";

// Models
import { navigationPages } from "@/common/navigation";

type MobileSidebarProps = React.HTMLAttributes<HTMLElement> & {
  closeOverlay: () => void;
};

const MobileSidebar = ({ closeOverlay }: MobileSidebarProps) => {
  return (
    <>
      <div className="fixed inset-0 flex z-70">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/50" onClick={closeOverlay}></div>

        {/* Sidebar */}
        <div className="relative w-64 bg-white shadow-xl dark:bg-zinc-900">
          <div className="flex items-center justify-between h-16 px-4 border-b border-zinc-200 dark:border-zinc-800">
            <span className="text-lg font-bold text-zinc-900 dark:text-white">
              GameHubX
            </span>
            <button
              onClick={closeOverlay}
              className="text-zinc-600 dark:text-zinc-300"
            >
              ✕
            </button>
          </div>

          {/* Menu Links */}
          <nav className="flex flex-col gap-4 p-4">
            {navigationPages.map((page) => (
              <NavItem
                to={page.path}
                variant="sidebar"
                key={`sidebar-${page.path}`}
                label={page.title}
                activePathPrefix={page.activePathPrefix}
              />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
