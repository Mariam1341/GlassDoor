import { useState, useRef, useEffect, useContext } from 'react';
import styles from '../GdforEmployers/EmployersBody.module.css';
import axios from 'axios';
import { ModalPage } from '../Modal/Modal';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';

export function Postjobbody() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [fileName, setFileName] = useState('');
  const [errors, setErrors] = useState({});
  const [skillInput, setSkillInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const logoRef = useRef();
  const dropZoneRef = useRef();
  const [modalStatus, setModalStatus] = useState({
    isOpen: false,
    message: '',
    type: 'success', // success or error
  });
  const history = useHistory();

  // Common skills for autocomplete
  const skillsList = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'SQL', 'AWS',
    'Docker', 'TypeScript', 'HTML', 'CSS', 'MongoDB', 'GraphQL', 'Kubernetes'
  ];

  // Form completion progress
  const requiredFields = ['companyName', 'title', 'location'];
  const optionalFields = ['jobProfile', 'salaryRange', 'description', 'requiredSkills', 'prerequisite', 'examId', 'companyId', 'imgUrl'];
  const calculateProgress = () => {
    const totalFields = requiredFields.length + optionalFields.length;
    const filledFields = [...requiredFields, ...optionalFields].filter(
      (field) => data[field] && (field !== 'requiredSkills' || data[field]?.length > 0)
    ).length;
    return Math.round((filledFields / totalFields) * 100);
  };

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem('token');
      if (!token) {
        setModalStatus({ isOpen: true, message: 'Please log in to post a job.', type: 'error' });
        setTimeout(() => {
          setModalStatus({ isOpen: false, message: '', type: 'success' });
          history.push('/SignIn');
        }, 3000);
      }
    }
  }, [user, history]);

  // Drag-and-drop setup
  useEffect(() => {
    const dropZone = dropZoneRef.current;
    if (!dropZone) return;

    const handleDragOver = (e) => {
      e.preventDefault();
      dropZone.classList.add(styles.dragOver);
    };

    const handleDragLeave = () => {
      dropZone.classList.remove(styles.dragOver);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      dropZone.classList.remove(styles.dragOver);
      const file = e.dataTransfer.files[0];
      handleFile(file);
    };

    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);

    return () => {
      dropZone.removeEventListener('dragover', handleDragOver);
      dropZone.removeEventListener('dragleave', handleDragLeave);
      dropZone.removeEventListener('drop', handleDrop);
    };
  }, []);

  const handleHideModal = () => {
    setTimeout(() => {
      setModalStatus({ ...modalStatus, isOpen: false, message: '', type: 'success' });
    }, 3000);
  };

  const validateField = (name, value) => {
    if (requiredFields.includes(name) && !value) {
      return `${name.replace(/([A-Z])/g, ' $1').trim()} is required`;
    }
    if (name === 'requiredSkills' && value?.length === 0) {
      return 'At least one skill is required';
    }
    if (name === 'imgUrl' && value && !value.startsWith('data:image/')) {
      return 'Invalid image format';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;
    if (name === 'companyName') {
      newValue = value.charAt(0).toUpperCase() + value.slice(1);
    } else if (name === 'imgUrl') {
      setFileName(extractValue(value));
      const file = e.target.files[0];
      if (file) {
        handleFile(file);
      }
      return;
    } else if (name === 'requiredSkills') {
      newValue = value.split(',').map((skill) => skill.trim()).filter(Boolean);
    }

    setData({ ...data, [name]: newValue });
    setErrors({ ...errors, [name]: validateField(name, newValue) });
  };

  const handleFile = (file) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      setErrors({ ...errors, imgUrl: 'Image size must be under 2MB' });
      return;
    }
    if (!file.type.startsWith('image/')) {
      setErrors({ ...errors, imgUrl: 'Only image files are allowed' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setData({ ...data, imgUrl: e.target.result });
      setFileName(file.name);
      setErrors({ ...errors, imgUrl: '' });
    };
    reader.readAsDataURL(file);
  };

  const extractValue = (str) => {
    const idx = str.lastIndexOf('\\');
    return idx !== -1 ? str.slice(idx + 1) : str;
  };

  const handleSkillInput = (e) => {
    setSkillInput(e.target.value);
    setShowSuggestions(true);
  };

  const addSkill = (skill) => {
    const newSkills = [...(data.requiredSkills || []), skill].filter((s, i, arr) => s && arr.indexOf(s) === i);
    setData({ ...data, requiredSkills: newSkills });
    setSkillInput('');
    setShowSuggestions(false);
    setErrors({ ...errors, requiredSkills: validateField('requiredSkills', newSkills) });
  };

  const removeSkill = (skill) => {
    const newSkills = data.requiredSkills.filter((s) => s !== skill);
    setData({ ...data, requiredSkills: newSkills });
    setErrors({ ...errors, requiredSkills: validateField('requiredSkills', newSkills) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setModalStatus({ isOpen: true, message: 'Please log in to post a job.', type: 'error' });
      handleHideModal();
      return;
    }

    const newErrors = {};
    requiredFields.forEach((field) => {
      newErrors[field] = validateField(field, data[field]);
    });
    newErrors.requiredSkills = validateField('requiredSkills', data.requiredSkills);
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setModalStatus({ isOpen: true, message: 'Please fix the errors in the form.', type: 'error' });
      handleHideModal();
      return;
    }

    const jobData = {
      ...data,
      companyName: data.companyName || 'Unknown Company',
      title: data.title || data.jobProfile || 'Untitled Job',
      description: data.description || 'No description provided',
      salaryRange: data.salaryRange || 'Not specified',
      prerequisite: data.prerequisite || 'None',
      imgUrl: data.imgUrl || 'https://img.icons8.com/ios-glyphs/90/000000/organization.png',
      jobProfile: data.jobProfile || 'Not specified',
      rating: parseFloat((Math.random() * (5 - 3) + 3).toFixed(1)),
      postedBy: user.id || user._id,
      companyId: data.companyId || user.companyId || 'N/A',
      requiredSkills: data.requiredSkills || [],
      postedDate: new Date().toISOString(),
      isActive: true,
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setModalStatus({ isOpen: true, message: 'No authentication token found.', type: 'error' });
        handleHideModal();
        return;
      }

      const response = await axios.post('http://localhost:8080/api/v1/job/add-job', jobData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Job posted:', response.data);
      setModalStatus({ isOpen: true, message: 'Job posted successfully!', type: 'success' });
      handleHideModal();
      setData({});
      setFileName('');
      setSkillInput('');
      logoRef.current.value = null;
      history.push('/dashboard');
    } catch (err) {
      console.error('Error posting job:', err.response?.status, err.response?.data);
      setModalStatus({ isOpen: true, message: 'Failed to post job. Please try again.', type: 'error' });
      handleHideModal();
    }
  };

  return (
    <section className={styles.postjobSection}>
      <ModalPage isOpen={modalStatus.isOpen} message={modalStatus.message} type={modalStatus.type} />
      <div className={styles.bodyTop}>
        <h2>Post a New Job</h2>
        <p>Fill out the details below to attract top talent.</p>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${calculateProgress()}%` }}></div>
        </div>
        <p className={styles.progressText}>Form Completion: {calculateProgress()}%</p>
      </div>
      <div className={styles.formOuter}>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formSection}>
              <h3>Company Details</h3>
              <label>
                Company Name <span className={styles.required}>*</span>
                <input
                  type="text"
                  name="companyName"
                  value={data.companyName || ''}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Tech Corp"
                  aria-invalid={!!errors.companyName}
                  aria-describedby={errors.companyName ? 'companyName-error' : undefined}
                />
                {errors.companyName && (
                  <span className={styles.error} id="companyName-error">{errors.companyName}</span>
                )}
              </label>
              <label>
                Company ID (Optional)
                <input
                  type="text"
                  name="companyId"
                  value={data.companyId || ''}
                  onChange={handleChange}
                  placeholder="e.g., COMP123"
                />
              </label>
            </div>
            <div className={styles.formSection}>
              <h3>Job Details</h3>
              <label>
                Job Title <span className={styles.required}>*</span>
                <input
                  type="text"
                  name="title"
                  value={data.title || ''}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Software Engineer"
                  aria-invalid={!!errors.title}
                  aria-describedby={errors.title ? 'title-error' : undefined}
                />
                {errors.title && <span className={styles.error} id="title-error">{errors.title}</span>}
              </label>
              <label>
                Job Profile
                <input
                  type="text"
                  name="jobProfile"
                  value={data.jobProfile || ''}
                  onChange={handleChange}
                  placeholder="e.g., Full-Stack Developer"
                />
              </label>
              <label>
                Location <span className={styles.required}>*</span>
                <input
                  type="text"
                  name="location"
                  value={data.location || ''}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Bangalore"
                  aria-invalid={!!errors.location}
                  aria-describedby={errors.location ? 'location-error' : undefined}
                />
                {errors.location && <span className={styles.error} id="location-error">{errors.location}</span>}
              </label>
              <label>
                Salary Range
                <select
                  className={styles.salaryRangeSelect}
                  name="salaryRange"
                  value={data.salaryRange || ''}
                  onChange={handleChange}
                >
                  <option value="">Select Salary Range</option>
                  <option value="3L-5L">3L-5L</option>
                  <option value="5L-10L">5L-10L</option>
                  <option value="10L-15L">10L-15L</option>
                  <option value="15L-20L">15L-20L</option>
                  <option value="20L+">20L+</option>
                </select>
              </label>
              <label>
                Description
                <textarea
                  name="description"
                  value={data.description || ''}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe the job responsibilities and requirements"
                ></textarea>
              </label>
            </div>
            <div className={styles.formSection}>
              <h3>Skills & Requirements</h3>
              <label>
                Required Skills
                <div className={styles.skillsInputWrapper}>
                  <input
                    type="text"
                    value={skillInput}
                    onChange={handleSkillInput}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="e.g., JavaScript, React"
                    aria-autocomplete="list"
                    aria-controls="skills-suggestions"
                  />
                  {showSuggestions && skillInput && (
                    <ul className={styles.suggestions} id="skills-suggestions">
                      {skillsList
                        .filter((skill) => skill.toLowerCase().includes(skillInput.toLowerCase()))
                        .map((skill) => (
                          <li
                            key={skill}
                            onClick={() => addSkill(skill)}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && addSkill(skill)}
                            role="option"
                            aria-selected={false}
                          >
                            {skill}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
                <div className={styles.skillsList}>
                  {data.requiredSkills?.map((skill) => (
                    <span key={skill} className={styles.skillTag}>
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className={styles.removeSkill}
                        aria-label={`Remove ${skill}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                {errors.requiredSkills && (
                  <span className={styles.error} id="skills-error">{errors.requiredSkills}</span>
                )}
              </label>
              <label>
                Prerequisites
                <textarea
                  className={styles.prerequisite}
                  name="prerequisite"
                  value={data.prerequisite || ''}
                  onChange={handleChange}
                  rows="6"
                  placeholder="e.g., Bachelor’s degree, 2+ years experience"
                ></textarea>
              </label>
            </div>
            <div className={styles.formSection}>
              <h3>Additional Information</h3>
              <label>
                Exam ID (Optional)
                <input
                  type="text"
                  name="examId"
                  value={data.examId || ''}
                  onChange={handleChange}
                  placeholder="e.g., EXAM123"
                />
              </label>
              <label className={styles.imgIcon}>
                Company Logo
                <div
                  className={styles.dropZone}
                  ref={dropZoneRef}
                  onClick={() => logoRef.current.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && logoRef.current.click()}
                >
                  {data.imgUrl ? (
                    <img src={data.imgUrl} alt="Uploaded logo" className={styles.logoPreview} />
                  ) : (
                    <p>Drag & drop an image or click to upload</p>
                  )}
                </div>
                <input
                  style={{ display: 'none' }}
                  ref={logoRef}
                  type="file"
                  name="imgUrl"
                  onChange={handleChange}
                  accept="image/*"
                  id={styles.chooselogo}
                />
                {fileName && <p className={styles.chosenFile}>{fileName}</p>}
                {errors.imgUrl && <span className={styles.error} id="imgUrl-error">{errors.imgUrl}</span>}
              </label>
            </div>
            <div className={styles.previewSection}>
              <h3>Job Posting Preview</h3>
              <div className={styles.previewCard}>
                <div className={styles.previewHeader}>
                  {data.imgUrl && <img src={data.imgUrl} alt="Company logo" className={styles.previewLogo} />}
                  <div>
                    <h4>{data.title || 'Untitled Job'}</h4>
                    <p>{data.companyName || 'Unknown Company'}</p>
                    <p>{data.location || 'Location not specified'}</p>
                  </div>
                </div>
                <p><strong>Salary:</strong> {data.salaryRange || 'Not specified'}</p>
                <p><strong>Skills:</strong> {data.requiredSkills?.join(', ') || 'None'}</p>
                <p><strong>Description:</strong> {data.description || 'No description provided'}</p>
                <p><strong>Prerequisites:</strong> {data.prerequisite || 'None'}</p>
              </div>
            </div>
            <button type="submit" className={styles.submitButton} disabled={Object.values(errors).some((e) => e)}>
              Post Job
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}