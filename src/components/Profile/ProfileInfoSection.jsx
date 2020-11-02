import React from 'react';
import {AboutList} from "./AboutList";
import editeSvg from "../../assets/img/edit.svg";
import AboutListForm from "./AboutListForm";

const ProfileInfoSection = ({
                                className,
                                obj,
                                titleSection,
                                onChange,
                                value,
                                onEditeData
                            }) => {
    const onSubmit = (data) => {
        onChange(!value)
        onEditeData(data)
    }

    return (
        <div className={`profile__block-info-about-${className}`}>
            <h3 className={`profile__block-info-about-${className}-title`}>
                {titleSection}
                <img src={editeSvg} onClick={onChange}/>
            </h3>
            {/*value is parametr of editings one of component*/}
            {!value
                ? <AboutList obj={obj}/>
                : <AboutListForm obj={obj} onSubmit={onSubmit}/>}
        </div>
    );
};

export default ProfileInfoSection;
