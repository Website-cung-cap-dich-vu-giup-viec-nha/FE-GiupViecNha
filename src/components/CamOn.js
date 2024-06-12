import React from 'react';

const CamOn = () => {
    return (
        <div className='container'>
        <div className='row justify-content-center'>
            <div className='col-lg-8 text-center p-5'>
                <img width={150} src={require("../assets/icon/ordered.png")} alt=''/>
                <p className='mt-2 h3'>ĐẶT DỊCH VỤ THÀNH CÔNG !</p>
                <p>Cám ơn bạn đã cho chúng tôi cơ hội được để phục vụ.</p>
                <p>Phiếu dịch vụ của bạn đang được xử lý. Liên hệ tư vấn <strong className='text-danger'>1900 636 736</strong></p>
            </div>
        </div>
            
        </div>
    );
};

export default CamOn;