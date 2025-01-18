// CloneStudent.jsx
import React, {useState} from 'react';
import { ChevronDown, Trash2, Copy, GripVertical } from 'lucide-react';
import styles from './CloneStudent.module.css';

const CloneStudent = ({ onSave }) => {
    const [weeklyRows, setWeeklyRows] = useState([
    {
      id: 1,
      date: '25/01/05',
      subject: 'Programming',
      topic: 'Variable',
      volunteer: 'Raja',
      activities: 'Teach variables : Int, string, char',
      progressNotes : 'Good',
      TeachingNotes : 'Need Lap',
      OverallFeedback : 'Good'
    },
    {
      id: 2,
      date: '25/01/12',
      subject: 'Interpersonal',
      topic: 'Basic',
      volunteer: 'Vedha, Priya',
      activities: 'basic of English',
      progressNotes : 'Good',
      TeachingNotes : 'Need Lap',
      OverallFeedback : 'Good'
    },
    {
      id: 3,
      date: '25/01/12',
      subject: 'UI/UX',
      topic: '',
      volunteer: 'None',
      activities: '',
      progressNotes : 'Good',
      TeachingNotes : 'Need Lap',
      OverallFeedback : 'Good'
    }
  ]);

  const addNewRow = () => {
    setWeeklyRows([...weeklyRows, {
      id: weeklyRows.length + 1,
      date: '',
      subject: '',
      topic: '',
      volunteer: '',
      activities: '',
      progressNotes : '',
      TeachingNotes : '',
      OverallFeedback : ''
    }]);
  };

  const handleRowChange = (id, field, value) => {
    setWeeklyRows(weeklyRows.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h1>Clone Student</h1>
            <a href="#" className={styles.editLayout}>Edit Page Layout</a>
          </div>
          <div className={styles.actions}>
            <button className={styles.cancelBtn}>Cancel</button>
            <button className={styles.saveNewBtn} onClick={onSave}>Save and New</button>
            <button className={styles.saveBtn} onClick={onSave}>Save</button>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>Student Image</h2>
          <div className={styles.imageUpload}>
            <div className={styles.placeholder}>
              <img src="/api/placeholder/150/150" alt="Upload"/>
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>Student Information</h2>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Student Name</label>
              <input type="text" defaultValue="New same"/>
            </div>

            <div className={styles.formGroup}>
              <label>Date Of Birth</label>
              <div className={styles.dateInput}>
                <input type="text" placeholder="YY/MM/DD"/>
                <input type="text" defaultValue="06:00 PM"/>
                <ChevronDown className={styles.dateIcon}/>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Parent Phone</label>
              <input type="text" defaultValue="32435412313"/>
            </div>

            <div className={styles.formGroup}>
              <label>School Name</label>
              <input type="text" defaultValue="Govt school"/>
            </div>

            <div className={styles.formGroup}>
              <label>Parent Address</label>
              <input type="text" defaultValue="19 : j p kovil street"/>
            </div>

            <div className={styles.formGroup}>
              <label>NGO Name</label>
              <input type="text" defaultValue="Rainbow"/>
            </div>

            <div className={styles.formGroup}>
              <label>About</label>
              <textarea rows="3"></textarea>
            </div>

            <div className={styles.formGroup}>
              <label>Student Owner</label>
              <div className={styles.ownerInput}>
                <input type="text" defaultValue="Rajaram R Ramakrishnan"/>
                <ChevronDown/>
                <button className={styles.ownerIcon}>👤</button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Fav Subject</label>
              <div className={styles.subjectTags}>
                <span className={styles.tag}>Tamil</span>
                <span className={styles.tag}>English</span>
                <ChevronDown/>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Hobbies</label>
              <input type="text" defaultValue="chess"/>
            </div>
          </div>
        </div>
        <div className={styles.formSection}>
          <h2>Weekly</h2>
          <div className={styles.weeklyTable}>
            <div className={styles.weeklyHeader}>
              <div className={styles.dragHandle}></div>
              <div>Today Date</div>
              <div>Subject</div>
              <div>Topic</div>
              <div>Volunteer</div>
              <div>Today Class Activities</div>
              <div>Progress Notes</div>
              <div>Teaching Feedback</div>
              <div>Overall Performance</div>
              <div className={styles.actions}></div>
            </div>

            {weeklyRows.map((row, index) => (
                <div key={row.id} className={styles.weeklyRow}>
                  <div className={styles.dragHandle}>
                    <GripVertical size={16}/>
                  </div>

                  <div>
                    <input
                        type="text"
                        value={row.date}
                        onChange={(e) => handleRowChange(row.id, 'date', e.target.value)}
                        placeholder="DD/MM/YY"
                        className={styles.rightMar}
                    />
                  </div>

                  <div className={styles.subjectSelect}>
                    <select
                        value={row.subject}
                        onChange={(e) => handleRowChange(row.id, 'subject', e.target.value)}
                    >
                      <option value="">Select Subject</option>
                      <option value="Programming">Programming</option>
                      <option value="Interpersonal">Interpersonal</option>
                      <option value="UI/UX">UI/UX</option>
                    </select>

                  </div>

                  <div>
                    <input
                        type="text"
                        value={row.topic}
                        onChange={(e) => handleRowChange(row.id, 'topic', e.target.value)}
                        placeholder="Enter topic"
                    />
                  </div>

                  <div className={styles.volunteerSelect}>
                    <select
                        value={row.volunteer}
                        onChange={(e) => handleRowChange(row.id, 'volunteer', e.target.value)}
                    >
                      <option value="">Select Volunteer</option>
                      <option value="Raja">Raja</option>
                      <option value="Vedha, Priya">Vedha, Priya</option>
                      <option value="None">None</option>
                    </select>

                  </div>

                  <div>
                <textarea
                    value={row.activities}
                    onChange={(e) => handleRowChange(row.id, 'activities', e.target.value)}
                    placeholder="Enter activities"
                />
                  </div>
                  <div>
                <textarea
                    value={row.progressNotes}
                    onChange={(e) => handleRowChange(row.id, 'progressNotes', e.target.value)}
                    placeholder="Enter Progress Notes"
                />
                  </div>
                  <div>
                <textarea
                    value={row.TeachingNotes}
                    onChange={(e) => handleRowChange(row.id, 'TeachingNotes', e.target.value)}
                    placeholder="Enter TeachingNotes"
                />
                  </div>
                  <div>
                <textarea
                    value={row.OverallFeedback}
                    onChange={(e) => handleRowChange(row.id, 'TeachingNotes', e.target.value)}
                    placeholder="Enter TeachingNotes"
                />
                  </div>
                  <div className={styles.volunteerSelect}>
                    <select
                        value={row.volunteer}
                        onChange={(e) => handleRowChange(row.id, 'volunteer', e.target.value)}
                    >
                      <option value="">Test Score</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>

                  </div>

                  <div className={styles.rowActions}>
                    <button title="Copy"><Copy size={16}/></button>
                    <button title="Delete"><Trash2 size={16}/></button>
                  </div>
                </div>
            ))}
          </div>

          <button className={styles.addRowBtn} onClick={addNewRow}>
            + Add row
          </button>
        </div>
      </div>
  );
};

export default CloneStudent;