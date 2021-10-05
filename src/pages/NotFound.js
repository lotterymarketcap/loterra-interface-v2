import React from 'react'

export default () => {
    return (
        <div
            className="vh-100 d-flex"
            style={{
                backgroundImage: 'url(bg.svg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="w-100 align-self-center text-center">
                <h2
                    style={{
                        color: '#f038f0',
                        textTransform: 'uppercase',
                        fontSize: '75px',
                        fontWeight: '300',
                        textShadow: '0px 0px 26px #ff36ff',
                        fontFamily: "'Monoton', cursive",
                        marginBottom: '10px',
                    }}
                >
                    404
                </h2>
                <h2
                    style={{
                        color: '#f038f0',
                        textTransform: 'uppercase',
                        fontSize: '41px',
                        fontWeight: '300',
                        textShadow: '0px 0px 26px #ff36ff',
                        fontFamily: "'Monoton', cursive",
                        marginBottom: '25px',
                    }}
                >
                    Page Not found
                </h2>
                <a href="/" className="btn btn-default">
                    Return to home
                </a>
            </div>
        </div>
    )
}
