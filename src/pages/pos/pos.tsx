import { useState } from "react";
import "./pos.css";
import { useGet } from "../../hooks/hooks";
import type { Product } from "../../types/types";
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Skeleton from "../../components/Loading/loading";
import { Badge, message } from "antd"; 

// cart uchun interface
interface CartItem extends Product {
  qty: number;
}

const Pos = () => {
  const { t } = useTranslation();
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const { data = [], isLoading, isError } = useGet<Product[]>('unicorn', 'products');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    message.success(`${product.posTitle} ${t('addedToCart') || 'savatga qo\'shildi'}`);
  };

  const increaseQty = (id: string) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty: p.qty + 1 } : p));
  };

  const decreaseQty = (id: string) => {
    setCart(prev =>
      prev.map(p => p.id === id ? { ...p, qty: p.qty - 1 } : p).filter(p => p.qty > 0)
    );
  };

  const filteredData = data.filter(item =>
    (item.posTitle || '').toLowerCase().includes(searchText.toLowerCase())
  );

  // XATO TUZATILDI: Number() orqali TS2362 xatosi hal qilindi
  const total = cart.reduce((sum, item) => sum + Number(item.posQuality || 0) * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  if (isLoading) {
    return (
      <>
        <div className="skTop" style={{ display: 'flex', justifyContent: 'space-between', marginInline: '60px', marginTop: '120px' }}>
          <div className="skInput" style={{ width: '200px', height: '40px', background: 'rgb(35, 35, 35)' }}></div>
          <div className="skBtn" style={{ width: '100px', height: '40px', background: 'rgb(35, 35, 35)' }}></div>
        </div>
        <div className="skeletonWin" style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginTop: '50px', justifyContent: 'center' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      </>
    );
  }

  if (isError) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Xatolik yuz berdi...</h2>;

  return (
    <>
      <div className="pos-search">
        <div className="memInput">
          <SearchOutlined style={{ marginLeft: '10px', fontSize: '18px', color: '#9B74F0' }} />
          <input
            type="text"
            placeholder={t('searchMember') || 'Search...'}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <Badge count={totalItems} offset={[-30, 40]} showZero={false} color="red" >
          <button className="chart" onClick={() => setIsCartOpen(true)}>
            🛒
          </button>
        </Badge>
      </div>

      <div className="pos-cards">
        {filteredData?.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.posImg} alt={product.posTitle} />
            <h3>{product.posTitle}</h3>
            <p>Price: ${product.posQuality}</p>
            <button onClick={() => addToCart(product)}>
              <ShoppingCartOutlined style={{ fontSize: '20px', color: '#a78bfa' }} /> {t('addToCart') || 'Savatga qo\'shish'}
            </button>
          </div>
        ))}

        {isCartOpen && (
          <>
            <div className="overlay" onClick={() => setIsCartOpen(false)}></div>
            <div className="sale-panel">
              <div className="panel-header">
                <h3>Sale Summary</h3>
                <button className="close-btn" onClick={() => setIsCartOpen(false)}>✕</button>
              </div>

              <div className="cart-items-list">
                {cart.length === 0 ? <p style={{textAlign: 'center', marginTop: '20px'}}>Savat bo'sh</p> : 
                  cart.map(item => (
                    <div key={item.id} className="sale-item">
                      <img src={item.posImg} alt="" />
                      <div className="info">
                        <b>{item.posTitle}</b>
                        <p>${item.posQuality} x {item.qty}</p>
                      </div>
                      <div className="qty">
                        <button onClick={() => decreaseQty(item.id)}>-</button>
                        <span>{item.qty}</span>
                        <button onClick={() => increaseQty(item.id)}>+</button>
                      </div>
                    </div>
                  ))
                }
              </div>

              <div className="total">
                <b>Total:</b> <span>${total.toFixed(2)}</span>
              </div>

              <button 
                className="pay-btn" 
                disabled={cart.length === 0}
                onClick={() => {
                  alert("To'lov muvaffaqiyatli amalga oshirildi!");
                  setCart([]);
                  setIsCartOpen(false);
                }}
              >
                MAKE PAYMENT
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Pos;