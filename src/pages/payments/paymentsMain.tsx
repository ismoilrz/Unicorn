import { Table, type TableProps, Modal } from "antd";
import { EyeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { Product } from "../../types/types";
import "./payments.css";

interface PaymentsMainProps {
    data: Product[];
    statusFilter: boolean | null;
    searchTerm: string;
}

interface TableData {
    id: string | number;
    paymentDate: string;
    paymentTotal: string;
    paymentCheck: boolean;
    pamentTerm: string;
    paymentPaid: string;
}

const PaymentsMain: React.FC<PaymentsMainProps> = ({ data, searchTerm, statusFilter }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<TableData | null>(null);

    const columns: TableProps<TableData>['columns'] = [
        {
            title: "Created Date",
            dataIndex: "paymentDate",
            key: "paymentDate",
        },
        {
            title: "Total",
            dataIndex: "paymentTotal",
            key: "paymentTotal",
        },
        {
            title: 'Type',
            dataIndex: 'paymentTotal',
            key: 'type',
            render: (price: string) => {
                const paymentTotal = Number(price);
                const isVip = paymentTotal > 300;
                return (
                    <span style={{ fontWeight: 'bold', color: isVip ? '#9B74F0' : '#52c41a' }}>
                        {isVip ? 'VIP' : 'STANDART'}
                    </span>
                );
            }
        },
        {
            title: "Term",
            dataIndex: "pamentTerm",
            key: "pamentTerm",
        },
        {
            title: "Paid By",
            dataIndex: "paymentPaid",
            key: "paymentPaid",
        },
        {
            title: "Product",
            key: "product",
            render: (_, record) => (
                <EyeOutlined 
                    style={{ fontSize: '18px', color: '#9B74F0', cursor: 'pointer' }} 
                    onClick={() => { setSelectedPayment(record); setIsModalOpen(true); }} 
                />
            )
        }
    ];
    const tableDataSource = data
        ?.filter((item) => {

            const matchesSearch = 
                item.paymentPaid?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                item.id?.toString().includes(searchTerm);
            
            
            const paymentTotal = Number(item.paymentTotal) || 0;
            const isVip = paymentTotal > 300;

            const matchesStatus = statusFilter === null ? true : isVip === statusFilter;

            return matchesSearch && matchesStatus;
        })
        .map((item) => ({
            id: item.id,
            paymentDate: item.paymentDate,
            paymentTotal: item.paymentTotal,
            paymentCheck: item.paymentCheck,
            pamentTerm: item.pamentTerm,
            paymentPaid: item.paymentPaid,
        }));

    return (
        <>
            <Table
                columns={columns}
                dataSource={tableDataSource}
                pagination={{ pageSize: 7 }}
                rowKey="id"
            />
            <Modal
                title="Payment Details"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                {selectedPayment && (
                    <div>
                        <p><strong>ID:</strong> {selectedPayment.id}</p>
                        <p><strong>Created Date:</strong> {selectedPayment.paymentDate}</p>
                        <p><strong>Total:</strong> {selectedPayment.paymentTotal}</p>
                        <p><strong>Term:</strong> {selectedPayment.pamentTerm}</p>
                        <p><strong>Paid By:</strong> {selectedPayment.paymentPaid}</p>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default PaymentsMain;