import { Fragment } from "react";
import Head from "next/head";

import {MongoClient , ObjectId} from "mongodb";

import MeetupDetails from "../components/meetups/MeetupDetails";

const MeetupDetailsPage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupInfos.title}</title>
                <meta name="description" content={props.meetupInfos.description} />
            </Head>
            <MeetupDetails 
            image={props.meetupInfos.image}
            title={props.meetupInfos.title}
            address={props.meetupInfos.address}
            description={props.meetupInfos.description}
            />
        </Fragment>
    )
}

export async function getStaticPaths() {
    const uri = "mongodb+srv://SalahSajar:Vampiresalah@cluster0.lp6l3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    // specify the DB's name
    const db = client.db("meetupsDB");

    // execute find query
    const result = await (await db.collection('meetups').find({}).toArray()).map(meetupData => meetupData._id);

    // close connection
    client.close();

    return {
        fallback:false,
        paths: result.map(meetupId => {
            return {
                params:{
                    meetupId: meetupId.toString()
                }
            }
        })
    }
}

export async function getStaticProps (context){
    const path = context.params.meetupId;

    const uri = "mongodb+srv://SalahSajar:Vampiresalah@cluster0.lp6l3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    // specify the DB's name
    const db = client.db("meetupsDB");

    // execute find query
    const result = await db.collection('meetups').findOne({_id : ObjectId(path) });

    // close connection
    client.close();

    return {
        props:{
            meetupInfos:{
                image:result.image,
                title:result.title,
                address:result.address,
                description: result.description
            }
        }
    }
}

export default MeetupDetailsPage;