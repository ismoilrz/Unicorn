import { Drawer, Radio, message } from 'antd'
import './editUser.css'
import React, { useEffect, useState } from 'react';
import { Product } from '../../types/types';
import { usePut } from '../../hooks/hooks'; // usePut hookini import qilamiz

type EditProps = {
    editOpen: boolean,
    editClose: () => void,
    initialData: Product | null, // Tanlangan foydalanuvchi ma'lumotlari
}

const labelStyle: React.CSSProperties = {
    height: 32,
    lineHeight: '32px',
};

const EditUser = ({ editOpen, editClose, initialData }: EditProps) => {
    // Form statelari
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [time, setTime] = useState('');
    const [valueType, setValueType] = useState<number>(1);
    const [valueStatus, setValueStatus] = useState<number>(1);

    // usePut hookidan updateMember funksiyasini olamiz
    const { mutate: updateMember, isPending } = usePut('unicorn', 'users');

    // Har gal initialData o'zgarganda (ya'ni Edit tugmasi bosilganda) inputlarni to'ldiramiz
    useEffect(() => {
        if (initialData) {
            setName(initialData.memName);
            setPhone(initialData.memPhone);
            setTime(initialData.memTime);
            setValueType(initialData.memType?.toLowerCase() === 'male' ? 1 : 2);
            setValueStatus(initialData.memStatus ? 1 : 2);
        }
    }, [initialData]);

    const handleUpdate = () => {
        if (!initialData) return;
        const payload = {
            ...initialData, 
            memName: name,
            memPhone: phone,
            memTime: time,
            memStatus: valueStatus === 1,
            memType: valueType === 1 ? 'male' : 'female'
        };

        updateMember({ id: initialData.id, body: payload }, {
            onSuccess: () => {
                message.success("Ma'lumot yangilandi!");
                editClose(); 
            },
            onError: () => {
                message.error("Yangilashda xatolik!");
            }
        });
    };

    return (
        <Drawer
            className='editDrawer'
            title='Edit Member'
            closable={true}
            onClose={editClose}
            open={editOpen}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="name">
                <label>Name</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
            </div>

            <div 
                style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '40px' }} 
                className="phone"
            >
                <label>Phone Number</label>
                <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                />
            </div>

            <div className="editType">
                <Radio.Group
                    block
                    onChange={(e) => setValueType(e.target.value)}
                    value={valueType}
                    style={{ marginTop: '40px' }}
                    options={[
                        { value: 1, style: labelStyle, label: 'Male' },
                        { value: 2, style: labelStyle, label: 'Female' },
                    ]}
                />
            </div>

            <div className="editStatus">
                <Radio.Group
                    block
                    onChange={(e) => setValueStatus(e.target.value)}
                    value={valueStatus}
                    style={{ marginTop: '30px' }}
                    options={[
                        { value: 1, style: labelStyle, label: 'AVAILABLE' },
                        { value: 2, style: labelStyle, label: 'OUT OF STOCK' },
                    ]}
                />
            </div>

            <div 
                style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '40px' }} 
                className="expireTime"
            >
                <label>Expire Time</label>
                <input 
                    type="text" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                />
            </div>

            <div 
                style={{ width: '100%', display: 'flex', justifyContent: 'end', gap: '10px', marginTop: '30px' }} 
                className="drawerBtn"
            >
                <button 
                    onClick={editClose}
                    style={{ backgroundColor: '#272A30', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
                >
                    CANCEL
                </button>
                <button 
                    onClick={handleUpdate}
                    disabled={isPending}
                    style={{ backgroundColor: '#9B74F0', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
                >
                    {isPending ? 'SAVING...' : 'SAVE'}
                </button>
            </div>
        </Drawer>
    )
}

export default EditUser;