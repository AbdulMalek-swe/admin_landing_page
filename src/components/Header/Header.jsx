 
import { removeToken } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";

export const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useRouter();
  const logout = () => {
    removeToken();
    navigate.push("/");
  };
  const gradientStyle = {
    // background: "#E5E7E9",
    // Adjust the gradient colors and image URL as needed
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
    width: "100%",
  };
  return (
    <>
      <div className="bg-blue-50 sticky top-0    ">
        <div className="bg-blue-50" style={gradientStyle}>
          <div className="  flex items-center justify-between rounded-lg py-5 px-10">
            {/* responsive navbar start */}
            <div className="navbar-start ">
              <button
                aria-controls="sidebar"
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(!sidebarOpen);
                }}
                className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
              >
                <GiHamburgerMenu />
              </button>
              {/* <Link className="" to="/">
                <img
                  height={16}
                  width={60}
                  className="d-block border  rounded-md"
                  src= {logo}
                  alt=""
                />
              </Link> */}
            </div>
            {/* responsive navbar end */}

            <div className="navbar-end mt-1 ">
              <div className="flex">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  ></div>
                </div>
                <div>
                  <button
                    className="border bg-blue-700 py-2 px-3 rounded-lg hover:bg-blue-500"
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
