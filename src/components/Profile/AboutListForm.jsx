import React from 'react';
import { useForm } from 'react-hook-form';

const AboutListForm = ({obj,onSubmit}) => {
    const {register,handleSubmit, errors} = useForm({
        mode: "onChange"
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(obj).map(key =>
                <li key={key}>
                    <span><b>{key.charAt(0).toUpperCase()+key.slice(1)}:</b></span>
                    {/*use validation for check email form*/}
                    { key.includes('email')
                    ? <span><input className="field" ref={register({
                            required: "Required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        })} name={key} type="email"
                        placeholder={obj[key]}
                        />
                        {/*display error if value don't match with email mask*/}
                        {errors.email && errors.email.message}</span>
                    : key.includes('phone')
                        ? <input className="field" ref={register} name={key} type="tel"
                        placeholder={obj[key]}
                        />
                    : <span><input className="field" ref={register({ required: true })} name={key} type="text"
                        placeholder={obj[key] instanceof Object
                        ? 'Coordinates'
                        : obj[key]}
                        />
                    {errors[key] && <p>{key} is required</p>}
                    </span>
                    }
                </li>)}
            <button className="button" type="submit">Update</button>
        </form>
    );
};

export default AboutListForm;
