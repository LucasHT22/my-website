'use client';

import React, { useEffect, useRef } from 'react';

export default function TradingViewTicker() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current?.children.length) return;
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
        symbols: [
            { proName: "BMFBOVESPA:PETR4", title: "Petrobras PN" },
            { proName: "BMFBOVESPA:VALE3", title: "Vale ON" },
            { proName: "BMFBOVESPA:ITUB4", title: "Itaú" },
            { proName: "BMFBOVESPA:BBDC4", title: "Bradesco" },
            { proName: "BMFBOVESPA:ABEV3", title: "Ambev" },
            { proName: "BMFBOVESPA:BBAS3", title: "BB" },
            { proName: "BMFBOVESPA:WEGE3", title: "Weg" },
            { proName: "BMFBOVESPA:MGLU3", title: "Magalu" },
            { proName: "BMFBOVESPA:VBBR3", title: "Vibra" },
            { proName: "BMFBOVESPA:LREN3", title: "Renner" },
            { proName: "BMFBOVESPA:B3SA3", title: "B3" },
            { proName: "BMFBOVESPA:SUZB3", title: "Suzano" },
            { proName: "BMFBOVESPA:GGBR4", title: "Gerdau" },
            { proName: "BMFBOVESPA:CSNA3", title: "CSN" },
            { proName: "BMFBOVESPA:ELET3", title: "Eletrobras ON" },
            { proName: "BMFBOVESPA:ELET6", title: "Eletrobras PNB" },
            { proName: "BMFBOVESPA:HAPV3", title: "Hapvida" },
            { proName: "BMFBOVESPA:CIEL3", title: "Cielo" },
            { proName: "BMFBOVESPA:KLBN11", title: "Klabin" },
            { proName: "BMFBOVESPA:BRFS3", title: "BRF" },
            { proName: "BMFBOVESPA:NTCO3", title: "Natura" },
            { proName: "BMFBOVESPA:PRIO3", title: "PetroRio" },
            { proName: "BMFBOVESPA:RADL3", title: "Raia Drogasil" },
            { proName: "BMFBOVESPA:TIMS3", title: "TIM" },
            { proName: "BMFBOVESPA:ENBR3", title: "Energias BR" },
        ],
        colorTheme: "dark",
        isTransparent: false,
        displayMode: "adaptive",
        locale: "pt"
        });
        containerRef.current?.appendChild(script);
    }, []);
    return <div ref={containerRef} className="tradingview-widget-container" />;
}