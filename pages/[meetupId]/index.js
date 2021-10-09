import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import Head from 'next/head';

const MeetupDetailsPage = (props) => {
	return (
		<>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta name="description" content={props.meetupData.description} />
			</Head>
			<MeetupDetail
				image={props.meetupData.image}
				title={props.meetupData.title}
				address={props.meetupData.address}
				description={props.meetupData.description}
			/>
		</>
	);
};

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		'mongodb+srv://samcesa45:SqAs2TckiBK8yeuR@cluster0.lumxc.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();
	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

	client.close();
	return {
		fallback: false,
		paths: meetups.map((meetup) => ({
			params: {
				meetupId: meetup._id.toString(),
			},
		})),
	};
}
export async function getStaticProps(context) {
	//fetch data from external API

	const meetupId = context.params.meetupId;

	const client = await MongoClient.connect(
		'mongodb+srv://samcesa45:SqAs2TckiBK8yeuR@cluster0.lumxc.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();
	const meetupsCollection = db.collection('meetups');

	const selectedMeetup = await meetupsCollection.findOne({
		_id: ObjectId(meetupId),
	});

	client.close();
	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				image: selectedMeetup.image,
				addess: selectedMeetup.address,
				description: selectedMeetup.description,
			},
		},
	};
}

export default MeetupDetailsPage;
