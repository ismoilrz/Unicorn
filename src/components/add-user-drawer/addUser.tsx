import { Drawer, Radio, notification } from 'antd'
import React, { useState } from 'react';
import { usePost } from '../../hooks/hooks'; 
import './addUser.css'  

type AddProps = {
    addOpen: boolean,
    addClose: () => void,
}

const labelStyle: React.CSSProperties = {
  height: 32,
  lineHeight: '32px',
};

const AddUser = ({addOpen, addClose}: AddProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');
  const [valueType, setValueType] = useState<number>(1);
  const [valueStatus, setValueStatus] = useState<number>(1);

  const { mutate, isPending } = usePost('unicorn', 'users');

  const handleSave = () => {
  const payload = {
    memName: name || "New User",
    memPhone: phone || "000000000",
    memStatus: valueStatus === 1,
    memType: valueType === 1 ? 'male' : 'female', 
    memTime: time || "Mart",
  };

  mutate(payload, {
    onSuccess: () => {
      notification.success({
        message: 'Muvaffaqiyatli',
        description: `${name || "Yangi foydalanuvchi"} bazaga qo'shildi!`,
        placement: 'bottomLeft', 
        duration: 5, 
      });
      setName('');
      setPhone('');
      setTime('');
      addClose();
    }
  });
};

  return (
   <Drawer 
        className='addDrawer'
        title='Add New Member'
        closable={true}
        onClose={addClose}
        open={addOpen}
       >
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}} className="name">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        
        <div 
          style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '40px'}} 
          className="phone">
          <label>Phone Number</label>
          <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="addType">
          <Radio.Group
          block
          style={{marginTop: '40px'}}
          onChange={(e) => setValueType(e.target.value)}
          value={valueType}
          options={[
            { value: 1, style: labelStyle, label: 'Male' },
            { value: 2, style: labelStyle, label: 'Female' },
          ]}
        />
        </div>

    <div className="addStatus">
      <Radio.Group
          block
          style={{marginTop: '30px'}}
          onChange={(e) => setValueStatus(e.target.value)}
          value={valueStatus}
          options={[
            { value: 1, style: labelStyle, label: 'AVAILABLE' },
            { value: 2, style: labelStyle, label: 'OUT OF STOCK' },
          ]}
    />
    </div>

    <div 
      style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '40px'}} 
      className="expireTime">
      <label>Expire Time</label>
      <input type="text" value={time} onChange={(e) => setTime(e.target.value)} />
    </div>

    <div 
      style={{width: '100%', display: 'flex', justifyContent: 'end', gap: '10px', marginTop: '30px'}} 
      className="drawerBtn">
      <button 
        onClick={addClose} 
        style={{backgroundColor: '#272A30', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer'}}
       >
        CANCEL
      </button>
      <button 
        onClick={handleSave} 
        disabled={isPending}
        style={{backgroundColor: '#9B74F0', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer'}}
      >
        {isPending ? 'ADDED...' : 'ADD MEMBER'}
      </button>
    </div>
   </Drawer>
  )
}

export default AddUser;