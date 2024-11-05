import React from 'react';

const NewDashboard = () => {
  return (
    <div className="container mt-4">
      <h2>Upcoming Features</h2>
      <p>We are constantly working on new features to enhance the Employee Management System. Here's a sneak peek at what's coming soon:</p>
      <div className="list-group mt-4">
        <div className="list-group-item shadow-sm mb-3 rounded">
          <h5>Attendance Tracking <span className="badge bg-info">In Development</span></h5>
          <p className="mb-1 text-muted">Track employee attendance and absences seamlessly, with options for remote and in-office tracking.</p>
        </div>
        <div className="list-group-item shadow-sm mb-3 rounded">
          <h5>Performance Analytics <span className="badge bg-info">In Development</span></h5>
          <p className="mb-1 text-muted">Analyze employee performance data to make informed HR decisions and provide constructive feedback.</p>
        </div>
        <div className="list-group-item shadow-sm mb-3 rounded">
          <h5>Project Management <span className="badge bg-info">In Development</span></h5>
          <p className="mb-1 text-muted">Assign projects to employees and track project timelines and milestones.</p>
        </div>
        <div className="list-group-item shadow-sm mb-3 rounded">
          <h5>Training and Development <span className="badge bg-info">In Development</span></h5>
          <p className="mb-1 text-muted">Manage employee training sessions, track progress, and evaluate skill development.</p>
        </div>
      </div>
    </div>
  );
};

export default NewDashboard;
