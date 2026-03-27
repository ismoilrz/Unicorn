import { message, Popconfirm, Space, Spin, Table, type TableProps } from 'antd';
import EditUser from '../../components/edit-user-drawer/editUser';
import { EditOutlined, DeleteOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import { useGet, useDelete } from '../../hooks/hooks';
import type { Product } from '../../types/types';
import React, { useState } from 'react'
import './members.css'

interface MembersMainProps {
    searchTerm: string;
    statusFilter: boolean | null;
}

const MembersMain: React.FC<MembersMainProps> = ({ searchTerm, statusFilter }) => {
    const { data, isLoading, isError } = useGet<Product[]>('unicorn', 'users')
    
    const { mutate: deleteMember } = useDelete('unicorn', 'users');

    const [editOpen, setEditOpen] = useState<boolean>(false)
    const [selectedUser, setSelectedUser] = useState<Product | null>(null) 

    const editDrawer = (record: Product) => { 
        setSelectedUser(record); 
        setEditOpen(true); 
    }          
    
    const editClose = () => { 
        setEditOpen(false);
        setSelectedUser(null); 
    }

    const handleDelete = (id: string) => {
        deleteMember(id, {
            onSuccess: () => {
                message.success("A'zo o'chirildi");
            },
            onError: () => {
                message.error("O'chirishda xatolik yuz berdi");
            }
        });
    };

    if (isLoading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '250px' }}>
          <Spin indicator={<Loading3QuartersOutlined style={{ fontSize: 48, color: '#9B74F0' }} spin />} />
        </div>
      );
    }
    if (isError) return <h2>Xatolik</h2>
    
    const columns: TableProps<Product>['columns'] = [
      {
        title: 'Name',
        dataIndex: 'memName',
        key: 'memName',
      },
      {
        title: 'Phone Number',
        dataIndex: 'memPhone',
        key: 'memPhone',
      },
      {
        title: 'Status',
        dataIndex: 'memStatus',
        key: 'memStatus',
        render: (status: boolean) => (
          <span 
            style={{ 
                backgroundColor: status ? '#00d90b' : 'red', 
                fontWeight: '600', 
                color: '#fff', 
                paddingInline: '10px', 
                paddingBlock: '5px', 
                borderRadius: '999px',
                fontSize: '12px'
             }}>
            {status ? 'AVAILABLE' : 'OUT OF STOCK'}
          </span>
        ),
      },
      {
        title: 'Type',
        dataIndex: 'memType',
        key: 'memType',
      },
      {
        title: 'Expire Time',
        dataIndex: 'memTime',
        key: 'memTime',
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => ( 
          <Space size="middle">
            <span className="action-icon-wrapper">
               <EditOutlined
                onClick={() => editDrawer(record)} 
                 style={{ fontSize: '18px', cursor: 'pointer' }} 
                />
            </span>
            <span className="action-icon-wrapper">
               <Popconfirm
                        className='popTol'
                        title="O'chirishni tasdiqlaysizmi?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Ha"
                        cancelText="Yo'q"
                    >
                        <DeleteOutlined style={{ fontSize: '18px', color: '#9B74F0', cursor: 'pointer' }} />
                </Popconfirm>
            </span>
          </Space>
        ),
      },
    ];

    const tableData = data
        ?.filter((item) => {
            const matchesSearch = 
                (item.memName || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
                String(item.memPhone || "").includes(searchTerm);
            
            const matchesStatus = statusFilter === null ? true : item.memStatus === statusFilter;

            return matchesSearch && matchesStatus;
        })
        .map((item) => ({
            ...item, 
            memType: item.memType?.toLocaleUpperCase(),
        }));

    return (
        <>
          <Table 
            columns={columns}
            dataSource={tableData}
            pagination={{pageSize: 7}}
            rowKey={'id'}
        />

        <EditUser 
            editOpen={editOpen} 
            editClose={editClose} 
            initialData={selectedUser} 
        />
        </>
    )
}

export default MembersMain;