import { Link, NavLink } from "react-router-dom";
import { menuData } from "../../constants/menuData";
import "./aside.css";
import { useTranslation } from "react-i18next";

const Aside = () => {
    const { t } = useTranslation();

    return (
        <>
            <aside>
                <div className="aside-logo">
                    {/* logo to home page! */}
                    <Link to={'/'}>
                        <img src="/logo.png" alt="Logo" />
                    </Link>
                </div>
                <div className="aside-sidebar">
                        {menuData.map((item) => (
                            <NavLink 
                                className={({ isActive }) => isActive ? "link active" : 'link'} 
                                to={item.path} 
                                key={item.name}
                               >
                                <img src={item.img} alt="Logo" /> 
                            {t(item.name)}
                        </NavLink>
                        ))
                    }
                </div>
            </aside>
        </>
    )
}
export default Aside;