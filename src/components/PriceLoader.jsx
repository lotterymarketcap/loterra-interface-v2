import React from 'react'
import ContentLoader from 'react-content-loader'

const PriceLoader = (props) => (
    <ContentLoader
        speed={2}
        width={'100%'}
        height={32}
        viewBox="0 0 100 32"
        backgroundColor="#1809437d"
        foregroundColor="#f23ff24f"
        preserveAspectRatio="none"
        {...props}
    >
        <rect x="0" y="0" rx="3" ry="3" width="100%" height="32" />
    </ContentLoader>
)

export default PriceLoader
