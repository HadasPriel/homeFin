import React from 'react';
import icons from '../../assets/img/icons.svg';

export const Icon = ({ name, handler, classNames }) => {

    const func = () => {
        if (handler) handler()
    }

    return (
        <svg className={`icon ${name}-icon ${classNames ? classNames : ''}`} onClick={func} >
            <use xlinkHref={`${icons}#${name}`} />
        </svg>
    );
};

