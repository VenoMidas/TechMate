import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>

        <h2>Technologies Used</h2>
          <p>HTML</p>
          <p>CSS</p>
          <p>Javascript</p>
          <p>Material UI</p>
          <p>React</p>
          <p>Redux and Redux-Saga</p>
          <p>Node.js</p>
          <p>Express.js</p>
          <p>PostgreSQL</p>

        <h2>Reflections</h2>
        <p>The toughest challenge was learning and implementing socket.io.</p>
        <p>Now that socket.io is running, I'm excited to add 2-way status changes like the dispatcher flagging "work is on the way."</p>

        <h2>Acknowledgement</h2>
        <p>My partner Emily for managing our little monster Olivia on nights and weekends.</p>
        <p>My parents, in-laws, and other friends and family</p>
        <p>Prime faculty and staff</p>
        <p>Members of the Phrygian cohort</p>

      </div>
    </div>
  );
}

export default AboutPage;
