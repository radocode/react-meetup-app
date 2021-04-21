import { useState, useEffect } from 'react';

import MeetupList from "../components/meetups/MeetupList";

function AllMeetupsPage() {

  const { REACT_APP_MEETUP_API } = process.env;

  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);


  useEffect(() => {
    setIsLoading(true);
    fetch(REACT_APP_MEETUP_API)
      .then(res => {
        return res.json();
      }).then(data => {
        const meetups = [];

        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key]
          };

          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
      })
      .catch(() => {
        setLoadedMeetups([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [REACT_APP_MEETUP_API]);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}

export default AllMeetupsPage;
