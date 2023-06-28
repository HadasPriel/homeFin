import React from 'react';
import icons from '../../assets/img/icons.svg';

export const Icon = ({ name }) => {
    return (
        <svg className={`icon ${name}-icon`}>
            <use xlinkHref={`${icons}#${name}`} />
        </svg>
    );
};

