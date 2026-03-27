import { useState } from "react";
import { useGet } from "../../hooks/hooks";
import type { Product } from "../../types/types";
import { FilterOutlined, Loading3QuartersOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import "./payments.css";
import PaymentsMain from "./paymentsMain";
import { Spin } from "antd";

export const Payments = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const { data, isLoading, isError } = useGet<Product[]>('unicorn', 'users');
    const [filterOpen, setFilterOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState<boolean | null>(null);

    // Muhim: loading paytida return qilish kerak
    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
                <Spin indicator={<Loading3QuartersOutlined style={{ fontSize: 48, color: '#9B74F0' }} spin />} />
            </div>
        );
    }

    if (isError) return <h2>{t('error')}</h2>;

    return (
        <section onClick={() => setFilterOpen(false)} className="payments">
            <div className="payments-header">
                <div className="memInput">
                    <SearchOutlined style={{marginLeft: '10px', fontSize: '18px', color: '#9B74F0'}} />
                    <input 
                        type="text" 
                        placeholder={t('searchMember')} 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()} // Inputga bosganda filter yopilmasligi uchun
                    />
                </div>
                
                <div style={{position: 'relative'}} className="filterToggleWrapper">
                    <button onClick={(e) => { e.stopPropagation(); setFilterOpen(!filterOpen)}}>
                        <FilterOutlined style={{color: '#9B74F0' , fontSize: '18px'}} /> 
                        <p>{t('filter')}</p>
                    </button>

                    <div style={{zIndex: '999'}} className={`filterMain ${filterOpen ? "open" : ""}`}>
                        <button onClick={() => setStatusFilter(null)}>{t('all')}</button>
                        <button onClick={() => setStatusFilter(true)}>{t('vip')}</button>
                        <button onClick={() => setStatusFilter(false)}>{t('standard')}</button>
                    </div>
                </div>
            </div>

            <div className="payment-content">
                {/* Data va barcha filter holatlarini uzatamiz */}
                <PaymentsMain 
                    data={data || []} 
                    statusFilter={statusFilter} 
                    searchTerm={searchTerm} 
                />
            </div>
        </section>
    );
};

export default Payments;