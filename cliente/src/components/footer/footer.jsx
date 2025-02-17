import React from "react";

export default function Footer () {
    return (
        <div className="footer-container">
                    <footer style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center", 
                        marginTop: "40px", 
                        padding: "10px 20px", 
                        borderTop: "1px solid #ddd", 
                        fontSize: "0.9rem", 
                        color: "#6c757d" 
                    }}>
                        <p>© Derechos reservados 2025</p>
                        <img src={logo} alt="JBHM" style={{ width: "2vw", height: "2vw" }} />
                    </footer>
                </div>
    );
}