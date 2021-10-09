import { MongoClient } from 'mongodb';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';
//our-domain.com/
// import ethanImg from '../public/image/ethan.jpg';
// const DUMMY_MEETUPS = [
// 	{
// 		id: 'm1',
// 		image: `https://images.pexels.com/photos/925043/pexels-photo-925043.jpeg?cs=srgb&dl=pexels-mustafa-ezz-925043.jpg&fm=jpg`,
// 		title: 'meet me',
// 		address: '21 simpson street',
// 	},
// 	{
// 		id: 'm2',
// 		image: `https://images.pexels.com/photos/925043/pexels-photo-925043.jpeg?cs=srgb&dl=pexels-mustafa-ezz-925043.jpg&fm=jpg`,
// 		title: 'meet me',
// 		address: '21 simpson street',
// 	},
// ];
function HomePage(props) {
	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta
					name="description"
					content="Browse this react meetup to get a meetup"
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
}

export const getStaticProps = async () => {
	//fetch data from an API
	const client = await MongoClient.connect(
		'mongodb+srv://samcesa45:SqAs2TckiBK8yeuR@cluster0.lumxc.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');
	const meetups = await meetupsCollection.find().toArray();

	client.close();
	return {
		props: {
			meetups: meetups.map((meetup) => ({
				id: meetup._id.toString(),
				title: meetup.title,
				image: meetup.image,
				address: meetup.address,
				description: meetup.description,
			})),
		},
		revalidate: 10,
	};
};

export default HomePage;
