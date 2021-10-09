import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage(props) {
	const router = useRouter();
	const addMeetUpHandler = async (enteredMeetupData) => {
		const response = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(enteredMeetupData),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
		const data = await response.json();
		console.log(data);
		router.push('/');
	};
	return (
		<>
			<Head>
				<title>New meetup</title>
				<meta name="description" content="Add a new meetup to network" />
			</Head>
			<NewMeetupForm onAddMeetup={addMeetUpHandler} />
		</>
	);
}

export default NewMeetupPage;
