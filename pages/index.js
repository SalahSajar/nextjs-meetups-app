import { Fragment } from "react";
import Head from "next/head";
import {MongoClient} from "mongodb";


import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>React Meetups </title>
                <meta name="description" content="Explore Most Intresting React Meetups In your Area" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}

export const getStaticProps = async () => {
    const uri = "mongodb+srv://SalahSajar:Vampiresalah@cluster0.lp6l3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    // specify the DB's name
    const db = client.db("meetupsDB");

    // execute find query
    const result = await db.collection('meetups').find().toArray();

    // close connection
    client.close();

    return {
        props:{
            meetups: result.map(item => {
                return {
                    id:item._id.toString(),
                    title:item.title,
                    image:item.image ,
                    address:item.address,
                    description:item.description
                }
            }).reverse()
        }
    }
}

export default HomePage;