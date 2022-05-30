import React, {
    useState,
    ErrorInfo
} from 'react';

export const Layout = (props) => {
    const {
        appBar,
        children,
        className,
        dashboard,
        title,
        ...rest
    } = props;
    return (
        <div  {...rest}>
            <div>
                <main>
                    <div id="main-content">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};


