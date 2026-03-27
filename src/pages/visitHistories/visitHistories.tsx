import { useState } from 'react';
import HistoryMain from "./historyMAin";
import "./visitHistories.css"
import { Loading3QuartersOutlined, SearchOutlined, } from '@ant-design/icons';
import { useGet } from '../../hooks/hooks';
import type { Product } from '../../types/types';
import { Spin } from 'antd';


const VisitHistories = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data, isLoading, isError } = useGet<Product[]>('unicorn', 'users');

    
    const filteredData = data?.filter(item =>
        item.visitName.toLowerCase().includes(searchTerm.toLowerCase()) 
        
    ) || [];

    if (isLoading) {
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
          <Spin indicator={<Loading3QuartersOutlined style={{ fontSize: 48, color: '#9B74F0' }} spin />} />
        </div>
    }
    if (isError) return <h2>Error</h2>;

    return (
        <>
            <div className="histories">
                <div className="histories-header">
                    <div className="memInput">
                        <SearchOutlined style={{marginLeft: '10px', fontSize: '18px', color: '#9B74F0'}} />
                        <input 
                            type="text" 
                            placeholder="Search Member" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="sle">
                        
                    </div>
                </div>
                <div className="hitoryContent">
                    <HistoryMain data={filteredData} />
                </div>
            </div>
        </>
    )
}
export default VisitHistories;