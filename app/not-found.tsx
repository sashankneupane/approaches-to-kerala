import React from 'react';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-cover bg-black rounded-lg bg-center text-black" style={{ backgroundImage: `url(/dp/carlota.jpg)` }}>
            <h1 className="text-8xl font-bold mb-4">404</h1>
        </div>
    );
};

export default NotFoundPage;
