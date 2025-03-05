 
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FaTachometerAlt, FaFlag, FaPenSquare, FaThList, FaProjectDiagram, FaRegCommentDots, FaQuestionCircle, FaBuilding, FaAddressBook, FaSearch } from 'react-icons/fa';

export const menuData = [
   
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: <FaTachometerAlt /> ,
  },
  {
    path: "/banner",
    title: "Banner",
    icon: <FaFlag />,
  },
  {
    path: "/blog/blog",
    title: "Blog",
    icon: <FaPenSquare />,
  },
  {
    path: "/category/category",
    title: "Category",
    icon: <FaThList />,
  },
  {
    path: "/project/project",
    title: "Project",
    icon: <FaProjectDiagram /> ,
  },
  {
    path: "/testimonial/testimonial",
    title: "Testimonial",
    icon: <FaRegCommentDots />,
  },
  {
    path: "/faq/faqs",
    title: "Faq",
    icon: <FaQuestionCircle />,
  },
  {
    path: "/company/company",
    title: "Company",
    icon: <FaBuilding />,
  },
  {
    path: "/contact/contact",
    title: "Contact",
    icon:<FaAddressBook />,
  },
  {
    path: "/SEO/landing/landing",
    title: "Landing SEO",
    icon:<FaSearch />,
  },
  
];
 