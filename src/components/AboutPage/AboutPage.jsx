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
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>Javascript</li>
          <li>Material UI</li>
          <li>React</li>
          <li>Redux and Redux-Saga</li>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>PostgreSQL</li>
        </ul>

        <h2>Progression</h2>
        <ol>
          <li>Ability for users to modify the status details</li>
          <li>A unique status available for admin to set as technician status</li>
          <li>Ability for admin to edit details of the unique status</li>
          <li>Socket.io for instant updating of technician status</li>
          <li>Ability to sort technicians and admin into teams</li>
          <li>Data tracking and analytics to improve process and workflow</li>
        </ol>

        <h2>Reflections</h2>
        <p>The hardest part was balancing the beginning job searching, solo project, and life in general.</p>
        <p>I'm proud of myself for maintaining calm and not allowing "perfect" to be the enemy of "good."</p>

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
