import NewMeetupForm from "../components/meetups/NewMeetupForm";

import { useHistory } from 'react-router-dom'


function NewMeetupPage() {

  const history = useHistory();

  function addMeetupHandler(meetupData) {
    fetch(
      process.env.MEETUP_API,
      {
        method: 'POST',
        body: JSON.stringify(meetupData),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(() => {
      history.replace('/');
    })
    .catch(err => console.log(err.message));

  }

  return (
    <section>
      <h1>Add New Meetup</h1>

      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;
