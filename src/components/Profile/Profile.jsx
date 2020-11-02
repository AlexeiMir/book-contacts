import React from 'react';
import editeSvg from '../../assets/img/edit.svg'
import {Link} from "react-router-dom";
import './index.scss'
import {AboutList} from "./AboutList";
import Button from "../Button/Button";
import ProfileInfoSection from "./ProfileInfoSection";
import {useEditeHook} from "../../utils/useEditeHook";

const Profile = ({
                     profile,
                     onEditeDataContacts,
                     onEditeDataAddress,
                     onEditeDataCompany
                 }) => {
    // I use useEditeHook in order to get different function and value for similar component
    const isContacts = useEditeHook(false)
    const isAddress = useEditeHook(false)
    const isCompany = useEditeHook(false)
    // destructurization chosen properties
    const {name, username, email, phone, website} = profile
    const contacts = {name, username, email, phone, website}


    const onAddPost = () => {}
    const onDeleteTag = () => {}


    return (

        <div className="profile">
            <Link to={`/users/${profile.id}`}>
                <h2 className="profile__title">
                    {profile.name}
                    <img src={editeSvg}/>
                </h2>
            </Link>
            <div className="profile__block">
                <div className="profile__block-info">
                    <div className="profile__block-info-photo">
                        <img src={profile.avatar} alt="My avatar"/>
                    </div>
                    {/*Display components in dependence of different props. I choose three logical block
                    of user information and change them independent of each other*/}
                    <div className="profile__block-info-about">
                        <ProfileInfoSection
                            className={"contacts"}
                            titleSection={"Contacts information"}
                            obj={contacts}
                            {...isContacts}
                            onEditeData={onEditeDataContacts}
                        />
                        <ProfileInfoSection
                            className={"address"}
                            titleSection={"Address information"}
                            obj={profile.address}
                            {...isAddress}
                            onEditeData={onEditeDataAddress}
                        />
                        <ProfileInfoSection
                            className={"company"}
                            titleSection={"Company"}
                            obj={profile.company}
                            {...isCompany}
                            onEditeData={onEditeDataCompany}
                        />
                        <div className="profile__block-info-about-addpost">
                            <img src={profile.avatar}/>
                            <input/>
                            <Button className="button--post" onClick={onAddPost}>
                                <span>Add post</span>
                            </Button>
                        </div>
                        <div className="profile__block-info-about-post">
                            {profile.posts.map((post, index) =>
                                <div className="profile__block-info-about-post-item" key={index}>
                                    <div className="profile__block-info-about-post-item-sentence">
                                        <img src={profile.avatar}/>
                                        <b>{post.sentence}</b>
                                    </div>
                                    <div className="profile__block-info-about-post-item-paragraph">
                                        {post.paragraph}
                                    </div>
                                    <div className="profile__block-info-about-post-item-hashtag">
                                        {/*Render array of hashtag */}
                                        {post.words.map((word,index) =>
                                            <Button key={index} className="button--hesh" onClick={onDeleteTag}>
                                                <span>{word}</span>
                                                <div>
                                                    <svg
                                                        width="10"
                                                        height="10"
                                                        viewBox="0 0 11 11"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M6.87215 5.5L10.7129 1.65926C10.8952 1.47731 10.9977 1.23039 10.9979 0.972832C10.9982 0.715276 10.8961 0.468178 10.7141 0.285898C10.5321 0.103617 10.2852 0.00108525 10.0277 0.000857792C9.77011 0.000630336 9.52302 0.102726 9.34074 0.284685L5.5 4.12542L1.65926 0.284685C1.47698 0.102404 1.22976 0 0.971974 0C0.714191 0 0.466965 0.102404 0.284685 0.284685C0.102404 0.466965 0 0.714191 0 0.971974C0 1.22976 0.102404 1.47698 0.284685 1.65926L4.12542 5.5L0.284685 9.34074C0.102404 9.52302 0 9.77024 0 10.028C0 10.2858 0.102404 10.533 0.284685 10.7153C0.466965 10.8976 0.714191 11 0.971974 11C1.22976 11 1.47698 10.8976 1.65926 10.7153L5.5 6.87458L9.34074 10.7153C9.52302 10.8976 9.77024 11 10.028 11C10.2858 11 10.533 10.8976 10.7153 10.7153C10.8976 10.533 11 10.2858 11 10.028C11 9.77024 10.8976 9.52302 10.7153 9.34074L6.87215 5.5Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </div>
                                            </Button>
                                        )}
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Profile;
