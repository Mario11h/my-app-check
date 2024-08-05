// src/Components/OverviewGrid/OverviewGrid.tsx

import React from 'react';
import { OverviewText } from './OverviewGridStyles';


interface OverviewGridProps {
    overview: string;
}

const OverviewGrid: React.FC<OverviewGridProps> = ({ overview }) => {
    return (
        <div>
        
        <OverviewText>
            {overview}
        </OverviewText>
        </div>
    );
};

export default OverviewGrid;
