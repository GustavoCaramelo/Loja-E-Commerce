import React from "react";

interface RatingProps {
    rate: number;
    count: number;
}

const Rating: React.FC<RatingProps> = ({ rate, count }) => {
    return (
        <div className="flex items-center space-x-1 text-yellow-500">
            <span>★ {rate}</span>
            <span className="text-gray-500 text-sm">({count})</span>
        </div>
    );
};


export default Rating;