-- Updated courses to match their assigned categories
INSERT INTO courses (instructor_ID, title, description, category, thumbnail_url, price, duration, level) VALUES
-- Course 1: Digital Art & Creative Design (art-&-creativity)
(1, 'Digital Art & Creative Design', 'Master digital painting, illustration, and creative design using industry-standard tools like Photoshop and Illustrator.', 'art-&-creativity', 'https://sadesign.vn/pictures/picfullsizes/2024/10/22/kgw1729586996.jpg', 49.99, 4, 'Beginner'),

-- Course 2: Advanced Programming Concepts (computer-science)
(1, 'Advanced Programming Concepts', 'Master advanced programming concepts including algorithms, data structures, design patterns, and software architecture.', 'computer-science', 'https://www.wgu.edu/career-guide/information-technology/computer-programmer-career/_jcr_content/root/columncontrol_179318_806819045/column-1/container_765818955/image_copy_copy.coreimg.85.800.jpeg/1730781666158/ts-cybersecurity-650x433.jpeg', 79.99, 4, 'Intermediate'),

-- Course 3: Public Speaking & Presentation Skills (communication)
(2, 'Public Speaking & Presentation Skills', 'Learn how to communicate effectively, deliver compelling presentations, and build confidence in public speaking.', 'communication', 'https://masterclass.ted.com/static/4e0259cab6c475896ac72170adaefb98/596f3/Tips-to-make-a-great-presentation_1200x627.jpg', 69.99, 4, 'Intermediate'),

-- Course 4: Graphic Design Fundamentals (graphic-design)
(3, 'Graphic Design Fundamentals', 'Understand the fundamentals of graphic design including typography, color theory, layout, and visual communication principles.', 'graphic-design', 'https://blog-frontend.envato.com/cdn-cgi/image/width=1200,quality=75,format=auto,fit=crop,height=630/uploads/sites/2/2023/02/Tuts_Roundup__Top_Graphic_Design_Courses.jpeg', 59.99, 4, 'Beginner'),

-- Course 5: Physics for Engineers (physics)
(4, 'Physics for Engineers', 'Learn fundamental physics concepts including mechanics, thermodynamics, electromagnetism, and their engineering applications.', 'physics', 'https://www.chalmers.se/_next/image/?url=https%3A%2F%2Fcms.www.chalmers.se%2FMedia%2Fpzzltzq3%2F4592.jpg%3Fwidth%3D1920%26height%3D1080%26v%3D1d9001978fae030%26quality%3D60%26format%3Dwebp&w=3840&q=90', 89.99, 4, 'Intermediate'),

-- Course 6: Documentary Filmmaking (media-studies)
(3, 'Documentary Filmmaking', 'Create compelling documentaries from concept to completion, covering storytelling, cinematography, and post-production.', 'media-studies', 'https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/63f9f7be3abad9001c86c281.png', 99.99, 4, 'Intermediate'),

-- Course 7: Language Learning & Linguistics (linguistic)
(4, 'Language Learning & Linguistics', 'Explore language structure, phonetics, syntax, and effective methods for learning and teaching languages.', 'linguistic', 'https://www.cal.org/wp-content/uploads/2022/07/GettyImages-1361844238-1024x683.jpg', 129.99, 4, 'Intermediate'),

-- Course 8: Personal Finance & Investment (finance)
(4, 'Personal Finance & Investment', 'Learn the core concepts of personal finance, budgeting, investing, and building long-term wealth.', 'finance', 'https://compote.slate.com/images/926e5009-c10a-48fe-b90e-fa0760f82fcd.png?crop=680%2C453%2Cx0%2Cy0', 109.99, 4, 'Beginner'),

-- Course 9: Social Psychology & Human Behavior (sociology)
(5, 'Social Psychology & Human Behavior', 'Understand how social factors influence individual behavior, group dynamics, and societal structures.', 'sociology', 'https://assets.entrepreneur.com/content/3x2/2000/20181018192022-GettyImages-935941772-crop.jpeg', 119.99, 4, 'Intermediate'),

-- Course 10: Digital Marketing Strategy (marketing)
(5, 'Digital Marketing Strategy', 'Learn how to build effective marketing campaigns using social media, content marketing, SEO, and analytics.', 'marketing', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-l7o2SyBF3hBeQK8RWMXGLDgrzP8R_2JFsg&s', 149.99, 4, 'Advanced');

-- Add tags to courses (updated to match new course content)
-- Digital Art & Creative Design tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (1, 2), (1, 14);
-- Advanced Programming Concepts tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (2, 1), (2, 9);
-- Public Speaking & Presentation Skills tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (3, 3), (3, 4);
-- Graphic Design Fundamentals tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (4, 2), (4, 14);
-- Physics for Engineers tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (5, 9), (5, 13);
-- Documentary Filmmaking tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (6, 7), (6, 4);
-- Language Learning & Linguistics tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (7, 4), (7, 3);
-- Personal Finance & Investment tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (8, 12);
-- Social Psychology & Human Behavior tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (9, 3), (9, 4);
-- Digital Marketing Strategy tags
INSERT INTO course_tags (course_ID, tag_ID) VALUES (10, 12), (10, 6);

-- Updated weeks for each course to match new content
-- Weeks for Course 1: Digital Art & Creative Design
INSERT INTO weeks (course_ID, week_number, title) VALUES
(1, 1, 'Digital Art Fundamentals'),
(1, 2, 'Color Theory and Composition'),
(1, 3, 'Digital Painting Techniques'),
(1, 4, 'Creative Portfolio Development');

-- Weeks for Course 2: Advanced Programming Concepts
INSERT INTO weeks (course_ID, week_number, title) VALUES
(2, 1, 'Data Structures and Algorithms'),
(2, 2, 'Object-Oriented Programming'),
(2, 3, 'Design Patterns and Architecture'),
(2, 4, 'Software Testing and Debugging');

-- Weeks for Course 3: Public Speaking & Presentation Skills
INSERT INTO weeks (course_ID, week_number, title) VALUES
(3, 1, 'Overcoming Speaking Anxiety'),
(3, 2, 'Structuring Effective Presentations'),
(3, 3, 'Voice and Body Language'),
(3, 4, 'Engaging Your Audience');

-- Weeks for Course 4: Graphic Design Fundamentals
INSERT INTO weeks (course_ID, week_number, title) VALUES
(4, 1, 'Design Principles and Elements'),
(4, 2, 'Typography and Layout'),
(4, 3, 'Brand Identity Design'),
(4, 4, 'Print and Digital Design');

-- Weeks for Course 5: Physics for Engineers
INSERT INTO weeks (course_ID, week_number, title) VALUES
(5, 1, 'Classical Mechanics'),
(5, 2, 'Thermodynamics and Heat Transfer'),
(5, 3, 'Electromagnetism and Circuits'),
(5, 4, 'Wave Physics and Optics');

-- Weeks for Course 6: Documentary Filmmaking
INSERT INTO weeks (course_ID, week_number, title) VALUES
(6, 1, 'Documentary Storytelling'),
(6, 2, 'Camera Work and Cinematography'),
(6, 3, 'Audio Recording and Sound Design'),
(6, 4, 'Editing and Post-Production');

-- Weeks for Course 7: Language Learning & Linguistics
INSERT INTO weeks (course_ID, week_number, title) VALUES
(7, 1, 'Phonetics and Phonology'),
(7, 2, 'Grammar and Syntax'),
(7, 3, 'Language Acquisition Theory'),
(7, 4, 'Teaching Methodologies');

-- Weeks for Course 8: Personal Finance & Investment
INSERT INTO weeks (course_ID, week_number, title) VALUES
(8, 1, 'Budgeting and Money Management'),
(8, 2, 'Understanding Credit and Debt'),
(8, 3, 'Investment Fundamentals'),
(8, 4, 'Retirement and Long-term Planning');

-- Weeks for Course 9: Social Psychology & Human Behavior
INSERT INTO weeks (course_ID, week_number, title) VALUES
(9, 1, 'Social Influence and Persuasion'),
(9, 2, 'Group Dynamics and Leadership'),
(9, 3, 'Prejudice and Stereotyping'),
(9, 4, 'Social Identity and Culture');

-- Weeks for Course 10: Digital Marketing Strategy
INSERT INTO weeks (course_ID, week_number, title) VALUES
(10, 1, 'Marketing Fundamentals and Strategy'),
(10, 2, 'Social Media Marketing'),
(10, 3, 'Content Marketing and SEO'),
(10, 4, 'Analytics and Campaign Optimization');

-- Updated videos for each week to match new course content
-- Videos for Course 1, Week 1: Digital Art Fundamentals
INSERT INTO videos (week_ID, title, url) VALUES
(1, 'Introduction to Digital Art', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(1, 'Choosing Your Digital Art Tools', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(1, 'Understanding Digital Canvas', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(1, 'Basic Drawing Techniques', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(1, 'Digital Brushes and Textures', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor');

-- Videos for Course 1, Week 2: Color Theory and Composition
INSERT INTO videos (week_ID, title, url) VALUES
(2, 'Understanding Color Theory', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(2, 'Color Harmony and Palettes', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(2, 'Composition Rules and Guidelines', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(2, 'Visual Balance and Hierarchy', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(2, 'Creating Mood with Color', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor');

-- Videos for Course 1, Week 3: Digital Painting Techniques
INSERT INTO videos (week_ID, title, url) VALUES
(3, 'Light and Shadow Fundamentals', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(3, 'Digital Painting Workflow', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(3, 'Blending and Rendering', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(3, 'Creating Texture and Detail', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(3, 'Character and Environment Art', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor');

-- Videos for Course 1, Week 4: Creative Portfolio Development
INSERT INTO videos (week_ID, title, url) VALUES
(4, 'Building Your Art Portfolio', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(4, 'Presenting Your Work Online', 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor'),
(4, 'Professional Art Critique', 'https://hustera.com/videos/art-critique'),
(4, 'Finding Your Artistic Style', 'https://hustera.com/videos/artistic-style'),
(4, 'Building an Art Career', 'https://hustera.com/videos/art-career');

-- Videos for Course 2, Week 1: Data Structures and Algorithms
INSERT INTO videos (week_ID, title, url) VALUES
(5, 'Introduction to Data Structures', 'https://hustera.com/videos/data-structures-intro'),
(5, 'Arrays and Linked Lists', 'https://hustera.com/videos/arrays-linkedlists'),
(5, 'Stacks and Queues', 'https://hustera.com/videos/stacks-queues'),
(5, 'Trees and Graphs', 'https://hustera.com/videos/trees-graphs'),
(5, 'Algorithm Analysis and Big O', 'https://hustera.com/videos/big-o-analysis');

-- Videos for Course 2, Week 2: Object-Oriented Programming
INSERT INTO videos (week_ID, title, url) VALUES
(6, 'Classes and Objects', 'https://hustera.com/videos/classes-objects'),
(6, 'Inheritance and Polymorphism', 'https://hustera.com/videos/inheritance-polymorphism'),
(6, 'Encapsulation and Abstraction', 'https://hustera.com/videos/encapsulation-abstraction'),
(6, 'Interfaces and Abstract Classes', 'https://hustera.com/videos/interfaces-abstract'),
(6, 'OOP Best Practices', 'https://hustera.com/videos/oop-best-practices');

-- Videos for Course 2, Week 3: Design Patterns and Architecture
INSERT INTO videos (week_ID, title, url) VALUES
(7, 'Introduction to Design Patterns', 'https://hustera.com/videos/design-patterns-intro'),
(7, 'Singleton and Factory Patterns', 'https://hustera.com/videos/singleton-factory'),
(7, 'Observer and Strategy Patterns', 'https://hustera.com/videos/observer-strategy'),
(7, 'MVC Architecture', 'https://hustera.com/videos/mvc-architecture'),
(7, 'Clean Code Principles', 'https://hustera.com/videos/clean-code');

-- Videos for Course 2, Week 4: Software Testing and Debugging
INSERT INTO videos (week_ID, title, url) VALUES
(8, 'Testing Fundamentals', 'https://hustera.com/videos/testing-fundamentals'),
(8, 'Unit Testing', 'https://hustera.com/videos/unit-testing'),
(8, 'Integration Testing', 'https://hustera.com/videos/integration-testing'),
(8, 'Debugging Techniques', 'https://hustera.com/videos/debugging-techniques'),
(8, 'Code Review Process', 'https://hustera.com/videos/code-review');

-- Videos for Course 3, Week 1: Overcoming Speaking Anxiety
INSERT INTO videos (week_ID, title, url) VALUES
(9, 'Understanding Speech Anxiety', 'https://hustera.com/videos/speech-anxiety'),
(9, 'Breathing and Relaxation Techniques', 'https://hustera.com/videos/breathing-relaxation'),
(9, 'Building Confidence', 'https://hustera.com/videos/building-confidence'),
(9, 'Preparation Strategies', 'https://hustera.com/videos/preparation-strategies'),
(9, 'Practice Exercises', 'https://hustera.com/videos/practice-exercises');

-- Videos for Course 3, Week 2: Structuring Effective Presentations
INSERT INTO videos (week_ID, title, url) VALUES
(10, 'Introduction and Hook Techniques', 'https://hustera.com/videos/introduction-hooks'),
(10, 'Organizing Your Content', 'https://hustera.com/videos/organizing-content'),
(10, 'Creating Compelling Stories', 'https://hustera.com/videos/compelling-stories'),
(10, 'Conclusion and Call to Action', 'https://hustera.com/videos/conclusion-cta'),
(10, 'Visual Aids and Slides', 'https://hustera.com/videos/visual-aids-slides');

-- Videos for Course 3, Week 3: Voice and Body Language
INSERT INTO videos (week_ID, title, url) VALUES
(11, 'Voice Projection and Clarity', 'https://hustera.com/videos/voice-projection'),
(11, 'Pace and Intonation', 'https://hustera.com/videos/pace-intonation'),
(11, 'Body Language Basics', 'https://hustera.com/videos/body-language-basics'),
(11, 'Gestures and Movement', 'https://hustera.com/videos/gestures-movement'),
(11, 'Eye Contact and Facial Expression', 'https://hustera.com/videos/eye-contact-expression');

-- Videos for Course 3, Week 4: Engaging Your Audience
INSERT INTO videos (week_ID, title, url) VALUES
(12, 'Reading Your Audience', 'https://hustera.com/videos/reading-audience'),
(12, 'Interactive Techniques', 'https://hustera.com/videos/interactive-techniques'),
(12, 'Handling Questions and Objections', 'https://hustera.com/videos/handling-questions'),
(12, 'Adapting to Different Audiences', 'https://hustera.com/videos/adapting-audiences'),
(12, 'Building Rapport', 'https://hustera.com/videos/building-rapport');

-- Videos for Course 4, Week 1: Design Principles and Elements
INSERT INTO videos (week_ID, title, url) VALUES
(13, 'The Elements of Design', 'https://hustera.com/videos/design-elements'),
(13, 'Principles of Composition', 'https://hustera.com/videos/composition-principles'),
(13, 'Balance and Proportion', 'https://hustera.com/videos/balance-proportion'),
(13, 'Contrast and Emphasis', 'https://hustera.com/videos/contrast-emphasis'),
(13, 'Unity and Repetition', 'https://hustera.com/videos/unity-repetition');

-- Videos for Course 4, Week 2: Typography and Layout
INSERT INTO videos (week_ID, title, url) VALUES
(14, 'Typography Fundamentals', 'https://hustera.com/videos/typography-fundamentals'),
(14, 'Font Selection and Pairing', 'https://hustera.com/videos/font-selection'),
(14, 'Hierarchy and Readability', 'https://hustera.com/videos/hierarchy-readability'),
(14, 'Grid Systems', 'https://hustera.com/videos/grid-systems'),
(14, 'White Space and Layout', 'https://hustera.com/videos/whitespace-layout');

-- Videos for Course 4, Week 3: Brand Identity Design
INSERT INTO videos (week_ID, title, url) VALUES
(15, 'Understanding Brand Identity', 'https://hustera.com/videos/brand-identity'),
(15, 'Logo Design Process', 'https://hustera.com/videos/logo-design'),
(15, 'Color Psychology in Branding', 'https://hustera.com/videos/color-psychology'),
(15, 'Brand Style Guides', 'https://hustera.com/videos/brand-style-guides'),
(15, 'Brand Application Design', 'https://hustera.com/videos/brand-applications');

-- Videos for Course 4, Week 4: Print and Digital Design
INSERT INTO videos (week_ID, title, url) VALUES
(16, 'Print Design Fundamentals', 'https://hustera.com/videos/print-design'),
(16, 'Digital Design Best Practices', 'https://hustera.com/videos/digital-design'),
(16, 'Packaging Design', 'https://hustera.com/videos/packaging-design'),
(16, 'Web and Mobile UI Design', 'https://hustera.com/videos/ui-design'),
(16, 'Portfolio Presentation', 'https://hustera.com/videos/portfolio-presentation');

-- Videos for Course 5, Week 1: Classical Mechanics
INSERT INTO videos (week_ID, title, url) VALUES
(17, 'Newton\'s Laws of Motion', 'https://hustera.com/videos/newtons-laws'),
(17, 'Force and Acceleration', 'https://hustera.com/videos/force-acceleration'),
(17, 'Work, Energy, and Power', 'https://hustera.com/videos/work-energy-power'),
(17, 'Momentum and Collisions', 'https://hustera.com/videos/momentum-collisions'),
(17, 'Rotational Motion', 'https://hustera.com/videos/rotational-motion');

-- Videos for Course 5, Week 2: Thermodynamics and Heat Transfer
INSERT INTO videos (week_ID, title, url) VALUES
(18, 'Temperature and Heat', 'https://hustera.com/videos/temperature-heat'),
(18, 'Laws of Thermodynamics', 'https://hustera.com/videos/thermodynamics-laws'),
(18, 'Heat Transfer Mechanisms', 'https://hustera.com/videos/heat-transfer'),
(18, 'Thermal Properties of Materials', 'https://hustera.com/videos/thermal-properties'),
(18, 'Heat Engines and Efficiency', 'https://hustera.com/videos/heat-engines');

-- Videos for Course 5, Week 3: Electromagnetism and Circuits
INSERT INTO videos (week_ID, title, url) VALUES
(19, 'Electric Fields and Forces', 'https://hustera.com/videos/electric-fields'),
(19, 'Magnetic Fields and Forces', 'https://hustera.com/videos/magnetic-fields'),
(19, 'Electromagnetic Induction', 'https://hustera.com/videos/electromagnetic-induction'),
(19, 'Circuit Analysis', 'https://hustera.com/videos/circuit-analysis'),
(19, 'AC and DC Circuits', 'https://hustera.com/videos/ac-dc-circuits');

-- Videos for Course 5, Week 4: Wave Physics and Optics
INSERT INTO videos (week_ID, title, url) VALUES
(20, 'Wave Properties and Behavior', 'https://hustera.com/videos/wave-properties'),
(20, 'Sound Waves and Acoustics', 'https://hustera.com/videos/sound-waves'),
(20, 'Light and Optics', 'https://hustera.com/videos/light-optics'),
(20, 'Interference and Diffraction', 'https://hustera.com/videos/interference-diffraction'),
(20, 'Modern Physics Applications', 'https://hustera.com/videos/modern-physics');

-- Videos for Course 6, Week 1: Documentary Storytelling
INSERT INTO videos (week_ID, title, url) VALUES
(21, 'Elements of Documentary Storytelling', 'https://hustera.com/videos/doc-storytelling'),
(21, 'Finding Your Story', 'https://hustera.com/videos/finding-story'),
(21, 'Research and Pre-Production', 'https://hustera.com/videos/research-preproduction'),
(21, 'Interview Techniques', 'https://hustera.com/videos/interview-techniques'),
(21, 'Narrative Structure', 'https://hustera.com/videos/narrative-structure');

-- Videos for Course 6, Week 2: Camera Work and Cinematography
INSERT INTO videos (week_ID, title, url) VALUES
(22, 'Camera Basics and Settings', 'https://hustera.com/videos/camera-basics'),
(22, 'Shot Composition and Framing', 'https://hustera.com/videos/shot-composition'),
(22, 'Lighting for Documentary', 'https://hustera.com/videos/documentary-lighting'),
(22, 'Camera Movement and Stability', 'https://hustera.com/videos/camera-movement'),
(22, 'Color and Exposure', 'https://hustera.com/videos/color-exposure');

-- Videos for Course 6, Week 3: Audio Recording and Sound Design
INSERT INTO videos (week_ID, title, url) VALUES
(23, 'Audio Fundamentals', 'https://hustera.com/videos/audio-fundamentals'),
(23, 'Microphone Types and Placement', 'https://hustera.com/videos/microphone-placement'),
(23, 'Recording Techniques', 'https://hustera.com/videos/recording-techniques'),
(23, 'Sound Design and Music', 'https://hustera.com/videos/sound-design'),
(23, 'Audio Post-Production', 'https://hustera.com/videos/audio-postproduction');

-- Videos for Course 6, Week 4: Editing and Post-Production
INSERT INTO videos (week_ID, title, url) VALUES
(24, 'Editing Software and Workflow', 'https://hustera.com/videos/editing-workflow'),
(24, 'Story Assembly and Pacing', 'https://hustera.com/videos/story-assembly'),
(24, 'Color Correction and Grading', 'https://hustera.com/videos/color-correction'),
(24, 'Graphics and Titles', 'https://hustera.com/videos/graphics-titles'),
(24, 'Final Export and Distribution', 'https://hustera.com/videos/export-distribution');

-- Videos for Course 7, Week 1: Phonetics and Phonology
INSERT INTO videos (week_ID, title, url) VALUES
(25, 'Introduction to Phonetics', 'https://hustera.com/videos/phonetics-intro'),
(25, 'Articulatory Phonetics', 'https://hustera.com/videos/articulatory-phonetics'),
(25, 'Acoustic Phonetics', 'https://hustera.com/videos/acoustic-phonetics'),
(25, 'Phonological Systems', 'https://hustera.com/videos/phonological-systems'),
(25, 'Sound Change and Variation', 'https://hustera.com/videos/sound-change');

-- Videos for Course 7, Week 2: Grammar and Syntax
INSERT INTO videos (week_ID, title, url) VALUES
(26, 'Morphology and Word Formation', 'https://hustera.com/videos/morphology'),
(26, 'Syntactic Structures', 'https://hustera.com/videos/syntactic-structures'),
(26, 'Parts of Speech', 'https://hustera.com/videos/parts-of-speech'),
(26, 'Sentence Types and Complexity', 'https://hustera.com/videos/sentence-types'),
(26, 'Cross-Linguistic Grammar', 'https://hustera.com/videos/cross-linguistic-grammar');

-- Videos for Course 7, Week 3: Language Acquisition Theory
INSERT INTO videos (week_ID, title, url) VALUES
(27, 'First Language Acquisition', 'https://hustera.com/videos/first-language-acquisition'),
(27, 'Second Language Acquisition', 'https://hustera.com/videos/second-language-acquisition'),
(27, 'Critical Period Hypothesis', 'https://hustera.com/videos/critical-period'),
(27, 'Input and Interaction Theories', 'https://hustera.com/videos/input-interaction'),
(27, 'Individual Differences in Learning', 'https://hustera.com/videos/individual-differences');

-- Videos for Course 7, Week 4: Teaching Methodologies
INSERT INTO videos (week_ID, title, url) VALUES
(28, 'Communicative Language Teaching', 'https://hustera.com/videos/communicative-teaching'),
(28, 'Task-Based Learning', 'https://hustera.com/videos/task-based-learning'),
(28, 'Technology in Language Teaching', 'https://hustera.com/videos/technology-teaching'),
(28, 'Assessment and Evaluation', 'https://hustera.com/videos/assessment-evaluation'),
(28, 'Classroom Management', 'https://hustera.com/videos/classroom-management');

-- Videos for Course 8, Week 1: Budgeting and Money Management
INSERT INTO videos (week_ID, title, url) VALUES
(29, 'Creating a Personal Budget', 'https://hustera.com/videos/personal-budget'),
(29, 'Tracking Income and Expenses', 'https://hustera.com/videos/tracking-expenses'),
(29, 'Emergency Fund Planning', 'https://hustera.com/videos/emergency-fund'),
(29, 'Banking and Account Management', 'https://hustera.com/videos/banking-accounts'),
(29, 'Money Management Apps and Tools', 'https://hustera.com/videos/money-management-tools');

-- Videos for Course 8, Week 2: Understanding Credit and Debt
INSERT INTO videos (week_ID, title, url) VALUES
(30, 'Credit Scores and Reports', 'https://hustera.com/videos/credit-scores'),
(30, 'Types of Credit and Loans', 'https://hustera.com/videos/types-credit'),
(30, 'Debt Management Strategies', 'https://hustera.com/videos/debt-management'),
(30, 'Avoiding Common Credit Mistakes', 'https://hustera.com/videos/credit-mistakes'),
(30, 'Building Good Credit', 'https://hustera.com/videos/building-credit');

-- Videos for Course 8, Week 3: Investment Fundamentals
INSERT INTO videos (week_ID, title, url) VALUES
(31, 'Introduction to Investing', 'https://hustera.com/videos/investing-intro'),
(31, 'Risk and Return Concepts', 'https://hustera.com/videos/risk-return'),
(31, 'Stocks, Bonds, and Mutual Funds', 'https://hustera.com/videos/investment-types'),
(31, 'Diversification Strategies', 'https://hustera.com/videos/diversification'),
(31, 'Investment Platforms and Brokers', 'https://hustera.com/videos/investment-platforms');

-- Videos for Course 8, Week 4: Retirement and Long-term Planning
INSERT INTO videos (week_ID, title, url) VALUES
(32, 'Retirement Planning Basics', 'https://hustera.com/videos/retirement-planning'),
(32, '401k and IRA Accounts', 'https://hustera.com/videos/401k-ira'),
(32, 'Social Security and Pensions', 'https://hustera.com/videos/social-security'),
(32, 'Insurance and Risk Management', 'https://hustera.com/videos/insurance-risk'),
(32, 'Estate Planning Fundamentals', 'https://hustera.com/videos/estate-planning');

-- Videos for Course 9, Week 1: Social Influence and Persuasion
INSERT INTO videos (week_ID, title, url) VALUES
(33, 'Psychology of Persuasion', 'https://hustera.com/videos/psychology-persuasion'),
(33, 'Conformity and Social Pressure', 'https://hustera.com/videos/conformity-pressure'),
(33, 'Authority and Obedience', 'https://hustera.com/videos/authority-obedience'),
(33, 'Cognitive Dissonance', 'https://hustera.com/videos/cognitive-dissonance'),
(33, 'Social Proof and Influence', 'https://hustera.com/videos/social-proof');

-- Videos for Course 9, Week 2: Group Dynamics and Leadership
INSERT INTO videos (week_ID, title, url) VALUES
(34, 'Group Formation and Development', 'https://hustera.com/videos/group-formation'),
(34, 'Leadership Styles and Effectiveness', 'https://hustera.com/videos/leadership-styles'),
(34, 'Team Communication', 'https://hustera.com/videos/team-communication'),
(34, 'Conflict Resolution', 'https://hustera.com/videos/conflict-resolution'),
(34, 'Group Decision Making', 'https://hustera.com/videos/group-decisions');

-- Videos for Course 9, Week 3: Prejudice and Stereotyping
INSERT INTO videos (week_ID, title, url) VALUES
(35, 'Origins of Prejudice', 'https://hustera.com/videos/origins-prejudice'),
(35, 'Stereotyping and Bias', 'https://hustera.com/videos/stereotyping-bias'),
(35, 'Discrimination and Its Effects', 'https://hustera.com/videos/discrimination-effects'),
(35, 'Reducing Prejudice', 'https://hustera.com/videos/reducing-prejudice'),
(35, 'Inclusive Behavior and Allyship', 'https://hustera.com/videos/inclusive-behavior');

-- Videos for Course 9, Week 4: Social Identity and Culture
INSERT INTO videos (week_ID, title, url) VALUES
(36, 'Social Identity Theory', 'https://hustera.com/videos/social-identity'),
(36, 'Cultural Influences on Behavior', 'https://hustera.com/videos/cultural-influences'),
(36, 'Cross-Cultural Psychology', 'https://hustera.com/videos/cross-cultural'),
(36, 'Socialization and Development', 'https://hustera.com/videos/socialization'),
(36, 'Social Change and Movements', 'https://hustera.com/videos/social-movements');

-- Videos for Course 10, Week 1: Marketing Fundamentals and Strategy
INSERT INTO videos (week_ID, title, url) VALUES
(37, 'Introduction to Digital Marketing', 'https://hustera.com/videos/digital-marketing-intro'),
(37, 'Target Audience and Personas', 'https://hustera.com/videos/target-audience'),
(37, 'Marketing Mix and 4Ps', 'https://hustera.com/videos/marketing-mix'),
(37, 'Digital Marketing Channels', 'https://hustera.com/videos/marketing-channels'),
(37, 'Setting Marketing Goals', 'https://hustera.com/videos/marketing-goals');

-- Videos for Course 10, Week 2: Social Media Marketing
INSERT INTO videos (week_ID, title, url) VALUES
(38, 'Social Media Strategy', 'https://hustera.com/videos/social-media-strategy'),
(38, 'Platform-Specific Marketing', 'https://hustera.com/videos/platform-marketing'),
(38, 'Content Creation and Curation', 'https://hustera.com/videos/content-creation'),
(38, 'Social Media Advertising', 'https://hustera.com/videos/social-media-ads'),
(38, 'Community Management', 'https://hustera.com/videos/community-management');

-- Videos for Course 10, Week 3: Content Marketing and SEO
INSERT INTO videos (week_ID, title, url) VALUES
(39, 'Content Marketing Strategy', 'https://hustera.com/videos/content-marketing-strategy'),
(39, 'SEO Fundamentals', 'https://hustera.com/videos/seo-fundamentals'),
(39, 'Keyword Research and Optimization', 'https://hustera.com/videos/keyword-research'),
(39, 'Link Building and Authority', 'https://hustera.com/videos/link-building'),
(39, 'Content Distribution Channels', 'https://hustera.com/videos/content-distribution');

-- Videos for Course 10, Week 4: Analytics and Campaign Optimization
INSERT INTO videos (week_ID, title, url) VALUES
(40, 'Marketing Analytics Fundamentals', 'https://hustera.com/videos/marketing-analytics'),
(40, 'Google Analytics and Tools', 'https://hustera.com/videos/google-analytics'),
(40, 'A/B Testing and Optimization', 'https://hustera.com/videos/ab-testing'),
(40, 'ROI and Performance Metrics', 'https://hustera.com/videos/roi-metrics'),
(40, 'Campaign Reporting and Insights', 'https://hustera.com/videos/campaign-reporting');

UPDATE videos SET url = 'https://youtu.be/xvFZjo5PgG0?si=_aQPhWgpfFeBeeor' WHERE video_ID > 1;