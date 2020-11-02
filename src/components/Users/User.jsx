import React from 'react';
import './index.scss'
import {Link} from "react-router-dom";

const User = ({
                  id,
                  name,
                  avatar,
                  username,
                  phone,
                  website,
                  favorite,
                  onClickItem
              }) => {
    return (
        <div className="user-block">
            <img className="user-block__image"
                 src={avatar}
            />
            <h4 className="user-block__title">{name}</h4>
            <div className="user-block__information">
                <ul>
                    {/*I chose key which will be display on page when I click by 'All users'*/}
                    {[username, phone, website].map((item, index) =>
                        <li key={`${index}_${item.username}`}>{item}</li>)
                    }
                </ul>
            </div>
            <div className="user-block__bottom">
                {/*I display button in order to use cb change state Favorite from Unfavorite */}
                {favorite
                    ? <button className="button">Favorite</button>
                    : <button className="button">Unfavorite</button>}
                    <button onClick={onClickItem ? () => onClickItem(id) : null}
                            //Use onClickItem in order to pass 'id' in object history
                            className="button">View</button>
            </div>


        </div>
    );
};

export default User;
