-- Now let's insert some courses
INSERT INTO courses (instructor_ID, title, description, category, thumbnail_url, price, duration, level) VALUES
-- Course 1: Web Development Fundamentals
(1, 'Web Development Fundamentals', 'Learn the basics of HTML, CSS, and JavaScript to build responsive websites from scratch.', 'art-&-creativity', 'https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/6806526c0f0de1001d6f7143.jpg', 49.99, 4, 'Beginner'),

-- Course 2: Advanced JavaScript Programming
(1, 'Advanced JavaScript Programming', 'Master advanced JavaScript concepts including closures, promises, async/await, and design patterns.', 'computer-science', 'https://i.ytimg.com/vi/dkGyBlibvRw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBnBZiTLyOwkKU3wmwP0dssmlPiMg', 79.99, 4, 'Intermediate'),

-- Course 3: Python for Data Science
(2, 'Python for Data Science', 'Learn how to use Python for data analysis, visualization, and building machine learning models.', 'communication', 'https://cdn-0001.qstv.on.epicgames.com/DeWFZjGciBtKpknWZf/image/landscape_comp.jpeg', 69.99, 4, 'Intermediate'),

-- Course 4: UI/UX Design Principles
(2, 'UI/UX Design Principles', 'Understand the fundamentals of user interface and user experience design to create engaging digital products.', 'graphic-design', 'https://i.ytimg.com/vi/WgQz60kndvM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLASJh-OyJtvRkey6q_TE5ZYpBg2yA', 59.99, 4, 'Beginner'),

-- Course 5: Database Management Systems
(3, 'Database Management Systems', 'Learn how to design, implement, and manage databases using SQL and NoSQL technologies.', 'physics', 'https://media.sketchfab.com/models/f0f6ed43c05142dd82bceea3061f4103/thumbnails/f44c93e7ad4e43e08ccd69ddc977d25b/4c0db96c306d4280ad43d3a650f62c75.jpeg', 89.99, 4, 'Intermediate'),

-- Course 6: Mobile App Development with React Native
(3, 'Mobile App Development with React Native', 'Build cross-platform mobile applications using React Native framework.', 'media-studies', 'https://i1.sndcdn.com/artworks-QnCy3K6Fkn46EbpI-xvgwXQ-t1080x1080.png', 99.99, 4, 'Intermediate'),

-- Course 7: Machine Learning Fundamentals
(4, 'Machine Learning Fundamentals', 'Introduction to machine learning algorithms, techniques, and their practical applications.', 'linguistic', 'https://images.genius.com/a3e0a0feb6afd4f19c0c68817ee75238.718x718x1.png', 129.99, 4, 'Intermediate'),

-- Course 8: Cybersecurity Essentials
(4, 'Cybersecurity Essentials', 'Learn the core concepts of cybersecurity and how to protect digital assets from threats.', 'finance', 'https://i1.sndcdn.com/artworks-pbzi7PgzBNvTxuXN-4OPpkw-t500x500.png', 109.99, 4, 'Beginner'),

-- Course 9: Cloud Computing with AWS
(5, 'Cloud Computing with AWS', 'Master Amazon Web Services to deploy scalable and resilient applications in the cloud.', 'sociology', 'https://i.kym-cdn.com/entries/icons/original/000/053/745/trippi_tropi.jpg', 119.99, 4, 'Intermediate'),

-- Course 10: Blockchain Development
(5, 'Blockchain Development', 'Learn how to build decentralized applications using blockchain technology and smart contracts.', 'marketing', 'https://i.ytimg.com/vi/NF6aeyzYyCA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBHZ2u6iGxEBRTc9OSWsxz255nGjg', 149.99, 4, 'Advanced');

-- Add tags to courses
-- Web Development Fundamentals tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (1, 6), (1, 1);
-- Advanced JavaScript Programming tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (2, 1), (2, 6);
-- Python for Data Science tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (3, 1), (3, 5), (3, 10);
-- UI/UX Design Principles tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (4, 2), (4, 14);
-- Database Management Systems tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (5, 12), (5, 1);
-- Mobile App Development with React Native tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (6, 7), (6, 1), (6, 6);
-- Machine Learning Fundamentals tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (7, 10), (7, 9), (7, 5);
-- Cybersecurity Essentials tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (8, 11);
-- Cloud Computing with AWS tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (9, 8), (9, 13);
-- Blockchain Development tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (10, 15), (10, 1);

-- Now let's add weeks for each course
-- Weeks for Course 1: Web Development Fundamentals
INSERT INTO weeks (course_ID, week_number, title) VALUES
(1, 1, 'HTML Basics'),
(1, 2, 'CSS Styling and Layout'),
(1, 3, 'JavaScript Fundamentals'),
(1, 4, 'Building Responsive Websites');

-- Weeks for Course 2: Advanced JavaScript Programming
INSERT INTO weeks (course_ID, week_number, title) VALUES
(2, 1, 'JavaScript Advanced Concepts'),
(2, 2, 'Asynchronous Programming'),
(2, 3, 'Design Patterns in JavaScript'),
(2, 4, 'Building a Full JavaScript Application');

-- Weeks for Course 3: Python for Data Science
INSERT INTO weeks (course_ID, week_number, title) VALUES
(3, 1, 'Python Fundamentals for Data Science'),
(3, 2, 'Data Manipulation with NumPy and Pandas'),
(3, 3, 'Data Visualization with Matplotlib and Seaborn'),
(3, 4, 'Introduction to Machine Learning with Scikit-Learn');

-- Weeks for Course 4: UI/UX Design Principles
INSERT INTO weeks (course_ID, week_number, title) VALUES
(4, 1, 'Introduction to UI/UX Design'),
(4, 2, 'User Research and Personas'),
(4, 3, 'Wireframing and Prototyping'),
(4, 4, 'Design Systems and Accessibility');

-- Weeks for Course 5: Database Management Systems
INSERT INTO weeks (course_ID, week_number, title) VALUES
(5, 1, 'Relational Database Fundamentals'),
(5, 2, 'Advanced SQL Queries'),
(5, 3, 'NoSQL Databases'),
(5, 4, 'Database Performance and Optimization');

-- Weeks for Course 6: Mobile App Development with React Native
INSERT INTO weeks (course_ID, week_number, title) VALUES
(6, 1, 'React Native Basics'),
(6, 2, 'Navigation and State Management'),
(6, 3, 'Working with APIs and Data'),
(6, 4, 'Publishing and Optimizing Mobile Apps');

-- Weeks for Course 7: Machine Learning Fundamentals
INSERT INTO weeks (course_ID, week_number, title) VALUES
(7, 1, 'Introduction to Machine Learning'),
(7, 2, 'Supervised Learning Algorithms'),
(7, 3, 'Unsupervised Learning Algorithms'),
(7, 4, 'Model Evaluation and Deployment');

-- Weeks for Course 8: Cybersecurity Essentials
INSERT INTO weeks (course_ID, week_number, title) VALUES
(8, 1, 'Cybersecurity Fundamentals'),
(8, 2, 'Threat Detection and Prevention'),
(8, 3, 'Network Security'),
(8, 4, 'Security Best Practices and Compliance');

-- Weeks for Course 9: Cloud Computing with AWS
INSERT INTO weeks (course_ID, week_number, title) VALUES
(9, 1, 'AWS Fundamentals'),
(9, 2, 'Compute and Storage Services'),
(9, 3, 'Networking and Security on AWS'),
(9, 4, 'AWS DevOps and Automation');

-- Weeks for Course 10: Blockchain Development
INSERT INTO weeks (course_ID, week_number, title) VALUES
(10, 1, 'Blockchain Fundamentals'),
(10, 2, 'Smart Contract Development'),
(10, 3, 'Decentralized Application Architecture'),
(10, 4, 'Security and Best Practices in Blockchain');

-- Now let's add videos for each week
-- Videos for Course 1, Week 1: HTML Basics
INSERT INTO videos (week_ID, title, url) VALUES
(1, 'Introduction to HTML', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(1, 'HTML Document Structure', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(1, 'Working with Text and Links', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(1, 'Images and Multimedia', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(1, 'HTML Forms', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor');

-- Videos for Course 1, Week 2: CSS Styling and Layout
INSERT INTO videos (week_ID, title, url) VALUES
(2, 'Introduction to CSS', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(2, 'CSS Selectors and Properties', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(2, 'CSS Box Model', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(2, 'Flexbox Layout', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(2, 'CSS Grid Layout', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor');

-- Videos for Course 1, Week 3: JavaScript Fundamentals
INSERT INTO videos (week_ID, title, url) VALUES
(3, 'Introduction to JavaScript', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(3, 'Variables and Data Types', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(3, 'Functions and Control Flow', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(3, 'DOM Manipulation', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(3, 'Events and Event Handling', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor');

-- Videos for Course 1, Week 4: Building Responsive Websites
INSERT INTO videos (week_ID, title, url) VALUES
(4, 'Responsive Design Principles', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(4, 'Media Queries', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(4, 'Mobile-First Approach', 'https://hustera.com/videos/mobile-first'),
(4, 'Creating a Responsive Navigation', 'https://hustera.com/videos/responsive-nav'),
(4, 'Building a Complete Responsive Website', 'https://hustera.com/videos/complete-responsive');

-- Videos for Course 2, Week 1: JavaScript Advanced Concepts
INSERT INTO videos (week_ID, title, url) VALUES
(5, 'Scope and Closures', 'https://hustera.com/videos/js-scope-closures'),
(5, 'This Keyword and Binding', 'https://hustera.com/videos/js-this-binding'),
(5, 'Prototypes and Inheritance', 'https://hustera.com/videos/js-prototypes'),
(5, 'ES6+ Features', 'https://hustera.com/videos/js-es6'),
(5, 'Functional Programming in JavaScript', 'https://hustera.com/videos/js-functional');

-- Videos for Course 2, Week 2: Asynchronous Programming
INSERT INTO videos (week_ID, title, url) VALUES
(6, 'Callbacks and Callback Hell', 'https://hustera.com/videos/js-callbacks'),
(6, 'Promises', 'https://hustera.com/videos/js-promises'),
(6, 'Async/Await', 'https://hustera.com/videos/js-async-await'),
(6, 'Fetch API', 'https://hustera.com/videos/js-fetch'),
(6, 'Error Handling in Asynchronous Code', 'https://hustera.com/videos/js-async-errors');

-- Videos for Course 2, Week 3: Design Patterns in JavaScript
INSERT INTO videos (week_ID, title, url) VALUES
(7, 'Introduction to Design Patterns', 'https://hustera.com/videos/js-design-patterns-intro'),
(7, 'Module Pattern', 'https://hustera.com/videos/js-module-pattern'),
(7, 'Observer Pattern', 'https://hustera.com/videos/js-observer-pattern'),
(7, 'Singleton Pattern', 'https://hustera.com/videos/js-singleton-pattern'),
(7, 'Factory and Constructor Patterns', 'https://hustera.com/videos/js-factory-pattern');

-- Videos for Course 2, Week 4: Building a Full JavaScript Application
INSERT INTO videos (week_ID, title, url) VALUES
(8, 'Application Planning and Architecture', 'https://hustera.com/videos/js-app-planning'),
(8, 'State Management', 'https://hustera.com/videos/js-state-management'),
(8, 'Building the UI', 'https://hustera.com/videos/js-building-ui'),
(8, 'Data Fetching and API Integration', 'https://hustera.com/videos/js-api-integration'),
(8, 'Testing and Deployment', 'https://hustera.com/videos/js-testing-deployment');

-- Videos for Course 3, Week 1: Python Fundamentals for Data Science
INSERT INTO videos (week_ID, title, url) VALUES
(9, 'Python Basics for Data Science', 'https://hustera.com/videos/python-basics-ds'),
(9, 'Working with Data Types', 'https://hustera.com/videos/python-data-types'),
(9, 'Control Flow and Functions', 'https://hustera.com/videos/python-control-flow'),
(9, 'File Operations in Python', 'https://hustera.com/videos/python-file-ops'),
(9, 'Python Libraries for Data Science', 'https://hustera.com/videos/python-ds-libraries');

-- Videos for Course 3, Week 2: Data Manipulation with NumPy and Pandas
INSERT INTO videos (week_ID, title, url) VALUES
(10, 'Introduction to NumPy', 'https://hustera.com/videos/numpy-intro'),
(10, 'NumPy Arrays and Operations', 'https://hustera.com/videos/numpy-arrays'),
(10, 'Introduction to Pandas', 'https://hustera.com/videos/pandas-intro'),
(10, 'DataFrame Operations', 'https://hustera.com/videos/pandas-dataframes'),
(10, 'Data Cleaning and Preprocessing', 'https://hustera.com/videos/data-cleaning');

-- Videos for Course 3, Week 3: Data Visualization with Matplotlib and Seaborn
INSERT INTO videos (week_ID, title, url) VALUES
(11, 'Introduction to Data Visualization', 'https://hustera.com/videos/data-viz-intro'),
(11, 'Matplotlib Basics', 'https://hustera.com/videos/matplotlib-basics'),
(11, 'Advanced Matplotlib', 'https://hustera.com/videos/matplotlib-advanced'),
(11, 'Introduction to Seaborn', 'https://hustera.com/videos/seaborn-intro'),
(11, 'Creating Complex Visualizations', 'https://hustera.com/videos/complex-viz');

-- Videos for Course 3, Week 4: Introduction to Machine Learning with Scikit-Learn
INSERT INTO videos (week_ID, title, url) VALUES
(12, 'Introduction to Machine Learning', 'https://hustera.com/videos/ml-intro'),
(12, 'Scikit-Learn Basics', 'https://hustera.com/videos/scikit-learn-basics'),
(12, 'Regression Algorithms', 'https://hustera.com/videos/regression-algos'),
(12, 'Classification Algorithms', 'https://hustera.com/videos/classification-algos'),
(12, 'Model Evaluation', 'https://hustera.com/videos/model-evaluation');

-- Videos for Course 4, Week 1: Introduction to UI/UX Design
INSERT INTO videos (week_ID, title, url) VALUES
(13, 'What is UI/UX Design', 'https://hustera.com/videos/uiux-intro'),
(13, 'Design Principles', 'https://hustera.com/videos/design-principles'),
(13, 'User-Centered Design Process', 'https://hustera.com/videos/user-centered-design'),
(13, 'Information Architecture', 'https://hustera.com/videos/information-architecture'),
(13, 'Design Tools Overview', 'https://hustera.com/videos/design-tools');

-- Videos for Course 4, Week 2: User Research and Personas
INSERT INTO videos (week_ID, title, url) VALUES
(14, 'Introduction to User Research', 'https://hustera.com/videos/user-research-intro'),
(14, 'Research Methods', 'https://hustera.com/videos/research-methods'),
(14, 'Creating User Personas', 'https://hustera.com/videos/user-personas'),
(14, 'User Journey Mapping', 'https://hustera.com/videos/user-journey'),
(14, 'Analyzing Research Data', 'https://hustera.com/videos/research-analysis');

-- Videos for Course 4, Week 3: Wireframing and Prototyping
INSERT INTO videos (week_ID, title, url) VALUES
(15, 'Introduction to Wireframing', 'https://hustera.com/videos/wireframing-intro'),
(15, 'Low-Fidelity Wireframes', 'https://hustera.com/videos/low-fi-wireframes'),
(15, 'High-Fidelity Wireframes', 'https://hustera.com/videos/high-fi-wireframes'),
(15, 'Interactive Prototyping', 'https://hustera.com/videos/interactive-prototyping'),
(15, 'User Testing with Prototypes', 'https://hustera.com/videos/prototype-testing');

-- Videos for Course 4, Week 4: Design Systems and Accessibility
INSERT INTO videos (week_ID, title, url) VALUES
(16, 'Introduction to Design Systems', 'https://hustera.com/videos/design-systems-intro'),
(16, 'Creating Style Guides', 'https://hustera.com/videos/style-guides'),
(16, 'Component Libraries', 'https://hustera.com/videos/component-libraries'),
(16, 'Accessibility in Design', 'https://hustera.com/videos/accessibility-design'),
(16, 'Implementing Design Systems', 'https://hustera.com/videos/implementing-design-systems');

-- Videos for Course 5, Week 1: Relational Database Fundamentals
INSERT INTO videos (week_ID, title, url) VALUES
(17, 'Introduction to Databases', 'https://hustera.com/videos/db-intro'),
(17, 'Relational Database Concepts', 'https://hustera.com/videos/relational-concepts'),
(17, 'Database Design and Normalization', 'https://hustera.com/videos/db-normalization'),
(17, 'Introduction to SQL', 'https://hustera.com/videos/sql-intro'),
(17, 'Creating and Manipulating Tables', 'https://hustera.com/videos/sql-tables');

-- Videos for Course 5, Week 2: Advanced SQL Queries
INSERT INTO videos (week_ID, title, url) VALUES
(18, 'Complex SELECT Queries', 'https://hustera.com/videos/complex-select'),
(18, 'Joins and Relationships', 'https://hustera.com/videos/sql-joins'),
(18, 'Subqueries', 'https://hustera.com/videos/sql-subqueries'),
(18, 'Aggregation and Group By', 'https://hustera.com/videos/sql-aggregation'),
(18, 'Views and Stored Procedures', 'https://hustera.com/videos/sql-views-procedures');

-- Videos for Course 5, Week 3: NoSQL Databases
INSERT INTO videos (week_ID, title, url) VALUES
(19, 'Introduction to NoSQL', 'https://hustera.com/videos/nosql-intro'),
(19, 'Document Databases: MongoDB', 'https://hustera.com/videos/mongodb'),
(19, 'Key-Value Stores: Redis', 'https://hustera.com/videos/redis'),
(19, 'Column Databases: Cassandra', 'https://hustera.com/videos/cassandra'),
(19, 'Graph Databases: Neo4j', 'https://hustera.com/videos/neo4j');

-- Videos for Course 5, Week 4: Database Performance and Optimization
INSERT INTO videos (week_ID, title, url) VALUES
(20, 'Database Indexing', 'https://hustera.com/videos/db-indexing'),
(20, 'Query Optimization', 'https://hustera.com/videos/query-optimization'),
(20, 'Database Scaling', 'https://hustera.com/videos/db-scaling'),
(20, 'Database Security', 'https://hustera.com/videos/db-security'),
(20, 'Backup and Recovery', 'https://hustera.com/videos/db-backup');

-- Videos for Course 6, Week 1: React Native Basics
INSERT INTO videos (week_ID, title, url) VALUES
(21, 'Introduction to React Native', 'https://hustera.com/videos/react-native-intro'),
(21, 'Setting Up Development Environment', 'https://hustera.com/videos/rn-setup'),
(21, 'JSX and Components', 'https://hustera.com/videos/rn-components'),
(21, 'Props and State', 'https://hustera.com/videos/rn-props-state'),
(21, 'Styling in React Native', 'https://hustera.com/videos/rn-styling');

-- Videos for Course 6, Week 2: Navigation and State Management
INSERT INTO videos (week_ID, title, url) VALUES
(22, 'React Navigation', 'https://hustera.com/videos/react-navigation'),
(22, 'Stack Navigation', 'https://hustera.com/videos/stack-navigation'),
(22, 'Tab and Drawer Navigation', 'https://hustera.com/videos/tab-drawer-navigation'),
(22, 'Context API', 'https://hustera.com/videos/context-api'),
(22, 'Redux for State Management', 'https://hustera.com/videos/redux-rn');

-- Videos for Course 6, Week 3: Working with APIs and Data
INSERT INTO videos (week_ID, title, url) VALUES
(23, 'Networking in React Native', 'https://hustera.com/videos/rn-networking'),
(23, 'Fetch API and Axios', 'https://hustera.com/videos/fetch-axios'),
(23, 'Handling API Responses', 'https://hustera.com/videos/api-responses'),
(23, 'Local Storage with AsyncStorage', 'https://hustera.com/videos/async-storage'),
(23, 'Working with Forms', 'https://hustera.com/videos/rn-forms');

-- Videos for Course 6, Week 4: Publishing and Optimizing Mobile Apps
INSERT INTO videos (week_ID, title, url) VALUES
(24, 'App Performance Optimization', 'https://hustera.com/videos/rn-performance'),
(24, 'Testing React Native Apps', 'https://hustera.com/videos/rn-testing'),
(24, 'Building for Android', 'https://hustera.com/videos/build-android'),
(24, 'Building for iOS', 'https://hustera.com/videos/build-ios'),
(24, 'App Store and Play Store Submission', 'https://hustera.com/videos/app-submission');

-- Videos for Course 7, Week 1: Introduction to Machine Learning
INSERT INTO videos (week_ID, title, url) VALUES
(25, 'What is Machine Learning', 'https://hustera.com/videos/ml-what-is'),
(25, 'Types of Machine Learning', 'https://hustera.com/videos/ml-types'),
(25, 'Machine Learning Workflow', 'https://hustera.com/videos/ml-workflow'),
(25, 'Data Preparation for ML', 'https://hustera.com/videos/ml-data-prep'),
(25, 'Feature Engineering', 'https://hustera.com/videos/feature-engineering');

-- Videos for Course 7, Week 2: Supervised Learning Algorithms
INSERT INTO videos (week_ID, title, url) VALUES
(26, 'Linear Regression', 'https://hustera.com/videos/linear-regression'),
(26, 'Logistic Regression', 'https://hustera.com/videos/logistic-regression'),
(26, 'Decision Trees', 'https://hustera.com/videos/decision-trees'),
(26, 'Random Forests', 'https://hustera.com/videos/random-forests'),
(26, 'Support Vector Machines', 'https://hustera.com/videos/svm');

-- Videos for Course 7, Week 3: Unsupervised Learning Algorithms
INSERT INTO videos (week_ID, title, url) VALUES
(27, 'Introduction to Unsupervised Learning', 'https://hustera.com/videos/unsupervised-intro'),
(27, 'K-Means Clustering', 'https://hustera.com/videos/kmeans'),
(27, 'Hierarchical Clustering', 'https://hustera.com/videos/hierarchical-clustering'),
(27, 'Principal Component Analysis', 'https://hustera.com/videos/pca'),
(27, 'Dimensionality Reduction', 'https://hustera.com/videos/dimensionality-reduction');

-- Videos for Course 7, Week 4: Model Evaluation and Deployment
INSERT INTO videos (week_ID, title, url) VALUES
(28, 'Training and Test Sets', 'https://hustera.com/videos/train-test'),
(28, 'Cross-Validation', 'https://hustera.com/videos/cross-validation'),
(28, 'Hyperparameter Tuning', 'https://hustera.com/videos/hyperparameter-tuning'),
(28, 'Model Deployment', 'https://hustera.com/videos/model-deployment'),
(28, 'ML in Production', 'https://hustera.com/videos/ml-production');

-- Videos for Course 8, Week 1: Cybersecurity Fundamentals
INSERT INTO videos (week_ID, title, url) VALUES
(29, 'Introduction to Cybersecurity', 'https://hustera.com/videos/cybersec-intro'),
(29, 'Types of Cyber Threats', 'https://hustera.com/videos/cyber-threats'),
(29, 'Security Principles', 'https://hustera.com/videos/security-principles'),
(29, 'Risk Assessment', 'https://hustera.com/videos/risk-assessment'),
(29, 'Security Controls', 'https://hustera.com/videos/security-controls');

-- Videos for Course 8, Week 2: Threat Detection and Prevention
INSERT INTO videos (week_ID, title, url) VALUES
(30, 'Security Monitoring', 'https://hustera.com/videos/security-monitoring'),
(30, 'Intrusion Detection Systems', 'https://hustera.com/videos/ids'),
(30, 'Malware Analysis', 'https://hustera.com/videos/malware-analysis'),
(30, 'Security Information and Event Management', 'https://hustera.com/videos/siem'),
(30, 'Incident Response', 'https://hustera.com/videos/incident-response');

-- Videos for Course 8, Week 3: Network Security
INSERT INTO videos (week_ID, title, url) VALUES
(31, 'Network Security Fundamentals', 'https://hustera.com/videos/network-security'),
(31, 'Firewalls and Proxies', 'https://hustera.com/videos/firewalls'),
(31, 'VPNs and Encryption', 'https://hustera.com/videos/vpn-encryption'),
(31, 'Wireless Network Security', 'https://hustera.com/videos/wireless-security'),
(31, 'Network Penetration Testing', 'https://hustera.com/videos/network-pentest');

-- Videos for Course 8, Week 4: Security Best Practices and Compliance
INSERT INTO videos (week_ID, title, url) VALUES
(32, 'Security Policies and Procedures', 'https://hustera.com/videos/security-policies'),
(32, 'Compliance Frameworks', 'https://hustera.com/videos/compliance'),
(32, 'Security Awareness Training', 'https://hustera.com/videos/security-awareness'),
(32, 'Disaster Recovery and Business Continuity', 'https://hustera.com/videos/disaster-recovery'),
(32, 'Security Auditing', 'https://hustera.com/videos/security-auditing');

-- Videos for Course 9, Week 1: AWS Fundamentals
INSERT INTO videos (week_ID, title, url) VALUES
(33, 'Introduction to AWS', 'https://hustera.com/videos/aws-intro'),
(33, 'AWS Global Infrastructure', 'https://hustera.com/videos/aws-infrastructure'),
(33, 'AWS Management Console', 'https://hustera.com/videos/aws-console'),
(33, 'Identity and Access Management', 'https://hustera.com/videos/aws-iam'),
(33, 'AWS Pricing and Support', 'https://hustera.com/videos/aws-pricing');

-- Videos for Course 9, Week 2: Compute and Storage Services (continuing from where it was cut off)
INSERT INTO videos (week_ID, title, url) VALUES
(34, 'Amazon EC2', 'https://hustera.com/videos/aws-ec2'),
(34, 'Amazon S3', 'https://hustera.com/videos/aws-s3'),
(34, 'Amazon RDS', 'https://hustera.com/videos/aws-rds'),
(34, 'Amazon DynamoDB', 'https://hustera.com/videos/aws-dynamodb'),
(34, 'AWS Lambda', 'https://hustera.com/videos/aws-lambda');

-- Videos for Course 9, Week 3: Networking and Security on AWS
INSERT INTO videos (week_ID, title, url) VALUES
(35, 'Amazon VPC', 'https://hustera.com/videos/aws-vpc'),
(35, 'Security Groups and NACLs', 'https://hustera.com/videos/aws-security-groups'),
(35, 'AWS WAF and Shield', 'https://hustera.com/videos/aws-waf-shield'),
(35, 'AWS CloudFront', 'https://hustera.com/videos/aws-cloudfront'),
(35, 'AWS Direct Connect', 'https://hustera.com/videos/aws-direct-connect');

-- Videos for Course 9, Week 4: AWS DevOps and Automation
INSERT INTO videos (week_ID, title, url) VALUES
(36, 'AWS CloudFormation', 'https://hustera.com/videos/aws-cloudformation'),
(36, 'AWS CodePipeline', 'https://hustera.com/videos/aws-codepipeline'),
(36, 'AWS CodeBuild and CodeDeploy', 'https://hustera.com/videos/aws-codebuild-deploy'),
(36, 'AWS CloudWatch', 'https://hustera.com/videos/aws-cloudwatch'),
(36, 'AWS Systems Manager', 'https://hustera.com/videos/aws-systems-manager');

-- Videos for Course 10, Week 1: Blockchain Fundamentals
INSERT INTO videos (week_ID, title, url) VALUES
(37, 'Introduction to Blockchain Technology', 'https://hustera.com/videos/blockchain-intro'),
(37, 'Blockchain Architecture', 'https://hustera.com/videos/blockchain-architecture'),
(37, 'Consensus Mechanisms', 'https://hustera.com/videos/consensus-mechanisms'),
(37, 'Cryptography in Blockchain', 'https://hustera.com/videos/blockchain-cryptography'),
(37, 'Public and Private Blockchains', 'https://hustera.com/videos/public-private-blockchains');

-- Videos for Course 10, Week 2: Smart Contract Development
INSERT INTO videos (week_ID, title, url) VALUES
(38, 'Introduction to Smart Contracts', 'https://hustera.com/videos/smart-contracts-intro'),
(38, 'Solidity Programming Language', 'https://hustera.com/videos/solidity-intro'),
(38, 'Smart Contract Development Tools', 'https://hustera.com/videos/smart-contract-tools'),
(38, 'Testing Smart Contracts', 'https://hustera.com/videos/smart-contract-testing'),
(38, 'Smart Contract Security', 'https://hustera.com/videos/smart-contract-security');

-- Videos for Course 10, Week 3: Decentralized Application Architecture
INSERT INTO videos (week_ID, title, url) VALUES
(39, 'Introduction to DApps', 'https://hustera.com/videos/dapps-intro'),
(39, 'Web3.js and Ethers.js', 'https://hustera.com/videos/web3-ethers'),
(39, 'DApp Frontend Development', 'https://hustera.com/videos/dapp-frontend'),
(39, 'IPFS and Decentralized Storage', 'https://hustera.com/videos/ipfs-storage'),
(39, 'DApp User Experience', 'https://hustera.com/videos/dapp-ux');

-- Videos for Course 10, Week 4: Security and Best Practices in Blockchain
INSERT INTO videos (week_ID, title, url) VALUES
(40, 'Blockchain Security Threats', 'https://hustera.com/videos/blockchain-threats'),
(40, 'Secure Development Workflow', 'https://hustera.com/videos/blockchain-dev-workflow'),
(40, 'Auditing and Verification', 'https://hustera.com/videos/blockchain-auditing'),
(40, 'Gas Optimization', 'https://hustera.com/videos/gas-optimization'),
(40, 'Blockchain Governance', 'https://hustera.com/videos/blockchain-governance');

UPDATE videos SET url = 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor' WHERE video_ID > 1;
