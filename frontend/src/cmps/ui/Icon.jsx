import React from 'react';
import icons from '../../assets/img/icons.svg';

export const Icon = ({ name, handler, classNames, color }) => {

    const func = (ev) => {
        if (handler) handler()
    }

    return (
        <svg className={`icon ${name}-icon ${classNames ? classNames : ''}`} onClick={func} width="100%"
        height="100%"  viewBox="0 0 100 100" >
            <use xlinkHref={`${icons}#${name}`}/>
        </svg>
    );
};

