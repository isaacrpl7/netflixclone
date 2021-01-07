import React, { useState, useContext, createContext } from 'react';

export const FeatureContext = createContext();

export default function Card({ children, ...restProps }) {
    const [showFeature, setShowFeature] = useState(false);
    
}