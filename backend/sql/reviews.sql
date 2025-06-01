INSERT INTO video_watch (student_ID, video_ID, status) VALUES
(1, 1, 'completed'),
(1, 2, 'completed'),
(1, 3, 'completed'),
(1, 4, 'completed'),
(2, 1, 'completed'),
(2, 2, 'completed'),
(3, 5, 'completed'),
(3, 6, 'completed'),
(4, 7, 'completed'),
(4, 8, 'completed'),
(4, 9, 'completed'),
(5, 10, 'completed'),
(5, 11, 'completed'),
(5, 12, 'completed'),
(6, 13, 'completed'),
(6, 14, 'completed'),
(7, 15, 'completed'),
(7, 16, 'completed'),
(8, 1, 'completed'),
(8, 2, 'completed'),
(8, 3, 'completed'),
(9, 4, 'completed'),
(9, 5, 'completed'),
(10, 6, 'completed'),
(10, 7, 'completed');

-- Now, let's insert sample data into course_reviews table
-- Assuming we have courses with course_IDs 1-5
INSERT INTO course_reviews (course_ID, reviewer_ID, rating, review) VALUES
(1, 2, 5, 'Excellent course! The material was well-organized and the instructor explained concepts clearly.'),
(1, 3, 4, 'Very informative content. Would recommend to beginners in this field.'),
(1, 5, 5, 'One of the best courses I have taken. The practical examples were particularly helpful.'),
(2, 1, 3, 'Good content but could use more practical exercises.'),
(2, 4, 4, 'The instructor was knowledgeable and responsive to questions.'),
(2, 6, 2, 'The course was too basic for me. Would be better for complete beginners.'),
(3, 7, 5, 'Comprehensive coverage of the subject. The projects really helped solidify my understanding.'),
(3, 8, 4, 'Great value for the price. Learned a lot of new techniques.'),
(3, 9, 3, 'Content was good but videos were sometimes too long.'),
(4, 1, 5, 'Exceeded my expectations. The instructor has a gift for explaining complex concepts.'),
(4, 10, 4, 'Very practical approach. I was able to apply what I learned immediately in my work.'),
(5, 2, 2, 'The course description promised more advanced content than what was delivered.'),
(5, 3, 3, 'Decent course but needed more updates to stay current with industry standards.'),
(5, 7, 4, 'Good balance of theory and practice. Would have liked more downloadable resources.');

INSERT INTO course_reviews (course_ID, reviewer_ID, rating, review) VALUES
(11, 1, 5, 'Outstanding course! The advanced topics were explained very clearly.'),
(11, 4, 4, 'Challenging but rewarding. I learned a lot from the assignments.'),
(11, 6, 3, 'Good content, but some sections could be more detailed.'),
(11, 8, 5, 'Highly recommended for anyone looking to deepen their knowledge.'),
(11, 10, 4, 'Well-structured and up-to-date with current trends.');