import React from 'react';
import classNames from 'classnames'

import './index.scss'

const Users = ({items,activeItem,onClickItem}) => {
    return (
        <ul className="users">
            {/*There are two variants. I render array of users or item called 'All users'*/}
            {/*I pass user in callback onClickItem which was chosen*/}
            {/*Use classNames and pass object consist of key. Properties 'item.active'
                belong item 'All users'*/}
            {items && items.map((item,index) =>
            <li key={item.name}
                onClick={onClickItem ? () => onClickItem(item) : null}
                className={classNames({
                active: item.active
                    ? item.active
                    : activeItem && activeItem.id === item.id
            })}>
                <i>{item.icon}</i>
                <span>
                    {item.name}
                </span>
            </li>
            )
            }
        </ul>
    );
};

export default Users;
