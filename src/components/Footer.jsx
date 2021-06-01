import React from "react";

const FootBar = {
    display: "flex",
    justifyContent: "flex-end"
}
const FootContent = {
    width: "500px",
    display: "flex",
    flex: "wrap",
    justifyContent: "space-between"
}
export default function Footer(){
    return (
        <footer className="container">
            <div style={FootBar}>
                <div style={FootContent}>
                    <a href="">Discord</a>
                    <a href="">GitHub</a>
                    <a href="">Twitter</a>
                    <a href="">Telegram</a>
                    <button>Dark Mode</button>
                </div>
            </div>
        </footer>
    )
}