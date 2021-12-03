import { Fragment } from "react";
import {useRouter} from "next/router";
import Head from "next/head";

import NewMeetupForm from "../components/meetups/NewMeetupForm";

const NewMeetUp = () => {
    const router = useRouter();
    const addMeetupHandler = async (enteredMeetupData) => {
        const req = await fetch('/api/newMeetup', {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(enteredMeetupData)
        })

        const data = await req.json();

        console.log(data);

        router.replace("/");
    }

    return (
        <Fragment>
            <Head>
                <title>Add a Meetup</title>
                <meta name="description" content="add your Meetup and Meet with New Friends" />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </Fragment>
    )
}

export default NewMeetUp;