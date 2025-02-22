import { SIDEBAR_NAV } from "@/config/navigation";
import { NavLink } from "react-router-dom";
import Icon from "./Icon";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const sidebarPostion = isOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <>
      <aside
        className={`shadow-sidebar font-work-sans chromebook:translate-x-0 chromebook:w-[283px] fixed top-[100px] bottom-0 left-0 z-40 flex transform flex-col bg-white pt-[39px] transition-transform duration-300 ease-in-out ${sidebarPostion}`}
      >
        <div className="flex flex-col px-[30px]">
          <div className="flex cursor-pointer items-center">
            <Icon className="mr-[10px]" icon="briefcase" size={16} />
            <p>Switch Organization</p>
            <Icon icon="chevron-down" size={14} className="ml-[9px]" />
          </div>
          <div className="mt-[52px] flex items-center opacity-60">
            <Icon className="mr-[10px]" icon="home" size={16} />
            <p>Dashboard</p>
          </div>
        </div>
        <div className="sidebar-scrollable mt-[41px] flex-1 overflow-y-auto pb-[39px]">
          <div className="sidebar-scroll-content space-y-[41px]">
            {SIDEBAR_NAV.map((section) => (
              <div key={section.id}>
                <p className="small-text mx-[30px] mb-[10px] uppercase">
                  {section.title}
                </p>
                <div className="space-y-[10px]">
                  {section.links.map((link) => (
                    <div key={link.id}>
                      <NavLink
                        to={`/admin${link.path}`}
                        className="sidebar-link flex h-10 items-center px-[30px]"
                      >
                        <Icon
                          icon={link.icon}
                          size={16}
                          className="mr-[10px]"
                        />
                        <p>{link.label}</p>
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
      <button
        type="button"
        aria-label="Close sidebar"
        className={`chromebook:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "z-30 opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        tabIndex={isOpen ? 0 : -1}
      />
    </>
  );
};

export default Sidebar;
