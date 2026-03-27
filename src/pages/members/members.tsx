import { SearchOutlined, FilterOutlined, UserAddOutlined } from '@ant-design/icons';
import MembersMain from "./members-main";
import AddUser from '../../components/add-user-drawer/addUser';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import "./members.css"

const Members = () => {
    const { t } = useTranslation();
    const [filterOpen, setFilterOpen] = useState(false)  //filter select open

    ////////////// Add Member open ///////////////
    const [addOpen, setAddOpen] = useState<boolean>(false)
    const addDrawer = () => { setAddOpen(true) }
    const addClose = () => { setAddOpen(false) }
    //----------------------------------------------

    const [searchTerm, setSearchTerm] = useState<string>(""); //search
    const [statusFilter, setStatusFilter] = useState<boolean | null>(null);  //filtered
    
    return (
        <>
          <section onClick={() => setFilterOpen(false)} className="members container">
            <div className="membersSet">
                <div className="memInput">
                    <SearchOutlined style={{marginLeft: '10px', fontSize: '18px', color: '#9B74F0'}} />
                    <input 
                        type="text" 
                        placeholder={t('searchMember')} 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()} 
                    />
                </div>
                <div className="memSet">
                    <div style={{position: 'relative'}} className="filterToggleWrapper">
                        <button onClick={(e) => { e.stopPropagation(); setFilterOpen(!filterOpen)}}>
                            <FilterOutlined style={{color: '#9B74F0', fontSize: '18px'}} /> 
                            <span>{t('filter')}</span>
                        </button>

                        <div style={{zIndex: '999'}} className={`filterMain ${filterOpen ? "open" : ""}`}>
                            <button onClick={() => setStatusFilter(null)}>{t('all')}</button>
                            <button style={{color: '#00ff0d'}} onClick={() => setStatusFilter(true)}>{t('available')}</button>
                            <button style={{color: 'red'}} onClick={() => setStatusFilter(false)}>{t('outOfStock')}</button>
                        </div>
                    </div>

                    <button onClick={addDrawer}>
                        <UserAddOutlined style={{color: '#9B74F0', fontSize: '18px'}} /> 
                        <span>{t('addNew')}</span>
                    </button>
                </div>
            </div>

            <div style={{marginTop: '20px',}} className="memContent">
                <MembersMain searchTerm={searchTerm} statusFilter={statusFilter} />
            </div>

            <AddUser addOpen={addOpen} addClose={addClose} />
          </section>
        </>
    )
}
export default Members;