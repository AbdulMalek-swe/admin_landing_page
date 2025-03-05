"use client"
import { menuData } from "./menuData";
import React, { useEffect, useRef, useState } from "react";

import SidebarLinkGroup from "./Links";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import {   usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => { 
  //   const { pathname } = location; 
  const pathname = usePathname() 
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-72.5 flex-col overflow-y-hidden bg-blue-50 text-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/" className="w-full flex justify-center py-2">
          {/* <img src={Logo} alt="Logo" className="h-20 w-[77px] aspect-[425/439]" /> */}
          <Image
            src={"/v.ico"}
            width={70}
            height={70}
            className="rounded-full"
            alt="loading..."
          />
        </Link>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER END --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {menuData?.map((item, index) => {
                if (item?.childrens?.length) {
                  return (
                    <SidebarLinkGroup
                        activeCondition={
                          pathname === "/" || pathname.includes("dashboard")
                        }
                      key={index}
                    >
                      {(handleClick, open) => {
                        return (
                          <>
                            <Link
                              href="/"
                                className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                  (pathname === "/" ||
                                    pathname.includes("dashboard")) &&
                                  "text-primary bg-red-900"
                                }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded
                                  ? handleClick()
                                  : setSidebarExpanded(true);
                              }}
                            >
                              <span>{item?.icon}</span>
                              {item?.title}
                              {open ? <IoIosArrowDown /> : <IoIosArrowUp />}
                            </Link>
                            {/* <!-- Dropdown Menu Start --> */}
                            <div
                              className={`translate transform overflow-hidden ${
                                !open && "hidden"
                              }`}
                            >
                              <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                {item?.childrens?.map((child, index) => (
                                  <li key={index}>
                                    <Link
                                      href={child?.path}
                                        className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-bodydark2 duration-300 ease-in-out hover:text-primary ${
                                          pathname.includes(`${child.path}`) &&
                                          "  text-primary bg-green-500"
                                        }`}
                                    >
                                      {child?.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        );
                      }}
                    </SidebarLinkGroup>
                  );
                } else {
                  /* No toggle direct added link  */
                  return (
                    <li key={index} className="rounded-full">
                      <Link
                        href={item?.path}
                          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-gray-200 hover:bg-graydark dark:hover:bg-meta-4 ${
                           pathname === item?.path ? "bg-gray-300 rounded-full" : ""
                          }`}
                      >
                        <span>{item?.icon}</span>
                        {item?.title}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
