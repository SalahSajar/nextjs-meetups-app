import { Fragment } from "react";

import classes from "./MeetupDetails.module.css";

const MeetupDetails = (props) => {
    return (
        <Fragment>
            <div className={classes["meetupDetails--CONTAINER"]}>
                <img src={props.image} />
                <h2>{props.title}</h2>
                <h4>{props.address}</h4>
                <p> {props.description} </p>
            </div>
        </Fragment>
    )
}

export default MeetupDetails;