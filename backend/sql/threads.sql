-- Populate threads table
INSERT INTO threads (author_ID, title, category, content, created_at) VALUES
(1, 'Best practices for database normalization', 'Database', 
'I''m working on a project that requires me to design a database from scratch.  
What are some **best practices** for _normalization_ that I should follow?', 
'2024-11-10 09:15:00'),

(3, 'Understanding JavaScript Promises', 'Web Development', 
'Can someone explain how **Promises** work in JavaScript?  
I''m having trouble understanding the concept of `async/await` and how it relates to Promises.', 
'2024-11-15 14:30:00'),

(5, 'Python vs R for Data Science', 'Data Science', 
'I''m just starting out in _data science_ and I''m not sure which language to focus on.  
What are the pros and cons of **Python vs R** for data analysis and machine learning?', 
'2024-12-01 10:45:00'),

(2, 'How to optimize SQL queries', 'Database', 
'I have a query that''s running very slowly on a large dataset.  
What are some **strategies** for optimizing SQL performance?', 
'2024-12-05 16:20:00'),

(4, 'Mobile app UI design principles', 'UI/UX', 
'What are some **key principles** to follow when designing a _mobile app_ interface?  
I want to ensure good usability while maintaining a modern aesthetic.', 
'2024-12-10 11:30:00'),

(7, 'Getting started with Docker', 'DevOps', 
'I''ve heard a lot about **containerization** but I''m not sure where to start.  
Can someone provide a _beginner-friendly_ introduction to Docker?', 
'2024-12-15 08:45:00'),

(8, 'Best resources for learning machine learning', 'Machine Learning', 
'I''m a software developer looking to pivot into **machine learning**.  
What are some good resources (books, courses, tutorials) for someone with programming experience but limited math background?', 
'2024-12-20 13:10:00'),

(10, 'Issues with MySQL connection in Node.js', 'Back-End', 
'I''m trying to connect my **Node.js** application to a **MySQL** database but keep getting connection errors.  
Here''s my connection code — can anyone spot what''s wrong?', 
'2025-01-05 15:30:00'),

(6, 'Implementing authentication in React', 'Front-End', 
'What''s the best way to implement **user authentication** in a React application?  
Should I use a library like _Auth0_ or implement it myself?', 
'2025-01-10 09:20:00'),

(9, 'Career advice for a junior developer', 'Career', 
'I''m a **junior developer** with about 1 year of experience.  
What skills should I focus on developing to advance my career in the next few years?', 
'2025-01-15 14:50:00'),

(3, 'Understanding Big O notation', 'Algorithms', 
'I''m struggling to grasp **Big O notation**.  
Can someone explain it in simple terms with examples?', 
'2025-01-20 11:25:00'),

(5, 'Cloud services comparison', 'Cloud Computing', 
'Has anyone compared **AWS**, **Azure**, and **Google Cloud** for a small startup?  
What are the key differences I should consider?', 
'2025-01-25 10:15:00'),

(2, 'Securing API endpoints', 'Cybersecurity', 
'What are some **best practices** for securing _REST API_ endpoints?  
I''m particularly concerned about authentication and authorization.', 
'2025-02-01 16:40:00'),

(1, 'Tips for technical interviews', 'Career', 
'I have some **technical interviews** coming up.  
What are some effective strategies for preparing and performing well?', 
'2025-02-05 13:55:00'),

(4, 'Responsive design techniques', 'Web Development', 
'I''m working on making my website _responsive_.  
What are some modern techniques beyond media queries that I should be using?', 
'2025-02-10 09:30:00');

-- Populate thread_tags table
INSERT INTO thread_tags (thread_ID, tag_ID) VALUES
(1, 8), -- Database normalization + Database
(1, 3), -- Database normalization + SQL
(2, 1), -- JS Promises + JavaScript
(2, 6), -- JS Promises + Web Development
(3, 2), -- Python vs R + Python
(3, 4), -- Python vs R + Data Science
(4, 3), -- SQL optimization + SQL
(4, 8), -- SQL optimization + Database
(5, 9), -- Mobile UI + UI/UX
(5, 7), -- Mobile UI + Mobile Development
(6, 10), -- Docker + DevOps
(7, 5), -- Machine Learning resources + Machine Learning
(7, 4), -- Machine Learning resources + Data Science
(8, 15), -- MySQL connection + Back-End
(8, 8), -- MySQL connection + Database
(9, 14), -- React auth + Front-End
(9, 6), -- React auth + Web Development
(10, 1), -- Career advice - no specific tag
(11, 13), -- Big O + Algorithms
(12, 11), -- Cloud comparison + Cloud Computing
(13, 12), -- API security + Cybersecurity
(14, 1), -- Technical interviews - no specific tag
(15, 6), -- Responsive design + Web Development
(15, 14); -- Responsive design + Front-End

-- Populate thread_answers table
INSERT INTO thread_answers (thread_ID, author_ID, content, created_at, accepted) VALUES
(1, 4, 'Database normalization is about organizing your database to reduce redundancy and improve data integrity. Start with **1NF** by making sure each cell contains only one value. Then progress to **2NF** by removing partial dependencies, and **3NF** by removing transitive dependencies. Don\'t always aim for the highest normal form — sometimes denormalization makes sense for performance.', '2024-11-10 10:20:00', 'true'),
(1, 7, 'I would add that you should also consider the specific needs of your application. While normalization is important, there are cases where some denormalization can improve **read performance**, especially in data warehousing scenarios.', '2024-11-10 11:45:00', 'false'),
(2, 8, 'Promises in JavaScript represent a value that might not be available yet. Think of them as a placeholder for a future value.\n\nThe basic syntax is:\n\n```js\nnew Promise((resolve, reject) => {\n  // async code\n});\n```\n\nYou can chain promises with `.then()` and `.catch()` for error handling. `async/await` is syntactic sugar that makes promises easier to work with — it lets you write asynchronous code that looks synchronous.', '2024-11-15 15:10:00', 'true'),
(2, 10, 'To add to the previous answer, a key thing to understand is that `async/await` is built on top of promises. When you use the `await` keyword, you\'re essentially pausing execution until the promise resolves, but without blocking the main thread.', '2024-11-15 16:25:00', 'false'),
(3, 1, 'Both **Python** and **R** are excellent for data science, but they have different strengths. Python is more versatile and better for production code, machine learning, and deep learning. R has stronger statistical capabilities and better visualization packages. If you\'re just starting out, Python might be easier to learn if you have any programming background.', '2024-12-01 11:30:00', 'true'),
(3, 9, 'I\'d suggest starting with Python if you plan to do more than just statistical analysis. The ecosystem (`pandas`, `scikit-learn`, `TensorFlow`) is robust and the language is widely used in industry. That said, R is fantastic for statistical modeling and has packages like `ggplot2` that are still preferred by many for data visualization.', '2024-12-01 12:45:00', 'false'),
(4, 3, 'For SQL optimization:\n\n1. Make sure your tables are **properly indexed**.\n2. Use the `EXPLAIN` command to see how queries are executed.\n3. Avoid `SELECT *`; only select the columns you need.\n4. Rewrite complex JOINs and subqueries if possible.\n5. Use `WHERE` clauses efficiently to reduce the dataset early.', '2024-12-05 17:00:00', 'true'),
(5, 6, 'For mobile UI design:\n\n1. Design for **thumbs** — keep interactive elements within easy reach.\n2. Minimize user input — use selection controls instead of text entry.\n3. Maintain **consistency** across screens.\n4. Use clear **visual hierarchy**.\n5. Ensure **contrast** and readable text sizes.\n6. Provide clear **feedback** for actions.\n7. Design for **offline usage**.', '2024-12-10 12:15:00', 'true'),
(6, 2, 'Docker basics: Docker is a platform for developing, shipping, and running applications in containers.\n\nStart by installing Docker Desktop, then learn the basic commands:\n\n- `docker pull` (get images)\n- `docker run` (start containers)\n- `docker ps` (list running containers)\n- `docker build` (create images from Dockerfiles)\n\nTry containerizing a simple app first to understand the workflow.', '2024-12-15 09:30:00', 'true'),
(7, 5, 'For learning machine learning with a programming background:\n\n1. Start with Andrew Ng\'s course on Coursera.\n2. Work through *Hands-On Machine Learning with Scikit-Learn* by Géron.\n3. Practice with Kaggle competitions.\n4. For the math, *Mathematics for Machine Learning* by Deisenroth is accessible.\n\nFocus on understanding the concepts and implementing algorithms before diving into the theory.', '2024-12-20 14:00:00', 'false'),
(7, 3, 'I\'d recommend *Python Machine Learning* by Raschka and *Deep Learning with Python* by Chollet. Also, FastAI has an excellent practical course that gets you building real models quickly without getting bogged down in theory initially.', '2024-12-20 15:30:00', 'true'),
(8, 9, 'Check your **connection string** format and credentials. Make sure your MySQL server is actually running and accessible from your application. A common issue is not handling **connection pooling** correctly — look into using a package like `mysql2` with pooling.\n\nAlso, ensure you\'re handling connection errors and closing connections properly.', '2025-01-05 16:15:00', 'true'),
(9, 7, 'For React authentication, I\'d recommend using a library like **Auth0**, **Firebase Auth**, or **AWS Cognito** unless you have specific security needs.\n\nIf implementing yourself:\n- Use **JWT** tokens\n- Store them in **HTTP-only cookies** (not localStorage)\n- Handle token refresh and logout securely\n\nThese libraries also manage secure token storage, user sessions, and MFA.', '2025-01-10 10:05:00', 'true'),
(10, 1, 'Focus on these areas to advance as a junior dev:\n\n1. Deepen fundamentals instead of chasing trends.\n2. Learn **system design**.\n3. Read other people\'s code.\n4. Contribute to **open source**.\n5. Practice **communication skills**.\n6. Build **end-to-end projects** solving real problems.', '2025-01-15 15:40:00', 'true'),
(11, 8, '**Big O notation** describes algorithm performance as input size grows:\n\n- `O(1)`: constant time\n- `O(n)`: linear time\n- `O(n²)`: quadratic time (e.g., nested loops)\n- `O(log n)`: logarithmic time (e.g., binary search)\n\nIt reflects trends, not exact time.', '2025-01-20 12:10:00', 'true'),
(12, 6, 'For a **small startup**, key cloud considerations:\n\n- **AWS**: most services, largest ecosystem\n- **Azure**: great with Microsoft stack\n- **Google Cloud**: good pricing for compute/data\n\nStart with free tiers. Use **containers** and **infrastructure as code** to avoid vendor lock-in.', '2025-01-25 11:00:00', 'true'),
(13, 10, 'For API security:\n\n1. Always use **HTTPS**\n2. Use **JWT** or **OAuth** for authentication\n3. Implement **rate limiting**\n4. **Validate inputs** strictly\n5. Handle errors securely\n6. Use an **API gateway** if possible\n7. Keep dependencies up to date\n8. Consider a **WAF** (Web Application Firewall)', '2025-02-01 17:25:00', 'true'),
(14, 2, 'For technical interviews:\n\n1. Study **data structures & algorithms**\n2. Practice on LeetCode/HackerRank\n3. Review **system design** basics\n4. Prepare project anecdotes\n5. Practice talking through problems\n6. Research the company and prep questions', '2025-02-05 14:30:00', 'true'),
(15, 5, 'Beyond media queries, explore:\n\n1. **CSS Grid** and **Flexbox**\n2. **Container queries** (newer feature)\n3. Fluid typography with `clamp()`\n4. Responsive images using `srcset`\n5. Viewport units (`vw`, `vh`)\n6. **Progressive enhancement** principles', '2025-02-10 10:15:00', 'true');

-- Populate thread_votes table
INSERT INTO thread_votes (thread_ID, voter_ID, vote_type) VALUES
(1, 2, 'upvote'),
(1, 3, 'upvote'),
(1, 5, 'upvote'),
(1, 8, 'upvote'),
(2, 1, 'upvote'),
(2, 4, 'upvote'),
(2, 6, 'upvote'),
(2, 9, 'upvote'),
(3, 2, 'upvote'),
(3, 6, 'upvote'),
(3, 8, 'upvote'),
(3, 10, 'downvote'),
(4, 1, 'upvote'),
(4, 5, 'upvote'),
(4, 7, 'upvote'),
(4, 9, 'upvote'),
(5, 2, 'upvote'),
(5, 3, 'upvote'),
(5, 8, 'upvote'),
(5, 10, 'upvote'),
(6, 1, 'upvote'),
(6, 3, 'upvote'),
(6, 5, 'upvote'),
(6, 9, 'downvote'),
(7, 1, 'upvote'),
(7, 2, 'upvote'),
(7, 4, 'upvote'),
(7, 10, 'upvote'),
(8, 2, 'upvote'),
(8, 3, 'upvote'),
(8, 7, 'downvote'),
(9, 1, 'upvote'),
(9, 4, 'upvote'),
(9, 8, 'upvote'),
(9, 10, 'upvote'),
(10, 2, 'upvote'),
(10, 3, 'upvote'),
(10, 6, 'upvote'),
(10, 9, 'upvote'),
(11, 1, 'upvote'),
(11, 4, 'upvote'),
(11, 5, 'upvote'),
(11, 10, 'upvote'),
(12, 1, 'upvote'),
(12, 3, 'upvote'),
(12, 7, 'upvote'),
(12, 9, 'downvote'),
(13, 1, 'upvote'),
(13, 5, 'upvote'),
(13, 6, 'upvote'),
(13, 8, 'upvote'),
(14, 3, 'upvote'),
(14, 4, 'upvote'),
(14, 7, 'upvote'),
(14, 9, 'upvote'),
(15, 1, 'upvote'),
(15, 2, 'upvote'),
(15, 6, 'upvote'),
(15, 10, 'upvote');

-- Populate thread_answer_votes table
INSERT INTO thread_answer_votes (answer_ID, voter_ID, vote_type) VALUES
(1, 1, 'upvote'),
(1, 2, 'upvote'),
(1, 5, 'upvote'),
(1, 10, 'upvote'),
(2, 1, 'upvote'),
(2, 3, 'upvote'),
(2, 5, 'downvote'),
(3, 1, 'upvote'),
(3, 3, 'upvote'),
(3, 5, 'upvote'),
(3, 7, 'upvote'),
(4, 1, 'upvote'),
(4, 3, 'upvote'),
(4, 7, 'downvote'),
(5, 2, 'upvote'),
(5, 4, 'upvote'),
(5, 6, 'upvote'),
(5, 7, 'upvote'),
(6, 2, 'upvote'),
(6, 4, 'upvote'),
(6, 6, 'downvote'),
(7, 1, 'upvote'),
(7, 5, 'upvote'),
(7, 8, 'upvote'),
(7, 10, 'upvote'),
(8, 1, 'upvote'),
(8, 2, 'upvote'),
(8, 3, 'upvote'),
(8, 9, 'upvote'),
(9, 3, 'upvote'),
(9, 4, 'upvote'),
(9, 8, 'upvote'),
(9, 10, 'upvote'),
(10, 1, 'upvote'),
(10, 2, 'upvote'),
(10, 7, 'upvote'),
(11, 5, 'upvote'),
(11, 8, 'upvote'),
(11, 9, 'upvote'),
(11, 10, 'upvote'),
(12, 1, 'upvote'),
(12, 2, 'upvote'),
(12, 4, 'upvote'),
(12, 6, 'upvote'),
(13, 2, 'upvote'),
(13, 3, 'upvote'),
(13, 5, 'upvote'),
(13, 9, 'upvote'),
(14, 1, 'upvote'),
(14, 4, 'upvote'),
(14, 5, 'upvote'),
(14, 8, 'upvote'),
(15, 1, 'upvote'),
(15, 4, 'upvote'),
(15, 6, 'upvote'),
(15, 9, 'upvote'),
(15, 10, 'upvote');

-- Note: For thread_images and thread_answer_images tables, 
-- you would need to have image_IDs from the images table.
-- Since we don't have those IDs yet, I'm not including those inserts.
-- You can add them later with:
/*
INSERT INTO thread_images (thread_ID, image_ID) VALUES
(1, 1),
(3, 2),
(8, 3);

INSERT INTO thread_answer_images (answer_ID, image_ID) VALUES
(3, 4),
(7, 5),
(12, 6);
*/